<script lang="ts" setup>
import { Configuration } from '@/types/framework';
import { computed, onMounted, ref } from 'vue';

const pathname = computed(() => window.location.pathname);

const configuration = ref<Configuration>({
  id: "demo.triozer.fr",
  name: 'Web',
  description: 'There so much to learn, so little time...',
  version: '1.0.0',
})

onMounted(async () => {
  try {
    const { configuration: loadedConfiguration } = await import(/* @vite-ignore */ `../projects${pathname.value}/index.ts`)
    configuration.value = loadedConfiguration
  } catch (e) {
    console.warn("Couldn't load configuration, using default:\n", e)
  }
})
</script>

<template>
  <header class="flex-col justify-between">
    <div class="flex w-screen justify-between items-center text-center p-4">
      <h1 @click="" class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
        {{ configuration?.name }}
      </h1>
      <p class="text-2xl font-extrabold">{{ configuration?.description }}</p>
      <p class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">v{{ configuration?.version }}</p>
    </div>
    <div class="flex w-screen text-center">
      <h1 class="w-full text-xl">Vue</h1>
      <h1 class="w-full text-xl">React</h1>
    </div>
  </header>
</template>
