<template>

    <div class="chart-container">
        <Bar 
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            css-classes="chart-wrapper" 
        />
    </div>

</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, scales } from 'chart.js'

// Register ChartJS components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Chart data
defineProps({
    chartData: {
        type: Object,
        required: true
    }
})

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        callback: function(value) {
          return new Intl.NumberFormat('fr-DZ', {
            style: 'currency',
            currencyDisplay: 'code', 
            currency: 'DZD'
          }).format(value)
        },
        color: 'white' // Optional: text color
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)' // Optional: grid line color
      },
      border : { color : 'white'} ,
    },
    x: {
      ticks: {
        color: 'white' // Optional: x-axis text color
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)' // Optional: grid line color
      },
      border : { color : 'white'},
    },
  },
  plugins: {
    legend: {
      position : 'bottom',
      labels: {
        color: 'white' // Optional: legend text color
      }
    }
  }
}

</script>

<style scoped>
.chart-container {
    position: relative;
    height: 450px;
    width: 100%;
}

/* Optional: Add some padding if needed */
.chart-wrapper {
    padding: 1rem;
}
</style>