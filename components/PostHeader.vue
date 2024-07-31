<template>
  <header className="pt-6 xl:pb-6 flex flex-col items-center">
    <div v-if="parsedDate" className="space-y-1 text-center">
      <dl className="space-y-10">
        <div class="mb-3">
          <dt className="sr-only">{{ $t("blog.publishAt") }}</dt>
          <dd className="text-base font-variable variation-weight-medium leading-6 text-gray-500 dark:text-gray-400">
            <time :datetime="parsedDate.toISOString()">
              {{ parsedDate.toLocaleDateString(locale, postDateTemplate) }}
            </time>
          </dd>
        </div>
      </dl>
    </div>
    <div>
      <h1 class="post-title text-center">{{ title }}</h1>
      <p className="text-sm mt-1 text-gray-600 dark:text-gray-400 flex flex-row items-center justify-center">
        <template v-if="parsedReadingTime">
          <span :aria-value="parsedReadingTime.time.toString()">
            {{ $t("blog.readTime", [parsedReadingTime.localized]) }}
          </span>
          <span class="mx-1">|</span>
        </template>
        <Icon name="heroicons:eye" class="mr-1 inline-block h-4 w-4" aria-label="View Count" />
        <span>{{ $t("blog.viewCount", [views.toLocaleString()]) }}</span>
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDayjs } from "#dayjs";
import type { ReadTimeResults } from "reading-time";

const props = withDefaults(
  defineProps<{
    title?: string;
    readingTime?: ReadTimeResults;
    publishedAt?: Date | string;
  }>(),
  {
    title: "Untitled",
    readingTime: undefined,
    publishedAt: undefined,
  }
);

const views = ref(0);
const parsedDate = computed(() => {
  if (props.publishedAt) {
    return new Date(props.publishedAt);
  }
});

const { locale } = useI18n();
const dayjs = useDayjs();

const parsedReadingTime = computed(() => {
  if (props.readingTime) {
    // Parse into "relative time"
    return {
      ...props.readingTime,
      localized: dayjs.duration(props.readingTime.time, "milliseconds").locale(locale.value).humanize(),
    };
  }
});

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

// onMounted(() => {
//   // request views to plausible
// });
</script>

<style scoped lang="postcss">
.post-title {
  @apply font-variable text-3xl glow-text-md glow-shadow variation-weight-extrabold md:text-4xl md:glow-text-lg;
}
</style>
