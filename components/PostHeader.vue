<template>
  <header class="flex flex-col items-center pt-6 xl:pb-6">
    <div v-if="publishedAt" class="space-y-1 text-center">
      <dl class="space-y-10">
        <div class="mb-3">
          <PostPublication :published-at="publishedAt" />
        </div>
      </dl>
    </div>
    <div>
      <h1 class="post-title text-center">{{ title }}</h1>
      <p class="mt-2 flex flex-row items-center justify-center text-sm text-gray-600 dark:text-gray-400">
        <template v-if="parsedReadingTime">
          <span :aria-value="parsedReadingTime.time.toString()">
            {{ $t("blog.readTime", [parsedReadingTime.localized]) }}
          </span>
          <span class="mx-1">|</span>
        </template>
        <Icon name="heroicons:eye-20-solid" class="mr-1 inline-block h-4 w-4" aria-label="View Count" />
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

// onMounted(() => {
//   // request views to plausible
// });
</script>

<style scoped lang="postcss">
.post-title {
  @apply font-variable text-3xl glow-text-md glow-shadow variation-weight-extrabold md:text-4xl md:glow-text-lg;
}
</style>
