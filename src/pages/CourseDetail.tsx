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
    <div className="max-w-5xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_220px] gap-12">
      <article>
        <Link to="/courses" className="font-mono text-xs uppercase tracking-widest text-rust hover:underline">
          &larr; All courses
        </Link>

        <p className="font-mono text-xs text-inkSoft/60 mt-6">
          {lesson.track} &middot; Lesson {String(lesson.order).padStart(2, '0')}
          {lesson.minutes ? ` \u00b7 ${lesson.minutes} min read` : ''}
        </p>
        <h1 className="font-display font-700 text-3xl sm:text-4xl text-ink mt-2 mb-8 leading-tight">
          {lesson.title}
        </h1>

        {lesson.pdf && (
          <a
            href={lesson.pdf}
            download
            className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-wide border border-rust text-rust px-4 py-2.5 rounded-sm hover:bg-rust hover:text-paper transition-colors mb-10"
          >
            Download PDF cheatsheet
          </a>
        )}

        <div className="article-body max-w-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.body}</ReactMarkdown>
        </div>

        <div className="flex items-center justify-between border-t border-ink/10 mt-16 pt-8">
          {prev ? (
            <Link to={`/courses/${prev.slug}`} className="font-body text-sm text-inkSoft hover:text-rust">
              &larr; {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/courses/${next.slug}`} className="font-body text-sm text-inkSoft hover:text-rust text-right">
              {next.title} &rarr;
            </Link>
          ) : <span />}
        </div>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <p className="font-mono text-xs uppercase tracking-widest text-inkSoft/60 mb-4">In this trail</p>
          <ul className="space-y-3 border-l border-ink/10 pl-4">
            {trackLessons.map((l) => (
              <li key={l.slug}>
                <Link
                  to={`/courses/${l.slug}`}
                  className={`font-body text-sm leading-snug block ${
                    l.slug === lesson.slug ? 'text-rust font-medium' : 'text-inkSoft hover:text-rust'
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
