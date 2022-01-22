<template>
  <label>
    Ontology item:
    <CdxLookup
      :model-value="modelValue"
      @update:model-value="(event) => $emit('update:modelValue', event)"
      @new-input="(event) => $emit('newInput', event)"
      :options="options"
      placeholder="human (Q5)"
      class="lookup-custom-option"
      required="true"
    >
      <template #menu-option="{ option }">
        <p class="option__label">
          {{ option.label || option.value }}
        </p>
        <p v-if="option.description" class="option__description">
          {{ option.description }}
        </p>
      </template>
    </CdxLookup>
  </label>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { CdxLookup } from '@wikimedia/codex/packages/vue-components';

export default defineComponent({
  components: { CdxLookup },
  props: ['modelValue', 'options'],
  emits: ['update:modelValue', 'newInput'],
});
</script>

<style lang="scss" scoped>
.lookup-custom-option {
  p {
    margin: 0;
  }

  .option {
    &__label {
      font-weight: bold;
    }

    &__description {
      font-size: 0.875em;
      line-height: 1.25;
    }
  }
}
</style>
