import { defineConfig } from "@nuxtjs/mdc/config";
import remarkHeads from "remark-heads";

export default defineConfig({
  shiki: {
    transformers(code, lang, theme, options) {
      if (typeof options.meta !== "string" || !options.meta?.match(/\blineNumbers\b/)) {
        return [];
      }

      const startLine = Number.parseInt(options.meta.match(/\bstartLine=(\d+)\b/)?.[1] ?? "1", 10) ?? 1;
      const parsedStart = Number.isNaN(startLine) ? 1 : startLine;

      return [
        {
          name: "shiki-line-numbers",
          code(node) {
            this.addClassToHast(node, "shiki-line-numbers");
          },
          line(node, line) {
            const actualLine = line + parsedStart;
            // add into style
            const currentStyle = node.properties.style ?? "";
            const newStyle = `${currentStyle};--shiki-line: ${actualLine}`;

            node.properties.style = newStyle;
          },
        },
      ];
    },
  },
  unified: {
    remark(processor) {
      processor.use(remarkHeads);
    },
  },
});
