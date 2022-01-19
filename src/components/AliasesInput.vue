<template>
  <label
    >Aliases, pipe-separated:<CdxTextInput
      :modelValue="aliasString"
      @update:model-value="onInput"
      placeholder="Alan M. Turing | Turing"
      required="true"
  /></label>
</template>
<script setup lang="ts">
import { CdxTextInput } from 'vue-components';
const props = defineProps<{
  modelValue: string[];
}>();
const emit = defineEmits(['update:modelValue']);

const onInput = (event: string): void => {
  const aliases = event
    .split('|')
    .map((alias) => alias.trim())
    .filter((alias) => alias);
  emit('update:modelValue', aliases);
};

const aliasString = props.modelValue.join(' | ');
</script>
