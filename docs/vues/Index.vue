<template>
  <h3>JsonBank Documentation</h3>
  <p>This is from the <b>index.vue</b> file</p>

  <p>{{counter}}</p>

  <button @click="counter++">Click me</button>
</template>

<script setup>
import {ref} from 'vue'

const counter = ref(0);
</script>