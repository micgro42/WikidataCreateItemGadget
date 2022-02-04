<template>
  <label>
    Ontology item:
    <CdxLookup
      :model-value="modelValue"
      @update:model-value="onSelect"
      @new-input="onInput"
      :options="extendedOptions"
      placeholder="human (Q5)"
      class="lookup-custom-option"
      required="true"
    >
      <template #menu-option="{ option }">
        <div
          v-if="option.value === 'MORE'"
          @click.capture.stop.prevent.self="moreOptions"
        >
          {{ option.label }}
        </div>
        <ItemOption v-else :option="option" />
      </template>
    </CdxLookup>
  </label>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { CdxLookup } from '@wikimedia/codex/packages/vue-components';
// @ts-ignore
import debounce from 'lodash.debounce';
import ItemOption from './ItemOption.vue';

export default defineComponent({
  components: { CdxLookup, ItemOption },
  props: ['modelValue', 'options'],
  emits: ['update:modelValue', 'newInput', 'moreOptions'],
  data() {
    return {
      debouncedInput: null as Function | null,
    };
  },
  computed: {
    extendedOptions() {
      if (this.options.length === 0) {
        return this.options;
      }
      const options = this.options;
      return [
        ...options,
        {
          label: 'more...',
          value: 'MORE',
        },
      ];
    },
  },
  methods: {
    onSelect(newValue: string): void {
      if (newValue === 'MORE') {
        this.moreOptions();
      } else {
        this.$emit('update:modelValue', newValue);
      }
    },
    moreOptions() {
      this.$emit('moreOptions');
    },
    onInput(input: string): void {
      if (this.debouncedInput === null) {
        this.debouncedInput = debounce((input: string) => {
          this.$emit('newInput', input);
        }, 300);
      }
      // @ts-ignore
      this.debouncedInput(input);
    },
  },
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
