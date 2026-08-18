import assert from "node:assert/strict"
import test from "node:test"
import { normalizeObsidianHtmlBlocks } from "./obsidianHtml"

test("compacts blank lines only inside balanced multiline HTML blocks", () => {
  const source = [
    "Texto antes.",
    "",
    '<div style="',
    "  display: grid;",
    '">',
    "",
    "  <p>Primeiro</p>",
    "",
    "  <div>",
    "",
    "    <span>HTML</span>",
    "",
    "    <span>CSS</span>",
    "",
    "  </div>",
    "",
    "</div>",
    "",
    "Texto depois.",
  ].join("\n")

  const output = normalizeObsidianHtmlBlocks(source)
  assert.match(output, /Texto antes\.\n\n<div/)
  assert.match(
    output,
    /<div style="[\s\S]*<span>HTML<\/span>\n    <span>CSS<\/span>[\s\S]*<\/div>\n<\/div>/,
  )
  assert.doesNotMatch(
    output.slice(output.indexOf("<div"), output.lastIndexOf("</div>") + 6),
    /\n[ \t]*\n/,
  )
  assert.match(output, /<\/div>\n\nTexto depois\./)
})

test("does not treat HTML-looking text inside inline code as a block", () => {
  const source = "Documentação `<style>` normal.\n\n<div>\n\n  <p>Real</p>\n\n</div>"
  const output = normalizeObsidianHtmlBlocks(source)
  assert.ok(output.startsWith("Documentação `<style>` normal.\n\n"))
  assert.match(output, /<div>\n  <p>Real<\/p>\n<\/div>/)
})

test("does not alter fenced HTML examples", () => {
  const source = [
    "```html",
    "<div>",
    "",
    "  <span>exemplo</span>",
    "",
    "</div>",
    "```",
    "",
    "<section>",
    "",
    "  <p>real</p>",
    "",
    "</section>",
  ].join("\n")

  const output = normalizeObsidianHtmlBlocks(source)
  assert.ok(output.includes("```html\n<div>\n\n  <span>exemplo</span>\n\n</div>\n```"))
  assert.match(output, /<section>\n  <p>real<\/p>\n<\/section>/)
})

test("collapses runs containing multiple blank lines inside HTML", () => {
  const source = ["<div>", "", "", "<p>x</p>", "", "", "</div>"].join("\n")
  assert.equal(normalizeObsidianHtmlBlocks(source), "<div>\n<p>x</p>\n</div>")
})

test("fails closed for malformed multiline opening tags", () => {
  const source = [
    "<div",
    "",
    "# Markdown intacto",
    "",
    "<div>",
    "",
    "  <p>Bloco posterior</p>",
    "",
    "</div>",
    "",
    "Texto final.",
  ].join("\n")
  assert.equal(normalizeObsidianHtmlBlocks(source), source)
})

test("fails closed when a quoted multiline tag contains another opening bracket", () => {
  const source = ['<div title="', "<section", '\">', "", "  <p>não tocar</p>", "", "</div>"].join(
    "\n",
  )
  assert.equal(normalizeObsidianHtmlBlocks(source), source)
})

test("does not accept raw-text closing-tag prefixes", () => {
  const source = [
    "<div>",
    "",
    "<pre>",
    "linha 1",
    "",
    "</prelude>",
    "",
    "<section>",
    "",
    "  <p>não tocar</p>",
    "",
    "</section>",
    "",
    "</div>",
  ].join("\n")
  assert.equal(normalizeObsidianHtmlBlocks(source), source)
})

test("stops scanning after an unterminated raw-text element", () => {
  const source = [
    "<div>",
    "",
    "<textarea>",
    "texto privado",
    "",
    "<section>",
    "",
    "  <p>não tocar</p>",
    "",
    "</section>",
  ].join("\n")
  assert.equal(normalizeObsidianHtmlBlocks(source), source)
})

test("bounds nested list fences using continuation indentation", () => {
  for (const marker of ["~~~", "```"]) {
    const fenced = [
      `  - ${marker}html`,
      "    <div>",
      "",
      "      <span>exemplo</span>",
      "",
      "    </div>",
      `    ${marker}`,
    ].join("\n")
    const source = [fenced, "", "<section>", "", "  <p>real</p>", "", "</section>"].join("\n")
    const output = normalizeObsidianHtmlBlocks(source)
    assert.ok(output.startsWith(fenced), marker)
    assert.ok(output.endsWith("<section>\n  <p>real</p>\n</section>"), marker)
  }
})

test("enforces blockquote-list fence closing indentation boundaries", () => {
  for (const marker of ["~~~", "```"]) {
    const opener = `>   - ${marker}html`
    const acceptedCloser = `> ${" ".repeat(7)}${marker}`
    const acceptedFence = [opener, ">     exemplo", acceptedCloser].join("\n")
    const acceptedSource = [
      acceptedFence,
      "",
      "<section>",
      "",
      "  <p>normalizar</p>",
      "",
      "</section>",
    ].join("\n")
    const acceptedOutput = normalizeObsidianHtmlBlocks(acceptedSource)
    assert.ok(acceptedOutput.startsWith(acceptedFence), `${marker} +3`)
    assert.ok(acceptedOutput.endsWith("<section>\n  <p>normalizar</p>\n</section>"), `${marker} +3`)

    const rejectedCloser = `> ${" ".repeat(8)}${marker}`
    const rejectedSource = [
      opener,
      ">     exemplo",
      rejectedCloser,
      "",
      "<section>",
      "",
      "  <p>não tocar</p>",
      "",
      "</section>",
    ].join("\n")
    assert.equal(normalizeObsidianHtmlBlocks(rejectedSource), rejectedSource, `${marker} +4`)
  }
})

test("preserves raw-text bodies containing HTML-looking closing tags", () => {
  for (const tag of ["pre", "textarea", "script", "style"]) {
    const source = [
      "<div>",
      "",
      `<${tag}>`,
      "linha 1",
      "",
      "</div>",
      "",
      "linha 3",
      `</${tag}>`,
      "",
      "<p>depois</p>",
      "",
      "</div>",
    ].join("\n")
    const output = normalizeObsidianHtmlBlocks(source)
    assert.ok(output.includes(`<${tag}>\nlinha 1\n\n</div>\n\nlinha 3\n</${tag}>`), tag)
    assert.ok(output.endsWith(`<p>depois</p>\n</div>`), tag)
  }
})

test("does not alter tilde fences nested in Markdown list containers", () => {
  const fenced = [
    "- ~~~html",
    "  <div>",
    "",
    "    <span>exemplo</span>",
    "",
    "  </div>",
    "  ~~~",
  ].join("\n")
  const source = [fenced, "", "<section>", "", "  <p>real</p>", "", "</section>"].join("\n")
  const output = normalizeObsidianHtmlBlocks(source)
  assert.ok(output.startsWith(fenced))
  assert.ok(output.endsWith("<section>\n  <p>real</p>\n</section>"))
})

test("preserves blank lines inside preformatted elements", () => {
  const source = ["<div>", "", "<pre>", "linha 1", "", "linha 3", "</pre>", "", "</div>"].join("\n")
  const output = normalizeObsidianHtmlBlocks(source)
  assert.ok(output.includes("<pre>\nlinha 1\n\nlinha 3\n</pre>"))
})
