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
    },
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
    locales: ["en", "id", "ja"],
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
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.json",
      },
      {
        code: "id",
        iso: "id-ID",
        name: "Bahasa Indonesia",
        file: "id.json",
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
    safelistColors: ["fiord"],
  },
  dayjs: {
    locales: ["en", "id", "ja"],
    plugins: ["utc", "timezone", "duration"],
    defaultLocale: "id",
    defaultTimezone: "Asia/Jakarta",
  },
  compatibilityDate: "2024-07-28",
});
