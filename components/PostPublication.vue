<template>
  <dt className="sr-only">{{ $t("blog.publishAt") }}</dt>
  <dd className="text-base font-variable variation-weight-medium leading-6 text-gray-500 dark:text-gray-400">
    <time :datetime="parsedDate.toISOString()">
      {{ parsedDate.toLocaleDateString(locale, postDateTemplate) }}
    </time>
  </dd>
</template>

<script setup lang="ts">
const props = defineProps<{
  publishedAt: Date | string;
}>();

const { locale } = useI18n();

const parsedDate = computed(() => {
  return new Date(props.publishedAt);
});

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
</script>
