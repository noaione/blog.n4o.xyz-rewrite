<template>
  <div class="relative my-5 [&>pre]:!my-0">
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
      :class="`font-monaspace-neon shiki-wrapper !rose-pine-related font-variable tracking-normal ${filename ? 'mt-0 rounded-t-none' : 'rounded-t-md'} ${$props.class ?? ''}`"
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
.shiki-wrapper code .line {
  display: table-row;
}

.shiki-wrapper {
  /* by default use this color */
  color: #575279;
}

.dark .shiki-wrapper {
  color: #e0def4;
}

.shiki-wrapper code .line span:last-child {
  @apply mr-4;
}

@supports (font-feature-settings: normal) {
  /* Enable monaspace ligatures */
  .shiki-wrapper code .line span {
    font-feature-settings: "calt", "liga", "ss01", "ss02", "ss03", "ss05", "ss06", "ss07", "ss08";
  }
}

.shiki-line-n::before {
  content: var(--shiki-line-number);
  width: 1rem;
  margin-right: 1.5rem;
  display: inline-block;
  text-align: right;
  color: #575279;
  opacity: 0.6;
}

.dark .shiki-line-n::before {
  color: #e0def4;
}

.shiki span {
  font-variation-settings:
    "wght" var(--shiki-wght),
    "slnt" var(--shiki-slnt);
}
</style>
