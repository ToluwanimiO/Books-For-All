import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useDonatingBooksStore = defineStore(
  'donatingbooks',
  () => {
    const donatingBooks = ref<object[]>([])
    const addDonatingBook = (book: object) => {
      console.log('Adding book to donatingBooks:', book)
      donatingBooks.value.push(book)
    }
    return {
      donatingBooks,
      addDonatingBook,
    }
  },
  {
    persist: true,
  }
)
