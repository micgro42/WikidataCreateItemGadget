<template>
  <label
    >Label:<CdxTextInput
      :modelValue="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      placeholder="Alan Turing"
      required="true"
  /></label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxTextInput } from 'vue-components';

export default defineComponent({
  components: { CdxTextInput },
  props: ['modelValue'],
  emits: ['update:modelValue'],
});
</script>
