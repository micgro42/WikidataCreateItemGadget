<script setup lang="ts">
import { ref } from 'vue';
import { CdxButton } from '@wikimedia/codex/packages/vue-components/src/lib';
import CreateItemForm from './CreateItemForm.vue';

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <CdxButton action="progressive" type="quiet">Create Item</CdxButton>
  <CreateItemForm />
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
