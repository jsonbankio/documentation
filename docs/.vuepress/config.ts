import { defaultTheme, defineUserConfig } from "vuepress";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import * as path from "path";

const componentsDir = path.resolve(__dirname, "../../vues");

export default defineUserConfig({
  lang: "en-US",
  title: "JsonBank Documentation",
  description: "JsonBank Documentation",

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
      "script",
      {
        src: "https://kit.fontawesome.com/9e6e2bddfe.js",
        crossorigin: "anonymous",
      },
    ],
  ],

  markdown: {
    code: { lineNumbers: false },
  },

  plugins: [
    registerComponentsPlugin({
      // options
      componentsDir,
    }),
  ],

  theme: defaultTheme({
    // logo: "/abolish-black.svg",
    // logoDark: "abolish-white.svg",
    navbar: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
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
});
