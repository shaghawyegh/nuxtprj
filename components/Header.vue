<template>
    <header class="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <!-- Container of flex -->
      <div class="container flex h-16 items-center justify-between">
        <!-- Logo and page title -->
        <div class="flex items-center gap-3">
            <UiButton @click="logout" size="icon-sm" variant="ghost" title="Logout">
              <span class="sr-only">Logout</span>
              <Icon class="h-4 w-4" name="lucide:log-out" />
          </UiButton>
  
          <!-- Profile Dropdown menu -->
          <HMenu as="div" class="relative">
            <HMenuButton
              class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border bg-background"
            >
              <img
                src="https://randomuser.me/api/portraits/med/men/75.jpg"
                alt="Logged in user"
                class="h-full w-full"
              />
            </HMenuButton>
            <TransitionScale :scale="0.8" origin="top right">
              <HMenuItems
                class="absolute right-0 z-10 mt-3 w-48 rounded-md border bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div class="border-b px-3 py-1.5 text-sm">
                  <p class="font-semibold">{{ user?.displayName }}</p>
                </div>
                <div class="p-1">
                  <template v-for="(p, i) in profileMenuOptions" :key="i">
                    <HMenuItem v-if="!p.divider" v-slot="{ active }">
                      <button
                        :class="[active && 'bg-muted']"
                        class="justify-center inline-flex w-full rounded-md p-2 text-sm font-medium"
                      >
                        {{ p.title }}
                      </button>
                    </HMenuItem>
                    <hr v-if="p.divider" class="my-1" />
                  </template>
                </div>
              </HMenuItems>
            </TransitionScale>
          </HMenu>
          
        </div>
  
        <!-- Right side of header -->
        <div class="flex items-center gap-5">
          <button
            @click="toggleTheme"
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-background"
          >
            <Icon name="heroicons:sun" class="h-5 w-5" />
          </button>
          <NuxtLink class="text-xl font-bold" to="/">آنالیز داده</NuxtLink>
          <img
            src="https://img.logoipsum.com/296.svg"
            alt="Analytics logo"
            class="h-7 w-7 object-contain"
          />



        </div>
      </div>
      <!-- Mobile menu -->
      <MobileMenu v-model="isOpen" />
    </header>
  </template>
  
  <script setup lang="ts">
  import { signOut } from "firebase/auth";
    const auth = useFirebaseAuth();
    const user = useCurrentUser();
    const mode = useColorMode();
    const toggleTheme = () => {
      mode.value = mode.value === "dark" ? "light" : "dark";
    };
    definePageMeta({ middleware: "auth" });
    useSeoMeta({
      title: "Pets",
      description: "Manage your pets",
    });
  
    // Items that will be displayed in menu
    const profileMenuOptions = [
      { title: "پروفایل" },
      { title: "فاکتور" },
      { title: "تنظیمات" },
      { title: "فروش" },
    ];
  
    // Used to open/close menu
    const isOpen = ref(false);
    const logout = async () => {
      await signOut(auth!);
      await navigateTo("/", { replace: true });
    };
  </script>