# Wiki japonesa (Quartz 5)

Quartz 5 site configuration for publishing selected documents from a long-term Obsidian vault.

## Workflow

Obsidian vault → mark notes with `publish: true` → Quartz build → Git repository → Cloudflare Pages → public website

Markdown remains the source of truth. This project does **not** introduce any proprietary content format.

## Publishing rules

- Only notes with frontmatter `publish: true` are published.
- `.obsidian`, templates, private folders, drafts, and development-only folders are excluded.
- Keep sensitive/private material outside publishable folders and do not set `publish: true`.

## Archive sections

- Research
- Design
- Development
- Decisions
- Experiments
- Devlog
- Documentation
- Releases

## Local development

```bash
npm ci
npm run dev
```

Quartz serves the site locally and rebuilds on changes.

## Build for production

```bash
npm run build
```

Generated static output is written to `public/`.

## Publish a note

1. Create or edit a Markdown note in `content/` (or your synced vault content path).
2. Add frontmatter:

```yaml
publish: true
```

3. Link notes using Obsidian wikilinks (`[[Like This]]`) as needed.
4. Commit and deploy.

## Cloudflare Pages deployment

Use these settings in Cloudflare Pages:

- **Framework preset:** None
- **Build command:** `npm run build`
- **Build output directory:** `public`
- **Node.js version:** `22`

After creating your Pages domain, update `baseUrl` in `/quartz.config.yaml` to your production hostname (without `https://`).

## Features enabled

- Obsidian-flavored Markdown (wikilinks, callouts, tags, embeds, frontmatter)
- Backlinks
- Graph view
- Search
- Table of contents
- Folder navigation
- Tag pages
- Dark mode
- RSS, sitemap, Open Graph metadata
- Japanese text and ruby/furigana markup (e.g. `<ruby>日本語<rt>にほんご</rt></ruby>`)
