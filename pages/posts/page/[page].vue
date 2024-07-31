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

const {
  params: { page },
} = useRoute();
const { locale, t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();

function parsePage(page: string | string[]) {
  const slugged = typeof page === "string" ? [page] : page;

  const first = slugged[0];
  const parsed = Number.parseInt(first, 10);

  if (Number.isNaN(parsed)) {
    // patch the URL
    router.replace(localePath("/posts/page/1"));

    return 1;
  }

  if (parsed < 1) {
    // patch the URL
    router.replace(localePath("/posts/page/1"));

    return 1;
  }

  return parsed;
}

const actualPage = parsePage(page);

const query: ContentPagedQueryParam = {
  locale: locale.value,
  limit: 10,
  page: actualPage,
};

if (runtimeConfig.public.productionMode) {
  // Do not show drafts in production
  query.draft = false;
}

const { data: posts } = await useAsyncData(`v2-blog-posts-homebase-${locale.value}-page-${actualPage}`, () =>
  $fetch<ContentPagedQuery[]>("/api/content-paged", {
    method: "GET",
    query: query,
  })
);

useBlogHead({
  title: t("nav.blogPaged", [actualPage]),
});
</script>
