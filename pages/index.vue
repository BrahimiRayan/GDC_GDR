<template>
  <div class="mt-8">
      <UBreadcrumb :items="item" class="mb-8 " />
      <USeparator 
             class="text-[var(--green-grace)] w-xl mt-10 mx-auto "
             label="Statistiques des ventes et achats"
             :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }"
        />
        <p class="mb-10 mt-3 flex items-center">
          <UIcon name="i-game-icons-chart" class="text-[var(--green-grace)] size-5 mr-2" />
            <span class="text-gray-400 text-sm font-bold ">
              Inspecter et suivre vos dépenses, ventes et bénéfices pour cette année.
            </span>
        </p>
      <USelectMenu 
        icon = "i-game-icons-choice"
        :content="{
          align: 'center',
          side: 'bottom',
          sideOffset: 8
        }"
        v-model="typeOfchart"
        value-key="id"
        :items="items"
        class="w-48 mb-5 ml-6 " 
        
        :ui="{
          input: 'bg-[var(--deep-dark-blue)] text-[var(--creamy-white)]',
          base: 'bg-[var(--deep-dark-blue)] text-[var(--creamy-white)]',

          item: 'bg-[var(--deep-dark-blue)] text-[var(--creamy-white)] ',
        }"
        :uiMenu="{ body: { overflow: 'auto' } }" 
        />

      <highchart   
        :options="chartOptions"
      />
  </div>
  <USeparator 
             class="text-[var(--green-grace)] w-xl my-10 mx-auto "
             label="Informations de mois courant" 
             :ui="{ label: 'font-extrabold p-2 rounded-xl border border-transparent hover:text-[--deep-green] hover:border-[var(--deep-green)] cursor-pointer transition-all duration-300 ease-in-out' }"
  />
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
const item: BreadcrumbItem[] = 
    [
      {
        label: 'Dashboard',
        icon: 'i-material-symbols-dashboard-outline',
      },
    ]
// the chat items and the chart options 
const items = ref([
    { label: 'Histogramme', id: 'column' },
    { label: 'Courbe', id: 'line' },
    { label: 'Nuage de points', id: 'scatter' }
  ]);
  const typeOfchart = ref('column');
  const chartOptions = computed(()=>({
  chart: {
    type: typeOfchart.value,
    backgroundColor: 'transparent' 
  },
  title: {
    text: '',
  },
  xAxis: {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    crosshair: true,
    labels: {
      style: {
        color:'#FFFFFF' 
      }
    },
    title: {
      style: {
        color: '#FFFFFF' 
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Montant en DA',
      style: {
        color: '#FFFFFF',
      }

    },
    labels: {
      style: {
        color: '#FFFFFF',
      }
    },
    gridLineColor: 'rgba(255, 255, 255, 0.1)' 
  },
  tooltip: {
    backgroundColor: '#333333', // Dark tooltip background
    style: {
      color: '#FFFFFF' ,
    },
    headerFormat: '<span style="font-size:10px; color: white">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0; color: white"><b>{point.y:.1f} DA</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  legend: {
    itemStyle: {
      color: '#FFFFFF' ,
    },
    itemHoverStyle: {
      color: '#DDDDDD' // Light gray on hover
    }
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: [
    {
      name: 'Achats',
      data: [200400, 200500, 200600, 400700, 200800, 200900, 201000, 201100, 201200, 201300, 201400, 201500],
      color: '#E74C3C'
    },
    {
      name: 'Ventes',
      data: [300400, 200500, 500600, 302700, 300800, 300900, 301000, 301100, 301200, 301300, 301400, 301500],
      color: '#2ECC71'
    },
    {
      name: 'Benefice',
      data: [100000, 100000, 100000, 100000, 0, 100000, 100000, 100000, 100000, 100000, 100000, 100000],
      color: '#F1C40F'
    }
  ]
}));
  </script>

