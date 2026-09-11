import { useState, useEffect } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { getCompletedLessons, getActivityDates } from '../../services/progress'
import { lessons } from '../../lib/content'

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserSettings {
  email_reminders: boolean
  reminder_frequency: 'daily' | 'every_3_days' | 'weekly'
  compact_lessons: boolean
  public_streak: boolean
}

const DEFAULTS: UserSettings = {
  email_reminders: true,
  reminder_frequency: 'every_3_days',
  compact_lessons: false,
  public_streak: true,
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function SectionCard({ title, description, children }: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-neutral-900/40 border border-white/[0.08] rounded-sm overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-white/[0.06]">
        <h2 className="font-display font-600 text-base text-white">{title}</h2>
        <p className="font-body text-xs text-neutral-500 mt-0.5">{description}</p>
      </div>
      <div className="px-5 sm:px-6 py-5 space-y-5">{children}</div>
    </div>
  )
}

function Alert({ type, message }: { type: 'success' | 'error'; message: string }) {
  const s = type === 'success'
    ? 'text-green-400 bg-green-500/10 border-green-500/20'
    : 'text-red-400 bg-red-500/10 border-red-500/20'
  return (
    <p role={type === 'error' ? 'alert' : 'status'}
      className={`font-mono text-xs border rounded-sm px-3 py-2 ${s}`}>
      {message}
    </p>
  )
}

