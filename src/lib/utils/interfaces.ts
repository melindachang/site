export type EntryMeta = { title: string; date: string; href?: string }

export type Entry<T> = { title: EntryMeta; body: EntryBody<T> }

export type Article = EntryMeta & {
  author: string
  description: string
  tags: string[]
  published: boolean
}

export type Work = EntryMeta & {
  isFailure: boolean
  description: string
  tags: string[]
}

export type EntryBody<T> = Omit<T, keyof EntryMeta>

export type Tag = { name: string; amount: number; checked: boolean }

export type Link = { type: string; href: string; external: boolean }

export type Publication = {
  title: string
  authors: string[]
  venue: string
  links: Link[]
  tags?: string[]
}
