import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Blaze } from '../../components/Layout'
import { useAuth } from '../../context/AuthContext'

export default function VerifyEmail() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  // Email is passed via navigation state from the Signup page
  const email = (location.state as { email?: string })?.email ?? user?.email ?? ''

  const [resent, setResent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // If the user is already confirmed, redirect to home
  if (user?.email_confirmed_at) {
    navigate('/', { replace: true })
    return null
  }

  async function handleResend() {
    if (!email) return
    setError(null)
    setLoading(true)
    setResent(false)

    const { error: authError } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: `${window.location.origin}/verify-email` },
    })

    if (authError) {
      setError(authError.message)
    } else {
      setResent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm text-center">

        <Link to="/" className="inline-flex items-center font-display font-700 text-lg text-white mb-8">
          <Blaze />
          CodeHunts <span className="text-indigoAccent ml-1.5">Learn</span>
        </Link>

        {/* Envelope icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigoAccent/10 border border-indigoAccent/20 mb-5">
          <svg className="w-6 h-6 text-indigoAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="font-display text-2xl font-600 text-white mb-2">Verify your email</h1>
        <p className="font-body text-sm text-neutral-400 mb-2">
          We sent a confirmation link to:
        </p>
        {email && (
          <p className="font-mono text-sm text-white mb-6">{email}</p>
        )}
        <p className="font-body text-sm text-neutral-500 mb-8">
          Click the link in that email to activate your account. Check your spam folder if you don't see it.
        </p>

        {resent && (
          <p className="font-mono text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-sm px-3 py-2 mb-4">
            Confirmation email resent successfully.
          </p>
        )}

        {error && (
          <p role="alert" className="font-mono text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-sm px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleResend}
          disabled={loading || !email}
          className="w-full border border-white/[0.08] text-neutral-300 font-display text-sm uppercase tracking-wide py-2.5 rounded-sm hover:border-indigoAccent hover:text-indigoAccent transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-4"
        >
          {loading ? 'Sending…' : 'Resend confirmation email'}
        </button>

        <p className="font-body text-sm text-neutral-600">
          Wrong email?{' '}
          <Link to="/signup" className="text-indigoAccent hover:text-indigo-300 transition-colors">
            Sign up again
          </Link>
          {' '}or{' '}
          <Link to="/login" className="text-indigoAccent hover:text-indigo-300 transition-colors">
            sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
