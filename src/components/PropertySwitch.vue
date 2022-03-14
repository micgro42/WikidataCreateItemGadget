<script setup lang="ts">
import { CdxRadio } from '@wikimedia/codex';

defineEmits(['update:modelValue']);
defineProps<{
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
    :model-value="modelValue"
    required
    @update:model-value="$emit('update:modelValue', $event)"
  >
    {{ property.label }}
  </cdx-radio>
</template>
