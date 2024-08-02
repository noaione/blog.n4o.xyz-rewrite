/* eslint-disable @stylistic/indent */
import type { ExtendedParsedContent } from "~/server/plugins/content";

function makeUrl(url: string, locale: string, defaultLocale: string) {
  if (locale === defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
}

function withBaseUrl(url: string, baseUrl: string) {
  if (url.startsWith("/")) {
    url = url.slice(1);
  }

  if (baseUrl.endsWith("/")) {
    baseUrl = baseUrl.slice(0, -1);
  }

  const completeUrl = `${baseUrl}/${url}`;

  // Strip trailing slash from the URL
  return completeUrl.replace(/\/$/, "");
}

function appendBase(url: string, baseUrl: string) {
  // check if starts with http
  if (url.startsWith("http")) {
    return url;
  }

  return withBaseUrl(url, baseUrl);
}

export default function (input: ExtendedParsedContent) {
  const blogConfig = useBlogConfig();
  const config = useRuntimeConfig();
  const { locale, defaultLocale } = useI18n();

  const summary = input.description ?? blogConfig.value.description;

  const postUrl = withBaseUrl(
    makeUrl(`/posts/${input.slug}`, input._locale!, defaultLocale),
    config.public.productionUrl
  );

  const metaTag = [
    {
      name: "description",
      content: summary,
    },
    {
      name: "robots",
      content: "follow, index",
    },
    {
      property: "og:title",
      content: input.title!,
    },
    {
      property: "og:description",
      content: summary,
    },
    {
      property: "og:url",
      content: postUrl,
    },
    {
      property: "og:type",
      content: "article",
    },
    {
      property: "og:site_name",
      content: blogConfig.value.title,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: input.title!,
    },
    {
      name: "twitter:description",
      content: summary,
    },
  ];

  if (input.image) {
    metaTag.push({
      property: "og:image",
      content: appendBase(input.image!, config.public.productionUrl),
    });
    metaTag.push({
      name: "twitter:image",
      content: appendBase(input.image!, config.public.productionUrl),
    });
  }

  const pubDate = new Date(input.date!);

  metaTag.push({
    property: "article:published_time",
    content: pubDate.toISOString(),
  });

  if (input.lastmod) {
    metaTag.push({
      property: "article:modified_time",
      content: new Date(input.lastmod).toISOString(),
    });
  }

  const authorData = {
    "@type": "Person",
    name: input.author,
  };

  const featuredImages = input.image
    ? [
        {
          url: appendBase(input.image!, config.public.productionUrl),
          alt: input.title!,
        },
      ]
    : [];

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    heading: input.title!,
    image: featuredImages,
    datePublished: pubDate.toISOString(),
    dateModified: input.lastmod && new Date(input.lastmod).toISOString(),
    author: authorData,
    publisher: {
      "@type": "Organization",
      name: blogConfig.value.title,
      logo: {
        "@type": "ImageObject",
        url: appendBase(blogConfig.value.image, config.public.productionUrl),
      },
    },
    description: summary,
  };

  useHeadSafe({
    htmlAttrs: {
      lang: locale,
    },
    title: input.title!,
    titleTemplate: `%s :: ${blogConfig.value.title}`,
    meta: [
      ...metaTag,
      {
        property: "article:author",
        content: input.author,
      },
      {
        property: "article:tag",
        content: input.tags.join(","),
      },
    ],
    link: [
      {
        rel: "canonical",
        href: postUrl,
      },
    ],
    script: [
      {
        type: "application/ld+json",
        textContent: JSON.stringify(structuredData),
      },
    ],
  });
}
