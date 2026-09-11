import { useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { calcStreaks } from '../services/progress'
import { lessons, tracks, lessonsByTrack } from '../lib/content'

// ─── Static computations — outside any component ──────────────────────────────

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

/**
 * Build a 12-week (84-day) grid ending today.
 * Defined outside the component so it is only called once per JS module load,
 * not on every render. The result is stable for the entire browser session
 * (the date only changes if the user keeps the tab open past midnight).
 */
function buildCalendarGrid(): string[] {
  const days: string[] = []
  const today = new Date()
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

const CALENDAR_GRID = buildCalendarGrid()

// Pre-compute month markers once from the static grid
const MONTH_MARKERS: { label: string; col: number }[] = []
{
  let lastMonth = -1
  CALENDAR_GRID.forEach((date, i) => {
    const m = new Date(date).getMonth()
    if (m !== lastMonth) {
      MONTH_MARKERS.push({ label: MONTH_LABELS[m], col: i })
      lastMonth = m
    }
  })
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-neutral-900/50 border border-white/[0.08] rounded-sm px-5 py-4">
      <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
      <p className="font-display text-2xl font-600 text-white">{value}</p>
    </div>
  )
}

function StreakCalendar({ activeDates }: { activeDates: Set<string> }) {
  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="overflow-x-auto">
      {/* Month labels */}
      <div className="flex mb-1" style={{ gap: '3px' }}>
        {CALENDAR_GRID.map((date, i) => {
          const marker = MONTH_MARKERS.find(m => m.col === i)
          return (
            <div key={date} className="w-[10px] shrink-0">
              {marker
                ? <span className="font-mono text-[9px] text-neutral-600 whitespace-nowrap">{marker.label}</span>
                : null}
            </div>
          )
        })}
      </div>

      {/* Day squares */}
      <div className="flex" style={{ gap: '3px' }}>
        {CALENDAR_GRID.map((date) => {
          const active = activeDates.has(date)
          const isToday = date === today
          return (
            <div
              key={date}
              title={date}
              className={`w-[10px] h-[10px] rounded-[2px] shrink-0 transition-colors ${
                active
                  ? 'bg-indigoAccent'
                  : isToday
                  ? 'bg-neutral-700 ring-1 ring-indigoAccent/50'
                  : 'bg-neutral-800'
              }`}
            />
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3">
        <span className="font-mono text-[10px] text-neutral-600">Less</span>
        {['bg-neutral-800', 'bg-indigoAccent/30', 'bg-indigoAccent/60', 'bg-indigoAccent'].map(c => (
          <div key={c} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
        ))}
        <span className="font-mono text-[10px] text-neutral-600">More</span>
      </div>
    </div>
  )
}

function TrackProgress({
  track,
  completedSlugs,
}: {
  track: string
  completedSlugs: Set<string>
}) {
  const trackLessons = lessonsByTrack(track)
  const completedCount = trackLessons.filter(l => completedSlugs.has(l.slug)).length
  const total = trackLessons.length
  const pct = total === 0 ? 0 : Math.round((completedCount / total) * 100)
  const allDone = completedCount === total

  return (
    <div className="bg-neutral-900/40 border border-white/[0.08] rounded-sm p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-display text-sm font-600 text-white">{track}</h3>
          <p className="font-mono text-xs text-neutral-500 mt-0.5">
            {completedCount} / {total} lessons
          </p>
        </div>
        {allDone && (
          <span className="shrink-0 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-green-400 bg-green-500/10 border border-green-500/20 rounded-sm px-2 py-0.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Done
          </span>
        )}
      </div>

      <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-indigoAccent rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="space-y-1.5">
        {trackLessons.map(lesson => {
          const done = completedSlugs.has(lesson.slug)
          return (
            <li key={lesson.slug} className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full shrink-0 mt-px ${done ? 'bg-indigoAccent' : 'bg-neutral-700'}`} />
              <Link
                to={`/courses/${lesson.slug}`}
                className={`font-body text-sm leading-snug transition-colors ${
                  done ? 'text-neutral-500' : 'text-neutral-300 hover:text-indigoAccent'
                }`}
              >
                {lesson.title}
              </Link>
              {done && (
                <svg className="w-3 h-3 text-green-400 shrink-0 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user, loading: authLoading, progress } = useAuth()

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/login" state={{ from: '/dashboard' }} replace />
  }

  if (authLoading || !progress.loaded) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-6 h-6 text-indigoAccent animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="font-mono text-xs text-neutral-500">Loading your dashboard…</p>
        </div>
      </div>
    )
  }

  const { completedSlugs, activityDates } = progress

  // ── useMemo for derived computations ────────────────────────────────────────
  // These only recalculate when completedSlugs or activityDates actually change,
  // not on every parent re-render.

  const { currentStreak, longestStreak } = useMemo(
    () => calcStreaks(activityDates),
    [activityDates]
  )

  const activeDateSet = useMemo(
    () => new Set(activityDates),
    [activityDates]
  )

  const currentLesson = useMemo(
    () => lessons.find(l => !completedSlugs.has(l.slug)),
    [completedSlugs]
  )

  const trackActivity = useMemo(
    () => tracks.map(track => {
      const tl = lessonsByTrack(track)
      const done = tl.filter(l => completedSlugs.has(l.slug)).length
      return { track, done, total: tl.length }
    }),
    [completedSlugs]
  )

  const totalCompleted = completedSlugs.size
  const totalLessons = lessons.length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">

      {/* Page header */}
      <div className="mb-8 sm:mb-12">
        <p className="font-mono text-xs tracking-widest uppercase text-indigoAccent mb-2">Your space</p>
        <h1 className="font-display font-700 text-2xl sm:text-3xl text-white">Dashboard</h1>
        <p className="font-body text-sm text-neutral-400 mt-1">{user?.email}</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14">
        <StatCard label="Current streak" value={`${currentStreak} day${currentStreak !== 1 ? 's' : ''}`} />
        <StatCard label="Longest streak" value={`${longestStreak} day${longestStreak !== 1 ? 's' : ''}`} />
        <StatCard label="Lessons done" value={totalCompleted} />
        <StatCard label="Total lessons" value={totalLessons} />
      </div>

      {/* Current lesson */}
      <section className="mb-10 sm:mb-14">
        <h2 className="font-display font-600 text-lg text-white mb-4">
          {currentLesson ? 'Continue learning' : 'All lessons complete 🎉'}
        </h2>

        {currentLesson ? (
          <Link
            to={`/courses/${currentLesson.slug}`}
            className="group flex items-start gap-4 sm:gap-5 bg-indigoGlow border border-indigoAccent/20 rounded-sm p-5 sm:p-6 hover:border-indigoAccent/50 transition-colors"
          >
            <span className="inline-flex flex-col items-center justify-center w-3 h-5 shrink-0 mt-1" aria-hidden="true">
              <span className="w-3 h-3 bg-indigoAccent rounded-[2px]" />
              <span className="w-3 h-1.5 bg-indigo-400 rounded-[2px] mt-[3px]" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs text-indigoAccent uppercase tracking-widest mb-1">
                {currentLesson.track} &middot; Lesson {String(currentLesson.order).padStart(2, '0')}
              </p>
              <h3 className="font-display font-600 text-white text-base sm:text-lg group-hover:text-indigoAccent transition-colors leading-snug">
                {currentLesson.title}
              </h3>
              <p className="font-body text-sm text-neutral-400 mt-1.5 leading-relaxed line-clamp-2">
                {currentLesson.description}
              </p>
              {currentLesson.minutes && (
                <p className="font-mono text-xs text-neutral-500 mt-3">{currentLesson.minutes} min read</p>
              )}
            </div>
            <svg className="w-4 h-4 text-indigoAccent shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div className="bg-green-500/5 border border-green-500/20 rounded-sm p-5 sm:p-6">
            <p className="font-body text-sm text-neutral-300">
              You've completed every lesson. You're a CodeHunts champion.
            </p>
            <Link to="/courses" className="inline-block mt-3 font-mono text-xs text-indigoAccent hover:underline">
              Browse all courses →
            </Link>
          </div>
        )}
      </section>

      {/* Streak calendar */}
      <section className="mb-10 sm:mb-14">
        <div className="flex items-baseline justify-between mb-4 gap-4">
          <h2 className="font-display font-600 text-lg text-white">Activity</h2>
          <p className="font-mono text-xs text-neutral-500">Last 12 weeks</p>
        </div>
        <div className="bg-neutral-900/40 border border-white/[0.08] rounded-sm p-5 sm:p-6">
          {activityDates.length === 0 ? (
            <p className="font-body text-sm text-neutral-500">
              No activity yet. Start reading a lesson to record your first day!
            </p>
          ) : (
            <StreakCalendar activeDates={activeDateSet} />
          )}
        </div>
      </section>

      {/* Track progress */}
      <section>
        <div className="flex items-baseline justify-between mb-4 gap-4">
          <h2 className="font-display font-600 text-lg text-white">Track progress</h2>
          <p className="font-mono text-xs text-neutral-500">
            {trackActivity.filter(t => t.done === t.total).length} / {tracks.length} tracks complete
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {tracks.map(track => (
            <TrackProgress key={track} track={track} completedSlugs={completedSlugs} />
          ))}
        </div>
      </section>

    </div>
  )
}
