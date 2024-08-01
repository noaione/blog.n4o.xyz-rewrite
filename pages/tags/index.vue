<template>
  <pre>{{ tags }}</pre>
</template>

<script setup lang="ts">
import type { TagsResponse } from "~/server/api/content-tags-count.get";

const { locale, t } = useI18n();
const runtimeConfig = useRuntimeConfig();

const query: Record<string, unknown> = {
  locale: locale.value,
};

if (runtimeConfig.public.productionMode) {
  // Do not show drafts in production
  query.draft = false;
}

const { data: tags } = await useAsyncData(`blog-tags-homebase-${locale.value}`, () =>
  $fetch<TagsResponse>("/api/content-tags-count", {
    method: "GET",
    query: query,
  })
);

useBlogHead({
  title: t("nav.tags"),
});
</script>
