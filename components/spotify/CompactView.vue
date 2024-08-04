<template>
  <div class="mt-1 flex flex-row items-start gap-1">
    <Icon name="simple-icons:spotify" class="ml-auto mt-[0.1rem] h-4 w-4 text-[#1ED760]" />
    <div class="flex w-full max-w-full flex-col">
      <p
        v-if="loading"
        class="font-variable whitespace-pre-line text-gray-800 variation-weight-medium dark:text-gray-200"
      >
        {{ $t("spotify.loading") }}
      </p>
      <p v-else-if="error" class="font-variable text-gray-800 variation-weight-medium dark:text-gray-200">
        {{ error }}
      </p>
      <template v-else-if="data">
        <p v-if="!data.data" class="font-variable text-gray-800 variation-weight-medium dark:text-gray-200">
          {{ $t("spotify.idle") }}
        </p>
        <template v-else>
          <NuxtLink :to="data.data.url" class="normal-link text-primary-500" rel="noreferrer noopener" target="_blank">
            {{ data.data.artist.map((r) => r.name).join(", ") }} - {{ data.data.title }}
          </NuxtLink>
          <div class="mt-0.5 flex flex-col">
            <p class="font-variable text-gray-800 variation-weight-medium dark:text-gray-200">
              <LightweightTimer
                :current="data.data.progress"
                :target="data.data.duration"
                @complete="$emit('complete')"
              />
            </p>
          </div>
        </template>
      </template>
      <p v-else class="font-variable whitespace-pre-line text-gray-800 variation-weight-medium dark:text-gray-200">
        {{ $t("spotify.noData") }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data?: SpotifyNowResult;
  loading?: boolean;
  error?: string;
}>();

const emits = defineEmits<{
  complete: [];
  refresh: [];
}>();

const refInterval = ref<NodeJS.Timeout | null>(null);

watch(
  () => props.data,
  () => {
    // If the data is not present, refresh the data on an interval
    if (!props.data && !props.loading && !refInterval.value) {
      const interval = setInterval(() => {
        if (props.data?.data) {
          clearInterval(interval);

          return;
        }

        emits("refresh");
      }, 5000);

      onBeforeUnmount(() => {
        clearInterval(interval);
      });

      refInterval.value = interval;
    }

    // If the data is present, clear the interval
    if (props.data?.data && refInterval.value) {
      clearInterval(refInterval.value);
      refInterval.value = null;
    }
  }
);
</script>
