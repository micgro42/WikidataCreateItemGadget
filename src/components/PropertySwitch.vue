<script setup lang="ts">
import { CdxRadio } from '@wikimedia/codex/packages/vue-components';

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
    required
  >
    {{ property.label }}
  </cdx-radio>
</template>
