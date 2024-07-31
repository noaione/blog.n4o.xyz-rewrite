<template>
  <pre>{{ tags }}</pre>
</template>

<script setup lang="ts">
import type { ContentPagedQuery } from "~/server/api/content-paged";
import type { ContentTagsPagedQueryParam } from "~/server/api/content-tags";

const {
  params: { tag },
} = useRoute();
const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();

function firstTag(tags: string | string[]) {
  const tagged = typeof tags === "string" ? [tags] : tags;

  return tagged[0];
}

const actualTag = firstTag(tag);

const query: ContentTagsPagedQueryParam = {
  locale: locale.value,
  limit: 10,
  page: 1,
  tag: actualTag,
};

if (runtimeConfig.public.productionMode) {
  // Do not show drafts in production
  query.draft = false;
}

const { data: tags } = await useAsyncData(`blog-tags-homebase-${locale.value}-${actualTag}`, () =>
  $fetch<ContentPagedQuery>("/api/content-tags", {
    method: "GET",
    query: query,
  })
);
</script>
