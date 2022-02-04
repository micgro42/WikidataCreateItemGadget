<script setup lang="ts">
import CreateItemForm from './components/CreateItemForm.vue';
import CreateItemModal from './components/CreateItemModal.vue';
</script>

<template>
  <div lang="en" dir="ltr">
    <CreateItemModal>
      <template #header><h3>Create new Item</h3></template>
      <template #body>
        <CreateItemForm />
      </template>
      <template #footer><span /> </template>
    </CreateItemModal>
  </div>
</template>
