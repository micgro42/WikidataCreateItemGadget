<script setup lang="ts">
import { CdxButton } from '@wikimedia/codex/packages/vue-components/src/lib';
import CreateItemForm from './components/CreateItemForm.vue';
import CreateItemModal from './components/CreateItemModal.vue';
</script>

<template>
  <div>
    <CreateItemModal>
      <template #header><h3>Create new Item</h3></template>
      <template #body>
        <CreateItemForm />
      </template>
      <template #footer><span /> </template>
    </CreateItemModal>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
