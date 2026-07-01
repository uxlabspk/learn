import { Link } from 'react-router-dom'
import { lessons, tracks, lessonsByTrack } from '../lib/content'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-grid bg-grid border-b border-ink/10">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-16">
          <p className="font-mono text-xs tracking-widest uppercase text-rust mb-4">
            Free &middot; No sign-up &middot; Read at your own pace
          </p>
          <h1 className="font-display font-700 text-4xl sm:text-5xl text-ink leading-tight max-w-2xl">
            Learn to code, one waymarked lesson at a time.
          </h1>
          <p className="font-body text-lg text-inkSoft mt-6 max-w-xl leading-relaxed">
            CodeHunts Learn is a free, text-first library of programming lessons.
            Every course is a marked trail — follow it top to bottom, or jump
            straight to the lesson you need.
          </p>
          <Link
            to="/courses"
            className="inline-block mt-8 font-display text-sm uppercase tracking-wide bg-ink text-paper px-6 py-3 rounded-sm hover:bg-rust transition-colors"
          >
            Start exploring &rarr;
          </Link>
        </div>
      </section>

      {/* Trail map of tracks */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-display font-600 text-xl text-ink mb-8">Pick a trail</h2>
        <div className="space-y-10">
          {tracks.map((track, i) => {
            const trackLessons = lessonsByTrack(track)
            return (
              <div key={track} className="flex gap-5">
                <div className="flex flex-col items-center pt-1.5 shrink-0">
                  <span className="w-3 h-3 rounded-[2px] bg-rust" />
                  {i < tracks.length - 1 && <span className="w-px flex-1 bg-ink/15 mt-2" />}
                </div>
                <div className="pb-2 flex-1">
                  <h3 className="font-display font-600 text-lg text-ink">{track}</h3>
                  <p className="font-mono text-xs text-inkSoft/70 mt-1 mb-3">
                    {trackLessons.length} lesson{trackLessons.length === 1 ? '' : 's'}
                  </p>
                  <ul className="space-y-2">
                    {trackLessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <Link
                          to={`/courses/${lesson.slug}`}
                          className="font-body text-inkSoft hover:text-rust transition-colors underline decoration-rust/30 underline-offset-4"
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
            <p className="font-body text-inkSoft">
              No lessons yet — add a markdown file to <code className="font-mono text-sm">src/content/courses</code>.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
