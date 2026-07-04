import { Link, NavLink, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

function Blaze() {
  return (
    <span className="inline-flex flex-col items-center justify-center w-3 h-5 mr-2 shrink-0" aria-hidden="true">
      <span className="w-3 h-3 bg-indigoAccent rounded-[2px]" />
      <span className="w-3 h-1.5 bg-indigo-400 rounded-[2px] mt-[3px]" />
    </span>
  )
}

function UserDropdown() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close when clicking outside
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  async function handleSignOut() {
    setOpen(false)
    await signOut()
    navigate('/')
  }

  const initial = user?.email?.[0]?.toUpperCase() ?? '?'

  return (
    <div ref={ref} className="relative">
      {/* Avatar button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="User menu"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigoAccent/20 border border-indigoAccent/30 font-mono text-xs text-indigoAccent uppercase hover:bg-indigoAccent/30 hover:border-indigoAccent/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigoAccent"
      >
        {initial}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 bg-neutral-900 border border-white/[0.08] rounded-sm shadow-xl shadow-black/40 z-30 overflow-hidden"
        >
          {/* User info header */}
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <p className="font-mono text-xs text-neutral-500 truncate">{user?.email}</p>
          </div>

          {/* Menu items */}
          <div className="py-1">
            <Link
              to="/dashboard"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 font-display text-sm text-neutral-300 hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              {/* Grid/dashboard icon */}
              <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
              </svg>
              Dashboard
            </Link>

            <Link
              to="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 font-display text-sm text-neutral-300 hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              {/* Person icon */}
              <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>

            <Link
              to="/settings"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 font-display text-sm text-neutral-300 hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              {/* Cog icon */}
              <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
          </div>

          {/* Sign out — separated */}
          <div className="border-t border-white/[0.06] py-1">
            <button
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-4 py-2.5 font-display text-sm text-neutral-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              {/* Logout icon */}
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
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

  async function handleMobileSignOut() {
    setIsMenuOpen(false)
    await signOut()
    navigate('/')
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
              <UserDropdown />
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

        {/* Mobile Hamburger */}
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
                    <div className="w-full border-t border-white/[0.06] pt-3 mt-1">
                      <p className="font-mono text-xs text-neutral-500 mb-3 truncate">{user.email}</p>
                      <div className="flex flex-col gap-2">
                        <Link
                          to="/dashboard"
                          className="font-display text-sm tracking-wide uppercase text-neutral-300 hover:text-indigoAccent transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="font-display text-sm tracking-wide uppercase text-neutral-300 hover:text-indigoAccent transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="font-display text-sm tracking-wide uppercase text-neutral-300 hover:text-indigoAccent transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Settings
                        </Link>
                        <button
                          onClick={handleMobileSignOut}
                          className="text-left font-display text-sm tracking-wide uppercase text-neutral-400 hover:text-red-400 transition-colors"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
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
