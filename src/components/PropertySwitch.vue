<script setup lang="ts">
import { CdxRadio } from '@wikimedia/codex/packages/codex';

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
  <p v-if="!modelValue" class="cria-ontoProp__error-msg">
    ⬆ Please select an ontology Property ⬆
  </p>
</template>

<style>
.cria-ontoProp__error-msg {
  color: #d33;
  font-size: 0.8em;
  margin-top: 0.5em;
}
</style>
