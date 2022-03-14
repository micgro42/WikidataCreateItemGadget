<template>
  <label
    >Label:<CdxTextInput
      :model-value="modelValue"
      placeholder="Alan Turing"
      required="true"
      @update:model-value="$emit('update:modelValue', $event)"
  /></label>
</template>

<script setup lang="ts">
import { CdxTextInput } from '@wikimedia/codex';

defineProps<{
  modelValue: string;
}>();

defineEmits(['update:modelValue']);
</script>
