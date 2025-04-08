<template>
    <div v-for="product in cardProducts" :key="product.id"
      class=" relative hover:scale-98 transition-all duration-300 ease-in-out flex items-center gap-1.5 h-50 mb-3 bg-white/10 rounded-xl">
      <div class="h-full w-[40%] border-r-4 border-red-500">
        <!-- <img :src="product.img" class="h-full w-full rounded-l-2xl  " alt=""> -->
        <NuxtImg :src="product.img" class="h-full w-full rounded-l-2xl" :alt="product.name" placeholder="/no-img.png"
          loading="lazy" format="webp" />
      </div>
      <div class="text-sm font-bold w-[55%]">
        <h1 class="text-xl text-red-500 mb-5">{{ product.name }}</h1>
        <p class="flex justify-between mb-2"><span>Catégorie </span> <UBadge :class="Catecolor(product.category)">{{ product.category }}</UBadge></p>
        <p class="flex justify-between mb-2"> <span>Acheter.T </span>  <span class="text-green-500">400400 DZD</span></p>
        <p class="flex justify-between mb-2"><span>Vendus.T </span> <span class="text-green-500">403400 DZD</span></p>
        <p class="flex justify-between mb-2"><span>Benifice.T </span> <span class="text-green-500">3000 DZD</span></p>
      </div>

      <div class="absolute top-0 right-0">
        <UButton icon="i-lucide-pencil"
          class="ml-auto bg-transparent text-green-500 hover:text-green-700 hover:bg-transparent size-9 transition-colors duration-300 ease-in-out"
          size="sm" :to="`/Produits/${product.id}`" />
      </div>
    </div>
</template>
    
<script setup lang='ts'>
import { Catecolor } from '~/Composables/useTheme';

    defineProps(['cardProducts']);
</script>
