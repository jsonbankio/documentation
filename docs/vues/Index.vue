<template>
  <h3>Test Readme and vue files</h3>
  <p>This is from the <b>index.vue</b> file</p>

  <button @click="counter++">Click me</button>

  <p>The button has been clicked ({{counter}}) times.</p>
</template>

<script setup>
import {ref} from 'vue'

const counter = ref(0);
</script>