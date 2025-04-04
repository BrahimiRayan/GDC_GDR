<template>
    <UModal v-model:open="open" title="Ajouter Un Produit" description="remplisser tous les champs essentielle pour ajouter un produit."
     :overlay="true"
     :ui="{
        description : 'text-sm text-gray-400',
        title : 'text-lg font-semibold',
        body : 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
        header : 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
        overlay :'bg-black/70',
      }">
            
            <!-- the open button  -->
        <div class="ml-[86%] mt-8 ">
            
            <UButton 
                icon="i-lucide-plus" 
                label="Ajouter un Produit" 
                class="bg-green-600 text-[var(--pale-moon)] text-sm hover:bg-green-700 transition duration-300 ease-in-out" 
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
const open = ref(false);

type Product = {
    name: string;
    prix_A: number;
    prix_V: number;
    image: string | Blob;

};
</script>



