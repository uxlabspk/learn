import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Blaze } from '../../components/Layout'

export default function ResetPassword() {
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false) // true once Supabase has validated the token

  useEffect(() => {
    // Supabase fires PASSWORD_RECOVERY when the user arrives via the reset link.
    // We listen for it so we know the session token is active before accepting input.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const { error: authError } = await supabase.auth.updateUser({ password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      navigate('/login', { state: { message: 'Password updated — please sign in.' } })
    }
  }

  // Token not yet validated (user landed directly, not via the email link)
  if (!ready) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <Link to="/" className="inline-flex items-center font-display font-700 text-lg text-white mb-8">
            <Blaze />
            CodeHunts <span className="text-indigoAccent ml-1.5">Learn</span>
          </Link>
          <p className="font-body text-sm text-neutral-400">Validating reset link…</p>
          <p className="font-mono text-xs text-neutral-600 mt-3">
            If nothing happens,{' '}
            <Link to="/forgot-password" className="text-indigoAccent hover:text-indigo-300 transition-colors">
              request a new link
            </Link>
            .
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        <Link to="/" className="inline-flex items-center font-display font-700 text-lg text-white mb-8">
          <Blaze />
          CodeHunts <span className="text-indigoAccent ml-1.5">Learn</span>
        </Link>

        <h1 className="font-display text-2xl font-600 text-white mb-1">Choose a new password</h1>
        <p className="font-body text-sm text-neutral-400 mb-8">
          Pick something strong. You'll be signed in right after.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block font-mono text-xs uppercase tracking-widest text-neutral-400 mb-1.5">
              New Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-neutral-900 border border-white/[0.08] rounded-sm px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigoAccent transition-colors"
              placeholder="Min. 8 characters"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="block font-mono text-xs uppercase tracking-widest text-neutral-400 mb-1.5">
              Confirm Password
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full bg-neutral-900 border border-white/[0.08] rounded-sm px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigoAccent transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p role="alert" className="font-mono text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-sm px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigoAccent text-midnight font-display text-sm uppercase tracking-wide py-2.5 rounded-sm hover:bg-indigo-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving…' : 'Set new password'}
          </button>
        </form>
      </div>
    </div>
  )
}
