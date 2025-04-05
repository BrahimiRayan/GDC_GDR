<template>

    <AddProduct />

    <USeparator 
             class="text-[var(--green-grace)] w-xl my-10 mx-auto "
             label="Informations de Stock" 
             :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }"
             />
    <!-- the table  -->

    <div class="flex flex-col flex-1 w-full mt-10 top-0 bg-[#1d1d1d]/30 ">
      <div class="flex items-center justify-between px-4 py-3.5 border border-[var(--pale-moon)] rounded-t-lg">
        <p class="text-white/70 font-bold">Totale produits : <span class="text-red-500/70">2537</span></p>
        <div class="flex items-center gap-3">
            <UInput v-model="globalFilter" class="max-w-sm" placeholder="Chercher un produit ... " icon="i-ci-filter" />
            <UIcon name="i-ph-mouse-scroll-fill" class=" size-6" />
        </div>
      </div>
  
      <UTable
         class="border-x border-b border-[var(--pale-moon)] rounded-b-lg backdrop-blur-md lg:h-[400px] overflow-auto"
         ref="table" v-model:global-filter="globalFilter" :data="produits" :columns="ProduitColumns" 
         :ui="{
            tr: 'hover:bg-white/10 transition-all duration-300 ease-in-out',
            th : 'border-b border-green-500 bg-[var(--deep-dark-blue)]',
         }"
         :sticky="true" />
    </div>


    <USeparator 
             class="text-[var(--green-grace)] w-xl my-10 mx-auto "
             label="Mes produits" 
             :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }"
             />
    <!-- search the product by name -->

    <form @submit.prevent="filterProducts" class="mt-8">
           <UInput
            v-model="nameFilter" 
            class="max-w-sm h-8 indent-0.5 shadow-green-600" 
            placeholder="Chercher un produit ... " 
            icon="i-lucide-search-check" 
            :ui="{
              base : 'rounded-l rounded-r-none',
            }"
            />
            <UButton
              label="Chercher"
              class="bg-green-600 text-[var(--pale-moon)] h-8 border hover:bg-green-700 text-sm "
              size="sm"
              type="submit"
              :ui="{
                base : 'rounded-r rounded-l-none',
              }"
            />
      </form>

      <!-- the cards -->
     <div ref="expandContainer" class="grid grid-cols-3 gap-2 mt-10 bg-[var(--deep-dark-blue)] transition-all duration-300 ease-in-out" 
     :class="isExpanded ? 'h-auto' : 'h-[636px] overflow-hidden'" >
        <!-- the card  -->
       
      <div v-for="product in cardProducts" :key="product.id" class=" relative hover:scale-98 transition-all duration-300 ease-in-out flex items-center gap-1.5 h-50 mb-3 bg-white/10 rounded-xl">
            <div class="h-full w-[40%] border-r-4 border-red-500">
                <!-- <img :src="product.img" class="h-full w-full rounded-l-2xl  " alt=""> -->
                <NuxtImg
                    :src="product.img"
                    class="h-full w-full rounded-l-2xl"
                    :alt="product.name"
                    placeholder="/no-img.png"
                    loading="lazy"
                    format="webp"
                    />
            </div>
            <div>
                <h1 class="text-xl text-red-500 mb-5">{{ product.name }}</h1>
                <p>Acheter.T  : <span class="text-green-500">400400 DZD</span></p>
                <p>Vendus.T   : <span class="text-green-500">403400 DZD</span></p>
                <p>Benifice.T : <span class="text-green-500">3000 DZD</span></p>
            </div>

            <div class="absolute top-0 right-0">
              <UButton
                icon="i-lucide-pencil" 
                class="ml-auto bg-transparent text-green-500 hover:text-green-700 hover:bg-transparent size-9 transition-colors duration-300 ease-in-out"
                size="sm"
                :to="`/Produits/${product.id}`"
              />
            </div> 
        </div>

     </div>
    
     <div class="flex items-center justify-center">

        <UButton
            id="expandBtn"
            :icon= "cardProducts.length>3 ? 'i-lucide-more-horizontal' : ''" 
            class="text-white/50 hover:text-white bg-transparent hover:bg-transparent transition-colors duration-300 ease-in-out size-10"
             size="xl"
            @click="toggleExpand"
        />
        <label for="expandBtn" class="text-white/50 text-sm hover:text-white transition-colors duration-300 ease-in-out">
        {{ isExpanded ? 'Réduire' : 'Afficher plus' }}
      </label>
     </div>


  </template>

