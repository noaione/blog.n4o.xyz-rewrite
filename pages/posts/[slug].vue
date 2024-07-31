<template>
  <article v-if="contentRendered">
    <div class="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
      <div v-if="contentRendered._draft" class="my-6 text-center">
        <div class="space-y-1 text-center">
          <div class="mb-3 text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <div class="text-red-500 dark:text-red-400">{{ $t("blog.draft") }}</div>
            {{ $t("blog.draftNotice") }}
          </div>
        </div>
      </div>
      <PostHeader
        :title="contentRendered.title"
        :reading-time="contentRendered.readingTime"
        :published-at="contentRendered.date"
      />
      <div
        class="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
        :style="{
          gridTemplateRows: 'auto 1fr',
        }"
      >
        <PostAuthor :author="contentRendered.author" />
        <div class="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div class="prose prose-gray pb-8 pt-10 dark:prose-invert">
            <ContentRenderer :value="contentRendered">
              <ContentRendererMarkdown :value="contentRendered" />
            </ContentRenderer>
          </div>
        </div>
        <footer>
          <PostAside :tags="contentRendered.tags" :path="contentRendered._path!" />
        </footer>
      </div>
    </div>
  </article>

  <div v-else-if="error && error.statusCode === 404">
    <ErrorMissing />
  </div>
</template>

<script setup lang="ts">
import type { QueryBuilderWhere } from "@nuxt/content";
import type { ExtendedParsedContent } from "~/server/plugins/content";

const {
  params: { slug },
} = useRoute();
const { locale } = useI18n();
const runtimeConfig = useRuntimeConfig();

interface ContentError extends Error {
  statusCode: number;
}

function firstSlug(slug: string | string[]) {
  const slugged = typeof slug === "string" ? [slug] : slug;

  return slugged[0];
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function formatSlugData(slug: string | string[]) {
  const slugData = firstSlug(slug);

  // check if it starts with YYYY-MM-DD or not
  if (/^\d{4}-\d{2}-\d{2}-/.test(slugData)) {
    // If yes, return null so we can reject
    return null;
  }

  // include a random match in the slug regex
  const regexData = new RegExp(`^/\\d{4}-\\d{2}-\\d{2}-${escapeRegExp(slugData)}`);

  return regexData;
}

const { data: contentRendered, error } = await useAsyncData<ExtendedParsedContent, ContentError>(
  `nuxt-content:${useRoute().fullPath}`,
  () => {
    const slugInfo = formatSlugData(slug);

    if (!slugInfo) {
      return Promise.reject({ statusCode: 404 });
    }

    const query: QueryBuilderWhere = {
      _locale: locale.value,
      _path: slugInfo,
      _contentType: "blog",
    };

    if (runtimeConfig.public.productionMode) {
      // Do not show drafts in production
      query._draft = false;
    }

    return queryContent().where(query).findOne() as Promise<ExtendedParsedContent>;
  }
);

useBlogHead({
  title: contentRendered.value?.title || (error.value && error.value.statusCode === 404 ? "404" : "???"),
  meta: [
    {
      hid: "description",
      name: "description",
      content:
        contentRendered.value?.description ||
        (error.value && error.value.statusCode === 404 ? "Page not found" : "???"),
    },
  ],
});
</script>
