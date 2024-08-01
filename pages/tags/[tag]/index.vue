<template>
  <PostsListing
    v-if="tagsResponse?.data && tagsResponse.data.length > 0"
    :title="$t('nav.tags')"
    :data="tagsResponse.data"
    :tags="actualTag"
    :pagination="tagsResponse.pagination"
  />
  <div
    v-else-if="tagsResponse?.data && !tagsResponse.data.length"
    class="my-4 flex flex-col items-center justify-center px-2"
  >
    <h2 class="font-variable mb-2 text-center text-2xl variation-weight-bold">{{ $t("blog.noPosts") }}</h2>
    <NuxtLink :to="localePath('/tags')" class="normal-link font-variable glow-text glow-shadow variation-weight-medium">
      {{ $t("blog.backHome") }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { ContentPagedResponse } from "~/server/api/content-paged.get";
import type { ContentTagsPagedQueryParam } from "~/server/api/content-tags.get";

const {
  params: { tag },
} = useRoute();
const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();
const localePath = useLocalePath();

function firstTag(tags: string | string[]) {
  const tagged = typeof tags === "string" ? [tags] : tags;

  return tagged[0];
}

const actualTag = firstTag(tag);

const query: ContentTagsPagedQueryParam = {
  locale: locale.value,
  limit: 5,
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