<script setup lang="ts">
import { h , resolveComponent} from 'vue'
import type { TableColumn } from '@nuxt/ui'

// expanding the card container
const isExpanded = ref(false)
const expandContainer = ref<HTMLDivElement | null>(null)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
// types
type Produit = {
  id: string
  name: string
  img? :string
  quantite : number
  prix_achat: number
  prix_vente: number
  benifice: number
  montant_stock: number
}
// this will be the data
const produits: Produit[] | [] = [
    {
        id: '1',
        name: 'Produit 1',
        quantite: 100,
        img : 'https://www.sunspel.fr/cdn/shop/files/mtsh0181-bkaa-1.jpg?v=1739884037',
        prix_achat: 1000,
        prix_vente: 1500,
        benifice: 500,
        montant_stock: 150000
        },
        {
        id: '2',
        name: 'Produit 2',
        img : '/no-image.png',
        quantite: 200,
        prix_achat: 2000,
        prix_vente: 2500,
        benifice: 500,
        montant_stock: 500000
        },
        {
        id: '3',
        name: 'Produit 3',
        quantite: 300,
        prix_achat: 3000,
        prix_vente: 3500,
        benifice: 500,
        montant_stock: 1000000
        } ,
        {
        id: '4',
        name: 'Produit 4',
        quantite: 300,
        prix_achat: 3000,
        prix_vente: 3500,
        benifice: 500,
        montant_stock: 1000000
        } ,     
        {
        id: '5',
        name: 'Produit 5',
        quantite: 300,
        prix_achat: 3000,
        prix_vente: 3500,
        benifice: 500,
        montant_stock: 1000000
        } ,
        {
    id: '6',
    name: 'Produit 6',
    quantite: 600,
    prix_achat: 6000,
    prix_vente: 6500,
    benifice: 500,
    montant_stock: 600 * 6500 
  },
  {
    id: '7',
    name: 'Produit 7',
    quantite: 700,
    prix_achat: 7000,
    prix_vente: 7500,
    benifice: 500,
    montant_stock: 700 * 7500
  },
  {
    id: '8',
    name: 'Produit 8',
    quantite: 800,
    prix_achat: 8000,
    prix_vente: 8500,
    benifice: 500,
    montant_stock: 800 * 8500
  },
  {
    id: '9',
    name: 'Produit 9',
    quantite: 900,
    prix_achat: 9000,
    prix_vente: 9500,
    benifice: 500,
    montant_stock: 900 * 9500
  },
  {
    id: '10',
    name: 'Produit 10',
    quantite: 1000,
    prix_achat: 10000,
    prix_vente: 10500,
    benifice: 500,
    montant_stock: 1000 * 10500
  },
  {
    id: '11',
    name: 'Produit 11',
    quantite: 1100,
    prix_achat: 11000,
    prix_vente: 11500,
    benifice: 500,
    montant_stock: 1100 * 11500
  },
  {
    id: '12',
    name: 'Produit 12',
    quantite: 1200,
    prix_achat: 12000,
    prix_vente: 12500,
    benifice: 500,
    montant_stock: 1200 * 12500
  },
  {
    id: '13',
    name: 'Produit 13',
    quantite: 1300,
    prix_achat: 13000,
    prix_vente: 13500,
    benifice: 500,
    montant_stock: 1300 * 13500 
  },
  {
    id: '14',
    name: 'Produit 14',
    quantite: 1400,
    prix_achat: 14000,
    prix_vente: 14500,
    benifice: 500,
    montant_stock: 1400 * 14500 
  },
  {
    id: '15',
    name: 'Produit 15',
    quantite: 1500,
    prix_achat: 15000,
    prix_vente: 15500,
    benifice: 500,
    montant_stock: 1500 * 15500 
  },
  {
    id: '16',
    name: 'Produit 16',
    quantite: 1600,
    prix_achat: 16000,
    prix_vente: 16500,
    benifice: 500,
    montant_stock: 1600 * 16500
  },
  {
    id: '17',
    name: 'Produit 17',
    quantite: 1700,
    prix_achat: 17000,
    prix_vente: 17500,
    benifice: 500,
    montant_stock: 1700 * 17500
  },
  {
    id: '18',
    name: 'Produit 18',
    quantite: 1800,
    prix_achat: 18000,
    prix_vente: 18500,
    benifice: 500,
    montant_stock: 1800 * 18500
  },
  {
    id: '19',
    name: 'Produit 19',
    quantite: 1900,
    prix_achat: 19000,
    prix_vente: 19500,
    benifice: 500,
    montant_stock: 1900 * 19500
  },
  {
    id: '20',
    name: 'Produit 20',
    quantite: 2000,
    prix_achat: 20000,
    prix_vente: 20500,
    benifice: 500,
    montant_stock: 2000 * 20500 
  },
  {
    id: '21',
    name: 'Produit 21',
    quantite: 2100,
    prix_achat: 21000,
    prix_vente: 21500,
    benifice: 500,
    montant_stock: 2100 * 21500 
  },
  {
    id: '22',
    name: 'Produit 22',
    quantite: 2200,
    prix_achat: 22000,
    prix_vente: 22500,
    benifice: 500,
    montant_stock: 2200 * 22500
  },
  {
    id: '23',
    name: 'Produit 23',
    quantite: 2300,
    prix_achat: 23000,
    prix_vente: 23500,
    benifice: 500,
    montant_stock: 2300 * 23500
  },
  {
    id: '24',
    name: 'Produit 24',
    quantite: 2400,
    prix_achat: 24000,
    prix_vente: 24500,
    benifice: 500,
    montant_stock: 58800000
  },
  {
    id: '25',
    name: 'Produit 25',
    quantite: 2500,
    prix_achat: 25000,
    prix_vente: 25500,
    benifice: 500,
    montant_stock: 63750000
  }
        
]  
// the data for the cards
const cardProducts = ref<Produit[]>(produits);

