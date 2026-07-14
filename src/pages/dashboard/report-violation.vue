<template>
  <page-header title="Report a Violation" />

  <div class="max-w-2xl col-10 mt-5 mx-auto bg-white shadow-md rounded-lg">
    <el-form :model="reportData" label-width="120px">
      <el-form-item label="Violation Type">
        <el-select v-model="reportData.type" placeholder="Select a violation">
          <el-option
            v-for="option in violationTypes"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="Book (Optional)">
        <el-input
          v-model="reportData.book"
          placeholder="Book name (if applicable)"
        />
      </el-form-item>

      <el-form-item label="School (Optional)">
        <el-input
          v-model="reportData.school"
          placeholder="School name (if applicable)"
        />
      </el-form-item>

      <el-form-item label="Donor (Optional)">
        <el-input
          v-model="reportData.donor"
          placeholder="Donor name (if applicable)"
        />
      </el-form-item>

      <el-form-item label="Details">
        <el-input
          v-model="reportData.details"
          type="textarea"
          placeholder="Describe the violation"
          rows="4"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitReport"
          >Submit Report</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { reportViolation } from '@/requests/dashboard' // Import the function

const reportData = ref({
  type: '',
  book: '',
  school: '',
  donor: '',
  details: '',
})

const violationTypes = [
  { label: 'Incorrect Information', value: 'incorrect_info' },
  { label: 'Missing Book', value: 'missing_book' },
  { label: 'Inappropriate Content', value: 'inappropriate_content' },
  { label: 'Other', value: 'other' },
]

const submitReport = () => {
  if (!reportData.value.type || !reportData.value.details) {
    ElMessage.warning({ message: 'Violation Type and Details are required.' })
    return
  }

  reportViolation(reportData.value)
    .then((response) => {
      console.log('Response:', response)
      ElMessage.success({
        message: response.data.message || 'Report submitted successfully!',
      })

      Object.assign(reportData.value, {
        type: '',
        book: '',
        school: '',
        donor: '',
        details: '',
      })
    })
    .catch((err) => {
      console.error('Error:', err)
      ElMessage.error({
        message:
          err.response?.data?.message ||
          'Error submitting report. Please try again.',
      })
    })
}
</script>

<style scoped>
/* Add some styles if needed */
</style>
