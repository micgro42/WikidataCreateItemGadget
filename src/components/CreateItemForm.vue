<script setup lang="ts">
import { useCreateItemStore } from '../store/createItemStore';
import PropertySwitch from './PropertySwitch.vue';
import LabelInput from './LabelInput.vue';
import DescriptionInput from './DescriptionInput.vue';
import AliasesInput from './AliasesInput.vue';
import ItemLookup from './ItemLookup.vue';
import { CdxButton } from '@wikimedia/codex/packages/vue-components';

const store = useCreateItemStore();

const instanceOfInput = (input: string) => {
  console.log('instanceOf input', input);
  store.searchInstanceOfOptions(input);
};
const propertyOptions = [
  {
    label: 'instance of',
    value: store.wikiConfig.instanceOfProperty,
  },
  {
    label: 'subclass of',
    value: store.wikiConfig.subclassOfProperty,
  },
];
// ontology options, ontology value, onOntologyInput
</script>
<template>
  <form @submit.prevent="store.submitForm" class="create-item-form">
    <div>
      <LabelInput v-model="store.labelValue" />
    </div>
    <div>
      <DescriptionInput v-model="store.descriptionValue" />
    </div>
    <div>
      <AliasesInput v-model="store.aliases" />
    </div>
    <div>
      <PropertySwitch
        v-model="store.ontologyPropertyId"
        :property-options="propertyOptions"
      />
    </div>
    <div>
      <ItemLookup
        v-model="store.ontologyItemId"
        @new-input="instanceOfInput"
        :options="store.instanceOfMenuOptions"
      />
    </div>
    <div>
      <CdxButton action="progressive" type="primary">Create</CdxButton>
      <CdxButton action="default" type="quiet" @click.prevent="store.cancel">
        Cancel
      </CdxButton>
    </div>
  </form>
</template>
<style lang="scss">
.create-item-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
