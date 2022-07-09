<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import PageHeader from "../components/PageHeader.vue";

  const $router = useRouter();
</script>

<template>
  <div class="whiteboard">
    <PageHeader title="DOCUMENTATION" icon="fad fa-book" />
  </div>
</template>
