<script setup lang="ts">
import { ref } from 'vue';
import { CdxTextInput, CdxLookup } from 'vue-components';

// Set up a reactive reference to track the input value.
const labelValue = ref<string | number>( '' );
const descriptionValue = ref<string | number>( '' );
const aliasesValue = ref<string | number>( '' );
const instanceOfValue = ref<string>( '' );
</script>
<template>
    <form>
        <label>Label:<CdxTextInput v-model="labelValue" /></label>
        <label>Description:<CdxTextInput v-model="descriptionValue" /></label>
        <label>Aliases:<CdxTextInput v-model="aliasesValue" /></label>
        <label>Instance of:<CdxLookup v-model="instanceOfValue" /></label>
    </form>
</template>