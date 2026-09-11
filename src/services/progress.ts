/**
 * src/services/progress.ts
 *
 * All Supabase calls related to lesson progress and activity streaks.
 *
 * Required Supabase tables — run this SQL in the Supabase SQL editor:
 *
 *   -- Tracks which lessons each user has completed
 *   create table public.user_lesson_progress (
 *     id           uuid primary key default gen_random_uuid(),
 *     user_id      uuid not null references auth.users(id) on delete cascade,
 *     lesson_slug  text not null,
 *     completed_at timestamptz not null default now(),
 *     unique (user_id, lesson_slug)
 *   );
 *   alter table public.user_lesson_progress enable row level security;
 *   create policy "Users can manage their own progress"
 *     on public.user_lesson_progress
 *     for all using (auth.uid() = user_id);
 *
 *   -- One row per day a user was active (viewed or completed a lesson)
 *   create table public.user_activity (
 *     id            uuid primary key default gen_random_uuid(),
 *     user_id       uuid not null references auth.users(id) on delete cascade,
 *     activity_date date not null,
 *     unique (user_id, activity_date)
 *   );
 *   alter table public.user_activity enable row level security;
 *   create policy "Users can manage their own activity"
 *     on public.user_activity
 *     for all using (auth.uid() = user_id);
 */

import { supabase } from '../lib/supabase'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LessonProgress {
  lesson_slug: string
  completed_at: string
}

// ─── Lesson progress ──────────────────────────────────────────────────────────

/** Fetch all completed lesson slugs for the current user. */
export async function getCompletedLessons(): Promise<string[]> {
  const { data, error } = await supabase
    .from('user_lesson_progress')
    .select('lesson_slug')
    .order('completed_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map((r: { lesson_slug: string }) => r.lesson_slug)
}

/** Mark a single lesson as complete. Silently ignores duplicate completions. */
export async function markLessonComplete(lessonSlug: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('user_lesson_progress')
    .upsert(
      { user_id: user.id, lesson_slug: lessonSlug },
      { onConflict: 'user_id,lesson_slug', ignoreDuplicates: true }
    )

  if (error) throw error

  // Record today as an active day whenever a lesson is completed
  await recordActivity()
}

/** Remove a lesson completion (un-mark). */
export async function unmarkLessonComplete(lessonSlug: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { error } = await supabase
    .from('user_lesson_progress')
    .delete()
    .eq('user_id', user.id)
    .eq('lesson_slug', lessonSlug)

  if (error) throw error
}

// ─── Activity / streak ────────────────────────────────────────────────────────

/** Insert today's date as an active day. Safe to call multiple times (upsert). */
export async function recordActivity(): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const today = new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"

  const { error } = await supabase
    .from('user_activity')
    .upsert(
      { user_id: user.id, activity_date: today },
      { onConflict: 'user_id,activity_date', ignoreDuplicates: true }
    )

  if (error) throw error
}

/**
 * Fetch all activity dates for the current user, as "YYYY-MM-DD" strings,
 * sorted ascending. Used to render the streak calendar and compute streaks.
 */
export async function getActivityDates(): Promise<string[]> {
  const { data, error } = await supabase
    .from('user_activity')
    .select('activity_date')
    .order('activity_date', { ascending: true })

  if (error) throw error
  return (data ?? []).map((r: { activity_date: string }) => r.activity_date)
}

// ─── Streak calculation ───────────────────────────────────────────────────────

/**
 * Given a sorted array of "YYYY-MM-DD" active dates, returns:
 *  - currentStreak: consecutive days ending today (or yesterday)
 *  - longestStreak: all-time longest consecutive run
 */
export function calcStreaks(sortedDates: string[]): {
  currentStreak: number
  longestStreak: number
} {
  if (sortedDates.length === 0) return { currentStreak: 0, longestStreak: 0 }

  const unique = Array.from(new Set(sortedDates)).sort()
  const msPerDay = 86_400_000

  let longest = 1
  let run = 1

  for (let i = 1; i < unique.length; i++) {
    const diff =
      (new Date(unique[i]).getTime() - new Date(unique[i - 1]).getTime()) / msPerDay
    if (diff === 1) {
      run++
      if (run > longest) longest = run
    } else {
      run = 1
    }
  }

  // Current streak: walk back from today
  const todayStr = new Date().toISOString().slice(0, 10)
  const yesterdayStr = new Date(Date.now() - msPerDay).toISOString().slice(0, 10)
  const lastActive = unique[unique.length - 1]

  // Streak is alive if last active day is today or yesterday
  if (lastActive !== todayStr && lastActive !== yesterdayStr) {
    return { currentStreak: 0, longestStreak: longest }
  }

  let current = 1
  for (let i = unique.length - 2; i >= 0; i--) {
    const diff =
      (new Date(unique[i + 1]).getTime() - new Date(unique[i]).getTime()) / msPerDay
    if (diff === 1) current++
    else break
  }

  return { currentStreak: current, longestStreak: longest }
}
