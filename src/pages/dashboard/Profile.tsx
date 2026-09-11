import { useState, useEffect, type FormEvent } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

// ─── Shared UI pieces ─────────────────────────────────────────────────────────

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
      <div className="px-5 sm:px-6 py-5">{children}</div>
    </div>
  )
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs uppercase tracking-widest text-neutral-400 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-neutral-900 border border-white/[0.08] rounded-sm px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigoAccent transition-colors disabled:opacity-40"
    />
  )
}

function Alert({ type, message }: { type: 'success' | 'error'; message: string }) {
  const styles = type === 'success'
    ? 'text-green-400 bg-green-500/10 border-green-500/20'
    : 'text-red-400 bg-red-500/10 border-red-500/20'
  return (
    <p role={type === 'error' ? 'alert' : 'status'} className={`font-mono text-xs border rounded-sm px-3 py-2 ${styles}`}>
      {message}
    </p>
  )
}

function SaveButton({ loading, label = 'Save changes' }: { loading: boolean; label?: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="font-display text-sm uppercase tracking-wide bg-indigoAccent text-midnight px-5 py-2.5 rounded-sm hover:bg-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Saving…' : label}
    </button>
  )
}

// ─── Section: Profile info ────────────────────────────────────────────────────

function ProfileSection() {
  const { user } = useAuth()
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name ?? '')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus(null)
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName.trim() },
    })

    setStatus(
      error
        ? { type: 'error', message: error.message }
        : { type: 'success', message: 'Profile updated.' }
    )
    setLoading(false)
  }

  return (
    <SectionCard title="Profile" description="Your public display name.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field id="full_name" label="Full name">
          <Input
            id="full_name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </Field>

        <Field id="email_display" label="Email">
          <Input
            id="email_display"
            type="email"
            value={user?.email ?? ''}
            disabled
            title="Email cannot be changed here"
          />
          <p className="font-mono text-[10px] text-neutral-600 mt-1">
            Contact support to change your email address.
          </p>
        </Field>

        {status && <Alert type={status.type} message={status.message} />}

        <SaveButton loading={loading} />
      </form>
    </SectionCard>
  )
}

// ─── Section: Change password ─────────────────────────────────────────────────

function PasswordSection() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus(null)

    if (next !== confirm) {
      setStatus({ type: 'error', message: 'New passwords do not match.' })
      return
    }
    if (next.length < 8) {
      setStatus({ type: 'error', message: 'Password must be at least 8 characters.' })
      return
    }

    setLoading(true)

    // Supabase requires re-authentication to change the password.
    // We sign in with current credentials first to verify ownership.
    const { data: { user } } = await supabase.auth.getUser()
    if (!user?.email) {
      setStatus({ type: 'error', message: 'Could not verify your identity.' })
      setLoading(false)
      return
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: current,
    })

    if (signInError) {
      setStatus({ type: 'error', message: 'Current password is incorrect.' })
      setLoading(false)
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: next })

    if (updateError) {
      setStatus({ type: 'error', message: updateError.message })
    } else {
      setStatus({ type: 'success', message: 'Password changed successfully.' })
      setCurrent('')
      setNext('')
      setConfirm('')
    }
    setLoading(false)
  }

  return (
    <SectionCard title="Change password" description="Use a strong password of at least 8 characters.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field id="current_pw" label="Current password">
          <Input
            id="current_pw"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={current}
            onChange={e => setCurrent(e.target.value)}
          />
        </Field>

        <Field id="new_pw" label="New password">
          <Input
            id="new_pw"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Min. 8 characters"
            value={next}
            onChange={e => setNext(e.target.value)}
          />
        </Field>

        <Field id="confirm_pw" label="Confirm new password">
          <Input
            id="confirm_pw"
            type="password"
            autoComplete="new-password"
            required
            placeholder="••••••••"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
        </Field>

        {status && <Alert type={status.type} message={status.message} />}

        <SaveButton loading={loading} label="Change password" />
      </form>
    </SectionCard>
  )
}

// ─── Section: Danger zone ─────────────────────────────────────────────────────

