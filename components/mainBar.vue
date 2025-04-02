<template>
    <nav class="sticky z-50 top-0 h-[64px] bg-[var(--deep-dark-blue)] border-b border-white/10 flex items-center text-primary justify-between w-full mx-auto py-2 px-5">
      <div class="flex gap-8">
        <UButton 
          :class="['bg-transparent text-secondary hover:shadow-sm hover:-translate-x-1 shadow-green-500 font-extrabold h-8 w-8 flex items-center justify-center my-auto transition-all duration-300 ease-in-out']" 
          color="neutral" 
          variant="subtle" 
          icon="i-eva-menu-arrow-outline"
          @click="toggleDrawer"
          
        />
        <div class="w-[62px] h-[62px]">
              <img src="../assets/pics/Logo-dark.webp" class="w-full h-full" alt="">
              <!-- <img src="../assets/pics/Logo-light.webp" class="w-full h-full" alt=""> -->
        </div>
      </div>
      
      <ul class="flex items-center gap-8">
        <li>
          <!-- manipulate the show fieled to when he didn't mark a note as done to be shown -->
          <USlideover
           title="🔔 Mes notes "
           
           icon="i-lucide-bell"
           :ui="{
                overlay: 'bg-black/50',
                content: 'bg-[var(--deep-dark-blue)] text-[var(--creamy-white)]', 
            }"
           >    
            <UButton :class="['h-8 w-8 flex hover:shadow-sm hover:-translate-y-1 shadow-green-500 justify-center bg-transparent text-[var(--green-grace)] transition-all duration-300 ease-in-out']" icon="i-lucide-mail" color="neutral" variant="subtle" />
            <template #body>
              <NontificationNoteCard />
            </template>
          </USlideover>
          
        
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  // props and emits
  const props = defineProps({
    isOpen: Boolean
  });
  
  const emit = defineEmits(['update-open']);

  // composables
  const toggleDrawer = () => {
    emit('update-open', !props.isOpen);
  };

  //refs
  </script>

  <style scoped>
    .fade-enter-active, .fade-leave-active {
      opacity: 0;
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to {
      transition: opacity 0.5s ease-in;

      opacity: 0;
    }
    
    .costumDark , .costumLight{
    /* position: relative; */
    border-radius: 11px;
    display: block;
    width: 45px;
    text-align: center;
    height: 25px;
    flex-shrink: 0;
    border: 1px solid var(--creamy-white);
    background-color: var(--green-grace);
    transition: border-color .25s !important;

}
.costumLight{
    background-color: rgb(255, 255, 255);
    border: 1px solid var(--deep-dark-blue);
}
  </style>