/* eslint-disable @stylistic/indent */
import { serverQueryContent } from "#content/server";

export default defineEventHandler(async (event) => {
  const { locale, draft, path, slug } = getQuery(event) || {};
  const isDraft = Boolean(draft);
  const currentPath = path?.toString();
  const currentSlug = slug?.toString();

  if (!currentPath && !currentSlug) {
    throw createError({
      statusCode: 400,
      message: "Missing `path` or `slug` query parameter",
    });
  }

  const data = await serverQueryContent(event)
    .where({
      _locale: locale?.toString(),
      _draft: draft
        ? isDraft
        : {
            $in: [true, false],
          },
      _partial: false,
      navigation: {
        $ne: false,
      },
      _contentType: "blog",
      _source: "content",
    })
    .only(["title", "_id", "_path", "slug", "date"])
    .sort({
      date: 1,
    })
    .find();

  const currentIndex = data.findIndex((item) => {
    return item._path === currentPath || item.slug === currentSlug;
  });

  if (currentIndex === -1) {
    return {};
  }

  const nextItem = data[currentIndex + 1];

  if (currentIndex - 1 < 0) {
    return {
      next: nextItem,
    };
  }

  const prevItem = data[currentIndex - 1];

  return {
    next: nextItem,
    prev: prevItem,
  };
});
