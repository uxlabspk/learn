import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Blaze } from '../../components/Layout'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      // Supabase appends the token — this is where the user lands to pick a new password
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      setSent(true)
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        <Link to="/" className="inline-flex items-center font-display font-700 text-lg text-white mb-8">
          <Blaze />
          CodeHunts <span className="text-indigoAccent ml-1.5">Learn</span>
        </Link>

        {sent ? (
          <div className="text-center">
            {/* Checkmark icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigoAccent/10 border border-indigoAccent/20 mb-5">
              <svg className="w-5 h-5 text-indigoAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-600 text-white mb-2">Check your email</h1>
            <p className="font-body text-sm text-neutral-400 mb-6">
              We sent a password-reset link to{' '}
              <span className="text-white font-mono text-xs">{email}</span>.
              Check your inbox (and spam folder).
            </p>
            <Link
              to="/login"
              className="font-mono text-xs text-indigoAccent hover:text-indigo-300 transition-colors"
            >
              ← Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-display text-2xl font-600 text-white mb-1">Reset your password</h1>
            <p className="font-body text-sm text-neutral-400 mb-8">
              Enter your email and we'll send a reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-widest text-neutral-400 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/[0.08] rounded-sm px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigoAccent transition-colors"
                  placeholder="you@example.com"
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
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </form>

            <p className="mt-6 font-body text-sm text-neutral-500 text-center">
              <Link to="/login" className="text-indigoAccent hover:text-indigo-300 transition-colors">
                ← Back to sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
