export interface Lesson {
  slug: string
  title: string
  description: string
  track: string
  order: number
  pdf?: string
  minutes?: number
  body: string
}

// Every .md file placed in src/content/courses is picked up automatically
// at build time -- no manual imports or a CMS needed. Just add a new file
// with frontmatter like the examples already there.
const files = import.meta.glob('../content/courses/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function slugFromPath(path: string): string {
  const parts = path.split('/')
  const file = parts[parts.length - 1]
  return file.replace(/\.md$/, '')
}

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const block = match[1]
  const content = match[2]
  const data: Record<string, any> = {}

  for (const rawLine of block.split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value: any = line.slice(idx + 1).trim()
    value = value.replace(/^["']|["']$/g, '')
    if (value !== '' && !isNaN(Number(value))) value = Number(value)
    data[key] = value
  }

  return { data, content: content.trim() }
}

export const lessons: Lesson[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: data.title ?? 'Untitled lesson',
      description: data.description ?? '',
      track: data.track ?? 'General',
      order: typeof data.order === 'number' ? data.order : 0,
      pdf: data.pdf,
      minutes: data.minutes,
      body: content,
    }
  })
  .sort((a, b) => a.track.localeCompare(b.track) || a.order - b.order)

export const tracks: string[] = Array.from(new Set(lessons.map((l) => l.track)))

export function getLesson(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug)
}

export function lessonsByTrack(track: string): Lesson[] {
  return lessons.filter((l) => l.track === track).sort((a, b) => a.order - b.order)
}
