<template>
  <SpotifyCompactView
    v-if="compact"
    :data="sptfyData ?? undefined"
    :loading="status === 'pending' || status === 'idle'"
    :error="sptfyError?.message"
    @complete="refreshData"
    @refresh="refreshData"
  />
  <div v-else>
    <div class="space-y-2 pb-8 pt-6 md:space-y-5">
      <h2
        class="font-variable mb-1 text-xl tracking-tight text-gray-900 variation-weight-extrabold dark:text-gray-100 sm:text-2xl sm:leading-10 md:leading-[3.5rem]"
      >
        Spotify
      </h2>
      <div v-if="sptfyData?.playing" class="!-mt-0.5 flex flex-row items-center gap-2">
        <NuxtImg class="h-6 w-6" alt="PepeJam" src="https://cdn.betterttv.net/emote/5b77ac3af7bddc567b1d5fb2/3x" />
        <p class="tracking-wide text-gray-400 dark:text-gray-500">{{ $t("spotify.playing") }}:</p>
      </div>
    </div>
    <SpotifyFullView
      :data="sptfyData ?? undefined"
      :loading="status === 'pending' || status === 'idle'"
      :error="sptfyError?.message"
      @complete="refreshData"
      @refresh="refreshData"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  compact?: boolean;
}>();

const {
  data: sptfyData,
  status,
  error: sptfyError,
  refresh,
  execute,
} = await useAsyncData(
  "spotify-now-playing",
  () => $fetch<SpotifyNowResult>("https://naotimes-og.glitch.me/spotify/now"),
  {
    immediate: false,
  }
);

async function refreshData() {
  await refresh({
    dedupe: true,
  });
}

onMounted(async () => {
  await execute({
    dedupe: true,
  });
});
</script>
