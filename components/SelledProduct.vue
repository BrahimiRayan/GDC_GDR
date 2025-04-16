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
        <form @submit.prevent="submitSelles">
          <!-- choix de produit  -->
          <UFormField label="Catégorie du Produit" class=" w-full mb-5" required>
          <USelectMenu id="cat" v-model="product" :items="Selleditem" placeholder="Selectioner un produit ..." :ui="{
          base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
          label: 'text-sm text-gray-400',
          input: 'text-sm text-gray-400 bg-[var(--deep-dark-blue)]',
          item: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] hover:bg-blue-900',
          group: 'p-0',
        }" class="w-[80%]" />
        </UFormField>
        <!-- la Quantité de produuit vendu -->
        <UFormField label="Quantité vendu" class=" w-full mb-3" required>
          <UInput v-model="selledQ" type="number" placeholder="Quantité vendue" min="0" :ui="{
            base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
          }" class="w-[80%]" />
        </UFormField>

        <USeparator class="text-[var(--green-grace)] w-full my-5"/>
        <UButton label="Valider" class="bg-green-600 text-[var(--pale-moon)] hover:bg-green-700 text-sm " size="sm"
          icon="i-lucide-check" type="submit" :ui="{
            base: 'rounded-lg',            
          }" />

        </form>
      </template>
  

    </UModal>
  </template>



<script setup lang="ts">
import Toasting from '~/Composables/useMyToast';

// TODO: FIX props by adding ts
const props = defineProps({
  produits: {
    type: Array,
  },
});

//variables
const openSell = ref(false);
const product = ref<string>('');
const selledQ = ref<number>(0);

const Selleditem = ref<string[]>([]);
  props.produits?.forEach((product:any) => {
    Selleditem.value.push(product.name);
  });
// functions
  const submitSelles = ()=>{
    if (product.value === '' || selledQ.value === 0) {
      Toasting('Erreur', 'Veuillez remplir tous les champs' , 'error' ,'E');
      return;
    }
    // supabase logic to add the product to the database
    console.log('produit vendu : ', product.value);
    console.log('quantité vendu : ', selledQ.value);
    Toasting('Succès', 'Operation est bien effectue' , 'success' ,'S');
    // reset the form
    product.value = '';
    selledQ.value = 0;

  }





</script>



