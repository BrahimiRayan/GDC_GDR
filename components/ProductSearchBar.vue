<template>
    <div>
        <input
          type="text"
          :class="['p-2 cursor-pointer border-b-2 text-[1rem] indent-1 input-bg w-xs' , isDark ? 'text-primary' : 'text-black']"
          placeholder="Rechercher un produit"
        />
      </div>
</template>
    
<script setup lang='ts'>
    defineProps(['isDark'])
</script>
    