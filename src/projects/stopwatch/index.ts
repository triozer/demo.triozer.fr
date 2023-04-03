import { Configuration } from "@/types/framework";

export const configuration: Configuration = {
  id: "stopwatch",
  name: "Stopwatch",
  description: "A stopwatch app",
  version: "0.0.1"
}

export const variables: {
  intervalId: number
  elapsedTime: number
  savedTimes: number[]
  isRunning: boolean
} = {
  intervalId: 0,
  elapsedTime: 0,
  savedTimes: [],
  isRunning: false
}
