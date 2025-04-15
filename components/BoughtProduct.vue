<template>
  <UModal v-model:open="openBought"
   title="J'ai acheté Un Produit" 
   description="remplisser tous les champs essentielle pour marquer l'achat d'un produit."
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
              label="Achat d'un Produit" 
              class="bg-red-600 text-[var(--pale-moon)] text-sm hover:bg-red-400 transition duration-300 ease-in-out" 
              size="xl" />
      </div>
      
      <!-- the modal content -->

    <template #body>
      <form @submit.prevent="submitBought">
        <!-- choix de produit  -->
        <UFormField label="Selectionez un produits dans la liste" class=" w-full mb-5" required>
        <USelectMenu v-model="Bproduct" :items="Boughtitems" placeholder="Selectionez un produit ..." :ui="{
          base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
          label: 'text-sm text-gray-400',
          input: 'text-sm text-gray-400 bg-[var(--deep-dark-blue)]',
          item: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)] hover:bg-blue-900',
          group: 'p-0',
        }" class="w-[80%]" />
      </UFormField>

      <!-- la Quantité de produit acheté -->
      <UFormField label="la Quantité de produit acheté" class=" w-full mb-3" required>
        <UInput v-model="BoughtQ" type="number" placeholder="la Quantité de produit acheté " min="0" :ui="{
          base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
        }" class="w-[80%]" />
      </UFormField>

      <!-- prix unitaire d'achat -->
      <UFormField label="Prix Unitaire d'achat" class=" w-full mb-3" required>
        <UInput v-model="pua" type="number" placeholder="Prix Unitaire d'achat" min="0" :ui="{
          base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
        }" class="w-[80%]" />
      </UFormField>

      <!-- prix unitaire de vente -->
      <UFormField label="prix unitaire de vente" class=" w-full mb-3" required>
        <UInput v-model="puv" type="number" placeholder="prix unitaire de vente" min="0" :ui="{
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
import type { Produit } from '~/types/GeneraleT';

// props
const props = defineProps<{
  produits: Produit[],
}>();
//variables
const openBought = ref(false);
const Bproduct = ref<string>('');
const BoughtQ = ref<number>(0);
const pua = ref<number>(0);
const puv = ref<number>(0);

const Boughtitems = ref<string[]>([]);
props.produits?.forEach((product : Produit) => {
  Boughtitems.value.push(product.name);
});
// functions
const submitBought = ()=>{
  if (Bproduct.value === '' || BoughtQ.value === 0 || pua.value === 0 || puv.value === 0) {
    Toasting('Erreur', 'Veuillez remplir tous les champs' , 'error' ,'E');
    return;
  }

  // supabase logic to add the bought product to the database
  const productId = props.produits?.find((product: Produit) => product.name === Bproduct.value)?.id;
  console.log('productId : ', productId);
  console.log('produit vendu : ', Bproduct.value);
  console.log('quantité vendu : ', BoughtQ.value);
  console.log('prix unitaire d\'achat : ', pua.value);
  console.log('prix unitaire de vente : ', puv.value);
  Toasting('Succès', 'Operation est bien effectue' , 'success' ,'S');
  // reset the form
  Bproduct.value = '';
  BoughtQ.value = 0;
  pua.value = 0;
  puv.value = 0;

}

</script>



