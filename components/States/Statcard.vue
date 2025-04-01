<template>
    <div class="flex items-center justify-center gap-10 mb-10 w-full py-4 h-120">

        <div class="h-[80%] bg-amber-50/10 w-[30%] p-4 rounded-2xl overflow-auto transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105">
            <div class="flex gap-2">
                <UIcon name="i-game-icons-money-stack" class="text-[var(--green-grace)] size-6 mt-1" />
                <h2 class="text-lg font-bold mb-3">Produits-Best sellers</h2>
            </div>
            <ul>
                <li class="flex items-center justify-between mb-2 border-b">
                    <p class="font-bold">Produit 1</p>
                    <p class="text-[var(--green-grace)]">2000 DA</p>
                </li>
                <li class="flex items-center justify-between mb-2 border-b">
                    <p class="font-bold">Produit 2</p>
                    <p class="text-[var(--green-grace)]">1500 DA</p>
                </li>
                <li class="flex items-center justify-between mb-2 border-b">
                    <p class="font-bold">Produit 3</p>
                    <p class="text-[var(--green-grace)]">1000 DA</p>
                </li>
                <li class="flex items-center justify-between mb-2 border-b">
                    <p class="font-bold">Produit 4</p>
                    <p class="text-[var(--green-grace)]">500 DA</p>
                </li>
            </ul>

        </div>

        <div class="grid lg:grid-cols-2 gap-8 w-[65%] h-100 relative p-4">
            <!-- Red Glow -->
            <div
                class="h-48 border-2 border-[rgba(239,68,68,0.5)] rounded-xl bg-[var(--deep-dark-blue)]  transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] hover:scale-105 flex flex-col items-center justify-center">
                <UIcon name="i-vaadin-stock" class=" size-8" />
                <h2 class="text-red-500 font-bold my-2 text-xl">Totale produits en Stock</h2>
                <p class="text-red-400 text-5xl mb-3 font-extrabold">3664 <span class="text-gray-400 text-xs">produits</span></p>
                <p class="text-red-400 tracking-wider">548900 <span class="text-gray-400 text-xs font-bold">DA</span></p>
            </div>

            
            <!-- Blue Glow -->
            <div
                class="h-48 border-2 border-[rgba(59,130,246,0.5)] rounded-xl bg-[var(--deep-dark-blue)]  transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105 flex flex-col items-center justify-center">
                <UIcon name="i-icons8-buy" class=" size-10" />
                <h2 class="text-blue-500 font-bold my-1 text-xl">Totale Produits Acheter </h2>
                <p class="text-blue-400 text-5xl mb-3 font-extrabold">489 <span class="text-gray-400 text-xs">produits</span></p>
                <p class="text-blue-400 tracking-wider">98200 <span class="text-gray-400 text-xs font-bold">DA</span></p>
            </div>

            <!-- Green Glow -->
            <div
                class="h-48 border-2 border-[rgba(34,197,94,0.5)] rounded-xl bg-[var(--deep-dark-blue)]  transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] hover:scale-105 flex flex-col items-center justify-center">
                <UIcon name="i-icons8-buy" class=" size-10" />
                <h2 class="text-green-500 font-bold my-1 text-xl">Totale de produits vendus </h2>
                <p class="text-green-400 text-5xl mb-3 font-extrabold">1200 <span class="text-gray-400 text-xs">produits</span></p>
                <p class="text-green-400 tracking-wider">152000 <span class="text-gray-400 text-xs font-bold">DA</span></p>
            </div>

            <!-- Purple Glow -->
            <div
                class="h-48 border-2 border-[rgba(168,85,247,0.5)] rounded-xl bg-[var(--deep-dark-blue)]  transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:scale-105 flex flex-col items-center justify-center">
                <UIcon name="i-icon-park-outline-view-list" class=" size-8" />
                <h2 class="text-purple-500 font-bold my-1 text-xl">Totale Commandes effectuées </h2>
                <p class="text-purple-400 text-5xl mb-3 font-extrabold">48<span class="text-gray-400 text-xs">Commandes</span></p>
               <NuxtLink to="/Histoire"><p class="text-purple-400 tracking-wider underline text-sm rounded">voir plus</p></NuxtLink> 
            </div>
        </div>
    </div>
</template>
