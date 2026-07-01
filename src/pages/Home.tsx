import { Link } from 'react-router-dom'
import { lessons, tracks, lessonsByTrack } from '../lib/content'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-grid bg-grid border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16">
          <p className="font-mono text-xs tracking-widest uppercase text-indigoAccent mb-4">
            Free &middot; No sign-up &middot; Read at your own pace
          </p>
          <h1 className="font-display font-700 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight max-w-2xl">
            Learn to code, one waymarked lesson at a time.
          </h1>
          <p className="font-body text-base sm:text-lg text-neutral-400 mt-4 sm:mt-6 max-w-xl leading-relaxed">
            CodeHunts Learn is a free, text-first library of programming lessons.
            Every course is a marked trail — follow it top to bottom, or jump
            straight to the lesson you need.
          </p>
          <Link
            to="/courses"
            className="inline-block mt-8 font-display text-sm uppercase tracking-wide bg-neutral-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-sm hover:bg-indigoAccent hover:text-midnight transition-colors"
          >
            Start exploring &rarr;
          </Link>
        </div>
      </section>

      {/* Trail map of tracks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="font-display font-600 text-xl text-white mb-8">Pick a trail</h2>
        <div className="space-y-8 sm:space-y-10">
          {tracks.map((track, i) => {
            const trackLessons = lessonsByTrack(track)
            return (
              <div key={track} className="flex gap-4 sm:gap-5">
                <div className="flex flex-col items-center pt-1.5 shrink-0">
                  <span className="w-3 h-3 rounded-[2px] bg-indigoAccent" />
                  {i < tracks.length - 1 && <span className="w-px flex-1 bg-neutral-800 mt-2" />}
                </div>
                <div className="pb-2 flex-1">
                  <h3 className="font-display font-600 text-lg text-white">{track}</h3>
                  <p className="font-mono text-xs text-neutral-500 mt-1 mb-3">
                    {trackLessons.length} lesson{trackLessons.length === 1 ? '' : 's'}
                  </p>
                  <ul className="space-y-2">
                    {trackLessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <Link
                          to={`/courses/${lesson.slug}`}
                          className="font-body text-neutral-400 hover:text-indigoAccent transition-colors underline decoration-indigo-400/30 underline-offset-4"
                        >
                          {lesson.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
          {lessons.length === 0 && (
            <p className="font-body text-neutral-400">
              No lessons yet — add a markdown file to <code className="font-mono text-sm bg-neutral-800 px-1 rounded">src/content/courses</code>.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
