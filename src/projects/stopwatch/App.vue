<script lang="ts" setup>
import { ref, computed, onBeforeUnmount, nextTick } from 'vue';

const intervalId = ref<number | null>(null)
const elapsedTime = ref(0)
const isRunning = ref(false)

const savedTimes = ref<number[]>([])
const times = ref<HTMLElement | null>(null)

const start = () => {
  if (isRunning.value) return
  isRunning.value = true
  intervalId.value = window.setInterval(() => {
    elapsedTime.value += 1
  }, 10)
}

const stop = () => {
  if (!isRunning.value) return
  isRunning.value = false
  if (intervalId.value) {
    window.clearInterval(intervalId.value)
  }
}

const reset = () => {
  stop()
  elapsedTime.value = 0
  savedTimes.value = []
}

const formatTime = (time: number) => {
  const ms = time % 100
  const s = Math.floor(time / 100)
  return `${s.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`
}

const formattedTime = computed(() => formatTime(elapsedTime.value))

const save = () => {
  if (elapsedTime.value === 0) return
  if (savedTimes.value.includes(elapsedTime.value)) return

  savedTimes.value.push(elapsedTime.value)
  nextTick(() => times!.value!.scrollTop = times!.value!.scrollHeight)
}

onBeforeUnmount(() => {
  stop()
})
</script>

<template>
  <div class="stopwatch">
    <h1 class="time">{{ formattedTime }}</h1>
    <div class="buttons">
      <button @click="start">Start</button>
      <button @click="stop">Stop</button>
      <button @click="reset">Reset</button>
      <button @click="save">Save</button>
    </div>
    <div ref="times" class="saved-times">
      <div v-for="savedTime in savedTimes" :key="savedTime">
        {{ formatTime(savedTime) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.stopwatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;

  .time {
    font-size: 5rem;
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    background-color: #2a9d8f;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }

  .saved-times {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 1rem;
    width: 70%;
    height: 30%;
    overflow: auto;
  }

  .saved-times div {
    padding: 0.5rem 1rem;
    background-color: #f4a261;
    color: #fff;
    border-radius: 0.25rem;
  }
}
</style>
