<template>
  <div class="relative my-5 [&>pre]:!my-0 [&>pre]:!rounded-t-none">
    <div
      v-if="filename"
      class="rose-pine-surface flex w-full flex-row items-center py-2 text-[#575279] dark:text-[#e0def4]"
    >
      <div class="flex px-1 py-1 pl-4">
        <ProseCodeIcon :language="language" />
      </div>
      <div class="font-variable py-1 pl-1 pr-4 text-sm tracking-tight variation-weight-[550]">{{ filename }}</div>
    </div>
    <pre
      :class="`font-monaspace-neon !rose-pine-related font-variable tracking-normal ${$props.class ?? ''}`"
    ><slot /></pre>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    code: string;
    language?: string | null;
    filename?: string | null;
    highlights?: number[];
    meta?: string | null;
    class?: string | null;
  }>(),
  {
    code: "",
    language: null,
    filename: null,
    highlights: () => [],
    meta: null,
    class: null,
  }
);
</script>

<style lang="postcss">
pre code .line {
  display: block;
}

@supports (font-feature-settings: normal) {
  /* Enable monaspace ligatures */
  pre code .line span {
    font-feature-settings: "calt", "liga", "ss01", "ss02", "ss03", "ss05", "ss06", "ss07", "ss08";
  }
}
</style>
