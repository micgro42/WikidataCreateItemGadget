<script setup lang="ts">
import { useCreateItemStore } from '../store/createItemStore';
import PropertySwitch from './PropertySwitch.vue';
import LabelInput from './LabelInput.vue';
import DescriptionInput from './DescriptionInput.vue';
import AliasesInput from './AliasesInput.vue';
import ItemLookup from './ItemLookup.vue';
import { CdxButton } from '@wikimedia/codex/packages/vue-components';

const store = useCreateItemStore();

const searchNewOptions = (input: string) => {
  console.log('instanceOf input', input);
  store.ontologySearch = input;
  store.searchInstanceOfOptions(input);
};

const searchMoreOptions = (): void => {
  store.searchMoreOptions();
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
</script>
<template>
  <form class="create-item-form" @submit.prevent="store.submitForm">
    <div>
      <LabelInput v-model="store.labelValue" />
    </div>
    <div>
      <DescriptionInput v-model="store.descriptionValue" />
    </div>
    <div>
      <AliasesInput v-model="store.aliases" />
    </div>
    <h4 class="create-item-form__ontology-heading">Ontology</h4>
    <div>
      <PropertySwitch
        v-model="store.ontologyPropertyId"
        :property-options="propertyOptions"
      />
    </div>
    <div>
      <ItemLookup
        v-model="store.ontologyItemId"
        :options="store.instanceOfMenuOptions"
        @new-input="searchNewOptions"
        @more-options="searchMoreOptions"
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

  &__ontology-heading {
    margin: 0.5rem 0 0;
  }
}
</style>
