<template>
  <article v-if="contentResponse?.content">
    <div class="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
      <div v-if="contentResponse?.content._draft" class="my-6 text-center">
        <div class="space-y-1 text-center">
          <div class="mb-3 text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <div class="font-variable text-lg text-red-500 variation-weight-bold dark:text-red-400">
              {{ $t("blog.draft") }}
            </div>
            <div class="font-variable text-sm tracking-tight opacity-90 variation-weight-medium">
              {{ $t("blog.draftNotice") }}
            </div>
          </div>
        </div>
      </div>
      <PostHeader
        :title="contentResponse?.content.title"
        :reading-time="contentResponse?.content.readingTime"
        :published-at="contentResponse?.content.date"
      />
      <div
        class="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
        :style="{
          gridTemplateRows: 'auto 1fr',
        }"
      >
        <PostAuthor :author="contentResponse?.content.author" />
        <div class="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div class="prose prose-gray max-w-full pb-8 pt-10 dark:prose-invert">
            <ContentRenderer :value="contentResponse?.content">
              <ContentRendererMarkdown :value="contentResponse?.content" />
            </ContentRenderer>
          </div>
        </div>
        <footer>
          <PostAside :tags="contentResponse?.content.tags" :path="contentResponse?.content._path!" />
        </footer>
      </div>
    </div>
  </article>
  <div v-else-if="contentResponse?.availableLocales && contentResponse.availableLocales.length > 0">
    <div class="prose prose-gray mt-2 pb-8 pt-10 dark:prose-invert">
      <h1
        class="font-variable text-3xl glow-text-md glow-shadow variation-weight-extrabold md:text-4xl md:glow-text-lg"
      >
        {{ $t("blog.missing") }}
      </h1>
      <p>{{ $t("blog.missingNotice") }}:</p>
      <div class="mt-4 flex flex-col gap-2">
        <div
          v-for="loc in contentResponse.availableLocales"
          :key="loc"
          class="font-variable ml-1 variation-weight-medium"
        >
          <NuxtLink :to="localePath(`/posts/${firstSlug(slug)}`, loc)" class="group hover:!no-underline">
            -
            <span class="decoration-dashed glow-text glow-shadow group-hover:underline">
              {{ $t(`languages.${loc}`) }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="error && error.statusCode === 404">
    <ErrorMissing />
  </div>
</template>

<script setup lang="ts">
import type { ContentDataQueryParam, ContentDataResponse } from "~/server/api/content-data.get";

const {
  params: { slug },
} = useRoute();
const { locale, t } = useI18n();
const localePath = useLocalePath();
const runtimeConfig = useRuntimeConfig();

interface ContentError extends Error {
  statusCode: number;
}

function firstSlug(slug: string | string[]) {
  const slugged = typeof slug === "string" ? [slug] : slug;

  return slugged[0];
}

const { data: contentResponse, error } = await useAsyncData<ContentDataResponse, ContentError>(
  `nuxt-content:${useRoute().fullPath}`,
  () => {
    const slugInfo = firstSlug(slug);

    const query: ContentDataQueryParam = {
      locale: locale.value,
      slug: slugInfo,
    };

    if (runtimeConfig.public.productionMode) {
      // Do not show drafts in production
      query.draft = false;
    }

    return $fetch<ContentDataResponse>("/api/content-data", {
      method: "GET",
      query,
    });
  }
);

if (contentResponse.value?.content || error.value) {
  const content = contentResponse.value?.content;

  if (content) {
    usePostHead(content, [locale.value, ...contentResponse.value!.availableLocales]);
  } else {
    useBlogHead({
      title: error.value && error.value.statusCode === 404 ? "404" : "???",
      description: error.value && error.value.statusCode === 404 ? t("error.missing") : "???",
    });
  }
} else if ((contentResponse.value?.availableLocales?.length ?? 0) > 0) {
  const comma = locale.value === "ja" ? "、" : ", ";
  const availableParsed = contentResponse.value?.availableLocales.map((loc) => t(`languages.${loc}`)).join(comma);

  useBlogHead({
    title: t("blog.missing"),
    description: t("blog.missingNotice") + ": " + availableParsed,
  });
}
</script>
