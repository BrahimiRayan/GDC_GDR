<template>
    <UModal v-model:open="openSell"
     title="J'ai vendu Un Produit" 
     description="remplisser tous les champs essentielle pour marquer la vente d'un produit."
     :overlay="true"
     :ui="{
        description : 'text-sm text-gray-400',
        title : 'text-lg font-semibold',
        body : 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
        header : 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
        overlay :'bg-black/70',
      }">
            
            <!-- the open button  -->
        <div class="mt-8 ">
            
            <UButton 
                icon="i-healthicons-low-income-level" 
                label="Vente d'un Produit" 
                class="bg-yellow-600 text-[var(--pale-moon)] text-sm hover:bg-yellow-400 transition duration-300 ease-in-out" 
                size="xl" />
        </div>
        
        <!-- the modal content -->

      <template #body>
        <form action="">
            <UInput
                label="Nom du Produit"
                placeholder="Nom du Produit"
                class="mb-4"
                type="file"
                icon="i-lucide-box" />

        </form>
        <Placeholder class="h-40" />
      </template>
  

    </UModal>
  </template>



<script setup lang="ts">
const openSell = ref(false);

</script>



