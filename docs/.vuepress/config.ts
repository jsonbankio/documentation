import { defaultTheme, defineUserConfig, viteBundler } from "vuepress";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import * as path from "node:path";
import { searchPlugin } from "@vuepress/plugin-search";

import tailwindcss from "tailwindcss";
// @ts-ignore
import autoprefixer from "autoprefixer";

const componentDir = path.resolve(__dirname, "../../vues");

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
  ],

  markdown: {
    code: { lineNumbers: false },
  },

  theme: defaultTheme({
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
          {
            text: "Rust",
            link: "/sdks/rust/",
          },
        ],
      },
      { text: "Webhooks", link: "/webhooks/" },
      { text: "Github", link: "https://github.com/jsonbankio" },
      { text: "Twitter", link: "https://twitter.com/jsonbank" },
      {
        text: "Links",
        children: [
          {
            text: "jsonbank.io",
            link: "https://jsonbank.io",
          },
          {
            text: "blog.jsonbank.io",
            link: "https://blog.jsonbank.io",
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
      componentsDir: componentDir,
    }),

    searchPlugin({
      maxSuggestions: 10,
    }),
  ],
});
