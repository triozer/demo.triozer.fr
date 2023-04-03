<script lang="ts" setup>
import { computed } from 'vue';

const pathname = computed(() => window.location.pathname);
</script>

<template>
  <header class="flex-col justify-between">
    <h1 @click="" class="w-fit text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">{{ pathname }}</h1>
    <div class="flex w-screen text-center">
      <h1 class="w-full text-xl">Vue</h1>
      <h1 class="w-full text-xl">React</h1>
    </div>
  </header>
</template>
