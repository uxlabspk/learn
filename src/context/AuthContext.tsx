import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { getCompletedLessons, getActivityDates } from '../services/progress'

// ─── Progress cache ───────────────────────────────────────────────────────────

export interface ProgressCache {
  completedSlugs: Set<string>
  activityDates: string[]
  loaded: boolean
}

// ─── Context value ────────────────────────────────────────────────────────────

interface AuthContextValue {
  session: Session | null
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  // Progress cache — shared between Dashboard, CourseDetail, etc.
  progress: ProgressCache
  refreshProgress: () => Promise<void>
  // Called after marking/unmarking a lesson — updates cache without a full refetch
  patchProgress: (slug: string, done: boolean) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const EMPTY_PROGRESS: ProgressCache = {
  completedSlugs: new Set(),
  activityDates: [],
  loaded: false,
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState<ProgressCache>(EMPTY_PROGRESS)

  // ── Auth ────────────────────────────────────────────────────────────────────

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      // Clear cached progress when user logs out
      if (!newSession) setProgress(EMPTY_PROGRESS)
    })

    return () => subscription.unsubscribe()
  }, [])

  // ── Progress cache ──────────────────────────────────────────────────────────

  // Full refetch — called once after login and exposed for manual refresh
  const refreshProgress = useCallback(async () => {
    const [slugs, dates] = await Promise.all([
      getCompletedLessons(),
      getActivityDates(),
    ])
    setProgress({
      completedSlugs: new Set(slugs),
      activityDates: dates,
      loaded: true,
    })
  }, [])

  // Load progress as soon as we have a logged-in user
  useEffect(() => {
    if (session?.user) {
      refreshProgress().catch(() => {})
    }
  }, [session?.user?.id])  // only re-run when the user identity changes

  // Optimistic patch — avoids a round-trip after mark/unmark
  const patchProgress = useCallback((slug: string, done: boolean) => {
    setProgress(prev => {
      const next = new Set(prev.completedSlugs)
      if (done) {
        next.add(slug)
      } else {
        next.delete(slug)
      }
      return { ...prev, completedSlugs: next }
    })
  }, [])

  // ── Sign out ────────────────────────────────────────────────────────────────

  async function signOut() {
    await supabase.auth.signOut()
    setProgress(EMPTY_PROGRESS)
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        loading,
        signOut,
        progress,
        refreshProgress,
        patchProgress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error('useAuth must be used inside <AuthProvider>')
  }
  return ctx
}
