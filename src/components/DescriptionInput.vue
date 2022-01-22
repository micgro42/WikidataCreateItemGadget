<template>
  <label
    >Description:<CdxTextInput
      :modelValue="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      placeholder="British computer scientist"
      required="true"
  /></label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxTextInput } from '@wikimedia/codex/packages/vue-components';

export default defineComponent({
  components: { CdxTextInput },
  props: ['modelValue'],
  emits: ['update:modelValue'],
});
</script>
