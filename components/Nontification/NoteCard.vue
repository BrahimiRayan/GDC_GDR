<template>
        <div class="h-full ">
            <!-- Add a note modal -->
            <UModal
             v-model:open="open"
              title="Rediger une note"
              description="Remplissez les champs ci-dessous pour ajouter une note"
              :overlay='true'
              :dismissible="false"
              class="rounded-tr-2xl rounded-tl-2xl"
              :ui="{
                overlay: 'bg-black/60',
                header: 'bg-[var(--deep-dark-blue)] rounded-tr-2xl rounded-tl-2xl text-[var(--creamy-white)]', 
                body: 'rounded-br-2xl rounded-bl-2xl bg-[var(--deep-dark-blue)] text-[var(--creamy-white)] ',
                }">
                
                <div class="w-fit">
                <UButton
                    label="Ajouter une note"
                    icon="i-lucide-plus" 
                    class="bg-[var(--green-grace)] text-[var(--deep-dark-blue)] border-2 border-[var(--green-grace)] hover:bg-white text-sm mb-4 m"
                    size="sm"
                />
            </div>
                <template #body>
                    <form action="" @submit.prevent="submitNote" defau>
                    <UFormField label="Titre" class="mb-5" required>
                        <UInput placeholder="Entrer un titre" v-model="notedata.title" class="w-[90%]" required/>
                    </UFormField>
                    <UFormField label="Description" class="mb-6" required>
                        <UTextarea placeholder="Entrer une description" v-model="notedata.discreption" class="w-[90%]" required/>
                    </UFormField>
                    <URadioGroup v-model="notedata.type" :items="NoteTypes" color="secondary"/>
                    <USeparator class="my-3 dark:text-[var(--green-grace)] text-[var(--deep-dark-blue)] opacity-60" />
                    <UButton label="Submit" type="submit" class="mr-6 text-[var(--deep-dark-blue)] border dark:border-white"/>
                    <UButton label="Fermer" class="dark:bg-transparent bg-red-600 border border-red-600 hover:bg-red-800" @click="open = false" />
                </form>
                </template> 
            </UModal>

            <!-- Notes , so what i should do is to display them by newest =>oldest then !important > repelle also make a distinct UI betwen the two -->
            <!-- notifcation card -->
            <div v-for="_ in 10" class="border-2 p-4 dark:border-[var(--green-grace)] rounded-2xl mb-6 dark:bg-amber-50/5 bg-[var(--pale-moon)]/90">

                <div class="flex justify-between items-center" >

                    <div class="flex items-center gap-3">
                        <UAvatar size="xl" src="https://github.com/benjamincanac.png" />
                        <div class="text-sm">
                            <h1 class="font-extrabold mb-1" >Benjamin Canac <span class="text-[10px] font-bold text-secondary">(admin)</span></h1>
                            <p class="dark:font-light font-medium text-xs ">Il y a 2 heures</p>
                        </div>    
                    </div>

                    <UButton
                        icon="i-lucide-trash" 
                        class="ml-auto bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out"
                        size="sm"
                    />
                </div>
                <USeparator class="my-3 dark:text-[var(--green-grace)] text-[var(--deep-dark-blue)]/30 dark:opacity-25" />
                <div>
                    <h2 class="font-extrabold text-sm">Type : <span class="font-bold text-sm text-yellow-600">Important!</span></h2>
                    <h2 class="font-extrabold text-sm">Titre: <span class="text-sm font-medium">Lorem, ipsum dolor.</span></h2>
                    <p class="p-2 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                </div>

            </div>

        </div>
</template>
    
<script setup lang='ts'>
import type { RadioGroupItem, RadioGroupValue } from '@nuxt/ui'
const open = ref(false) ;

const NoteTypes = ref<RadioGroupItem[]>([
  {
    label: 'Important!',
    description: 'Note importante qui doit être traitée en priorité.',
    value: 'important'
  },
  {
    label: 'Rappele',
    description: 'Note de rappel pour ne pas oublier une tâche.',
    value: 'rappel'
  },
]);

type NoteData = {
    title: string;
    discreption: string;
    type: RadioGroupValue;
}
    const notedata = ref<NoteData>({
        title: '',
        discreption: '',
        type: 'important'
    })

    const submitNote = () => {
        console.log(notedata.value.title , notedata.value.discreption , notedata.value.type);
        notedata.value.title = '';
        notedata.value.discreption = '';
        notedata.value.type = 'important';
    }
</script>