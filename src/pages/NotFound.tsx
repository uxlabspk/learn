import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24 text-center">
      <img src='/notfound.png' className='w-96 mx-auto' />
      <p className="font-mono text-xs uppercase tracking-widest text-indigoAccent mb-3">Off the trail</p>
      <h1 className="font-display font-700 text-3xl text-white mb-4">Lost the marker here.</h1>
      <p className="font-body text-neutral-400 mb-8">That page doesn't exist. Let's get you back on track.</p>
      <Link
        to="/"
        className="inline-block font-display text-sm uppercase tracking-wide bg-neutral-800 text-white px-6 py-3 rounded-sm hover:bg-indigoAccent hover:text-midnight transition-colors"
      >
        Back home
      </Link>
    </div>
  )
}
