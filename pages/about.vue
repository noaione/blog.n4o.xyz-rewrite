<template>
  <div>This is the about page</div>
</template>

<script setup lang="ts">
const { t } = useI18n();

useBlogHead({
  title: t("nav.about"),
  description: t("desc.about"),
});
</script>
