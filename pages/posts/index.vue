<template>
  <PostsListing v-if="posts !== null && posts.length > 0" :data="posts" />
  <div v-else-if="posts !== null && !posts.length" class="my-4 flex flex-col items-center justify-center px-2">
    <h2 class="font-variable mb-2 text-center text-2xl variation-weight-bold">{{ $t("blog.noPosts") }}</h2>
    <NuxtLink :to="localePath('/')" class="normal-link font-variable glow-text glow-shadow variation-weight-medium">
      {{ $t("blog.backHome") }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { ContentPagedQuery, ContentPagedQueryParam } from "~/server/api/content-paged";

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

const { data: posts } = await useAsyncData(`v2-blog-posts-homebase-${locale.value}`, () =>
  $fetch<ContentPagedQuery[]>("/api/content-paged", {
    method: "GET",
    query: query,
  })
);

useBlogHead({
  title: t("nav.blog"),
});
</script>
