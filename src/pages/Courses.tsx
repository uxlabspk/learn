import { Link } from 'react-router-dom'
import { tracks, lessonsByTrack } from '../lib/content'

export default function Courses() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="font-mono text-xs tracking-widest uppercase text-rust mb-3">All lessons</p>
      <h1 className="font-display font-700 text-3xl text-ink mb-12">Courses</h1>

      <div className="space-y-16">
        {tracks.map((track) => (
          <div key={track}>
            <h2 className="font-display font-600 text-xl text-ink border-b border-ink/10 pb-3 mb-6">
              {track}
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {lessonsByTrack(track).map((lesson) => (
                <Link
                  key={lesson.slug}
                  to={`/courses/${lesson.slug}`}
                  className="group block bg-paperDim/60 border border-ink/10 rounded-sm p-5 hover:border-rust transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-rust mt-1 shrink-0">
                      {String(lesson.order).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display font-600 text-base text-ink group-hover:text-rust transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="font-body text-sm text-inkSoft mt-1.5 leading-relaxed">
                        {lesson.description}
                      </p>
                      {lesson.minutes && (
                        <p className="font-mono text-xs text-inkSoft/60 mt-3">{lesson.minutes} min read</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
