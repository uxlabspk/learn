import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Blaze } from '../../components/Layout'

export default function Signup() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

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

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Supabase will redirect here after the user clicks the confirmation email
        emailRedirectTo: `${window.location.origin}/verify-email`,
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      navigate('/verify-email', { state: { email } })
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        <Link to="/" className="inline-flex items-center font-display font-700 text-lg text-white mb-8">
          <Blaze />
          CodeHunts <span className="text-indigoAccent ml-1.5">Learn</span>
        </Link>

        <h1 className="font-display text-2xl font-600 text-white mb-1">Create an account</h1>
        <p className="font-body text-sm text-neutral-400 mb-8">
          Free forever. No credit card required.
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

          <div>
            <label htmlFor="password" className="block font-mono text-xs uppercase tracking-widest text-neutral-400 mb-1.5">
              Password
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
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 font-body text-sm text-neutral-500 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-indigoAccent hover:text-indigo-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
