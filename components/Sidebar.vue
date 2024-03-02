<template>
    <aside class="sticky top-[65px] h-[calc(100vh-65px)] py-5">
      <div
        class=" flex h-full w-full flex-col gap-5 overflow-y-auto rounded-md border bg-card pb-5 scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md"
      >
        <SidebarItem :links="menu" />
  
        <div class="mt-auto text-center">
          <SidebarItem :links="bottomMenu" />
        </div>
      </div>
    </aside>
  </template>
  
  <script setup lang="ts">
    const bottomMenu = [
      {
        title: "تنظیمات",
        icon: "heroicons:cog-8-tooth",
        
        
      },
      {
        title: "راهنمایی",
        icon: "heroicons:question-mark-circle",
      },
      {
        title: "خروج",
        icon: "heroicons:arrow-left-on-rectangle",
      },
    ];
    const menu = [
      {
        title: "داشبورد",
        icon: "heroicons:home",
      },
      {
        title: "مشتریان",
        icon: "heroicons:user-group",
        items: [
          { title: "List" },
          { title: "Create" },
          { title: "Edit" },
          { title: "Delete" },
          { title: "Details" },
        ],
      },

      {
        title: "محصولات",
        icon: "heroicons:cube",
        items: [
          { title: "لیست" },
          { title: "ایجاد" },
          { title: "ویرایش" },
          { title: "حذف" },
          { title: "جزییات" },
        ],
      },

      {
        title: "آنالیز",
        icon: "heroicons:chart-pie",
        items: [{ title: "Overview" }, { title: "Statistics" }, { title: "Trends" }],
      },
    ];
  </script>