import type { UseHeadInput } from "@unhead/vue";

type HeadSafe = Omit<UseHeadInput, "titleTemplate">;

export default function (input: HeadSafe) {
  const blogConfig = useBlogConfig();

  useHeadSafe({
    ...input,
    titleTemplate: `%s :: ${blogConfig.value.title}`,
  });
}
