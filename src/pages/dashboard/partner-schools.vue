<template>
  <page-header title="Partner Schools" />
  <div class="mt-4 pt-4">
    <eden-loader v-if="loading" />
    <div v-else>
      <el-table
        class="w-100"
        :data="pageData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />

        <!-- Title Column -->
        <el-table-column width="250">
          <template #header>
            <eden-table-column-header
              :label="'School Name'"
              :property="'name'"
              :sort-property="sort.property"
              @sort="sortPageData($event, 'title')"
            />
          </template>
          <template v-slot="scope">
            <!-- <div class="text-primary text-cursor"> -->
            {{ scope.row.name }}
            <!-- </div> -->
          </template>
        </el-table-column>

        <!-- Author Column -->
        <el-table-column>
          <template #header>
            <eden-table-column-header
              :label="'Location'"
              :property="'location'"
              :sort-property="sort.property"
              @sort="sortPageData($event, 'author')"
            />
          </template>
          <template v-slot="scope">
            <div>
              {{
                scope.row.location.address +
                ', ' +
                scope.row.location.state +
                ', ' +
                scope.row.location.country
              }}
            </div>
          </template>
        </el-table-column>

        <!-- Subject Column -->
        <el-table-column width="200">
          <template #header>
            <eden-table-column-header
              :label="'Library Limit'"
              :property="'libraryLimit'"
              :sort-property="sort.property"
              @sort="sortPageData($event, 'subject')"
            />
          </template>
          <template v-slot="scope">
            <div>{{ scope.row.libraryLimit + ' books' || 'N/A' }}</div>
          </template>
        </el-table-column>

        <el-table-column width="200" v-if="user.role === 'tolu'">
          <template v-slot="scope">
            <div class="text-success text-cursor">
              <router-link :to="{ name: 'donate' }">Donate</router-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <eden-pagination
      v-if="pageData.length"
      :page-size="pagination.pageSize"
      :from="pagination.from"
      :to="pagination.to"
      :total="pagination.total"
      :current-page.sync="page"
    />
    <eden-content-empty v-else :text="'No data'" />
    <employees-export
      :show="showExportEmployees"
      :data-to-export="exportData"
    />
    <!-- <delete-employee-modal  :show="showDeleteEmployeeModal" :employees="selectedEmployees" @close="showDeleteEmployeeModal = false"/> -->
    <component
      :is="action.component"
      :show="action.visibility"
      :employees="selectedEmployee"
      @updated="action.visibility = false"
      @close="action.visibility = false"
      :multiple="false"
    />
  </div>
</template>

<script lang="ts" setup>
import EdenTableColumnHeader from '@/components/Global/EdenTableColumnHeader.vue'
import EdenTableActions from '@/components/Global/EdenTableActions.vue'
import EdenPagination from '@/components/Global/EdenPagination.vue'
import EdenLoader from '@/components/Global/EdenLoader.vue'
import EdenContentEmpty from '@/components/Global/EdenContentEmpty.vue'
import { ref, computed, type PropType, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEmployeesStore } from '@/store/employees'
import { useAuthStore } from '@/store/auth'
import { getAllSchools } from '@/requests/auth'
import { ElMessage } from 'element-plus'
import { Employee } from '@/types'
import useSupport from '@/composables/support'
import useTags from '@/composables/tags'
import useDate from '@/composables/date'
import useSorting from '@/composables/sorting'

import { useRouter } from 'vue-router'
import { ROUTES } from '@/router/route-names'

const { formatDate } = useDate()
const { sortList } = useSupport()
const { setType } = useTags()
const { sortObjectAsParams } = useSorting()
const router = useRouter()
const showDeleteEmployeeModal = ref(false)
const employeesStore = useEmployeesStore()
const authStore = useAuthStore()
const user = computed(() => authStore.authProfile)

