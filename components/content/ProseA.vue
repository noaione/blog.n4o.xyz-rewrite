<template>
  <NuxtLink :href="href" :target="target" class="shadow-gray-800 glow-text dark:shadow-gray-200">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    href: string;
    target?: "_blank" | "_parent" | "_self" | "_top" | (string & object) | null;
  }>(),
  {
    href: "",
    target: undefined,
  }
);
</script>
