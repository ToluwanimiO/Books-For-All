<template>
  <eden-page-header title="Donate" />
  <div class="px-6 pb-5">
    <el-card class="donation-form">
      <el-alert v-if="!isDonor" class="mb-2" title="Please log in as a donor to donate any book" type="warning" />
      <h2 class="text-xl font-semibold mb-4">Donate Books to a School</h2>

      <el-form label-width="120px">
        <!-- Select School -->
        <el-form-item label="Select School">
          <el-select v-model="selectedSchool" placeholder="Choose a school" style="width: 100%">
            <el-option v-for="school in schools" :key="school.id"
              :label="school.name + ', (' + school.location.address + ')'" :value="school._id" />
          </el-select>
        </el-form-item>

        <!-- Book Details -->
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


      <!-- Books Table -->
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
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect, computed } from "vue";
import { ElMessage } from "element-plus";
import { getAllSchools } from "@/requests/auth";
import { useAuthStore } from "@/store/auth";
import { donateBooks } from "@/requests/dashboard";

// Store reference
const authStore = useAuthStore();

// Reactive state
const selectedSchool = ref(null);
const book = reactive({ title: "", author: "", subject: "", gradeLevel: "", quantity: 1, isbn: "", description: "" });
const donationList = ref([]);
const schools = ref([]);
const loading = ref(false);

// Fetch schools on mount
watchEffect(() => {
  console.log(authStore.authProfile?.id)
  getAllSchools()
    .then((response) => {
      console.log("Response:", response);
      schools.value = response.data;
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});
const isDonor = computed(() => authStore.authProfile.role == 'donor');

// Add a book to donation list
const addBook = () => {
  if (book.title && book.author && selectedSchool.value) {
    const newBook = {
      ...book,
      school: selectedSchool.value,
      donatedBy: authStore.authProfile?.id
    };

    donationList.value.push(newBook);

    // Reset book form
    Object.assign(book, { title: "", author: "", subject: "", gradeLevel: "", quantity: 1, isbn: "", description: "" });
  } else {
    ElMessage.warning("Please fill in all book details.");
  }
};

// Remove book from donation list
const removeBook = (index) => {
  donationList.value.splice(index, 1);
};

// Submit donation
const submitDonation = () => {
  if (!donationList.value.length) {
    ElMessage.error("Please add a book.");
    return;
  }
  loading.value = true;
  donateBooks(donationList.value)
    .then((response) => {
      console.log("Response:", response);
      ElMessage.success({ message: response.data.message || "Donation submitted successfully!" });

      loading.value = false;
      // Reset form
      donationList.value = [];
      selectedSchool.value = null;
    })
    .catch((err) => {
      loading.value = false;
      console.error("Error:", err);
      ElMessage.error({ message: err.response?.data?.message || "Error donating books. Please try again." });
    });

};
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
