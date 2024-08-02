import { visit } from "unist-util-visit";
import { statSync } from "node:fs";
import { join } from "node:path";
import { MarkdownNode, MarkdownRoot, ParsedContentMeta } from "@nuxt/content";
import readingTime, { ReadTimeResults } from "reading-time";
import authorLists from "~/data/author.json";

const filenameRegex = /(?<date>[\d]{4}-[\d]{2}-[\d]{2})-(?<fn>.*)/;

function getFileDate(file: string) {
  const stats = statSync(file);

  return {
    created: stats.birthtime,
    modified: stats.mtime,
  };
}

function extractDateFromFilename(file: string) {
  // we expect file to be in format of `YYYY-MM-DD-title.md`
  const match = filenameRegex.exec(file);

  if (!match) {
    throw new Error(`Filename ${file} does not follow the format: YYYY-MM-DD-title.md`);
  }

  const dateParsed = new Date(match.groups!.date);

  if (isNaN(dateParsed.getTime())) {
    throw new Error(`Date ${file} is not a valid date`);
  }

  return {
    date: dateParsed,
    title: match.groups!.fn,
  };
}

function ensureDateOr(keyData: unknown, fallback: Date) {
  if (keyData instanceof Date) {
    return keyData;
  }

  return fallback;
}

function ensureArrayOfString(keyData: unknown): string[] {
  if (Array.isArray(keyData)) {
    return keyData
      .map((key) => {
        if (typeof key === "string") {
          return key;
        }

        return null;
      })
      .filter((key) => key !== null);
  }

  return [];
}

function calculateReadingTime(root: MarkdownRoot): ReadTimeResults {
  const allNodes = [] as string[];

  visit(root, "text", (node) => {
    const n = node as MarkdownNode;

    // get value of text node
    allNodes.push(n.value || "");
  });

  const text = allNodes.join(" ");

  return readingTime(text, {
    wordsPerMinute: 200,
  });
}

function validateAuthor(author: string) {
  const match = authorLists.find((a) => a.id === author);

  if (!match) {
    const availIds = authorLists.map((a) => a.id);

    throw new Error(`Author ID ${author} does not exist, availables: ${availIds.join(", ")}`);
  }
}

interface BeforeParse {
  _id: string;
  body: string;
  date?: string;
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("content:file:beforeParse", (file: BeforeParse) => {
    if (file._id.endsWith(".md") && !file._id.startsWith("content:")) {
      // Formatted content:LANG:anypath:actualpath
      const splitted = file._id.split(":");
      const path = splitted[splitted.length - 1];

      // check if filename follows the format
      const dateData = extractDateFromFilename(path);

      file.date = dateData.date.toISOString();
    }
  });

  nitroApp.hooks.hook("content:file:afterParse", (file) => {
    if (file._id.endsWith(".md") && file.body && file._source === "content") {
      const splitIds = file._id.split(":");
      const idPrefix = splitIds.slice(0, splitIds.length - 1);
      const pathActual = splitIds[splitIds.length - 1];
      const dateInfo = extractDateFromFilename(pathActual);

      if (!file.author) {
        throw new Error(`Author is not defined in ${file._id}`);
      }

      validateAuthor(file.author);

      file._id = [...idPrefix, dateInfo.title].join(":");
      file.date = ensureDateOr(file.date, dateInfo.date);

      file.slug = dateInfo.title.replace(/\.md$/, "");

      if (file._file && file._source) {
        const joinPath = join(file._source, file._file);
        const { created, modified } = getFileDate(joinPath);

        file.date = ensureDateOr(file.date, created);
        file.lastmod = ensureDateOr(file.lastmod, modified);
      }

      file.tags = ensureArrayOfString(file.tags);
      file._draft = file._draft || Boolean(file.draft);
      file._contentType = "blog";

      file.readingTime = calculateReadingTime(file.body);
    }
  });
});

/**
 * ExtendedParsedContent is a type that extends ParsedContent from nuxt/content
 *
 * It adds additional properties that we need for our blog
 */
export interface ExtendedParsedContent extends ParsedContentMeta {
  date?: Date;
  lastmod?: Date;
  image?: string;
  tags: string[];
  readingTime: ReadTimeResults;
  _draft: boolean;
  author: string;
  slug: string;
  _contentType: "blog";
  /**
   * Excerpt
   */
  excerpt?: MarkdownRoot;
  /**
   * Content body
   */
  body: MarkdownRoot | null;
}

export type FrontMatterData = Pick<
  ExtendedParsedContent,
  "title" | "description" | "image" | "tags" | "date" | "lastmod" | "readingTime"
>;
