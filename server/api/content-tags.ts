/* eslint-disable @stylistic/indent */
import { serverQueryContent } from "#content/server";
import { ContentPagedQueryParam } from "./content-paged";

function intoNumber(value: string | undefined) {
  if (!value) {
    return;
  }

  const num = Number.parseInt(value, 10);

  if (Number.isNaN(num)) {
    return;
  }

  return num;
}

function getSkipNum(pageNum: number, limitNum: number) {
  return (pageNum - 1) * limitNum;
}

export interface ContentTagsPagedQueryParam extends ContentPagedQueryParam {
  tag: string;
}

export default defineEventHandler(async (event) => {
  const { locale, draft, tag, limit, page } = getQuery(event) || {};
  const isDraft = Boolean(draft);
  const tagCurrent = tag?.toString();
  const limitNum = intoNumber(limit?.toString()) || 10;
  // Non-zero-based page number
  const pageNum = intoNumber(page?.toString()) || 1;
  const skipAmount = getSkipNum(pageNum, limitNum < 1 ? 1 : limitNum);

  if (!tagCurrent) {
    throw createError({
      statusCode: 400,
      message: "Missing `tag` query parameter",
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
      _contentType: "blog",
      tags: {
        $contains: tagCurrent,
      },
    })
    .only(["_id", "_draft", "_path", "title", "description", "excerpt", "date", "image", "tags", "slug"])
    .sort({
      date: -1,
    })
    .limit(limitNum < 1 ? 1 : limitNum)
    .skip(skipAmount)
    .find();

  return data;
});
