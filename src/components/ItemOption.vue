<template>
  <div class="option">
    <p class="option__title">
      <b class="option__label">{{ option.label || option.value }}</b>
      <span
        v-if="hasMatch"
        :lang="option.match.language"
        class="option__extra-match"
        >({{ option.match.text }})</span
      >
    </p>
    <p v-if="option.description" class="option__description">
      {{ option.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';

const props = defineProps<{
  option: {
    value: string;
    label: string;
    description?: string;
    match: {
      type: string;
      language?: string;
      text: string;
    };
  };
}>();

let hasMatch: boolean;
watchEffect(() => {
  console.log(props.option);
  hasMatch = ['alias', 'entityId'].includes(props.option?.match?.type);
});
</script>

<style lang="scss" scoped>
.option {
  p {
    margin: 0;
  }

  &__title {
    display: flex;
    justify-content: space-between;
  }

  &__extra-match {
    font-style: italic;
  }

  &__label {
    font-weight: bold;
  }

  &__description {
    font-size: 0.875em;
    line-height: 1.25;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
}
</style>
