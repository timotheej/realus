export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Realus | Compare-toi, améliore tes relations",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/css/main.scss"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    [
      "@nuxtjs/fontawesome",
      {
        component: "fa",
        imports: [
          {
            set: "@fortawesome/fontawesome-free-solid",
            icons: [
              "faBars",
              "faQuestion",
              "faClipboardList",
              "faSync",
              "faChevronRight",
              "faAngleRight"
            ]
          }
        ]
      }
    ]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios"],

  axios: {
    // proxy: true
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  loading: {
    color: "white",
    height: "4px"
  }
};
