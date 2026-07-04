import { Link, NavLink, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Blaze() {
  // The signature mark: a trail blaze, the painted tick hikers follow.
  // Used as the site's wordmark accent and repeated near lesson numbers.
  return (
    <span className="inline-flex flex-col items-center justify-center w-3 h-5 mr-2 shrink-0" aria-hidden="true">
      <span className="w-3 h-3 bg-indigoAccent rounded-[2px]" />
      <span className="w-3 h-1.5 bg-indigo-400 rounded-[2px] mt-[3px]" />
    </span>
  )
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-display text-sm tracking-wide uppercase transition-colors ${
      isActive ? 'text-indigoAccent' : 'text-neutral-300 hover:text-indigoAccent'
    }`

  async function handleSignOut() {
    await signOut()
    navigate('/')
    setIsMenuOpen(false)
  }

  return (
    <header className="border-b border-white/[0.08] bg-midnight/95 backdrop-blur sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center font-display font-700 text-lg text-white">
          <Blaze />
          CodeHunts <span className="text-indigoAccent ml-1.5">Learn</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/courses" className={linkClass}>Courses</NavLink>

          {!loading && (
            user ? (
              <div className="flex items-center gap-3">
                {/* User avatar / email initial */}
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigoAccent/20 border border-indigoAccent/30 font-mono text-xs text-indigoAccent uppercase"
                  title={user.email}
                >
                  {user.email?.[0] ?? '?'}
                </span>
                <button
                  onClick={handleSignOut}
                  className="font-display text-sm tracking-wide uppercase text-neutral-400 hover:text-indigoAccent transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="font-display text-sm tracking-wide uppercase text-neutral-300 hover:text-indigoAccent transition-colors"
                >
                  Sign in
                </NavLink>
                <Link
                  to="/signup"
                  className="font-display text-sm uppercase tracking-wide bg-indigoAccent text-midnight px-4 py-1.5 rounded-sm hover:bg-indigo-400 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )
          )}
        </nav>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden p-2 rounded-sm hover:bg-neutral-900 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 right-0 bg-midnight/95 border-b border-white/[0.08] z-10">
            <nav className="flex flex-col items-start px-4 py-3 gap-3">
              <NavLink to="/" end className={linkClass} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink to="/courses" className={linkClass} onClick={() => setIsMenuOpen(false)}>Courses</NavLink>

              {!loading && (
                user ? (
                  <>
                    <span className="font-mono text-xs text-neutral-500">{user.email}</span>
                    <button
                      onClick={handleSignOut}
                      className="font-display text-sm tracking-wide uppercase text-neutral-400 hover:text-indigoAccent transition-colors"
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" className={linkClass} onClick={() => setIsMenuOpen(false)}>Sign in</NavLink>
                    <Link
                      to="/signup"
                      className="font-display text-sm uppercase tracking-wide bg-indigoAccent text-midnight px-4 py-1.5 rounded-sm hover:bg-indigo-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.08] mt-16 sm:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center font-display text-sm text-neutral-400">
          <Blaze />
          CodeHunts — free coding lessons, no sign-up required.
        </div>
        <p className="font-mono text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} <a href="https://codehuntspk.com" target='_blank'>Code HUNT'S</a>
        </p>
      </div>
    </footer>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-midnight">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export { Blaze }
