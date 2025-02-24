<template>
  <div class="mt-4 pt-4">
    <eden-table-actions :title="title" :show-search="true" @search="searchEmployees">
      <template #actions>

        <div>
          <books-filter :disabled="loading" :clear="filterParams.clear" @filter="filter" />
        </div>
      </template>
    </eden-table-actions>
    <eden-loader v-if="loading" />
    <div v-else>
      <el-table :data="pageData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />

        <!-- Title Column -->
        <el-table-column width="180">
          <template #header>
            <eden-table-column-header :label="'Title'" :property="'title'" :sort-property="sort.property"
              @sort="sortPageData($event, 'title')" />
          </template>
          <template v-slot="scope">
            <div class="text-primary text-cursor">
              {{ scope.row.title }}
            </div>
          </template>
        </el-table-column>

        <!-- Author Column -->
        <el-table-column width="120">
          <template #header>
            <eden-table-column-header :label="'Author'" :property="'author'" :sort-property="sort.property"
              @sort="sortPageData($event, 'author')" />
          </template>
          <template v-slot="scope">
            <div>{{ scope.row.author }}</div>
          </template>
        </el-table-column>

        <!-- Subject Column -->
        <el-table-column width="110">
          <template #header>
            <eden-table-column-header :label="'Subject'" :property="'subject'" :sort-property="sort.property"
              @sort="sortPageData($event, 'subject')" />
          </template>
          <template v-slot="scope">
            <div>{{ scope.row.subject || "N/A" }}</div>
          </template>
        </el-table-column>

        <!-- Grade Level Column -->
        <el-table-column width="120">
          <template #header>
            <eden-table-column-header :label="'Grade Level'" :property="'gradeLevel'" :sort-property="sort.property"
              @sort="sortPageData($event, 'gradeLevel')" />
          </template>
          <template v-slot="scope">
            <div>{{ scope.row.gradeLevel || "N/A" }}</div>
          </template>
        </el-table-column>

        <!-- School Column -->
        <el-table-column width="150">
          <template #header>
            <eden-table-column-header :label="'School'" :property="'school'" :sort-property="sort.property"
              @sort="sortPageData($event, 'school.name')" />
          </template>
          <template v-slot="scope">
            <div>{{ scope.row.school?.name || "N/A" }}</div>
          </template>
        </el-table-column>

        <!-- Status Column -->
        <el-table-column width="100">
          <template #header>
            <eden-table-column-header :label="'Status'" :property="'status'" :sort-property="sort.property"
              @sort="sortPageData($event, 'status')" />
          </template>
          <template v-slot="scope">
            <el-tag :type="scope.row.status === 'claimed' ? 'danger' : 'success'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <!-- Donated By Column -->
        <el-table-column width="120">
          <template #header>
            <eden-table-column-header :label="'Donated By'" :property="'donatedBy'" :sort-property="sort.property"
              @sort="sortPageData($event, 'donatedBy.name')" />
          </template>
          <template v-slot="scope">
            <div>{{ scope.row.donatedBy?.name || "Anonymous" }}</div>
          </template>
        </el-table-column>

        <!-- ISBN Column -->
        <el-table-column width="180">
          <template #header>
            <eden-table-column-header :label="'ISBN'" :property="'isbn'" :sort-property="sort.property"
              @sort="sortPageData($event, 'isbn')" />
          </template>
          <template v-slot="scope">
            <div>{{ scope.row.isbn || "N/A" }}</div>
          </template>
        </el-table-column>

        <!-- Description Column -->
        <el-table-column width="300">
          <template #header>
            <eden-table-column-header :label="'Description'" :property="'description'" :sort-property="sort.property"
              @sort="sortPageData($event, 'description')" />
          </template>
          <template v-slot="scope">
            <div>{{ scope.row.description || "No description available" }}</div>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <eden-pagination v-if="pageData.length" :page-size="pagination.pageSize" :from="pagination.from" :to="pagination.to"
      :total="pagination.total" :current-page.sync="page" />
    <eden-content-empty v-else :text="'No data'" />
    <employees-export :show="showExportEmployees" :data-to-export="exportData" />
    <!-- <delete-employee-modal  :show="showDeleteEmployeeModal" :employees="selectedEmployees" @close="showDeleteEmployeeModal = false"/> -->
    <component :is="action.component" :show="action.visibility" :employees="selectedEmployee"
      @updated="action.visibility = false" @close="action.visibility = false" :multiple='false' />
  </div>
