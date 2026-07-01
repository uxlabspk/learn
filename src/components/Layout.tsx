import { Link, NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

function Blaze() {
  // The signature mark: a trail blaze, the painted tick hikers follow.
  // Used as the site's wordmark accent and repeated near lesson numbers.
  return (
    <span className="inline-flex flex-col items-center justify-center w-3 h-5 mr-2 shrink-0" aria-hidden="true">
      <span className="w-3 h-3 bg-rust rounded-[2px]" />
      <span className="w-3 h-1.5 bg-moss rounded-[2px] mt-[3px]" />
    </span>
  )
}

function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-display text-sm tracking-wide uppercase transition-colors ${
      isActive ? 'text-rust' : 'text-ink hover:text-rust'
    }`

  return (
    <header className="border-b border-ink/10 bg-paper/95 backdrop-blur sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center font-display font-700 text-lg text-ink">
          <Blaze />
          CodeHunts <span className="text-rust ml-1.5">Learn</span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/courses" className={linkClass}>Courses</NavLink>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-ink/10 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center font-display text-sm text-inkSoft">
          <Blaze />
          CodeHunts PK — free coding lessons, no sign-up required.
        </div>
        <p className="font-mono text-xs text-inkSoft/70">
          &copy; {new Date().getFullYear()} learn.codehuntspk.com
        </p>
      </div>
    </footer>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export { Blaze }
