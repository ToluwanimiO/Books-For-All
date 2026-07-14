<template>
  <div class="flex gap-3">
    <el-input ref="bookInput" v-model="newBook" />
    <el-button type="primary" @click="addBook">Add Book</el-button>
  </div>
  <el-table
    ref="tableRef"
    :data="donatingBooksStore.donatingBooks"
    height="350"
    style="width: 100%"
    class="mt-3"
  >
    <!-- <el-table-column type="expand" width="20">
      <template #default>
        <div class="flex justify-between items-center">
          <div
            class="flex gap-4 items-center cursor-pointer"
            @click="toggleRow()"
          >
            <span class="text-green-600">Edit </span><GridiconsDropdown />
          </div>
          <MaterialSymbolsDeleteOutline class="text-red-600" />
        </div>
      </template>
    </el-table-column> -->
    <el-table-column>
      <template #header>
        <div class="flex justify-between items-center">
          <div>
            <p class="font-bold text-on-surface">Book Details</p>
            <p class="text-label-sm text-on-surface-variant">
              Manage your donation list below.
            </p>
          </div>
          <span class="text-label-md font-label-md text-on-surface-variant"
            >Add advanced details
            <el-switch v-model="addAdvanced"></el-switch>
          </span>
        </div>
      </template>
      <el-table-column width="60">
        <template #default="{ $index }"> #{{ $index + 1 }} </template>
      </el-table-column>
      <el-table-column prop="title">
        <template #default="scope">
          <div class="flex gap-2 text-xl">
            <MaterialSymbolsBookSharp class="text-green-800" />
            <el-input
              v-if="editIndex === scope.$index"
              ref="editInputRef"
              v-model="editInput"
              @keyup.enter="saveBookDetails(scope.$index, scope.row.title)"
            />
            <p
              v-else
              class="font-bold text-on-surface"
              @click="editBookDetails(scope.$index, scope.row.title)"
            >
              {{ scope.row.title }}
            </p>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" width="180" />
      <el-table-column prop="address" /> -->
      <el-table-column width="50">
        <template #default="{ row, $index }">
          <div class="flex justify-between items-center">
            <div class="flex gap-4 items-center cursor-pointer">
              <span class="text-green-600">
                <span
                  v-if="editIndex === $index"
                  @click="saveBookDetails($index, row.title)"
                >
                  Save</span
                >
                <span v-else @click="editBookDetails($index, row.title)">
                  Edit</span
                >
              </span>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column width="120">
        <template #default>
          <div class="justify-items-center">
            <MaterialSymbolsDeleteOutline class="text-red-600" />
          </div>
        </template>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { watch, ref, nextTick } from 'vue'
import MaterialSymbolsBookSharp from '~icons/material-symbols/book-sharp'
import MaterialSymbolsDeleteOutline from '~icons/material-symbols/delete-outline'
import { useDonatingBooksStore } from '@/store/donatingBooks'

const donatingBooksStore = useDonatingBooksStore()
const bookInput = ref(null)
const addAdvanced = ref(false)
// const book = reactive({
//   title: '',
//   author: '',
//   subject: '',
//   gradeLevel: '',
//   quantity: 1,
//   isbn: '',
//   description: '',
// })
const newBook = ref('')

const tableRef = ref()
const editInput = ref('')
const editInputRef = ref(null)
const editIndex = ref(null)
const { tableData } = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
})
// Add a book to donation list
const addBook = () => {
  if (newBook.value.trim()) {
    donatingBooksStore.addDonatingBook({ title: newBook.value.trim() })
    newBook.value = ''
    bookInput.value.focus()
    console.log(
      'donatingBooksStore.donatingBooks:',
      donatingBooksStore.donatingBooks
    )
    return
  }
  ElMessage.warning('Please type the book title.')
  // if (book.title && book.author && selectedSchool.value) {
  //   const newBook = {
  //     ...book,
  //     school: selectedSchool.value,
  //     donatedBy: authStore.authProfile?.id,
  //   }

  //   donationList.value.push(newBook)

  //   // Reset book form
  //   Object.assign(book, {
  //     title: '',
  //     author: '',
  //     subject: '',
  //     gradeLevel: '',
  //     quantity: 1,
  //     isbn: '',
  //     description: '',
  //   })
  // } else {
  //   ElMessage.warning('Please fill in all book details.')
  // }
}
watch(
  () => tableData.length,
  async () => {
    await nextTick()

    const scrollWrapper = tableRef.value.$el.querySelector(
      '.el-scrollbar__wrap'
    )

    scrollWrapper?.scrollTo({
      top: scrollWrapper.scrollHeight,
      behavior: 'smooth',
    })
    // alert('hi')
  }
)
const editBookDetails = (index, title) => {
  editIndex.value = index
  editInput.value = title
  // yet to work
  editInputRef.value?.focus()
  // emit('edit-book-details', index)
}
const saveBookDetails = (index, newTitle) => {
  editIndex.value = null
  // Update the book title in the tableData array
  // emit('update:tableData', [
  //   ...tableData.slice(0, index),
  //   { ...tableData[index], title: newTitle },
  //   ...tableData.slice(index + 1),
  // ])
}
// Remove book from donation list
const removeBook = (index) => {
  donationList.value.splice(index, 1)
}
</script>
