<template>
  <page-header title="Donate Your Textbooks" />

  <div class="flex gap-8 justify-between">
    <div class="grow">
      <div class="flex items-center mb-3 relative">
        <span
          class="flex items-center text-gray-500 cursor-pointer absolute left-0"
          v-if="currentStep != -1"
          @click="currentStep--"
          ><el-icon class="">
            <arrow-left />
          </el-icon>
          <span class="text-sm">Back</span></span
        >
        <p class="absolute left-1/2 -translate-x-1/2 font-bold">
          {{ currentStep == -1 ? 'Select Institution' : 'Add Books' }}
        </p>
      </div>
      <el-steps style="max-width: 300px" :active="currentStep">
        <el-step title="Pick a School" />
        <el-step title="Add books" />
      </el-steps>

      <pick-school
        v-if="currentStep === -1"
        @school-selected="updateSchool($event)"
      />
      <add-books v-else />
    </div>
    <section class="shadow-md rounded-xl border border-gray-100 p-5 h-fit">
      <h2 class="text-2xl! font-bold">Donation Summary</h2>
      <div class="border-b border-b-indigo-100! py-3">
        <div class="flex justify-between items-center">
          <span class="">Total Books:</span>
          <span id="bookCount" class="font-bold text-primary">{{
            donatingBooksStore.donatingBooks.length
          }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="">Donating To:</span>
          <span class="font-bold text-gray-600">{{ selectedSchool }}</span>
        </div>
      </div>

      <div class="pt-3 border-t border-outline-variant">
        <el-button
          type="primary"
          :disabled="
            currentStep === -1 || donatingBooksStore.donatingBooks.length === 0
          "
          class="w-100"
          @click="submitDonation"
          >Submit Donation</el-button
        >

        <p class="my-3 text-center">
          By submitting, you agree to our
          <a class="underline!" href="#">Donation Guidelines</a>.
        </p>
      </div>

      <!-- Decorative Branding -->
      <div class="mt-xl overflow-hidden rounded-lg h-32 relative">
        <img
          alt="Scholarly aesthetic"
          class="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTd1wWOZl_V6vhzEgp1TLqdMlsNY-EOE0HhkyJgQE3B5eikuHvIDl2N2XC0lvMmOF47PtpPBLPaEkA5B1JtDg-KqfXGz8yr9zmwmayq3i2Nh9OvgwnxjO5dlj1QuZyqhMuKBjm_0f0tGO3vgJYrZJt7UZrt6-s1ZQNkXHRhPL2uGZ9DSAGlWiY556tHMx4j2lPTRTvH9wI8ldfIC-klzW4P7X5Kr9opqmGjmePLYn4HgYdl4tWxquNSnFGkPO-ARU-KYhBlDxYh2s"
        />
        <div
          class="absolute inset-0 bg-primary-container/10 flex items-center justify-center p-md"
        >
          <p class="text-label-md font-bold text-center text-primary">
            "Every book donated is a barrier removed for another student."
          </p>
        </div>
      </div>
    </section>
  </div>

  <!-- <div class="px-6 pb-5">
    <el-card class="donation-form">
      <el-alert v-if="!isDonor" class="mb-2" title="Please log in as a donor to donate any book" type="warning" />
      <h2 class="text-xl font-semibold mb-4">Donate Books to a School</h2>

      <el-form label-width="120px">
        <el-form-item label="Select School">
          <el-select v-model="selectedSchool" placeholder="Choose a school" style="width: 100%">
            <el-option v-for="school in schools" :key="school.id"
              :label="school.name + ', (' + school.location.address + ')'" :value="school._id" />
          </el-select>
        </el-form-item>

        <el-form-item label="ISBN (optional)">
          <el-input v-model="book.isbn" placeholder="Enter ISBN" />
        </el-form-item>
        <el-form-item label="Book Title">
          <el-input v-model="book.title" placeholder="Enter book title" />
        </el-form-item>

        <el-form-item label="Author">
          <el-input v-model="book.author" placeholder="Enter author's name" />
        </el-form-item>

        <el-form-item label="Subject (optional)">
          <el-input v-model="book.subject" placeholder="Enter subject (e.g. Math, Science)" />
        </el-form-item>

        <el-form-item label="Grade Level (optional)">
          <el-input v-model="book.gradeLevel" placeholder="Enter grade (e.g. JS1, SS2)" />
        </el-form-item>

        <el-form-item label="Quantity">
          <el-input-number v-model="book.quantity" :min="1" />
        </el-form-item>
        <el-form-item label="Book Description (optional)">
          <el-input v-model="book.description" type="textarea" placeholder="Enter book description" rows="4" />
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-button type="primary" :disabled="!isDonor" @click="addBook">Add Book</el-button>
      </el-form-item>


      <el-table :data="donationList" border style="margin-top: 20px">
        <el-table-column prop="title" label="Book Title"></el-table-column>
        <el-table-column prop="isbn" label="ISBN"></el-table-column>
        <el-table-column prop="author" label="Author"></el-table-column>
        <el-table-column prop="subject" label="Subject"></el-table-column>
        <el-table-column prop="gradeLevel" label="Grade Level"></el-table-column>
        <el-table-column class="w-100" prop="quantity" label="Quantity"></el-table-column>
        <el-table-column label="Actions">
          <template #default="{ row, $index }">
            <el-button type="danger" size="small" @click="removeBook($index)">Remove</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button :loading="loading" type="success" style="margin-top: 20px" :disabled="donationList.length === 0"
        @click="submitDonation">
        Submit Donation
      </el-button>
    </el-card>
  </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import AddBooks from '@/components/Donate/AddBooks.vue'
// import { useAuthStore } from '@/store/auth'
import { donateBooks } from '@/requests/dashboard'
import { useDonatingBooksStore } from '@/store/donatingBooks'
import PickSchool from '@/components/Donate/PickSchool.vue'
const donatingBooksStore = useDonatingBooksStore()
const currentStep = ref(-1)
// Store reference
// const authStore = useAuthStore()

// Reactive state
const selectedSchool = ref('---')

const donationList = ref([])
const loading = ref(false)
const updateSchool = (schoolName: string) => {
  selectedSchool.value = schoolName
  currentStep.value++
}

// const isDonor = computed(() => authStore.authProfile.role == 'donor')

// Submit donation
const submitDonation = () => {
  if (!donationList.value.length) {
    ElMessage.error('Please add a book.')
    return
  }
  loading.value = true
  donateBooks(donationList.value)
    .then((response) => {
      ElMessage.success({
        message: response.data.message || 'Donation submitted successfully!',
      })

      loading.value = false
      // Reset form
      donationList.value = []
      selectedSchool.value = null
    })
    .catch((err) => {
      loading.value = false
      ElMessage.error({
        message:
          err.response?.data?.message ||
          'Error donating books. Please try again.',
      })
    })
}
</script>

<style scoped>
.p-6 {
  padding: 24px;
}

.donation-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
</style>
