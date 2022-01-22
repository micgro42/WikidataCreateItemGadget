<script setup lang="ts">
import { CdxRadio } from '@wikimedia/codex/packages/vue-components';

const onUpdate = (value: string): void => {
  // eslint-disable-next-line no-console
  console.log('update:modelValue event: ' + value);
};
const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
  modelValue: string;
  propertyOptions: { label: string; value: string }[];
}>();
</script>

<template>
  <cdx-radio
    v-for="property in propertyOptions"
    :key="'radio-' + property.value"
    name="ontology-switch"
    :input-value="property.value"
    :inline="true"
    @update:model-value="$emit('update:modelValue', $event)"
    :model-value="modelValue"
  >
    {{ property.label }}
  </cdx-radio>
</template>
