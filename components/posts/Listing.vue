<template>
  <div class="flex flex-col gap-2">
    <PostsListingContent v-for="post in data" :key="post.title" :data="post" />
  </div>
</template>

<script setup lang="ts">
import type { ContentPagedQuery } from "~/server/api/content-paged";

defineProps<{
  data: ContentPagedQuery[];
}>();
</script>
