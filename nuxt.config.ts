import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

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
  ],
  routeRules: {
    "/": { prerender: true },
    "/about": { prerender: true },
  },
  app: {
    head: {
      title: "Blog",
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
      locales: ["id", "en", "ja"],
      defaultLocale: "id",
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
    locales: ["id", "en", "ja"],
    defaultLocale: "id",
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
  },
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "id",
    baseUrl: process.env.BASE_URL || "http://localhost:3000",
    // Disable, let the user choose the language
    detectBrowserLanguage: false,
    langDir: "locales",
    locales: [
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
    ],
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
    locales: ["en", "id", "ja"],
    plugins: ["utc", "timezone", "duration"],
    defaultLocale: "id",
    defaultTimezone: "Asia/Jakarta",
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
  // sitemap: {
  //   sitemapName: "sitemap.xml",
  //   sitemaps: {
  //     id: {
  //       exclude: ["/_nuxt/**", "/_**"],
  //       includeAppSources: false,
  //       sitemapName: "id",
  //       sources: ["/api/__sitemap__/posts?lang=id", "/api/__sitemap__/tags?lang=id", "/api/__sitemap__/all?lang=id"],
  //     },
  //     en: {
  //       exclude: ["/_nuxt/**", "/_**"],
  //       includeAppSources: false,
  //       sitemapName: "en",
  //       sources: ["/api/__sitemap__/posts?lang=en", "/api/__sitemap__/tags?lang=en", "/api/__sitemap__/all?lang=en"],
  //     },
  //     ja: {
  //       exclude: ["/_nuxt/**", "/_**"],
  //       includeAppSources: false,
  //       sitemapName: "ja",
  //       sources: ["/api/__sitemap__/posts?lang=ja", "/api/__sitemap__/tags?lang=ja", "/api/__sitemap__/all?lang=ja"],
  //     },
  //   },
  //   excludeAppSources: ["nuxt:pages", "nuxt:prerender", "nuxt:route-rules"],
  //   cacheMaxAgeSeconds: import.meta.env.DEV ? 0 : 3600,
  // },
});

