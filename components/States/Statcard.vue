<template>
    <div class="flex items-center justify-center gap-10 mb-10 w-full py-4 h-120">

        <div class="h-full mt-19 bg-amber-50/10 w-[30%] p-4 rounded-2xl overflow-auto transition-all duration-300 ">
            <div class="border-b mb-3 border-b-white/30">
                <div class="flex gap-2">
                    <UIcon name="i-lucide-shopping-bag" class="text-[var(--green-grace)] size-5 mt-1" />
                    <h2 class="text-lg font-bold">Produits en stock</h2>
                </div>
                <span class="text-xs mb-1 ml-2 text-white/30">Liste des produits disponibles en stock ce mois-ci.</span>
            </div>


            <div class="">
                <div v-if="shopProducts && shopProducts.length > 0">
                 <div  v-for="( p, index ) in shopProducts" :key="index" class="flex justify-between items-center border p-2 rounded-xl border-white/20 hover:border-white/60 hover:scale-105 transition-color duration-300 ease-in-out mb-3">
                    
                    <div class="flex items-center gap-2">
                        <UAvatar
                            class="w-9 h-9 rounded-lg bg-green-500 text-white"
                            :src="p.image"
                            :alt="p.name.toUpperCase()"
                        />
                        <p class="text-sm font-bold"> {{p.name}} </p>
                    </div>
    
                    <p class="text-green-600 font-extrabold">{{ p.numberInStock }} <span class="text-white/30 text-xs ">unité</span></p>
    
                 </div>

                </div>

                <div v-else>
                <p class="text-xl text-white/50 font-bold text-center mt-[40%]">Aucun produit en stock</p>
                </div>

            </div>
            


            </div>

        <div class="grid lg:grid-cols-2 gap-8 w-[65%] h-100 relative p-4">
            <!-- Red Glow -->
             <NuxtLink to="/Produits">
                 <div
                     class="h-48 border-2 border-[rgba(239,68,68,0.5)] rounded-xl bg-[var(--deep-dark-blue)]  transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] hover:scale-105 flex flex-col items-center justify-center">
                     <UIcon name="i-vaadin-stock" class=" size-8" />
                     <h2 class="text-red-500 font-bold my-2 text-xl">Totale produits en Stock</h2>
                     <p class="text-red-400 text-5xl mb-3 font-extrabold">{{ totalStockProducts || 0 }} <span class="text-gray-400 text-xs">produits</span></p>
                     
                 </div>
             </NuxtLink>

            
            <!-- Blue Glow -->
             <NuxtLink to="/Produits">
                 <div
                     class="h-48 border-2 border-[rgba(59,130,246,0.5)] rounded-xl bg-[var(--deep-dark-blue)]  transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105 flex flex-col items-center justify-center">
                     <UIcon name="i-icons8-buy" class=" size-10" />
                     <h2 class="text-blue-500 font-bold my-1 text-xl">Totale Unité Acheter </h2>
                     <p class="text-blue-400 text-5xl mb-3 font-extrabold">{{totalProductBought || 0}} <span class="text-gray-400 text-xs">unités</span></p>
                     
                 </div>
             </NuxtLink>

            <!-- Green Glow -->
             <NuxtLink to="/Produits">
                 <div
                     class="h-48 border-2 border-[rgba(34,197,94,0.5)] rounded-xl bg-[var(--deep-dark-blue)]  transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] hover:scale-105 flex flex-col items-center justify-center">
                     <UIcon name="i-icons8-buy" class=" size-10" />
                     <h2 class="text-green-500 font-bold my-1 text-xl">Totale Unité vendus </h2>
                     <p class="text-green-400 text-5xl mb-3 font-extrabold">{{ totalProductSelled || 0 }} <span class="text-gray-400 text-xs">unités</span></p>
                 </div>
             </NuxtLink>

            <!-- Purple Glow -->
            <NuxtLink to="/Commande">
                <div
                    class="h-48 border-2 border-[rgba(168,85,247,0.5)] rounded-xl bg-[var(--deep-dark-blue)]  transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105 flex flex-col items-center justify-center">
                    
                    <UIcon name="i-icon-park-outline-view-list" class=" size-8" />
                    <h2 class="text-purple-500 font-bold my-1 text-xl">Totale Commandes effectuées </h2>
                    <p class="text-purple-400 text-5xl mb-3 font-extrabold">{{ totalCommand || 0 }}<span class="text-gray-400 text-xs">Commandes</span></p>
                   
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { shopProductsType } from '~/types/GeneraleT';




defineProps<{
    totalStockProducts : number | undefined,
    totalProductSelled : number,
    totalProductBought : number,
    totalCommand : number | undefined,
    shopProducts : shopProductsType | undefined
}>()

</script>