const { employees } = storeToRefs(employeesStore)
const action = ref({
  command: '',
  component: '',
  visibility: false,
})
const books = ref([
  {
    title: 'Introduction to Physics',
    author: 'Isaac Newton',
    subject: 'Physics',
    gradeLevel: 'Senior Secondary 1',
    school: { _id: '1', name: 'Bright Future Academy' },
    status: 'available',
    donatedBy: { _id: '101', name: 'John Doe' },
    isbn: '978-3-16-148410-0',
    description: 'A beginner-friendly guide to classical physics concepts.',
  },
  {
    title: 'Advanced Mathematics',
    author: 'Leonhard Euler',
    subject: 'Mathematics',
    gradeLevel: 'Senior Secondary 3',
    school: { _id: '2', name: 'Springfield High' },
    status: 'claimed',
    donatedBy: { _id: '102', name: 'Jane Smith' },
    isbn: '978-1-23-456789-7',
    description: 'Comprehensive coverage of algebra, calculus, and statistics.',
  },
  {
    title: 'Chemistry for Beginners',
    author: 'Marie Curie',
    subject: 'Chemistry',
    gradeLevel: 'Junior Secondary 2',
    school: { _id: '3', name: 'Greenwood Academy' },
    status: 'available',
    donatedBy: { _id: '103', name: 'Anonymous' },
    isbn: '978-0-12-345678-9',
    description:
      'An introduction to basic chemical reactions and periodic table.',
  },
  {
    title: 'World History Explained',
    author: 'Howard Zinn',
    subject: 'History',
    gradeLevel: 'Senior Secondary 2',
    school: { _id: '4', name: 'Royal Crest College' },
    status: 'claimed',
    donatedBy: { _id: '104', name: 'Michael Brown' },
    isbn: '978-4-56-789012-3',
    description:
      'A deep dive into major world events from ancient times to modern history.',
  },
  {
    title: 'Basic Computer Science',
    author: 'Alan Turing',
    subject: 'Computer Science',
    gradeLevel: 'Junior Secondary 3',
    school: { _id: '5', name: 'Tech Innovators School' },
    status: 'available',
    donatedBy: { _id: '105', name: 'Emily White' },
    isbn: '978-5-67-890123-4',
    description:
      'Fundamentals of programming, data structures, and algorithms.',
  },
])
const props = defineProps({
  employees: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
})

const sort = ref({
  property: 'name',
  direction: 'asc',
})
const close = () => {
  action.value = {
    command: '',
    component: '',
    visibility: false,
  }
}
const showExportEmployees = ref(false)
const showPagination = ref(true)
const loading = ref(false)
const page = ref(1)
const pagination = ref({
  from: 1,
  to: 1,
  total: 1,
  pageSize: 1,
})
const selectedEmployees = ref([])
const selectedEmployee = ref([{}])

const pageData = ref<Employee[]>([])

const exportData = ref([])

const command = (command: any) => {
  console.log(command)
  // if(command.action === 'delete'){
  // showDeleteEmployeeModal.value = true
  selectedEmployee.value = [command.employee]
  action.value.component = command.component
  setTimeout(() => {
    action.value.visibility = true
  }, 100)
  // }
}
const sortPageData = (direction: string, property: string) => {
  sort.value.property = property
  sort.value.direction = direction
  pageData.value = sortList(pageData.value, property, direction) as any
}

const title = computed(
  () => `${pageData.value.length} School${pageData.value.length > 1 ? 's' : ''}`
)

const exportAction = () => {
  if (!showPagination.value) {
    exportData.value = pageData.value as any
  } else {
    exportData.value = []
  }
  showExportEmployees.value = true
}

const getSchools = () => {
  loading.value = true
  getAllSchools()
    .then((response) => {
      console.log('Response:', response)
      pageData.value = response.data
      loading.value = false
    })
    .catch((err) => {
      console.error('Error:', err)
      ElMessage.error({
        message: err.response?.data?.message || 'Error getting list of schools',
      })
      loading.value = false
    })
}

const handleSelectionChange = (val: any) => {
  selectedEmployees.value = val
}
const goToEmployee = (id: number) => {
  router.push({
    name: ROUTES.EMPLOYEES.DETAILS,
    params: {
      id,
    },
  })
}

onMounted(() => {
  getSchools()
})
</script>