// filter on the cards
const nameFilter = ref('');
const filterProducts = ()=> {
  
    if(nameFilter.value === ''){
        cardProducts.value = produits;
    }else{
        cardProducts.value = produits.filter((product) => {
            return product.name.toLowerCase().includes(nameFilter.value.toLowerCase());
        });
    }
}


// this is the table component
const UIcon = resolveComponent('UIcon')
// you will change inside the cell's value
const ProduitColumns: TableColumn<Produit>[] = [
  {
    accessorKey: 'id',
    header: ()=>{
        return h('div', { class: 'text-white/50 font-extrabold' }, '#')
    },
    cell: ({ row }) =>  h('div', { class: 'text-white/50 font-extrabold' }, `#${row.getValue('id')}`)
  },
  {
    accessorKey: 'name',
    header: 'Intitule'
  },
  {
    accessorKey: 'quantite',
    header: 'Quantite',
    cell : ({ row }) => {
      return h('div', { class: 'text-blue-400 font-bold' }, row.getValue('quantite'))
    }
  },
  {
    accessorKey: 'prix_achat',
    header: 'Prix U. Achat',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('prix_achat'))

      const formatted = new Intl.NumberFormat('fr', {
        style: 'currency',
        currency: 'DZD'
      }).format(amount)

      return h('div', { class: 'text-red-400 font-bold' }, formatted)
    }
  },
  {
    accessorKey: 'prix_vente',
    header: 'Prix U. Vente',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('prix_vente'))

      const formatted = new Intl.NumberFormat('fr', {
        style: 'currency',
        currency: 'DZD'
      }).format(amount)

      return h('div', { class: ' font-medium text-green-400' }, formatted)
    }
  },
    {
        accessorKey: 'benifice',
        header: 'Benifice Par U',
        cell: ({ row } ) => {
        const amount = Number.parseFloat(row.getValue('benifice'))
    
        const formatted = new Intl.NumberFormat('fr', {
            style: 'currency',
            currency: 'DZD'
        }).format(amount)
    
        return h('div', { class: 'text-yellow-400 font-bold' }, formatted)
        }
    },
  {
    header : 'Montant Stock',
    accessorKey: 'montant_stock',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('montant_stock'))

      const formatted = new Intl.NumberFormat('fr', {
        style: 'currency',
        currency: 'DZD'
      }).format(amount)

      return h('div', { class: 'font-bold' }, formatted)
    }
  },
  {
    header : 'Supprimer',
    accessorKey: 'id',
    cell: ({ row }) => {
        const id : number = row.getValue('id')
      return h(UIcon, {name : 'i-solar-trash-bin-trash-broken' ,class: 'font-bold p-2 bg-red-700 rounded size-8 hover:bg-red-500 cursor-pointer transition-bg duration-300 ease-in-out' , id: id , onClick : ()=>handelDelete(id)}, '')
    }
  }
]
// here is the delete function , do modify this after working on the back...
const handelDelete = (id: number) => {
  console.log('delete', id);

}

const globalFilter = ref('')

</script>

