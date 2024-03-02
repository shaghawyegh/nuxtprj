<template>
    <section class="grid gap-5 md:grid-cols-2">
      <!-- Revenue -->
      <div class="rounded-lg border bg-card p-6">
        <div class="flex items-center justify-between">
          <span class="shrink-0">
            <Icon name="heroicons:banknotes" class="h-4 w-4 text-muted-foreground" />
          </span>
          <p class="text-sm font-medium">درآمد کل</p>

        </div>
  
        <p class="mt-1.5 text-xl font-extrabold text-right">45,231.89</p>
        <p class="text-xs text-muted-foreground text-right">20 % بیشتر از ماه گذشته</p>
      </div>
      <!-- Sales -->
      <div class="rounded-lg border bg-card p-6">
        <div class="flex items-center justify-between">
          
          <span class="shrink-0">
            <Icon name="heroicons:credit-card" class="h-4 w-4 text-muted-foreground" />
          </span>
          <p class="text-sm font-medium">فروش</p>
        </div>
  
        <p class="mt-1.5 text-xl font-extrabold text-right">12,231</p>
        <p class="text-xs text-muted-foreground text-right">13.2% بیشتر از ماه گذشته</p>
      </div>
    </section>
  </template>