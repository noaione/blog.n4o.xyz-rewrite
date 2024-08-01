<template>
  <div class="divide-y">
    <div class="space-y-2 pb-8 pt-6 md:space-y-5">
      <p
        v-if="isTags"
        class="font-variable text-lg uppercase leading-3 tracking-wider text-gray-600 variation-weight-bold dark:text-gray-400"
      >
        {{ $t("nav.tags") }}
      </p>
      <h1
        class="md:leading-14 font-variable text-3xl font-extrabold leading-9 tracking-tight text-gray-900 variation-weight-bold dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl"
        :class="{
          lowercase: isTags,
        }"
      >
        {{ isTags ? `#${title}` : title }}
      </h1>
      <!-- search here -->
      <!-- <div class="relative max-w-lg" /> -->
    </div>
    <ul>
      <PostsListingContent v-for="post in data" :key="post._id" :data="post" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ContentPagedQuery } from "~/server/api/content-paged.get";

defineProps<{
  data: ContentPagedQuery[];
  title: string;
  isTags?: boolean;
}>();
</script>
