<template>
  <div class="mt-8">
    <UBreadcrumb :items="item" class="mb-8 " />

    <USeparator class="text-[var(--green-grace)] w-xl mt-10 mx-auto " label="Statistiques des ventes et achats"
      :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />

    <p class="mb-10 mt-3 flex items-center">
      <UIcon name="i-game-icons-chart" class="text-[var(--green-grace)] size-5 mr-2" />
      <span class="text-gray-400 text-sm font-bold ">
        Inspecter et suivre vos dépenses, ventes et bénéfices pour cette année.
      </span>
    </p>

    <Chart :chartData="Cdatas" />

  </div>

  <USeparator class="text-[var(--green-grace)] w-xl my-10 mx-auto " label="Informations de mois courant"
    :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }" />

  <p class="mt-2 flex items-center">
    <UIcon name="i-game-icons-info" class="text-[var(--green-grace)] size-5 mr-2" />
    <span class="text-gray-400 text-sm font-bold">
      Vous trouverez ici les Informations générales de votre stock de produits pour ce mois.
    </span>
  </p>

  <StatesStatcard />
</template>

<script setup lang="ts">

// the breadcrumb item  
import type { BreadcrumbItem } from '@nuxt/ui';
import type { chartData } from '~/types/GeneraleT';
const item: BreadcrumbItem[] =
  [
    {
      label: 'Dashboard',
      icon: 'i-material-symbols-dashboard-outline',
    },
  ]


const Cdatas: chartData = {
  labels: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  datasets: [{
    label: 'Achats',
    // will be gotten from bdd
    data: [200400, 200500, 200600, 400700, 200800, 200900, 201000, 201100, 201200, 201300, 201400, 201500],
    borderColor: '#E74C3C',
    backgroundColor: '#E74C3C',

  },
  {
    label: 'Ventes',
    data: [300400, 200500, 500600, 302700, 300800, 300900, 301000, 301100, 301200, 301300, 301400, 301500],
    borderColor: '#2ECC71',
    backgroundColor: '#39FF14',
  },
  {
    label: 'Benefice',
    data: [100000, 100000, 100000, 100000, 0, 100000, 100000, 100000, 100000, 100000, 100000, 100000],
    borderColor: '#F1C40F',
    backgroundColor: '#F1C40F',

  }
  ]
}

</script>
