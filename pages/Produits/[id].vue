<template>
        <div>
            <Chart :chartData="data"/>
        </div>
</template>
    
<script setup lang='ts'>
import type { chartData } from '~/types/GeneraleT';



  const data : chartData ={
    labels: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [{
        label: 'Achats',
        // will be gotten from bdd
        data: [0, 0, 0, 0, 9800, 200900, 31000, 31100, 1200, 1300, 201400, 201500],
        borderColor: '#E74C3C',
        backgroundColor: '#E74C3C',
        
    },
    {
        label: 'Ventes',
        data: [0, 0, 0, 0, 300800, 300900, 301000, 301100, 301200, 301300, 301400, 301500],
        borderColor: '#2ECC71',
        backgroundColor: '#39FF14',
    },
    {
        label: 'Benefice',
        data: [0, 0, 0, 0, 0, 1000, 10, 0, 100000, 100000, 100000, 100000],
        borderColor: '#F1C40F',
        backgroundColor: '#F1C40F',

    }
    ]
  }  
</script>
    
<style>
    
</style>