/** A labelled row with description on the left, control on the right. */
function SettingRow({ label, description, children }: {
  label: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex-1 min-w-0">
        <p className="font-display text-sm text-white">{label}</p>
        <p className="font-body text-xs text-neutral-500 mt-0.5 leading-relaxed">{description}</p>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

/** iOS-style toggle switch */
function Toggle({ checked, onChange, disabled }: {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigoAccent disabled:opacity-40 disabled:cursor-not-allowed ${
        checked
          ? 'bg-indigoAccent border-indigoAccent'
          : 'bg-neutral-700 border-neutral-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

/** Segmented control (radio-button style) */
function SegmentedControl<T extends string>({ options, value, onChange, disabled }: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  disabled?: boolean
}) {
  return (
    <div className="inline-flex rounded-sm border border-white/[0.08] overflow-hidden">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 font-mono text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
            value === opt.value
              ? 'bg-indigoAccent text-midnight'
              : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function NotificationsSection({ settings, onChange, saving, status }: {
  settings: UserSettings
  onChange: (patch: Partial<UserSettings>) => void
  saving: boolean
  status: { type: 'success' | 'error'; message: string } | null
}) {
  return (
    <SectionCard
      title="Notifications"
      description="Control when and how often CodeHunts emails you."
    >
      <SettingRow
        label="Email reminders"
        description="Receive an email when you haven't studied in a while."
      >
        <Toggle
          checked={settings.email_reminders}
          onChange={v => onChange({ email_reminders: v })}
          disabled={saving}
        />
      </SettingRow>

      {settings.email_reminders && (
        <SettingRow
          label="Reminder frequency"
          description="How long of a gap before we nudge you."
        >
          <SegmentedControl
            options={[
              { value: 'daily', label: '1 day' },
              { value: 'every_3_days', label: '3 days' },
              { value: 'weekly', label: '7 days' },
            ]}
            value={settings.reminder_frequency}
            onChange={v => onChange({ reminder_frequency: v })}
            disabled={saving}
          />
        </SettingRow>
      )}

      {status && <Alert type={status.type} message={status.message} />}
    </SectionCard>
  )
}

function AppearanceSection({ settings, onChange, saving }: {
  settings: UserSettings
  onChange: (patch: Partial<UserSettings>) => void
  saving: boolean
}) {
  return (
    <SectionCard
      title="Appearance"
      description="Adjust how lessons are displayed."
    >
      <SettingRow
        label="Compact lesson list"
        description="Show smaller lesson cards on the Courses page — more content, less whitespace."
      >
        <Toggle
          checked={settings.compact_lessons}
          onChange={v => onChange({ compact_lessons: v })}
          disabled={saving}
        />
      </SettingRow>
    </SectionCard>
  )
}

function PrivacySection({ settings, onChange, saving }: {
  settings: UserSettings
  onChange: (patch: Partial<UserSettings>) => void
  saving: boolean
}) {
  return (
    <SectionCard
      title="Privacy"
      description="Control what others can see about your activity."
    >
      <SettingRow
        label="Public streak"
        description="Allow your streak count to appear on shareable profile links (coming soon)."
      >
        <Toggle
          checked={settings.public_streak}
          onChange={v => onChange({ public_streak: v })}
          disabled={saving}
        />
      </SettingRow>
    </SectionCard>
  )
}

function DataSection({ userEmail }: { userEmail: string }) {
  const [exporting, setExporting] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const [clearStatus, setClearStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  async function handleExport() {
    setExporting(true)
    try {
      const [completedSlugs, activityDates] = await Promise.all([
        getCompletedLessons(),
        getActivityDates(),
      ])

      const completedLessons = completedSlugs.map(slug => {
        const lesson = lessons.find(l => l.slug === slug)
        return { slug, title: lesson?.title ?? slug, track: lesson?.track ?? '' }
      })

      const payload = {
        exported_at: new Date().toISOString(),
        email: userEmail,
        completed_lessons: completedLessons,
        total_completed: completedSlugs.length,
        total_lessons: lessons.length,
        active_days: activityDates,
        total_active_days: activityDates.length,
      }

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `codehunts-progress-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      // silently fail — user can retry
    } finally {
      setExporting(false)
    }
  }

  async function handleClearProgress() {
    setClearing(true)
    setClearStatus(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error: e1 } = await supabase
      .from('user_lesson_progress')
      .delete()
      .eq('user_id', user.id)

    const { error: e2 } = await supabase
      .from('user_activity')
      .delete()
      .eq('user_id', user.id)

    if (e1 || e2) {
      setClearStatus({ type: 'error', message: 'Something went wrong. Try again.' })
    } else {
      setClearStatus({ type: 'success', message: 'All progress and activity cleared.' })
      setShowClearConfirm(false)
    }
    setClearing(false)
  }

  return (
    <SectionCard
      title="Your data"
      description="Export or reset your learning progress."
    >
      {/* Export */}
      <SettingRow
        label="Export progress"
        description="Download all your completed lessons and activity as a JSON file."
      >
        <button
          onClick={handleExport}
          disabled={exporting}
          className="font-display text-xs uppercase tracking-wide border border-white/[0.12] text-neutral-300 px-4 py-2 rounded-sm hover:border-indigoAccent hover:text-indigoAccent transition-colors disabled:opacity-40"
        >
          {exporting ? 'Exporting…' : 'Export JSON'}
        </button>
      </SettingRow>

      {/* Clear progress */}
      <div className="pt-4 border-t border-white/[0.06]">
        <SettingRow
          label="Clear all progress"
          description="Permanently removes all completed lessons and your streak history. Cannot be undone."
        >
          {!showClearConfirm ? (
            <button
              onClick={() => { setShowClearConfirm(true); setClearStatus(null) }}
              className="font-display text-xs uppercase tracking-wide border border-red-500/30 text-red-400 px-4 py-2 rounded-sm hover:bg-red-500/10 transition-colors"
            >
              Clear progress
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleClearProgress}
                disabled={clearing}
                className="font-display text-xs uppercase tracking-wide bg-red-500 text-white px-3 py-2 rounded-sm hover:bg-red-600 transition-colors disabled:opacity-40"
              >
                {clearing ? 'Clearing…' : 'Confirm'}
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="font-display text-xs uppercase tracking-wide border border-white/[0.12] text-neutral-400 px-3 py-2 rounded-sm hover:border-white/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </SettingRow>
        {clearStatus && <div className="mt-3"><Alert type={clearStatus.type} message={clearStatus.message} /></div>}
      </div>
    </SectionCard>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function Settings() {
  const { user, loading: authLoading } = useAuth()

  const [settings, setSettings] = useState<UserSettings>(DEFAULTS)
  // Snapshot of what's actually saved — used to detect unsaved changes
  const [savedSettings, setSavedSettings] = useState<UserSettings>(DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Load saved settings from user_metadata on mount
  useEffect(() => {
    if (!user) return
    const saved = user.user_metadata?.settings as Partial<UserSettings> | undefined
    if (saved) {
      const merged = { ...DEFAULTS, ...saved }
      setSettings(merged)
      setSavedSettings(merged)
    }
  }, [user])

  // True only when current settings differ from what's in Supabase
  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings)

  // Manual save
  async function handleSave() {
    setSaving(true)
    setSaveStatus(null)
    const { error } = await supabase.auth.updateUser({ data: { settings } })
    setSaving(false)
    if (error) {
      setSaveStatus({ type: 'error', message: 'Failed to save. ' + error.message })
    } else {
      setSavedSettings(settings) // sync snapshot so isDirty goes false
      setSaveStatus({ type: 'success', message: 'Settings saved.' })
    }
  }

  function patch(partial: Partial<UserSettings>) {
    setSaveStatus(null)
    setSettings(prev => ({ ...prev, ...partial }))
  }

  if (!authLoading && !user) {
    return <Navigate to="/login" state={{ from: '/settings' }} replace />
  }

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <svg className="w-6 h-6 text-indigoAccent animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
        <Link to="/dashboard" className="hover:text-indigoAccent transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-neutral-300">Settings</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display font-700 text-xl sm:text-2xl text-white">Settings</h1>
        <p className="font-body text-sm text-neutral-400 mt-1">
          Adjust your preferences, then save.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <NotificationsSection
          settings={settings}
          onChange={patch}
          saving={saving}
          status={null}
        />
        <AppearanceSection
          settings={settings}
          onChange={patch}
          saving={saving}
        />
        <PrivacySection
          settings={settings}
          onChange={patch}
          saving={saving}
        />
        <DataSection userEmail={user?.email ?? ''} />
      </div>

      {/* Save bar — only visible when there are unsaved changes */}
      {isDirty && (
        <div className="mt-8 flex items-center justify-between gap-4 bg-neutral-900/60 border border-white/[0.08] rounded-sm px-5 py-4">
          <p className="font-mono text-xs text-neutral-400">You have unsaved changes.</p>
          <div className="flex items-center gap-4 shrink-0">
            {saveStatus && (
              <span className={`font-mono text-xs ${saveStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {saveStatus.message}
              </span>
            )}
            <button
              onClick={() => { setSettings(savedSettings); setSaveStatus(null) }}
              disabled={saving}
              className="font-display text-xs uppercase tracking-wide text-neutral-400 hover:text-white transition-colors disabled:opacity-40"
            >
              Discard
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="font-display text-sm uppercase tracking-wide bg-indigoAccent text-midnight px-5 py-2 rounded-sm hover:bg-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      )}

      {/* Success message after save (bar is gone, show confirmation) */}
      {!isDirty && saveStatus?.type === 'success' && (
        <div className="mt-8 flex items-center gap-2 font-mono text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-sm px-4 py-3">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Settings saved successfully.
        </div>
      )}

    </div>
  )
}
