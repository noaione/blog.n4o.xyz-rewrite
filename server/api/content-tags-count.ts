/* eslint-disable @stylistic/indent */
import { serverQueryContent } from "#content/server";
import { ExtendedParsedContent } from "../plugins/content";

export interface TagsResponse {
  tags: Record<string, string[]>;
}

export default defineEventHandler(async (event) => {
  const { locale, draft } = getQuery(event) || {};
  const isDraft = Boolean(draft);

  const data = await serverQueryContent<ExtendedParsedContent>(event)
    .where({
      _locale: locale?.toString(),
      _draft: draft
        ? isDraft
        : {
            $in: [true, false],
          },
      _partial: false,
      _contentType: "blog",
    })
    .only(["slug", "tags"])
    .sort({
      date: 1,
    })
    .find();

  // map tags to an array of slug
  // {
  //  tag1: [slug1, slug2],
  //  tag2: [slug3, slug4]
  // }
  const tags = data.reduce(
    (acc, item) => {
      item.tags.forEach((tag) => {
        if (!acc[tag]) {
          acc[tag] = [];
        }

        acc[tag].push(item.slug);
      });

      return acc;
    },
    {} as Record<string, string[]>
  );

  return {
    tags,
  };
});
