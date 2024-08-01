<template>
  <PostsListing
    v-if="postsResponse?.data && postsResponse.data.length > 0"
    :title="$t('nav.blog')"
    :data="postsResponse.data"
    :pagination="postsResponse.pagination"
  />
  <div
    v-else-if="postsResponse?.data && !postsResponse.data.length"
    class="my-4 flex flex-col items-center justify-center px-2"
  >
    <h2 class="font-variable mb-2 text-center text-2xl variation-weight-bold">{{ $t("blog.noPosts") }}</h2>
    <NuxtLink :to="localePath('/')" class="normal-link font-variable glow-text glow-shadow variation-weight-medium">
      {{ $t("blog.backHome") }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { ContentPagedQueryParam, ContentPagedResponse } from "~/server/api/content-paged.get";

const { locale, t } = useI18n();
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();

const query: ContentPagedQueryParam = {
  locale: locale.value,
  limit: 10,
  page: 1,
};

if (runtimeConfig.public.productionMode) {
  // Do not show drafts in production
  query.draft = false;
}

const { data: postsResponse } = await useAsyncData(`v2-blog-posts-homebase-${locale.value}`, () =>
  $fetch<ContentPagedResponse>("/api/content-paged", {
    method: "GET",
    query: query,
  })
);

useBlogHead({
  title: t("nav.blog"),
});
</script>
