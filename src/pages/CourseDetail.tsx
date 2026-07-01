import { Link, Navigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getLesson, lessonsByTrack } from '../lib/content'

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const lesson = slug ? getLesson(slug) : undefined

  if (!lesson) return <Navigate to="/courses" replace />

  const trackLessons = lessonsByTrack(lesson.track)
  const idx = trackLessons.findIndex((l) => l.slug === lesson.slug)
  const prev = trackLessons[idx - 1]
  const next = trackLessons[idx + 1]

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_220px] gap-12">
      <article>
        <Link to="/courses" className="font-mono text-xs uppercase tracking-widest text-indigoAccent hover:underline">
          &larr; All courses
        </Link>

        <p className="font-mono text-xs text-neutral-500 mt-6">
          {lesson.track} &middot; Lesson {String(lesson.order).padStart(2, '0')}
          {lesson.minutes ? ` \u00b7 ${lesson.minutes} min read` : ''}
        </p>
        <h1 className="font-display font-700 text-3xl sm:text-4xl text-white mt-2 mb-8 leading-tight">
          {lesson.title}
        </h1>

        {lesson.pdf && (
          <a
            href={lesson.pdf}
            download
            className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-wide border border-indigoAccent text-indigoAccent px-4 py-2.5 rounded-sm hover:bg-indigoAccent hover:text-midnight transition-colors mb-10"
          >
            Download PDF cheatsheet
          </a>
        )}

        <div className="article-body max-w-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.body}</ReactMarkdown>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.08] mt-16 pt-8">
          {prev ? (
            <Link to={`/courses/${prev.slug}`} className="font-body text-sm text-neutral-400 hover:text-indigoAccent">
              &larr; {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/courses/${next.slug}`} className="font-body text-sm text-neutral-400 hover:text-indigoAccent text-right">
              {next.title} &rarr;
            </Link>
          ) : <span />}
        </div>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4">In this trail</p>
          <ul className="space-y-3 border-l border-neutral-800 pl-4">
            {trackLessons.map((l) => (
              <li key={l.slug}>
                <Link
                  to={`/courses/${l.slug}`}
                  className={`font-body text-sm leading-snug block ${
                    l.slug === lesson.slug ? 'text-indigoAccent font-medium' : 'text-neutral-400 hover:text-indigoAccent'
                  }`}
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
