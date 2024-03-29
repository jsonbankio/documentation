<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "../components/PageHeader.vue";

const $router = useRouter();

type Lang = {
  name: string;
  icons: Array<string>;
  active?: boolean;
  route?: string;
};

const languages = ref<Lang[]>([
  {
    name: "Javascript",
    icons: ["fa-brands fa-js-square", "fa-brands fa-node", "fa-brands fa-npm"],
    active: true,
    route: "/sdks/javascript/index.html",
  },

  {
    name: "Go Lang",
    icons: ["fa-brands fa-golang"],
    active: true,
    route: "/sdks/golang/index.html",
  },

  {
    name: "Rust",
    icons: ["fa-brands fa-rust"],
    active: true,
    route: "/sdks/rust/index.html",
  },

  {
    name: "Python",
    icons: ["fa-brands fa-python"],
  },

  {
    name: "Php",
    icons: ["fa-brands fa-php", "fa-brands fa-laravel"],
  },
]);

function onLangClick(lang: Lang) {
  if (!lang.active || !lang.route) return;
  $router.push(lang.route);
}
</script>

<template>
  <div class="whiteboard">
    <PageHeader title="Software Development Kits" icon="fad fa-code" />

    <section
      class="
        max-w-4xl
        mx-auto
        mb-20
        bg-gray-800
        mt-16
        rounded-md
        text-white
        p-5
      "
    >
      <h2 class="text-center text-xl">
        Select <strong class="text-yellow-500">Language</strong>
      </h2>

      <div
        class="
          grid grid-col-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-3
          mt-10
        "
      >
        <template v-for="lang in languages">
          <div @click.prevent="onLangClick(lang)" class="col-span-1 lang">
            <div class="grid grid-cols-2 my-3 space-2">
              <template v-for="(icon, index) in lang.icons">
                <div
                  :class="[
                    index + 1 === lang.icons.length && (index + 1) % 2 === 1
                      ? 'col-span-2'
                      : 'col-span-1',
                  ]"
                  class="text-center"
                >
                  <i
                    class="fa-3x"
                    :class="[
                      icon,
                      lang.active
                        ? 'text-green-300'
                        : 'text-indigo-200 opacity-60',
                    ]"
                  ></i>
                </div>
              </template>
            </div>
            <div>
              <strong class="text-yellow-400 text-lg"
                >{{ lang.name }} SDK</strong
              >
              <h6 v-if="!lang.active" class="text-sm text-gray-400">
                (Not out yet!)
              </h6>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.lang {
  @apply text-center bg-gray-900 rounded p-5 cursor-pointer;
  @apply hover:border-2 hover:border-green-400 hover:border-opacity-50 hover:shadow-lg;
}
</style>
