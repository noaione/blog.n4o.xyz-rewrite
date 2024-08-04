import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

import type { LocaleObject } from "@nuxtjs/i18n";

const mathMLIgnore = (tag: string) => {
  // math related tags
  const mathTags = [
    "math",
    "maction",
    "annotation",
    "annotation-xml",
    "menclose",
    "merror",
    "mfenced",
    "mfrac",
    "mi",
    "mmultiscripts",
    "mn",
    "mo",
    "mover",
    "mpadded",
    "mphantom",
    "mprescripts",
    "mroot",
    "mrow",
    "ms",
    "semantics",
    "mspace",
    "msqrt",
    "mstyle",
    "msub",
    "msup",
    "msubsup",
    "mtable",
    "mtd",
    "mtext",
    "mtr",
    "munder",
    "munderover",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mspace",
    "mtext",
    "menclose",
    "merror",
    "mfenced",
    "mfrac",
    "mpadded",
    "mphantom",
    "mroot",
    "mrow",
    "msqrt",
    "mstyle",
    "mmultiscripts",
    "mover",
    "mprescripts",
    "msub",
    "msubsup",
    "msup",
    "munder",
    "munderover",
    "mtable",
    "mtd",
    "mtr",
    "maction",
    "annotation",
    "annotation-xml",
    "semantics",
  ];

  return mathTags.includes(tag.toLowerCase());
};

const locales: LocaleObject[] = [
  {
    code: "id",
    iso: "id-ID",
    name: "Bahasa Indonesia",
    file: "id.json",
  },
  {
    code: "en",
    iso: "en-US",
    name: "English",
    file: "en.json",
  },
  {
    code: "ja",
    iso: "ja-JP",
    name: "日本語",
    file: "ja.json",
  },
];

const defaultLocale = "id";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/color-mode",
    "@nuxt/content",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@nuxt/image",
    "dayjs-nuxt",
    "vue3-carousel-nuxt",
  ],
  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        "/sitemap.xml",
        "/sitemap.xsl",
        ...locales.map((locale) => `/sitemap/${locale.code}.xml`),
        ...locales.map((locale) => `/feeds/${locale.code}.xml`),
      ],
    },
  },
  app: {
    head: {
      title: "N4O Blog",
      meta: [
        {
          "http-equiv": "x-ua-compatible",
          content: "IE=edge",
        },
        {
          name: "apple-mobile-web-app-title",
          content: "N4O Blog",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "application-name",
          content: "N4O Blog",
        },
        {
          name: "msapplication-TileColor",
          content: "#171717",
        },
        {
          name: "msapplication-TileImage",
          content: "/assets/favicons/mstile-150x150.png",
        },
      ],
      link: [
        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/assets/favicons/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/assets/favicons/android-chrome-512x512.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/assets/favicons/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/assets/favicons/android-chrome-96x96.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/assets/favicons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/assets/favicons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/assets/favicons/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/assets/favicons/android-chrome-192x192.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        {
          rel: "mask-icon",
          href: "/assets/favicons/safari-pinned-tab.svg",
          color: "#c2410c",
        },
      ],
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: mathMLIgnore,
    },
  },
  imports: {
    imports: [
      {
        name: "FetchError",
        from: "ofetch",
      },
    ],
  },
  runtimeConfig: {
    public: {
      productionMode: process.env.NODE_ENV === "production",
      pagination: {
        posts: 10,
        tags: 5,
      },
      productionUrl: import.meta.env.DOMAIN_URL || "https://blog.n4o.xyz",
    },
    i18n: {
      locales: locales.map((locale) => locale.code),
      defaultLocale,
    },
    // Runtime/build time current directory
    currentDir: dirname(fileURLToPath(import.meta.url)),
  },
  content: {
    sources: {
      content: {
        driver: "fs",
        base: "content",
      },
      data: {
        driver: "fs",
        prefix: "/_data",
        base: "data",
      },
    },
    locales: locales.map((locale) => locale.code),
    defaultLocale,
    highlight: {
      theme: {
        default: "rose-pine-dawn",
        dark: "rose-pine",
      },
      langs: [
        "json",
        "jsonc",
        "js",
        "ts",
        "html",
        "css",
        "scss",
        "postcss",
        "vue",
        "shell",
        "mdc",
        "mdx",
        "md",
        "yaml",
        "jsx",
        "tsx",
        "c",
        "c++",
        "rust",
        "python",
        "powershell",
        "diff",
        "bat",
      ],
    },
    markdown: {
      remarkPlugins: ["remark-disemote", "remark-subsup", "remark-math", "remark-typography"],
      rehypePlugins: {
        "rehype-twemoji": {},
        "rehype-katex": {},
      },
      anchorLinks: true,
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
    experimental: {
      search: {
        filterQuery: {
          _partial: false,
          _draft: false,
          _source: "content",
          _contentType: "blog",
        },
        options: {
          fields: ["title", "content", "titles", "description", "tags", "slug"],
          storeFields: ["title", "slug", "description", "tags", "date", "slug"],
        },
        indexed: true,
      },
    },
  },
  i18n: {
    strategy: "prefix_except_default",
    baseUrl: import.meta.env.DOMAIN_URL || "http://localhost:4500",
    // Disable, let the user choose the language
    detectBrowserLanguage: false,
    langDir: "locales",
    defaultLocale,
    locales,
  },
  fonts: {
    families: [
      {
        // Main font
        name: "Monaspace Xenon",
        provider: "fontsource",
        weights: ["200", "300", "400", "500", "600", "700", "800"],
      },
      {
        // Codeblock font
        name: "Monaspace Neon",
        provider: "fontsource",
        weights: ["400", "600", "700", "800"],
      },
    ],
  },
  colorMode: {
    preference: "system",
    fallback: "dark",
    classSuffix: "",
    storageKey: "blog-color-mode",
  },
  ui: {
    safelistColors: ["fiord", "gray", "white", "black"],
  },
  dayjs: {
    locales: locales.map((locale) => locale.code),
    plugins: ["utc", "timezone", "duration"],
    defaultTimezone: "Asia/Jakarta",
    defaultLocale,
  },
  compatibilityDate: "2024-07-28",
  mdc: {
    components: {
      map: {
        video: "Video",
        admonition: "Admonition",
        "repo-card": "RepoCard",
        gist: "Gist",
      },
    },
  },
  hooks: {
    "nitro:config": () => {
      // verify defaultLocale is in locales early
      if (!locales.map((locale) => locale.code).includes(defaultLocale)) {
        throw new Error(`defaultLocale ${defaultLocale} is not in locales`);
      }
    },
  },
  carousel: {
    prefix: "V3",
  },
});

