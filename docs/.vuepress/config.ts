import {defineUserConfig} from 'vuepress'
import {registerComponentsPlugin} from "@vuepress/plugin-register-components";
import * as path from "path";


const componentsDir = path.resolve(__dirname, '../vues');
export default defineUserConfig({
    lang: "en-US",
    title: "JSB Docs",
    description: "JsonBank Documentation",

    head: [
        // [
        //   'link',
        //   {
        //     rel: 'canonical',
        //     href: 'https://abolish.trapcode.io'
        //   },
        // ],
        [
            "link",
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@480&family=PT+Sans&family=Roboto+Condensed&display=swap"
            }
        ]
    ],

    markdown: {
        code: {lineNumbers: false}
    },

    plugins: [
        registerComponentsPlugin({
            // options
            componentsDir,
        }),
    ],

    // themeConfig: {
    //     // logo: "/abolish-black.svg",
    //     // logoDark: "abolish-white.svg",
    //     navbar: [
    //         { text: "Home", link: "/" },
    //         { text: "Guide", link: "/guide/" },
    //         { text: "API", link: "/api/" },
    //     ]
    // },
    // plugins: [
    //     [
    //         "@vuepress/search",
    //         {
    //             searchMaxSuggestions: 10
    //         }
    //     ]
    // ]
})