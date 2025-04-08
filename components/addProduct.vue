<template>
  <UModal v-model:open="open" title="Ajouter Un Produit"
    description="remplisser tous les champs essentielle pour ajouter un produit." :overlay="true" :ui="{
      description: 'text-sm text-gray-400',
      title: 'text-lg font-semibold',
      body: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
      header: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
      overlay: 'bg-black/70',
    }">

    <!-- the open button  -->
    <div class="mt-8 ">
      <UButton icon="i-lucide-plus" label="Ajouter un Produit"
        class="bg-green-600 text-[var(--pale-moon)] text-sm hover:bg-green-400 transition duration-300 ease-in-out"
        size="xl" />
    </div>

    <template #body>
      <!-- add product -->
      <form @submit.prevent="addProduit" class="flex flex-col items-start justify-between gap-2">
        <UFormField label="Intitulé du Produit" class=" w-full" required>
          <UInput required label="In " placeholder="Ex : T-shirt Roda ..." class="w-full" type="text"
            v-model="NewProduct.name" />
        </UFormField>

        <UInput label="Image du Produit" class=" w-full" type="file" accept="image/*" v-model="NewProduct.img"
          icon="i-lucide-image" />

        <UFormField label="Catégorie du Produit" class=" w-full" required>
          <USelectMenu id="cat" v-model="NewProduct.category" :items="items" :ui="{
            base: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
            label: 'text-sm text-gray-400',
            input: 'text-sm text-gray-400',
            item: 'bg-[var(--deep-dark-blue)] text-[var(--pale-moon)]',
          }" class="w-48" />
        </UFormField>
        <UFormField label="Prix d'achat par unité" class=" w-full" required>
          <UInput required placeholder="Prix d'achat par unité" class=" w-full" type="number" min="0"
            v-model="NewProduct.pua" icon="i-icons8-buy" />
        </UFormField>
        <UFormField label="Prix de vente par unité" class=" w-full" required>
          <UInput required placeholder="Prix de vente par unité" class=" w-full" type="number" min="0"
            v-model="NewProduct.puv" icon="i-material-symbols-sell-outline" />
        </UFormField>

        <UFormField label="Quantité du Produit" class=" w-full" required>
          <UInput required placeholder="Quantité du Produit" class=" w-full" type="number" min="0"
            v-model="NewProduct.quantity" icon="i-material-symbols-sell-outline" />
        </UFormField>

        <USeparator class="my-4" />
        <UButton label="Ajouter le Produit" type="submit"
          class="bg-green-600 text-[var(--pale-moon)] text-sm hover:bg-green-400 transition duration-300 ease-in-out"
          size="xl" />

      </form>
    </template>
  </UModal>
</template>



<script setup lang="ts">
import Toasting from '~/Composables/useMyToast';
import type { Produit } from '~/types/GeneraleT';
const open = ref(false);
const items = ref(['Autre', 'Alimentaire', 'Electronique', 'Vêtement', 'Meuble', 'Accessoire', 'Beauté', 'Sport', 'Livre']);
const NewProduct = ref<Produit>({
  id: 0,
  name: '',
  img: '',
  category: 'Autre',
  pua: 0,
  puv: 0,
  quantity: 0,
})
const addProduit = () => {
  if (NewProduct.value.name && NewProduct.value.category && NewProduct.value.pua > 0 && NewProduct.value.puv > 0 && NewProduct.value.quantity > 0) {
    console.log('Produit ajouté:', { ...NewProduct.value });
    console.log('name du produit:', NewProduct.value.name);
    resetProduct();
    Toasting('Succès', 'Produit ajouté avec succès', 'success' , 'S');
  } else {
    console.error('Produit non valide');
    Toasting('Erreur', 'Produit non valide , svpl remplire les champs restant...', 'error' , 'E');
  }
}

const resetProduct = () => {
  NewProduct.value = {
    id: 0,
    name: '',
    img: '',
    category: 'Autre',
    pua: 0,
    puv: 0,
    quantity: 0,
  }
}
</script>
