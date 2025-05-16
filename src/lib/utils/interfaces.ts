export type EntryMeta = {
  title: string
  date: string
  href?: string
}

export type Entry<T> = EntryMeta & { content: Content<T>[] }

export type Content<T> = {
  [Prop in keyof T]: {
    key: Prop
    value: T[Prop]
  }
}[keyof T]

export type Article = EntryMeta & {
  author: string
  description: string
  categories: string[]
  published: boolean
}

export type Work = EntryMeta & {
  isFailure: boolean
  description: string
  categories?: string[]
}

export type Tag = {
  name: string
  amount: number
  checked: boolean
}

export type Link = {
  type: string
  href: string
  external: boolean
}

export type Publication = {
  title: string
  authors: string[]
  venue: string
  links: Link[]
  categories?: string[]
}