function DangerSection() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSignOutAll() {
    setLoading(true)
    await supabase.auth.signOut({ scope: 'global' })
    navigate('/')
  }

  async function handleDeleteAccount() {
    if (confirmText !== 'DELETE') return
    setError(null)
    setLoading(true)

    // Calls a Supabase RPC that uses service_role to delete the user.
    // See the note below for how to set this up.
    const { error: rpcError } = await supabase.rpc('delete_user')

    if (rpcError) {
      setError(rpcError.message)
      setLoading(false)
    } else {
      await signOut()
      navigate('/')
    }
  }

  return (
    <SectionCard
      title="Danger zone"
      description="Irreversible actions — read carefully before proceeding."
    >
      <div className="space-y-5">

        {/* Sign out everywhere */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.06]">
          <div>
            <p className="font-display text-sm text-white">Sign out of all devices</p>
            <p className="font-body text-xs text-neutral-500 mt-0.5">
              Invalidates every active session including this one.
            </p>
          </div>
          <button
            onClick={handleSignOutAll}
            disabled={loading}
            className="shrink-0 font-display text-xs uppercase tracking-wide border border-white/[0.12] text-neutral-300 px-4 py-2 rounded-sm hover:border-indigoAccent hover:text-indigoAccent transition-colors disabled:opacity-40"
          >
            Sign out everywhere
          </button>
        </div>

        {/* Sign out current session */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.06]">
          <div>
            <p className="font-display text-sm text-white">Sign out</p>
            <p className="font-body text-xs text-neutral-500 mt-0.5">
              End your current session on this device.
            </p>
          </div>
          <button
            onClick={async () => { await signOut(); navigate('/') }}
            disabled={loading}
            className="shrink-0 font-display text-xs uppercase tracking-wide border border-white/[0.12] text-neutral-300 px-4 py-2 rounded-sm hover:border-indigoAccent hover:text-indigoAccent transition-colors disabled:opacity-40"
          >
            Sign out
          </button>
        </div>

        {/* Delete account */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <p className="font-display text-sm text-red-400">Delete account</p>
            <p className="font-body text-xs text-neutral-500 mt-0.5">
              Permanently deletes your account and all progress. Cannot be undone.
            </p>
          </div>
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="shrink-0 font-display text-xs uppercase tracking-wide border border-red-500/30 text-red-400 px-4 py-2 rounded-sm hover:bg-red-500/10 transition-colors"
            >
              Delete account
            </button>
          ) : (
            <div className="w-full sm:max-w-xs space-y-3">
              <p className="font-mono text-xs text-neutral-400">
                Type <span className="text-red-400 font-600">DELETE</span> to confirm:
              </p>
              <Input
                type="text"
                placeholder="DELETE"
                value={confirmText}
                onChange={e => setConfirmText(e.target.value)}
              />
              {error && <Alert type="error" message={error} />}
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAccount}
                  disabled={confirmText !== 'DELETE' || loading}
                  className="font-display text-xs uppercase tracking-wide bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? 'Deleting…' : 'Confirm delete'}
                </button>
                <button
                  onClick={() => { setShowConfirm(false); setConfirmText(''); setError(null) }}
                  className="font-display text-xs uppercase tracking-wide border border-white/[0.12] text-neutral-400 px-4 py-2 rounded-sm hover:border-white/30 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </SectionCard>
  )
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function Profile() {
  const { user, loading } = useAuth()

  if (!loading && !user) {
    return <Navigate to="/login" state={{ from: '/profile' }} replace />
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <svg className="w-6 h-6 text-indigoAccent animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    )
  }

  const initial = user?.email?.[0]?.toUpperCase() ?? '?'
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'You'

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-mono text-xs text-neutral-500 mb-8" aria-label="Breadcrumb">
        <Link to="/dashboard" className="hover:text-indigoAccent transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-neutral-300">Profile</span>
      </nav>

      {/* Avatar + name header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigoAccent/20 border border-indigoAccent/30 font-display text-xl font-600 text-indigoAccent uppercase shrink-0">
          {initial}
        </div>
        <div>
          <h1 className="font-display font-700 text-xl text-white leading-tight">{displayName}</h1>
          <p className="font-mono text-xs text-neutral-500 mt-0.5">{user?.email}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        <ProfileSection />
        <PasswordSection />
        <DangerSection />
      </div>
    </div>
  )
}
