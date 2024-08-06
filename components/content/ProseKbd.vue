<template>
  <span ref="slotStroke"><slot /></span>
</template>

<script setup lang="ts">
const slotStroke = ref();

onMounted(() => {
  // Replace the slot content with the computed stroke
  // <kbd v-for="key in computedStroke" :key="key">
  //   {{ key }}
  // </kbd>
  const textContent = (slotStroke.value.textContent ?? "").trim() as string;

  const splitStroke = textContent.split(" ").map((key) => {
    const mapped = key === "Enter" ? "⏎" : key;

    return `<kbd>${mapped}</kbd>`;
  });

  slotStroke.value.innerHTML = splitStroke.join("");
});
</script>
