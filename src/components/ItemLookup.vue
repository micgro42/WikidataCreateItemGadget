<template>
  <label>
    Ontology item:
    <CdxLookup
      :model-value="modelValue"
      :options="extendedOptions"
      placeholder="human (Q5)"
      class="lookup-custom-option"
      required="true"
      @update:model-value="onSelect"
      @new-input="onInput"
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

<script setup lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore -- the lodash types are installed, it is unclear why it doesn't find them
import debounce from 'lodash.debounce';
import { ref, computed } from 'vue';
import {
  CdxLookup,
  MenuOption,
} from '@wikimedia/codex/packages/vue-components';
import ItemOption from './ItemOption.vue';

const emit = defineEmits(['update:modelValue', 'newInput', 'moreOptions']);
const props = defineProps<{
  modelValue: string | null;
  options: MenuOption[];
}>();

const extendedOptions = computed((): MenuOption[] => {
  if (props.options.length === 0) {
    return props.options;
  }
  const options = props.options;
  return [
    ...options,
    {
      label: 'more...',
      value: 'MORE',
    },
  ];
});

let debouncedInput = ref(null);

const moreOptions = (): void => {
  emit('moreOptions');
};

const onSelect = (newValue: string): void => {
  if (newValue === 'MORE') {
    moreOptions();
  } else {
    emit('update:modelValue', newValue);
  }
};

const onInput = (input: string): void => {
  if (debouncedInput.value === null) {
    debouncedInput = debounce((input: string) => {
      emit('newInput', input);
    }, 300);
  }
  // @ts-ignore -- somehow it doesn't understand that the property is set in the guard above
  debouncedInput(input);
};
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
