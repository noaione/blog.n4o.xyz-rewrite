<template>
  <div class="my-4 flex flex-row justify-between py-4">
    <div class="flex flex-col">
      <h1
        class="font-variable cursor-pointer text-xl tracking-tight transition-opacity duration-150 variation-weight-bold hover:underline"
      >
        <NuxtLink v-if="!isInHome" :to="localePath('/')">
          {{ blogConfig?.title }}
        </NuxtLink>
        <template v-else>
          {{ blogConfig?.title }}
        </template>
      </h1>
    </div>
    <div class="flex flex-row items-center space-x-4">
      <NuxtLink :to="localePath('/posts')" class="font-variable tracking-tight variation-weight-[600] hover:underline">
        {{ $t("nav.blog") }}
      </NuxtLink>
      <NuxtLink :to="localePath('/tags')" class="font-variable tracking-tight variation-weight-[600] hover:underline">
        {{ $t("nav.tags") }}
      </NuxtLink>
      <NuxtLink :to="localePath('/about')" class="font-variable tracking-tight variation-weight-[600] hover:underline">
        {{ $t("nav.about") }}
      </NuxtLink>
      <DarkToggle />
      <LangToggle />
    </div>
  </div>
</template>

<script setup lang="ts">
const blogConfig = useBlogConfig();
const localePath = useLocalePath();
const route = useRoute();

const isInHome = computed(() => {
  return route.path === localePath("/");
});
</script>
