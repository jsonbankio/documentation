<template>
  <span class="text-3xl font-bold font-sans text-indigo-600 tracking-wider">
    <span class="md:hidden">
      {<small><span :class="spanClass">J</span>S<span :class="spanClass">B</span></small
      >}
    </span>
    <span class="hidden md:block">
      {<small
        ><span :class="spanClass">Json</span>B<span :class="spanClass">ank</span></small
      >}
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Logo",
  props: {
    innerClass: { type: String, default: "text-gray-900 dark:text-white" },
    shortVersion: { type: Boolean, default: false }
  },
  computed: {
    spanClass() {
      return `font-normal ${(this as any).innerClass}`.trim();
    }
  }
});
</script>
