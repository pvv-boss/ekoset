import { NuxtConfig } from "@nuxt/types";

const config: NuxtConfig = {
    components: true,
    // modern: true,
    srcDir: "src/",
    loading: {
        color: "#ac1315",
    },

    loadingIndicator: {
        name: "circle",
        color: "#3B8070",
        background: "white",
    },

    head: {
        htmlAttrs: {
            prefix: "og:http://ogp.me/ns#",
            lang: "ru",
        },

        meta: [
            {
                charset: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                name: "yandex-verification",
                content: "5455f453f5d27f37",
            },
            {
                name: "google-site-verification",
                content: "_MNkDpJx7hbhofvXyZ0Dnx6STqHo0J43UtziKQ_If3M",
            },
        ],

        bodyAttrs: {
            itemscope: "",
            itemtype: "https://schema.org/WebPage",
        },

        link: [
            {
                rel: "preload",
                href: "https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css",
                as: "style",
            },
            {
                rel: "stylesheet",
                href: "https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css",
            },

            {
                rel: "icon",
                type: "image/x-icon",
                href: "/favicon.png",
            },
        ],
    },

    css: ["~assets/scss/index.scss"],

    pageTransition: {
        css: false,
    },

    plugins: [
        {
            src: "@/plugins/initialize-app",
        },
        {
            src: "@/plugins/brc-dialog-plugin",
            mode: "client",
        },
        {
            src: "@/plugins/vuelidate",
            mode: "client",
        },
        {
            src: "@/plugins/brc-directives",
            mode: "client",
        },
        {
            src: "@/plugins/yandex-share",
            mode: "client",
        },
        {
            src: "@/plugins/brc-buefy-plugin",
        },
        {
            src: "@/plugins/vue-lazyload",
        },
        {
            src: "@/plugins/vue-imask.client",
            mode: "client",
        },
        {
            src: "@/plugins/modal-manager.client",
            mode: "client",
        },
    ],

    router: {
        prefetchLinks: false,
        middleware: ["baseMiddleware", "requiresAuthorize"],
    },

    buildModules: [
        "nuxt-webfontloader",
        "nuxt-purgecss",
        "@nuxtjs/google-analytics",
        "@nuxtjs/style-resources",
        [
            "@nuxt/typescript-build",
            {
                typeCheck: true,
                ignoreNotFoundWarnings: true,
                eslint: true,
            },
        ],
    ],

    modules: [
        "cookie-universal-nuxt",
        [
            "@nuxtjs/router",
            {
                path: "src/routers",
                fileName: "index.ts",
            },
        ],
        [
            "@nuxtjs/yandex-metrika",
            {
                id: "64542580",
                webvisor: true,
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
            },
        ],
    ],

    googleAnalytics: {
        id: "UA-179741331-1",
    },

    styleResources: {
        scss: ["~assets/scss/variables.scss"],
    },

    build: {
        extractCSS: {
            ignoreOrder: true,
        },

        optimization: {
            removeEmptyChunks: true,
            splitChunks: {
                chunks: "all",
            },
        },

        splitChunks: {
            layouts: false,
            pages: true,
            commons: true,
        },
        //,

        // filenames: {
        //   css: ({
        //     isDev
        //   }) => isDev ? '[name].css' : '[contenthash].css',
        // }

        // transpile: ['vue-imask']
    },

    render: {
        compressor: false,
        resourceHints: false,
        etag: false,
        crossorigin: "anonymous",
    },

    purgeCSS: {
        mode: "postcss",
        // whitelistPatterns: [/brc.*?$/, /vgt.*?$/, /vue.*?$/, , /file.*?$/, /grid.*?$/, /help.*?$/, ]
        whitelistPatterns: [/brc.*?$/, /vgt.*?$/, /vue.*?$/, /ql.*?$/, /theme.*?$/],
        whitelist: ["label", "field-label", "sr-only"],
    },

    webfontloader: {
        google: {
            families: ["Roboto:400,500:cyrillic&display=swap"],
        },
    },

    server: {
        port: 8010,
        host: "localhost",
    },
};

export default config;
