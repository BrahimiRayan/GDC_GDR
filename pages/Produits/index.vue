<template>
  <UBreadcrumb :items="item" class="mt-8 " />
  <div class="flex justify-between ">
    <div class="ml-4">
      <AddProduct />
      <SelledProduct :produits="produits"/>
      <BoughtProduct :produits="produits"/>
    </div>
    <div class=" w-[20%] bg-[url('/state.png')] bg-no-repeat bg-contain bg-right">
    </div>

  </div>

  <USeparator class="text-[var(--green-grace)] w-xl my-10 mx-auto " label="Informations de Stock"
    :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />
  <!-- the table  -->

  <div class="flex flex-col flex-1 w-full mt-10 top-0 bg-[#1d1d1d]/30 ">
    <div class="flex items-center justify-between px-4 py-3.5 border border-[var(--pale-moon)] rounded-t-lg">
      <p class="text-white/70 font-bold">Totale produits : <span class="text-red-500/70">{{ produits.length }}</span></p>
      <div class="flex items-center gap-3">
        <UInput v-model="globalFilter" class="max-w-sm" placeholder="Chercher un produit ... " icon="i-ci-filter" />
        <UIcon name="i-ph-mouse-scroll-fill" class=" size-6" />
      </div>
    </div>

    <UTable class="border-x border-b border-[var(--pale-moon)] rounded-b-lg backdrop-blur-md lg:h-[400px] overflow-auto"
      ref="table" v-model:global-filter="globalFilter" :data="produits" :columns="ProduitColumns" :ui="{
        tr: 'hover:bg-white/10 transition-all duration-300 ease-in-out',
        th: 'border-b border-green-500 bg-[var(--deep-dark-blue)]',
      }" :sticky="true" />
  </div>


  <USeparator class="text-[var(--green-grace)] w-xl my-10 mx-auto " label="Mes produits"
    :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />
  <!-- search the product by name -->

  <form @submit.prevent="filterProducts" class="mt-8 flex">
    <UInput v-model="nameFilter" class="max-w-sm h-8 indent-0.5 shadow-green-600" placeholder="Chercher un produit ... "
      icon="i-lucide-search-check" :ui="{
        base: 'rounded-l rounded-r-none',
      }" />
    <UButton label="Chercher" class="bg-green-600 text-[var(--pale-moon)] h-8 border hover:bg-green-700 text-sm "
      size="sm" 
      icon="i-lucide-search"
      type="submit"
       :ui="{
        base: 'rounded-none',
      }" />
      <UButton label="Reset" class="bg-green-600 text-[var(--pale-moon)] h-8 border hover:bg-green-700 text-sm "
      size="sm" 
      type="reset"
      @click="resetProducts"
      icon="i-carbon-reset"
       :ui="{
        base: 'rounded-r rounded-l-none',
      }" />
  </form>

  <!-- the cards -->
  <div ref="expandContainer"
    class="grid grid-cols-3 gap-2 mt-10 bg-[var(--deep-dark-blue)] transition-all duration-300 ease-in-out"
    :class="isExpanded ? 'h-auto' : 'h-[646px] overflow-hidden'">
    <!-- the card  -->
      <div v-if="cardProducts.length === 0"> Vous n'avez pas de produits dans le stock.</div>
        <CardsProducts v-else :cardProducts="cardProducts"/>
      </div>

      <div v-if="cardProducts.length > 9" class="flex items-center justify-center">

    <UButton id="expandBtn" :icon="cardProducts.length > 9 ? 'i-lucide-more-horizontal' : ''"
      class="text-white/50 hover:text-white bg-transparent hover:bg-transparent transition-colors duration-300 ease-in-out size-10"
      size="xl" @click="toggleExpand" />
    <label for="expandBtn" class="text-white/50 text-sm hover:text-white transition-colors duration-300 ease-in-out">
      {{ isExpanded ? 'Réduire' : 'Afficher plus' }}
    </label>
  </div>


</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { BreadcrumbItem } from '@nuxt/ui';
import type { Produit } from '~/types/GeneraleT';
import { Catecolor } from '~/Composables/useTheme';
const item: BreadcrumbItem[] =
  [
    {
      label: 'Produits',
      icon: 'i-fluent-mdl2-product-variant',
    },
  ]

// expanding the card container
const isExpanded = ref(false)
const expandContainer = ref<HTMLDivElement | null>(null)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
// types

