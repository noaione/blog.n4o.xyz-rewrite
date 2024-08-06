<template>
  <div class="asciinema-wrapper not-prose" :data-asciinema="url" />
</template>

<script setup lang="ts">
defineProps<{
  url: string;
}>();
</script>
