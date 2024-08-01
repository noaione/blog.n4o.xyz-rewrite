<template>
  <pre>{{ tagsResponse }}</pre>
</template>

<script setup lang="ts">
import type { ContentPagedResponse } from "~/server/api/content-paged.get";
import type { ContentTagsPagedQueryParam } from "~/server/api/content-tags.get";

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

const { data: tagsResponse } = await useAsyncData(`blog-tags-homebase-${locale.value}-${actualTag}`, () =>
  $fetch<ContentPagedResponse>("/api/content-tags", {
    method: "GET",
    query: query,
  })
);
</script>
