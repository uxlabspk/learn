import { Link } from 'react-router-dom'
import { tracks, lessonsByTrack } from '../lib/content'

export default function Courses() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <p className="font-mono text-xs tracking-widest uppercase text-indigoAccent mb-3">All lessons</p>
      <h1 className="font-display font-700 text-2xl sm:text-3xl text-white mb-8 sm:mb-12">Courses</h1>

      <div className="space-y-12 sm:space-y-16">
        {tracks.map((track) => (
          <div key={track}>
            <h2 className="font-display font-600 text-lg sm:text-xl text-white border-b border-white/[0.08] pb-3 mb-4 sm:mb-6">
              {track}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {lessonsByTrack(track).map((lesson) => (
                <Link
                  key={lesson.slug}
                  to={`/courses/${lesson.slug}`}
                  className="group block bg-neutral-900/40 border border-white/[0.08] rounded-sm p-4 sm:p-5 hover:border-indigoAccent transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs text-indigoAccent mt-1 shrink-0">
                      {String(lesson.order).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display font-600 text-sm sm:text-base text-white group-hover:text-indigoAccent transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="font-body text-sm text-neutral-400 mt-1.5 leading-relaxed">
                        {lesson.description}
                      </p>
                      {lesson.minutes && (
                        <p className="font-mono text-xs text-neutral-500 mt-2 sm:mt-3">{lesson.minutes} min read</p>
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
