# N4O Personal Blog

My personal blog where I yap about random stuff I found or did.

This blog has been rewritten too many times that I should actually start writing something:

1. Jekyll
2. Hugo
3. Next.js
4. Nuxt (You are here)

## Why?

Because it would be funny to rewrite this blog again.

## Features

- 🌙 Dark mode
- ⌨️ Markdown with a ton of plugins (thanks to nuxt/mdc)
- 🌐 Multilingual or i18n support (Mainly in Indonesian and English)
- 🤖 Monospaced-like font (using Monaspace Xenon for main font and Neon for code)
- 📏 Use variable font by default for better performance
- 🚀 Fast (arguably)
- 📜 SEO friendly (I hope)
- 📱 Mobile friendly (as friendly as I can make it)
- 📈 Proper sitemap and RSS feed (not yet, but soon)
- 💬 Comment feature (via `utteranc.es`)
- 📝 Draft-like feature so you don't publish your bad writing immediately

## Development

You need `yarn` berry, not `yarn` classic, then install everything with:

```bash
yarn
```

Then run the development server with:

```bash
yarn dev
```

Open [http://localhost:4500](http://localhost:4500) with your browser to see the result.

## Frontmatter

- `title` (required) [`string`]
- `author` (required, depends on `data/author.json`) [`string`]
- `date` (optional, but recommended) [`date-like`]
- `tags` (optional, can be empty array) [`string[]`]
- `lastmod` (optional) [`date-like`]
- `draft` (optional) [`boolean`]
- `description` (optional) [`string`]
- `image` (optional, if none provided fallback to default image) [`string`]

Here's an example of a post's frontmatter:

```yaml
---
title: Markdown
description: Halaman ini memiliki judul dan beberapa konten untuk demonstrasi markdown.
image: https://octodex.github.com/images/minion.png
date: 2021-01-01
draft: true
tags:
  - demo
  - testing
author: noaione
---
```

## License

All the content in this repository is licensed under [MIT License](LICENSE-MIT) with the exception of the content in the `content` folder which is licensed under [Creative Commons Attribution 4.0 International License](LICENSE-CC-BY-4.0).

Some other exception applied on the `mdplugins` folder that might be under different license, please verify each `package.json` file for more information.

### Font License

Monaspace Xenon and Neon font is created by GitHub Next and Lettermatic and licensed under [SIL Open Font License 1.1](https://github.com/githubnext/monaspace/blob/main/LICENSE).
