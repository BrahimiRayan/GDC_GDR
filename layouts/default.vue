<template>
        <MainBar :is-open="open" @update-open="handleDrawerToggle"/>
        <UDrawer 
            v-model:open="open"
             direction="left"
              :dismissible="true" 
              :overlay="false" 
              :handle="false" 

              :ui="{
                content: 'bg-[var(--deep-dark-blue)] text-[var(--creamy-white)]', 
            }"
        >
            

            <template #content>
             <UButton class="absolute top-1 right-1" color="neutral" :class="['bg-transparent' ,'text-primary' ,'hover:bg-red-600/90' , 'rounded-3xl']" variant="solid" icon="i-lucide-x" @click="open = false" size="sm" />
  
            <div class="w-60 min-h-full size-full m-6 flex flex-col" >
                <div class="w-[90%] bg-light-primary rounded-2xl self-center flex p-3 items-center">
                    <NuxtImg src='data:image/jpeg;base64,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' class="w-[40px] h-[40px] rounded-full bg-amber-300 mr-2"/>
                    <div class="flex flex-col gap-1">
                        <h1 class="text-xs font-semibold text-secondary">Welcom Name</h1>
                        <p class="text-[10px] text-gray-500">Statue : {{ isAdmin? 'ADMIN' : 'Employee' }}</p>
                    </div>
                </div>

                <nav class="flex items-start flex-col justify-around mt-10 h-[300px]">
                    <NuxtLink class="flex items-center w-full py-3 pl-3 rounded-xl hover:bg-[var(--green-grace)]/80 transition-all duration-350 ease-in-out" v-for="(route, index) in Routes" :key="index" :to="route.path">
                        <UIcon class="mr-5 size-5" :name="route.icon" />
                        {{ route.name }}
                    </NuxtLink>
                    <NuxtLink class="flex items-center w-full py-3 pl-3 rounded-xl hover:bg-[var(--green-grace)]/80 transition-all duration-350 ease-in-out" v-if="isAdmin" to="/gestion">
                        <UIcon class="mr-5 size-5" name="i-material-symbols-person-outline-rounded" />
                        Gestion des comptes
                    </NuxtLink>
                </nav>
                
            </div>
            
        </template>
        </UDrawer>
                <slot/>
        <footer>
            <div class="w-full h-16 bg-[var(--deep-dark-blue)] flex items-center justify-center">
                <p class="text-[var(--pale-moon)] text-sm">© 2023 All rights reserved</p>
            </div>
        </footer>
</template>
    
<script setup lang='ts'>
// types
type route = {
    name : string , 
    path : string , 
    icon : string
}
// refs
const open = ref(false)
const isAdmin = ref(true);

// datas
const Routes :route [] = [
        {
            name : 'Dashboard',
            path : '/',
            icon : 'i-material-symbols-dashboard-outline'
        },
        {
            name : 'Produits',
            path : '/Produits' , 
            icon : 'i-fluent-mdl2-product-variant'
        },
        {
            name : 'Commander',
            path : '/Commander' ,
            icon : 'i-lsicon-order-outline'
        },
        {
            name : 'History',
            path : '/Histoire' , 
            icon : 'i-material-symbols-light-history-rounded'
        }
];

// functions
    const handleDrawerToggle = (newValue:boolean) => {
     open.value = newValue;
    };
</script>