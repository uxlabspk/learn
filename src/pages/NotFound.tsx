import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-rust mb-3">Off the trail</p>
      <h1 className="font-display font-700 text-3xl text-ink mb-4">Lost the marker here.</h1>
      <p className="font-body text-inkSoft mb-8">That page doesn't exist. Let's get you back on track.</p>
      <Link
        to="/"
        className="inline-block font-display text-sm uppercase tracking-wide bg-ink text-paper px-6 py-3 rounded-sm hover:bg-rust transition-colors"
      >
        Back home
      </Link>
    </div>
  )
}
