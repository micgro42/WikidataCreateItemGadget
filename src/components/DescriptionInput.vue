<template>
  <label class="cria-description-input">
    Description:
    <CdxTextInput
      :model-value="modelValue"
      placeholder="British computer scientist"
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
.cria-description-input input:valid {
  outline: thin solid #00af89;
}

.cria-description-input input:invalid {
  outline: thin solid #d33;
}
</style>
