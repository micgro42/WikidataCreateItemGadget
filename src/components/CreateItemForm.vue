<script setup lang="ts">
import { ref } from 'vue';
import { CdxTextInput, CdxLookup } from 'vue-components';
import { useCreateItemStore } from '../store/createItemStore';

// Set up a reactive reference to track the input value.
const labelValue = ref<string | number>( '' );
const descriptionValue = ref<string | number>( '' );
const aliasesValue = ref<string | number>( '' );
const instanceOfInputValue = ref<string | number>( '' );

const store = useCreateItemStore();

const selectInstanceOfOption = ( option: unknown ) => {
    console.log( 'option selected', option );
}
const instanceOfInput = ( input: string ) => {
    console.log( 'instanceOf input', input );
    store.searchInstanceOfOptions( input );
}
</script>
<template>
    <form>
        <label>Label:<CdxTextInput v-model="labelValue" placeholder="Alan Turing" required="true" /></label>
        <label>Description:<CdxTextInput v-model="descriptionValue" placeholder="British computer scientist" required="true" /></label>
        <label>Aliases, pipe-separated:<CdxTextInput v-model="aliasesValue" placeholder="Alan M. Turing | Turing"/></label>
        <label>Instance of:<CdxLookup 
            v-model:inputValue="instanceOfInputValue"
            @update:modelValue="selectInstanceOfOption"
            @update:inputValue="instanceOfInput"
            :options="store.instanceOfMenuOptions"
            class="lookup-custom-option"
        >
            <template #menuOption="{ option }">
                <p class="option__label">
					{{ option.label || option.value }}
				</p>
				<p v-if="option.description" class="option__description">
					{{ option.description }}
				</p>
            </template>
        </CdxLookup>
        </label>
    </form>
</template>
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