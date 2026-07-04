import { Link, Navigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import { getLesson, lessonsByTrack } from '../lib/content'
import { useAuth } from '../context/AuthContext'
import {
  getCompletedLessons,
  markLessonComplete,
  unmarkLessonComplete,
  recordActivity,
} from '../services/progress'

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const lesson = slug ? getLesson(slug) : undefined
  const { user } = useAuth()

  const [completed, setCompleted] = useState(false)
  const [saving, setSaving] = useState(false)

  // Record activity and check completion state whenever the lesson or user changes
  useEffect(() => {
    if (!user || !lesson) return

    // Count this as an active day just by opening a lesson
    recordActivity().catch(() => {})

    getCompletedLessons()
      .then((slugs) => setCompleted(slugs.includes(lesson.slug)))
      .catch(() => {})
  }, [user, lesson?.slug])

  if (!lesson) return <Navigate to="/courses" replace />

  const trackLessons = lessonsByTrack(lesson.track)
  const idx = trackLessons.findIndex((l) => l.slug === lesson.slug)
  const prev = trackLessons[idx - 1]
  const next = trackLessons[idx + 1]

  async function toggleComplete() {
    if (!user) return
    setSaving(true)
    try {
      if (completed) {
        await unmarkLessonComplete(lesson!.slug)
        setCompleted(false)
      } else {
        await markLessonComplete(lesson!.slug)
        setCompleted(true)
      }
    } catch {
      // silently ignore — user can retry
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-8 lg:gap-12">
        <article>
          <Link to="/courses" className="font-mono text-xs uppercase tracking-widest text-indigoAccent hover:underline">
            &larr; All courses
          </Link>

          <p className="font-mono text-xs text-neutral-500 mt-4 sm:mt-6">
            {lesson.track} &middot; Lesson {String(lesson.order).padStart(2, '0')}
            {lesson.minutes ? ` · ${lesson.minutes} min read` : ''}
          </p>
          <h1 className="font-display font-700 text-2xl sm:text-3xl lg:text-4xl text-white mt-2 mb-6 sm:mb-8 leading-tight">
            {lesson.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-8 sm:mb-10">
            {lesson.pdf && (
              <a
                href={lesson.pdf}
                download
                className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-wide border border-indigoAccent text-indigoAccent px-3 sm:px-4 py-2 sm:py-2.5 rounded-sm hover:bg-indigoAccent hover:text-midnight transition-colors"
              >
                Download PDF cheatsheet
              </a>
            )}

            {/* Mark as complete — only shown to logged-in users */}
            {user && (
              <button
                onClick={toggleComplete}
                disabled={saving}
                className={`inline-flex items-center gap-2 font-display text-xs uppercase tracking-wide px-3 sm:px-4 py-2 sm:py-2.5 rounded-sm border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  completed
                    ? 'bg-green-500/10 border-green-500/30 text-green-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400'
                    : 'border-white/[0.12] text-neutral-400 hover:border-indigoAccent hover:text-indigoAccent'
                }`}
              >
                {saving ? (
                  <>
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Saving…
                  </>
                ) : completed ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Completed
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Mark as complete
                  </>
                )}
              </button>
            )}
          </div>

          <div className="article-body max-w-prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {lesson.body}
            </ReactMarkdown>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/[0.08] mt-12 sm:mt-16 pt-6 sm:pt-8 gap-4">
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
    </div>
  )
}
