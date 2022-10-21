import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getLibrary } from '../../api/library'

export const useLibraryStore = defineStore('library', () => {
  const library = ref()

  async function refreshLibrary() {
    try {
      library.value = await getLibrary()
    } catch (error) {
      console.error('useLibraryStore/refreshLibrary/getLibrary error', error)
    }
  }

  return { library, refreshLibrary }
})