</template>

<script lang="ts" setup>
import EdenTableColumnHeader from "@/components/Global/EdenTableColumnHeader.vue";
import EdenTableActions from "@/components/Global/EdenTableActions.vue";
import EdenPagination from "@/components/Global/EdenPagination.vue";
import EdenLoader from "@/components/Global/EdenLoader.vue";
import EdenContentEmpty from "@/components/Global/EdenContentEmpty.vue";
import BooksFilter from "@/components/Books/BooksFilter.vue";
import { ref, computed, type PropType, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useEmployeesStore } from "@/store/employees";
import employeesRequest from "@/requests/employees";
import { ElMessage } from "element-plus";
import { Employee, FilterParam } from "@/types";
import useSupport from "@/composables/support";
import useTags from "@/composables/tags";
import useDate from "@/composables/date";
import useSorting from "@/composables/sorting";

import { useRouter } from "vue-router";
import { ROUTES } from "@/router/route-names";

const { formatDate } = useDate();
const { sortList } = useSupport();
const { setType } = useTags();
const { sortObjectAsParams } = useSorting();
const router = useRouter();
const showDeleteEmployeeModal = ref(false)
const employeesStore = useEmployeesStore();
const { employees } = storeToRefs(employeesStore);
const action = ref({
  command: "",
  component: "",
  visibility: false,
});
const books = ref([
  {
    title: "Introduction to Physics",
    author: "Isaac Newton",
    subject: "Physics",
    gradeLevel: "Senior Secondary 1",
    school: { _id: "1", name: "Bright Future Academy" },
    status: "available",
    donatedBy: { _id: "101", name: "John Doe" },
    isbn: "978-3-16-148410-0",
    description: "A beginner-friendly guide to classical physics concepts.",
  },
  {
    title: "Advanced Mathematics",
    author: "Leonhard Euler",
    subject: "Mathematics",
    gradeLevel: "Senior Secondary 3",
    school: { _id: "2", name: "Springfield High" },
    status: "claimed",
    donatedBy: { _id: "102", name: "Jane Smith" },
    isbn: "978-1-23-456789-7",
    description: "Comprehensive coverage of algebra, calculus, and statistics.",
  },
  {
    title: "Chemistry for Beginners",
    author: "Marie Curie",
    subject: "Chemistry",
    gradeLevel: "Junior Secondary 2",
    school: { _id: "3", name: "Greenwood Academy" },
    status: "available",
    donatedBy: { _id: "103", name: "Anonymous" },
    isbn: "978-0-12-345678-9",
    description: "An introduction to basic chemical reactions and periodic table.",
  },
  {
    title: "World History Explained",
    author: "Howard Zinn",
    subject: "History",
    gradeLevel: "Senior Secondary 2",
    school: { _id: "4", name: "Royal Crest College" },
    status: "claimed",
    donatedBy: { _id: "104", name: "Michael Brown" },
    isbn: "978-4-56-789012-3",
    description: "A deep dive into major world events from ancient times to modern history.",
  },
  {
    title: "Basic Computer Science",
    author: "Alan Turing",
    subject: "Computer Science",
    gradeLevel: "Junior Secondary 3",
    school: { _id: "5", name: "Tech Innovators School" },
    status: "available",
    donatedBy: { _id: "105", name: "Emily White" },
    isbn: "978-5-67-890123-4",
    description: "Fundamentals of programming, data structures, and algorithms.",
  },
])
const props = defineProps({
  employees: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const sort = ref({
  property: "name",
  direction: "asc",
});
const close = () => {
  action.value = {
    command: "",
    component: "",
    visibility: false,
  }
}
const showExportEmployees = ref(false);
const showPagination = ref(true);
const loading = ref(false);
const page = ref(1);
const pagination = ref({
  from: 1,
  to: 1,
  total: 1,
  pageSize: 1,
});
const filterParams = ref<FilterParam>({
  clear: false,
  status: false,
  params: {},
  paramsLabel: {},
});

const selectedEmployees = ref([]);
const selectedEmployee = ref([{}]);

const pageData = ref<Employee[]>([]);

const exportData = ref([]);

const command = (command: any) => {
  console.log(command);
  // if(command.action === 'delete'){
  // showDeleteEmployeeModal.value = true
  selectedEmployee.value = [command.employee]
  action.value.component = command.component;
  setTimeout(() => {
    action.value.visibility = true;
  }, 100);
  // }
};
const sortPageData = (direction: string, property: string) => {
  sort.value.property = property;
  sort.value.direction = direction;
  pageData.value = sortList(pageData.value, property, direction) as any;
};

const title = computed(
  () =>
    `${pageData.value.length} Book${pageData.value.length > 1 ? "s" : ""}`,
);

const exportAction = () => {
  if (!showPagination.value) {
    exportData.value = pageData.value as any;
  } else {
    exportData.value = [];
  }
  showExportEmployees.value = true;
};

const filter = ({ params, paramsLabel }: any) => {
  loading.value = true;

  const stringedParams = sortObjectAsParams(params);
  console.log(params)
  pageData.value = books.value.filter((item: any) => {
    return Object.keys(params).every((key) => {
      if (!params[key] || params[key] === "all") return true; // Ignore "all" filters
      return String(item[key]).toLowerCase() === String(params[key]).toLowerCase();
    });
  });
  loading.value = false
  // console.log(stringedParams);
  // employeesRequest
  //   .list(`?${stringedParams}`)
  //   .then(({ data, status }) => {
  //     console.log(data)
  //     if (status) {
  //       // pageData.value = (data?.data as any[])?.map((item: any) =>
  //       //   mapEmployeesFromBackend(item),
  //       // );
  //       filterParams.value = {
  //         status: true,
  //         params: params,
  //         paramsLabel: paramsLabel,
  //       };
  //     }
  //     loading.value = false;
  //   })
  //   .catch((error) => {
  //     loading.value = false;
  //     const errorMessage = error.response.data;
  //     if (errorMessage.errors) {
  //       const errorKeys = Object.keys(errorMessage.errors);
  //       ElMessage.error(errorMessage.errors[errorKeys[0]].join(""));
  //     } else {
  //       ElMessage.error(errorMessage.message);
  //     }
  //   });
};

const handleSelectionChange = (val: any) => {
  selectedEmployees.value = val;
};

const searchEmployees = (query: string) => {
  if (query === "") {
    setPageData();
    return;
  }
  loading.value = true;

  // employeesRequest
  //   .search(query)
  //   .then(({ data }) => {
  //     // pageData.value = (data?.data as any[]).map((item) =>
  //     //   mapEmployeesFromBackend(item),
  //     // );
  //     showPagination.value = false;
  //     loading.value = false;
  //   })
  //   .catch((error) => {
  //     loading.value = false;
  //     const errorMessage = error.response.data;
  //     if (errorMessage.errors) {
  //       const errorKeys = Object.keys(errorMessage.errors);
  //       ElMessage.error(errorMessage.errors[errorKeys[0]].join(""));
  //     } else {
  //       ElMessage.error(errorMessage.message);
  //     }
  //   });
  pageData.value = books.value.filter((item: any) => {
    return Object.keys(item).some((key) => {
      const value = item[key];

      // If value is an object, convert it to a string
      if (typeof value === "object" && value !== null) {
        return JSON.stringify(value).toLowerCase().includes(query.toLowerCase());
      }

      // If value is an array, check if any item matches
      if (Array.isArray(value)) {
        return value.some((val) =>
          String(val).toLowerCase().includes(query.toLowerCase())
        );
      }

      // Default case: Convert to string and check if it includes the query
      return String(value).toLowerCase().includes(query.toLowerCase());
    });
  });
  loading.value = false;

};

const setPageData = () => {
  // pageData.value = employees.value;
  pageData.value = books.value

  console.log(employees.value)
  const { direction, property } = sort.value;

  if (property) {
    sortPageData(direction, property);
  }
  showPagination.value = true;
  filterParams.value = {
    clear: true,
    status: false,
    params: {},
    paramsLabel: {},
  };
};

const getEmployees = () => {
  loading.value = true;

  employeesStore
    .list()
    .then(() => {
      setPageData();
      loading.value = false;
    })
    .catch((error) => {
      loading.value = false;
      const errorMessage = error.response.data;
      if (errorMessage.errors) {
        const errorKeys = Object.keys(errorMessage.errors);
        ElMessage.error(errorMessage.errors[errorKeys[0]].join(""));
      } else {
        ElMessage.error(errorMessage.message);
      }
    });
};

const goToEmployee = (id: number) => {
  router.push({
    name: ROUTES.EMPLOYEES.DETAILS,
    params: {
      id,
    },
  });
};

watch(page, () => {
  getEmployees();
});

onMounted(() => {
  getEmployees();
});
</script>
