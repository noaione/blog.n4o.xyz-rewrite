import { defineConfig } from "@nuxtjs/mdc/config";
import remarkHeads from "remark-heads";
import { transformerMetaWordHighlight, transformerNotationHighlight } from "@shikijs/transformers";
import type { ShikiTransformer } from "shiki";
import {
  transformerFontVariable,
  transformerNotProsePosition,
  transformerShikiLineNumbers,
} from "./utils/transformers";

const defaultTransformers = [transformerNotationHighlight(), transformerMetaWordHighlight()] as ShikiTransformer[];

export default defineConfig({
  shiki: {
    transformers(code, lang, theme, options) {
      const transformers = [...defaultTransformers, transformerFontVariable()];

      if (typeof options.meta === "string") {
        if (options.meta.match(/\blineNumbers\b/)) {
          const startLine = Number.parseInt(options.meta.match(/\bstartLine=(\d+)\b/)?.[1] ?? "1", 10) ?? 1;
          const parsedStart = Number.isNaN(startLine) ? 1 : startLine;

          transformers.push(transformerShikiLineNumbers({ startLine: parsedStart }));
        }

        if (options.meta.match(/\bnoProse\b/)) {
          transformers.push(transformerNotProsePosition());
        }
      }

      return transformers;
    },
  },
  unified: {
    remark(processor) {
      processor.use(remarkHeads);
    },
  },
});
