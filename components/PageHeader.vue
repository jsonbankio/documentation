<script setup lang="ts">
  import Logo from "./Logo.vue";

  const { icon, title } = defineProps({
    icon: { type: String },
    title: { type: String, required: true },
  });
</script>
<template>
  <section class="text-center md:mt-10">
    <div><Logo /></div>
    <div class="mt-2">
      <h1 class="text-4xl tracking-wide font-extrabold text-gray-500">
        <i v-if="icon" :class="[icon]"></i> {{ title }}
      </h1>
    </div>
  </section>
</template>
