<template>
  <div class="flex w-[36rem] flex-grow-0 flex-col">
    <div
      class="group flex flex-col gap-2 rounded-md border-[1px] border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
    >
      <div v-if="data.image" class="flex aspect-video bg-white px-2 py-2 dark:bg-gray-900">
        <img :src="data.image" alt="Post image" class="aspect-video h-48 w-auto object-cover" />
      </div>
      <hr v-if="data.image" />
      <div class="flex flex-col px-3 py-2">
        <NuxtLink :to="slugUrl">
          <h2 class="font-variable text-lg decoration-dashed glow-text-md variation-weight-bold hover:underline">
            {{ data.title }}
          </h2>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContentPagedQuery } from "~/server/api/content-paged";

const props = defineProps<{
  data: ContentPagedQuery;
}>();

const localePath = useLocalePath();

function formatIntoSlug(id: string) {
  // get the last :
  const lastColon = id.lastIndexOf(":");

  // get anything after, strip .md from the end
  return id.substring(lastColon + 1).replace(/\.md$/, "");
}

const slugUrl = computed(() => {
  return localePath(`/posts/${formatIntoSlug(props.data._id)}`);
});
</script>
