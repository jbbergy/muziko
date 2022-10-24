import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', () => {
  const selectedFolder = ref()
  const currentPlaylist = ref()
  const selectedFile = ref()
  const currentFile = ref()
  const currentInstance = ref()
  const currentVolume = ref(0.3)
  const backupVolume = ref()
  const autoPlay = ref(false)
  const isShuffle = ref(false)
  const isLoop = ref(false)

  return {
    selectedFolder,
    currentPlaylist,
    selectedFile,
    currentFile,
    currentInstance,
    currentVolume,
    backupVolume,
    autoPlay,
    isShuffle,
    isLoop
  }
})