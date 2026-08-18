import type { QuartzTransformerPlugin } from "../plugins/types"

type HtmlRange = {
  from: number
  to: number
  raw: string
  name: string
}

type OffsetRange = { from: number; to: number }

type ParsedTag = {
  type: "open" | "close" | "standalone"
  name: string
}

const VOID_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
])

const RAW_TEXT_TAGS = new Set(["pre", "textarea", "style", "script"])
const BLOCK_TAGS = new Set([
  "address",
  "article",
  "aside",
  "blockquote",
  "details",
  "dialog",
  "div",
  "dl",
  "fieldset",
  "figure",
  "footer",
  "form",
  "header",
  "hgroup",
  "main",
  "nav",
  "ol",
  "pre",
  "section",
  "table",
  "ul",
])

function findTagEnd(text: string, start: number): number {
  let quote: string | null = null
  for (let index = start + 1; index < text.length; index++) {
    const character = text[index]
    if (character === "\n") {
      const following = text.slice(index + 1).match(/^[ \t]*(?:\r?\n|$)/)
      if (following) return -1
    }
    if (character === "<") return -1
    if (quote) {
      if (character === quote && text[index - 1] !== "\\") quote = null
      continue
    }
    if (character === '"' || character === "'") {
      quote = character
      continue
    }
    if (character === ">") return index + 1
  }
  return -1
}

