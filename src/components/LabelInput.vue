<template>
  <label class="cria-label-input">
    Label:
    <CdxTextInput
      :model-value="modelValue"
      placeholder="Alan Turing"
      required="true"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </label>
</template>

<script setup lang="ts">
import { CdxTextInput } from '@wikimedia/codex/packages/codex';

defineProps<{
  modelValue: string;
}>();

defineEmits(['update:modelValue']);
</script>

<style>
.cria-label-input input:valid {
  outline: thin solid #00af89;
}

.cria-label-input input:invalid {
  outline: thin solid #d33;
}
</style>
