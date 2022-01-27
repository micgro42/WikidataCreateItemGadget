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
    value: 'P31', // TODO: inject this!
  },
  {
    label: 'subclass of',
    value: 'P276',
  },
];
// ontology options, ontology value, onOntologyInput
</script>
<template>
  <form @submit.prevent="store.submitForm">
    <LabelInput v-model="store.labelValue" />
    <DescriptionInput v-model="store.descriptionValue" />
    <AliasesInput v-model="store.aliases" />
    <PropertySwitch
      v-model="store.ontologyPropertyId"
      :property-options="propertyOptions"
    /><br />
    <ItemLookup
      v-model="store.ontologyItemId"
      @new-input="instanceOfInput"
      :options="store.instanceOfMenuOptions"
    />
    <CdxButton action="progressive" type="primary">Create</CdxButton>
    <CdxButton action="default" type="quiet">Cancel</CdxButton>
  </form>
</template>
