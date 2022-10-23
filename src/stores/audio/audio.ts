import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAudioStore = defineStore('audio', () => {
  const selectedFolder = ref()
  const currentPlaylist = ref()
  const selectedFile = ref()
  const currentFile = ref()
  const currentInstance = ref()

  return {
    selectedFolder,
    currentPlaylist,
    selectedFile,
    currentFile,
    currentInstance
  }
})