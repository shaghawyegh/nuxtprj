// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "nuxt-vuefire",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
    "nuxt-headlessui"
  ],

  tailwindcss: {
    exposeConfig: true,
  },
  headlessui: { prefix: "H" },
  app: {
    head: {
      title: "Analytics",
      link: [
    
        //Inter font
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
      ],
    },
  },

  colorMode: {
    classSuffix: "",
  },

  typescript: {
    shim: false,
  },

  imports: {
    imports: [{
      from: "tailwind-variants",
      name: "tv",
    }, {
      from: "tailwind-variants",
      name: "VariantProps",
      type: true,
    }, {
      from: "vue-sonner",
      name: "toast",
      as: "useSonner"
    }],
  },

  vuefire: {
    auth: { enabled: true, sessionCookie: true },
    config: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
    },
  },

  build: {
    transpile: ["vue-sonner"]
  }
});