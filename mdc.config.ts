import { defineConfig } from "@nuxtjs/mdc/config";
import remarkHeads from "remark-heads";
import { transformerMetaWordHighlight, transformerNotationHighlight } from "@shikijs/transformers";
import type { ShikiTransformer } from "shiki";

const defaultTransformers = [transformerNotationHighlight(), transformerMetaWordHighlight()] as ShikiTransformer[];

function transformerShikiLineNumbers(options: { startLine?: number }): ShikiTransformer {
  const startLine = (options.startLine ?? 1) < 1 ? 1 : (options.startLine ?? 1);

  return {
    name: "n4o-blog-nuxt/shiki-line-numbers",
    line(hast, line) {
      const actualLine = line + startLine - 1;

      const currentStyle = hast.properties.style ?? "";
      const newStyle = `${currentStyle};--shiki-line-number: "${actualLine}"`;

      hast.properties.style = newStyle;

      this.addClassToHast(hast, "shiki-line-n");

      return hast;
    },
  };
}

function transformerFontVariable(): ShikiTransformer {
  return {
    name: "n4o-blog-nuxt/shiki-font-variable",
    span(hast) {
      const currentStyle = (hast.properties.style ?? "") as string;

      // Check if has --shiki-default-font-style or --shiki-dark-font-style
      const italicMatch = currentStyle.match(/--shiki-(default|dark)-font-style:italic/);

      let mergedStyles = currentStyle;

      if (italicMatch) {
        // If it has, add the slnt variable
        mergedStyles = `${mergedStyles};--shiki-slnt:-10`;
      } else {
        // If it doesn't, set it to 0
        mergedStyles = `${mergedStyles};--shiki-slnt:0`;
      }

      const boldMatch = currentStyle.match(/--shiki-(default|dark)-font-weight:bold/);

      if (boldMatch) {
        mergedStyles = `${mergedStyles};--shiki-wght:700`;
      } else {
        mergedStyles = `${mergedStyles};--shiki-wght:400`;
      }

      if (mergedStyles) {
        hast.properties.style = mergedStyles;
      }

      return hast;
    },
  };
}

export default defineConfig({
  shiki: {
    transformers(code, lang, theme, options) {
      if (typeof options.meta !== "string" || !options.meta?.match(/\blineNumbers\b/)) {
        return [transformerFontVariable(), ...defaultTransformers];
      }

      const startLine = Number.parseInt(options.meta.match(/\bstartLine=(\d+)\b/)?.[1] ?? "1", 10) ?? 1;
      const parsedStart = Number.isNaN(startLine) ? 1 : startLine;

      return [
        transformerFontVariable(),
        transformerShikiLineNumbers({ startLine: parsedStart }),
        ...defaultTransformers,
      ];
    },
  },
  unified: {
    remark(processor) {
      processor.use(remarkHeads);
    },
  },
});