// this will be the data
const produits  = ref<Produit[] | []>( [
  {
    id: 1,
    name: 'Produit 1',
    img: '/no-img.png',
    category: 'Alimentaire',
    pua: 400,
    puv: 500,
    quantity: 100,
  },
  {
    id: 2,
    name: 'Produit 2',
    img: '/no-img.png',
    category: 'Beauté',
    pua: 400,
    puv: 500,
    quantity: 100,
  },
  {
    id: 3,
    name: 'Produit 3',
    img: '/no-img.png',
    category: 'Sport',
    pua: 400,
    puv: 500,
    quantity: 100,
  },
  {
    id: 4,
    name: 'Produit 4',
    img: '/no-img.png',
    category: 'Vêtement',
    pua: 400,
    puv: 500,
    quantity: 100,
  },
  {
    id: 5,
    name: 'Produit 5',
    img: '/no-img.png',
    category: 'Autre',
    pua: 400,
    puv: 500,
    quantity: 100,
  },
  {
    id: 6,
    name: 'Produit 6',
    img: '/no-img.png',
    category: 'Electronique',
    pua: 400,
    puv: 500,
    quantity: 100,
  },
  {
    id: 7,
    name: 'Produit 7',
    img: '/no-img.png',
    category: 'Meuble',
    pua: 400,
    puv: 500,
    quantity: 100,
  },
  {
    id: 8,
    name: 'Produit 8',
    img: '/no-img.png',
    category: 'Accessoire',
    pua: 400,
    puv: 500,
    quantity: 100,
  }
  ,
  {
    id: 9,
    name: 'Produit 9',
    img: '/no-img.png',
    category: 'Livre',
    pua: 400,
    puv: 500,
    quantity: 100,
  },
  {
    id: 10,
    name: 'Produit 10',
    img: '/no-img.png',
    category: 'Autre',
    pua: 400,
    puv: 500,
    quantity: 100,
  },
])
// the data for the cards
const cardProducts = ref<Produit[]>(produits.value);

// filter on the cards && reset them..
const nameFilter = ref('');
const filterProducts = () => {

  if (nameFilter.value === '') {
    cardProducts.value = produits.value;
  } else {
    cardProducts.value = produits.value.filter((product) => {
      return product.name.toLowerCase().includes(nameFilter.value.toLowerCase());
    });
  }
}

const resetProducts = () => {
  if(nameFilter.value.trim().length >0) {
    cardProducts.value = produits.value;
    nameFilter.value = '';
  } else {
    return
  }
}

// this is the table component
const UIcon = resolveComponent('UIcon')
const UBadge = resolveComponent('UBadge');
// you will change inside the cell's value
const ProduitColumns: TableColumn<Produit>[] = [
  {
    accessorKey: 'id',
    header: () => {
      return h('div', { class: 'text-white/50 font-extrabold' }, '#')
    },
    cell: ({ row }) => h('div', { class: 'text-white/50 font-extrabold' }, `#${row.getValue('id')}`)
  },
  {
    accessorKey: 'name',
    header: 'Intitule'
  },
  {
    accessorKey: 'quantity',
    header: 'Quantite',
    cell: ({ row }) => {
      return h('div', { class: 'text-blue-400 font-bold' }, row.getValue('quantity'))
    }
  },
  {
    accessorKey: 'pua',
    header: 'Prix U. Achat',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('pua'))

      const formatted = new Intl.NumberFormat('fr', {
        style: 'currency',
        currency: 'DZD'
      }).format(amount)

      return h('div', { class: 'text-red-400 font-bold' }, formatted)
    }
  },
  {
    accessorKey: 'puv',
    header: 'Prix U. Vente',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('puv'))

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
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('puv')) - Number.parseFloat(row.getValue('pua'))

      const formatted = new Intl.NumberFormat('fr', {
        style: 'currency',
        currency: 'DZD'
      }).format(amount)

      return h('div', { class: 'text-yellow-400 font-bold' }, formatted)
    }
  },
  {
    header: 'Montant Stock',
    accessorKey: 'montant_stock',
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('pua')) * Number.parseFloat(row.getValue('quantity'))

      const formatted = new Intl.NumberFormat('fr', {
        style: 'currency',
        currency: 'DZD'
      }).format(amount)

      return h('div', { class: 'font-bold' }, formatted)
    }
  },

  {
    accessorKey: 'category',
    header: 'Categorie',
    cell: ({ row }) => {
      const category: string = row.getValue('category')
      const color = Catecolor(category)
      console.log(color);
      return h(UBadge, { label: category, class: color },)
    }
  },
  {
    header: 'Supprimer',
    accessorKey: 'id',
    cell: ({ row }) => {
      const id: number = row.getValue('id')
      return h(UIcon, { name: 'i-solar-trash-bin-trash-broken', class: 'font-bold p-2 bg-red-700 rounded size-8 hover:bg-red-500 cursor-pointer transition-bg duration-300 ease-in-out', id: id, onClick: () => handelDelete(id) }, '')
    }
  }
]
// here is the delete function , do modify this after working on the back...
const handelDelete = (id: number) => {
  console.log('delete', id);

}

const globalFilter = ref('')

</script>
