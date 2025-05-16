import type { Entry, Content, EntryMeta } from './interfaces'

export const map_to_entry = <T extends EntryMeta>(input: T): Entry<T> => {
  let meta: EntryMeta = { title: input.title, date: input.date, href: input.href }
  let slice = omit_overlapping_keys(input, meta)
  let mapped: Content<T>[] = []
  for (const key in slice) {
    mapped.push({ key, value: (slice as any)[key] } as Content<T>)
  }
  let entry = { ...meta, content: mapped } as Entry<T>
  return entry
}

export const omit_overlapping_keys = <T extends K, K extends Record<string, any>>(
  input: T,
  _toRemove: K,
): Omit<T, keyof K> => {
  let keys = Object.keys(_toRemove)
  let result = { ...input }
  keys.forEach(k => delete result[k])
  return result
}

export const pick_overlapping_keys = <T extends K, K extends Record<string, any>>(
  input: T,
  _toKeep: K,
): K => {
  let keys = Object.keys(_toKeep) as (keyof K)[]
  let result = {} as Pick<T, keyof K>
  keys.forEach(key => {
    if (key in input) result[key] = input[key]
  })
  return result
}