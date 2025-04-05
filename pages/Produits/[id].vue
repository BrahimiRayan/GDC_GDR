<template>
    <div>
        <h1>Produit {{ id }}</h1>
        <p>Voici les détails du produit avec l'ID : {{ id }}</p>
    </div>
</template>
    
<script setup lang='ts'>
    const route = useRoute();
    const id = route.params.id;
</script>
    
<style>
    
</style>