function parseTag(raw: string): ParsedTag | null {
  if (/^<!DOCTYPE\b/i.test(raw)) return { type: "standalone", name: "doctype" }
  if (/^<\?/.test(raw) || /^<!\[CDATA\[/i.test(raw) || raw.startsWith("<!--")) return null

  const closing = /^<\s*\//.test(raw)
  const match = raw.match(/^<\s*\/?\s*([A-Za-z][A-Za-z0-9:_-]*)/)
  if (!match) return null

  const name = match[1].toLowerCase()
  const selfClosing = /\/\s*>$/.test(raw) || VOID_TAGS.has(name)
  return {
    type: closing ? "close" : selfClosing ? "standalone" : "open",
    name,
  }
}

function findRawTextClose(text: string, tagName: string, from: number): number {
  const lower = text.toLowerCase()
  const needle = `</${tagName}`
  let searchFrom = from

  while (searchFrom < text.length) {
    const closeStart = lower.indexOf(needle, searchFrom)
    if (closeStart === -1) return -1
    const boundary = lower[closeStart + needle.length]
    if (boundary === ">" || (boundary !== undefined && /\s/.test(boundary))) {
      const closeEnd = findTagEnd(text, closeStart)
      if (closeEnd !== -1) return closeEnd
    }
    searchFrom = closeStart + needle.length
  }
  return -1
}

function mergeRanges(ranges: OffsetRange[]): OffsetRange[] {
  const sorted = ranges
    .filter((range) => range.to > range.from)
    .sort((left, right) => left.from - right.from || left.to - right.to)
  const merged: OffsetRange[] = []

  for (const range of sorted) {
    const previous = merged[merged.length - 1]
    if (previous && range.from <= previous.to) {
      previous.to = Math.max(previous.to, range.to)
    } else {
      merged.push({ ...range })
    }
  }
  return merged
}

function stripMarkdownContainerPrefix(
  line: string,
  maxLeadingSpaces = 3,
  stripListMarkers = true,
): { content: string; continuationIndent: number } {
  let remainder = line
  let continuationIndent = 0
  while (true) {
    const blockquote = remainder.match(/^( {0,3})>[ \t]?/)
    if (blockquote) {
      continuationIndent += blockquote[1].length
      remainder = remainder.slice(blockquote[0].length)
      continue
    }
    if (stripListMarkers) {
      const listItem = remainder.match(/^ {0,3}(?:[-+*]|\d{1,9}[.)])(?:[ \t]+|$)/)
      if (listItem) {
        continuationIndent += listItem[0].length
        remainder = remainder.slice(listItem[0].length)
        continue
      }
    }
    break
  }

  let spaces = 0
  while (spaces < maxLeadingSpaces && remainder[spaces] === " ") spaces++
  continuationIndent += spaces
  return { content: remainder.slice(spaces), continuationIndent }
}

function findMarkdownCodeRanges(text: string): OffsetRange[] {
  const fenced: OffsetRange[] = []
  let openFence: {
    marker: string
    length: number
    from: number
    continuationIndent: number
  } | null = null
  let lineStart = 0

  while (lineStart <= text.length) {
    const newline = text.indexOf("\n", lineStart)
    const lineEnd = newline === -1 ? text.length : newline
    const line = text.slice(lineStart, lineEnd).replace(/\r$/, "")
    const fenceInfo = stripMarkdownContainerPrefix(
      line,
      openFence ? openFence.continuationIndent + 3 : 3,
      !openFence,
    )
    const fenceLine = fenceInfo.content

    if (!openFence) {
      const opening = fenceLine.match(/^(`{3,}|~{3,})(?:[^`~].*)?$/)
      if (opening) {
        openFence = {
          marker: opening[1][0],
          length: opening[1].length,
          from: lineStart,
          continuationIndent: fenceInfo.continuationIndent,
        }
      }
    } else {
      const markerRun = fenceLine.match(/^(`+|~+)\s*$/)?.[1] ?? ""
      if (markerRun[0] === openFence.marker && markerRun.length >= openFence.length) {
        fenced.push({ from: openFence.from, to: newline === -1 ? lineEnd : lineEnd + 1 })
        openFence = null
      }
    }

    if (newline === -1) break
    lineStart = newline + 1
  }

  if (openFence) fenced.push({ from: openFence.from, to: text.length })

  const inline: OffsetRange[] = []
  let fenceIndex = 0
  let index = 0
  while (index < text.length) {
    while (fenceIndex < fenced.length && index >= fenced[fenceIndex].to) fenceIndex++
    const activeFence = fenced[fenceIndex]
    if (activeFence && index >= activeFence.from && index < activeFence.to) {
      index = activeFence.to
      continue
    }

    if (text[index] !== "`") {
      index++
      continue
    }

    let runEnd = index + 1
    while (runEnd < text.length && text[runEnd] === "`") runEnd++
    const runLength = runEnd - index
    let search = runEnd
    let closeEnd = -1

    while (search < text.length) {
      const candidate = text.indexOf("`", search)
      if (candidate === -1) break
      let candidateEnd = candidate + 1
      while (candidateEnd < text.length && text[candidateEnd] === "`") candidateEnd++
      if (candidateEnd - candidate === runLength) {
        closeEnd = candidateEnd
        break
      }
      search = candidateEnd
    }

    if (closeEnd !== -1) {
      inline.push({ from: index, to: closeEnd })
      index = closeEnd
    } else {
      index = runEnd
    }
  }

  return mergeRanges([...fenced, ...inline])
}

function findHtmlRanges(text: string): HtmlRange[] {
  const ranges: HtmlRange[] = []
  const stack: Array<{ name: string; start: number }> = []
  const ignoredRanges = findMarkdownCodeRanges(text)
  let ignoredIndex = 0
  let index = 0

  while (index < text.length) {
    while (ignoredIndex < ignoredRanges.length && index >= ignoredRanges[ignoredIndex].to) {
      ignoredIndex++
    }
    const ignored = ignoredRanges[ignoredIndex]
    if (ignored && index >= ignored.from && index < ignored.to) {
      index = ignored.to
      continue
    }

    if (text[index] !== "<") {
      index++
      continue
    }

    if (text.startsWith("<!--", index)) {
      const commentEnd = text.indexOf("-->", index + 4)
      index = commentEnd === -1 ? index + 4 : commentEnd + 3
      continue
    }

    const tagEnd = findTagEnd(text, index)
    if (tagEnd === -1) break
    const rawTag = text.slice(index, tagEnd)
    const tag = parseTag(rawTag)
    if (!tag) {
      index = tagEnd
      continue
    }

    if (tag.type === "standalone") {
      index = tagEnd
      continue
    }

    if (tag.type === "open") {
      if (RAW_TEXT_TAGS.has(tag.name)) {
        const closeEnd = findRawTextClose(text, tag.name, tagEnd)
        if (closeEnd !== -1) {
          if (stack.length === 0) {
            ranges.push({
              from: index,
              to: closeEnd,
              raw: text.slice(index, closeEnd),
              name: tag.name,
            })
          }
          index = closeEnd
          continue
        }
        break
      }
      stack.push({ name: tag.name, start: index })
      index = tagEnd
      continue
    }

    let matchIndex = -1
    for (let stackIndex = stack.length - 1; stackIndex >= 0; stackIndex--) {
      if (stack[stackIndex].name === tag.name) {
        matchIndex = stackIndex
        break
      }
    }

    if (matchIndex !== -1) {
      const matched = stack[matchIndex]
      stack.splice(matchIndex)
      if (matchIndex === 0) {
        ranges.push({
          from: matched.start,
          to: tagEnd,
          raw: text.slice(matched.start, tagEnd),
          name: matched.name,
        })
      }
    }
    index = tagEnd
  }

  return ranges
    .sort((left, right) => left.from - right.from || right.to - left.to)
    .filter((range, rangeIndex, allRanges) => {
      const previous = allRanges[rangeIndex - 1]
      return !previous || range.from >= previous.to
    })
}

function isWholeLineBlock(text: string, range: HtmlRange): boolean {
  if (!BLOCK_TAGS.has(range.name)) return false
  const lineStart = text.lastIndexOf("\n", Math.max(0, range.from - 1)) + 1
  const nextNewline = text.indexOf("\n", range.to)
  const lineEnd = nextNewline === -1 ? text.length : nextNewline
  return (
    text.slice(lineStart, range.from).trim() === "" && text.slice(range.to, lineEnd).trim() === ""
  )
}

function compactHtmlBlock(raw: string): string {
  const newline = raw.includes("\r\n") ? "\r\n" : "\n"
  const protectedSegments: string[] = []
  const protectedRaw = raw.replace(
    /<(pre|textarea|script|style)\b[^>]*>[\s\S]*?<\/\1\s*>/gi,
    (segment) => {
      const token = `\u0000QUARTZ_OBSIDIAN_HTML_${protectedSegments.length}\u0000`
      protectedSegments.push(segment)
      return token
    },
  )

  let compacted = protectedRaw.replace(/\r?\n(?:[ \t]*\r?\n)+/g, newline)
  for (let index = 0; index < protectedSegments.length; index++) {
    compacted = compacted.replace(
      `\u0000QUARTZ_OBSIDIAN_HTML_${index}\u0000`,
      protectedSegments[index],
    )
  }
  return compacted
}

export function normalizeObsidianHtmlBlocks(source: string): string {
  const ranges = findHtmlRanges(source).filter(
    (range) => range.raw.includes("\n") && isWholeLineBlock(source, range),
  )
  if (ranges.length === 0) return source

  let output = source
  for (const range of ranges.reverse()) {
    const compacted = compactHtmlBlock(range.raw)
    output = output.slice(0, range.from) + compacted + output.slice(range.to)
  }
  return output
}

export const ObsidianHtmlCompatibility: QuartzTransformerPlugin = () => ({
  name: "ObsidianHtmlCompatibility",
  textTransform: (_ctx, source) => normalizeObsidianHtmlBlocks(source),
})
