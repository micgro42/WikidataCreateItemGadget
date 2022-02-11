<template>
  <label
    >Aliases, pipe-separated:<CdxTextInput
      :model-value="aliasString"
      placeholder="Alan M. Turing | Turing"
      @update:model-value="onInput"
  /></label>
</template>

<script setup lang="ts">
import { CdxTextInput } from '@wikimedia/codex/packages/codex';
const props = defineProps<{
  modelValue: string[];
}>();
const emit = defineEmits(['update:modelValue']);

const onInput = (event: string): void => {
  let data;
  if (typeof event === 'object') {
    data = (event as InputEvent).data;
  } else {
    data = event;
  }
  const aliases = (data as string)
    .split('|')
    .map((alias) => alias.trim())
    .filter((alias) => alias);
  emit('update:modelValue', aliases);
};

const aliasString = props.modelValue ? props.modelValue.join(' | ') : '';
</script>
