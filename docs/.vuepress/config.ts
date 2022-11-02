import { defaultTheme, defineUserConfig, viteBundler } from "vuepress";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import * as path from "path";
import { searchPlugin } from "@vuepress/plugin-search";

import tailwindcss from "tailwindcss";
// @ts-ignore
import autoprefixer from "autoprefixer";

const componentsDir = path.resolve(__dirname, "../../vues");

// @ts-ignore
export default defineUserConfig({
  lang: "en-US",
  title: "JsonBank Documentation",
  description: "JsonBank.io Documentation",

  head: [
    [
      "link",
      {
        rel: "canonical",
        href: "https://docs.jsonbank.io",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@480&family=PT+Sans&family=Roboto+Condensed&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "/icons/css/all.min.css",
      },
    ],
    // favicon
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    // [
    //   "script",
    //   {
    //     src: "https://kit.fontawesome.com/9e6e2bddfe.js",
    //     crossorigin: "anonymous",
    //   },
    // ],
  ],

  markdown: {
    code: { lineNumbers: false },
  },

  theme: defaultTheme({
    // logo: "/abolish-black.svg",
    // logoDark: "abolish-white.svg",
    navbar: [
      { text: "Home", link: "/" },
      {
        text: "SDKs",
        children: [
          {
            text: "Choose your language",
            link: "/sdks/",
          },
          {
            text: "Javascript",
            link: "/sdks/javascript/",
          },
          {
            text: "GoLang",
            link: "/sdks/golang/",
          },
        ],
      },
      { text: "Webhooks", link: "/webhooks/" },
      {
        text: "Links",
        children: [
          {
            text: "jsonbank.io",
            link: "https://jsonbank.io",
          },
        ],
      },
    ],
  }),

  bundler: viteBundler({
    viteOptions: {
      css: {
        postcss: {
          plugins: [tailwindcss, autoprefixer],
        },
      },
    },
  }),

  plugins: [
    registerComponentsPlugin({
      // options
      componentsDir,
    }),

    searchPlugin({
      maxSuggestions: 10,
    }),
  ],
});
