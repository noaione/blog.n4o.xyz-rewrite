<template>
  <dl class="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
    <dt class="sr-only">{{ $t("blog.author.title") }}</dt>
    <dd>
      <ul class="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
        <li class="flex items-center space-x-2">
          <img
            v-if="computedAuthor?.avatar"
            :src="computedAuthor?.avatar"
            alt="avatar"
            class="h-10 w-10 rounded-full"
          />
          <Icon v-else name="heroicons:user-solid" class="h-10 w-10 rounded-full" />
          <dl class="whitespace-nowrap text-sm leading-5">
            <dt class="sr-only">{{ $t("blog.author.name") }}</dt>
            <dd class="font-variable tracking-tight text-gray-900 variation-weight-semibold dark:text-gray-100">
              {{ computedAuthor?.name ?? "Anon" }}
            </dd>
            <dt v-if="computedSocial" class="sr-only">{{ getSocialName(computedSocial.type) }}</dt>
            <dd v-if="computedSocial">
              <NuxtLink
                :to="computedSocial.url"
                class="normal-link font-variable break-words text-primary-500 variation-weight-medium"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="getSocialName(computedSocial.type)"
              >
                {{ computedSocial.text }}
              </NuxtLink>
            </dd>
          </dl>
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script setup lang="ts">
const props = defineProps<{
  author?: string;
}>();

const { t } = useI18n();
const { getAuthor } = useBlogAuthor();

const computedAuthor = computed(() => {
  if (props.author) {
    return getAuthor(props.author);
  }
});

const computedSocial = computed(() => {
  if (computedAuthor.value) {
    if (computedAuthor.value.socialMedia.github) {
      return { ...computedAuthor.value.socialMedia.github, type: "github" };
    } else if (computedAuthor.value.socialMedia.twitter) {
      return { ...computedAuthor.value.socialMedia.twitter, type: "twitter" };
    }
  }
});

function getSocialName(social: string) {
  if (social === "github") {
    return t("blog.author.social.github");
  } else if (social === "twitter") {
    return t("blog.author.social.twitter");
  }
}
</script>
