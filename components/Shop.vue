<template>
    <div v-if="conf" :style="`--bg-color: ${conf.bg}59 ;--bg-card :${conf.bg}50 ; --text-color: ${conf.textColor}; --bg-pub : ${conf.bg}B3 ;`" class="wrapper rounded-xl p-5 border">
        
        <div v-if="conf.logo" class="flex justify-center">
            <img :src="conf.logo" alt="logo" class="w-1/2 h-auto"/>
        </div>

     <header class=" rounded-2xl flex items-center justify-between h-18" :style="`background-color : ${conf.bg};`">
        <h1 :style="`color : ${conf.textColor};`" class="logo ml-3 font-extrabold text-3xl">{{ conf.name }}</h1>

        <nav class="flex items-center justify-around gap-10">
            <UInput type="text" icon="i-line-md-search" placeholder="Rechercher ... " 
                :ui="{
                    base: 'border-white/70 rounded-md placeholder:text-white/60',
                }"
            />

            <ul class="flex items-center gap-3 mr-3">
                <li>
                    <UButton icon="i-mynaui-envelope" label="email" :to="`mailto:${conf.email}`" class="bg-white/50 hover:bg-red-500 hover:translate-y-1 transition-all duration-300 ease-in-out"/>
                </li>
                
                <li>
                    <UButton icon="i-lineicons-phone" label="phone" :to="`tel:${conf.phone}`" class="bg-white/50 hover:bg-blue-500 hover:translate-y-1 transition-all duration-300 ease-in-out"/>
                </li>
            </ul>
        </nav>
     </header>

    <main>
        <!-- pub -->
        <section class="PubColor grid grid-cols-2 place-items-center gap-5 my-12 border h-120 w-[80%] mx-auto rounded-xl">
            <!-- carosel and description-->
             <div class="w-[100%] ml-5">
                <h2 class="logo font-extrabold text-6xl mb-10 ml-4">{{ conf.name }}</h2>
                <p>{{ conf.description }}</p>
                <address v-if="conf.address" class="border border-white/40 cursor-pointer rounded-xl bg-black/20 p-2 w-max mt-8">{{ conf.address }}</address>
             </div>
             <div>
                 <UCarousel
                    v-slot="{ item }"
                    loop
                    :autoplay="{ delay: 5000 }"
                    :items="ProdPics"
                    :ui="{}"
                >
                    <img :src="item" class="h-[98%] border-4 rounded-2xl w-[98%] object-center" alt="product image" />
                </UCarousel>
             </div>
        </section>

        <section>
            <h2 class="logo font-extrabold text-6xl mb-10 ml-4 underline">Nos produits</h2>
            <div id="products_holder" class="grid grid-cols-3 gap-5">
                <div v-for="product in shopProd"  :key="product.id">
                    <div v-if="conf.cardType ==='A'" >
                        <CardsTypeA 
                            :product="product"
                            :fb="conf.fb_url"
                            :ig="conf.ig_url"
                            :email="conf.email"
                            :phone="conf.phone"
                            :address="conf.address"
                            :shipping="conf.livraison"
                            :style="`--font-style: 'Great Vibes', cursive;`"
                        />
                    </div>

                    <div v-else-if="conf.cardType ==='B'">
                        <!-- B TYPE COMPONENET -->
                        <CardsTypeB 
                            :product="product"
                            :fb="conf.fb_url"
                            :ig="conf.ig_url"
                            :email="conf.email"
                            :phone="conf.phone"
                            :address="conf.address"
                            :shipping="conf.livraison"
                            :style="`--font-style: 'Great Vibes', cursive;`"
                        />    
                    </div>

                    <div v-else-if="conf.cardType ==='C' ">
                        <!-- C TYPE COMPONENET -->
                         <CardsTypeC 
                            :product="product"
                            :fb="conf.fb_url"
                            :ig="conf.ig_url"
                            :email="conf.email"
                            :phone="conf.phone"
                            :address="conf.address"
                            :shipping="conf.livraison"
                            :style="`--font-style: 'Great Vibes', cursive;`"
                        />    
                    </div>

                    <div v-else-if="conf.cardType ==='D' ">
                        <!-- D TYPE COMPONENET -->
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="flex items-center justify-between mt-10 p-3 rounded-xl" :style="`background-color : ${conf.bg};`">
        <div>
            <h2>Nos contacts</h2>
        <ul>
            <li>email</li>
            <li>phone</li>
            <li v-if="conf.fb_url">facebook</li>
            <li v-if="conf.ig_url">Instagram</li>
        </ul>

        </div>
        
        <div v-if="conf.xcor !== 0 && conf.ycor !==0">
            <div id="map">
                
                <!-- map from leflet -->
            </div>

            <p v-if="conf.address">
                {{ conf.address }}
            </p>
        </div>

        <div v-else>
            <p v-if="conf.address">
                {{ conf.address }}
            </p>
        </div>
    </footer>
    </div>
</template>
    
<script setup lang='ts'>
import type { Produit, shopConfT } from '~/types/GeneraleT';


    const props = defineProps<{
        conf :shopConfT,
        shopProd : Produit[],
    }>()

    const ProdPics = [
  'https://picsum.photos/468/468?random=1',
  'https://picsum.photos/468/468?random=2',
  'https://picsum.photos/468/468?random=3',
  'https://picsum.photos/468/468?random=4',
  'https://picsum.photos/468/468?random=5',
  'https://picsum.photos/468/468?random=6'
]


//TODO: find a way to get the products using conf.products ... 

        
    
</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');


    *,p, h1, h2, h3, h4, h5, h6,div, span, li, a{
        color: var(--text-color);
    }

    .logo{
        font-family: "Great Vibes", cursive;
        font-style: normal;
    }

    .wrapper{
        background-color: var(--bg-color);
    }

    .PubColor{
        background-color: var(--bg-pub);
    }
    .CardColor{
        background-color: var(--bg-card);
    }
</style>