<template>
  <div>
    <eden-page-header title="Find A Book" />
    <eden-page-stats :title="'Overview'" :stats="stats" class="my-0" :loading="summary.loading" />
    <books-table />

  </div>
</template>

<script lang="ts" setup>
import EdenPageHeader from "@/components/Global/EdenPageHeader.vue";
import EdenPageStats from "@/components/Global/EdenPageStats.vue";
import BooksTable from "@/components/Books/BooksTable.vue";
import usePermissions from "@/composables/permissions";
import useSupport from "@/composables/support";

import { computed, ref, onMounted } from "vue";
import useDate from "@/composables/date";
import employees from "@/requests/employees";
import { ElMessage } from "element-plus";
import { useAuthStore } from "@/store/auth";
import { useEmployeesStore } from "@/store/employees";
import { useRoute } from "vue-router";

const { formatDate } = useDate();
const route = useRoute()

const employeeStore = useEmployeesStore();
const authStore = useAuthStore();
const { allowAccessFor } = usePermissions();
const { formatFigure } = useSupport();
const { formatDateAndTime, formatStartAndEndDate } = useDate();

const loading = ref(false);
const showAddEmployeesModal = ref(false);

const addEmployee = () => {
  showAddEmployeesModal.value = true;
};
const startdate: any = computed(() => { return route.query.start })

const summary = ref({
  loading: false,
  data: {
    total_employees: "30",
    active_employees: "28",
    paused_employees: "2",
    total_services_subscribed: "3",
    total_hours_served: "26",
    all_time_orders: "3",
  },
});

const paymentStatus = computed(() => {
  return Object.keys(route.query).length && route.query.trxref ? true : false
})
const bodyText = computed(() => { return `${route.query.employees} Employees have been successfully invited to your ${route.query.subscription ? route.query.subscription : ''} subscription and their services will commence on ${formatDate(startdate.value, "dd, mm do y")}` })

const btnText = ref("Go to Employees Dashboard!")
const titleText = computed(() => {
  return `Invite Successfully sent!`
})
const stats = computed(() => {
  const summaryData = summary.value.data;
  return [
    {
      label: "Total Books Donated (From Inception)",
      // figure: formatFigure(summaryData.total_employees),
      figure: formatFigure('5'),
    },
    {
      label: "Available Books",
      figure: formatFigure('3'),
      // figure: formatFigure(summaryData.active_employees),
    },
    {
      label: "Books Distributed",
      figure: formatFigure('2'),
      // figure: formatFigure(summaryData.total_services_subscribed),
    }
  ];
});

const getBookSummary = () => {
  summary.value.loading = true;
  // const { start_date, end_date } = formatStartAndEndDate({
  //   period: "thisweek",
  // });

  // let payload = {
  //   customer_type: "individual",
  //   start_date,
  //   end_date,
  // };

  // employees
  //   .summary()
  //   .then((response) => {
  //     const { status, data } = response.data;
  //     console.log(response.data);
  //     if (status) {
  //       summary.value.data = data;
  //     }
  //   })
  //   .catch(() => {
  //     ElMessage.error("Error fetching summary");
  //   })
  //   .finally(() => {
  //     summary.value.loading = false;
  //   });
  summary.value.loading = false;

};

onMounted(() => {
  getBookSummary();
});
</script>

<style scoped lang="scss">
.eden-error {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 3.5rem;
    color: #21312a;
    margin-bottom: 20px;
    line-height: 0.6;
    text-transform: uppercase;
  }

  h3 {
    font-size: 2rem;
  }

  &__actions {
    margin-top: 50px;
    display: flex;
    align-items: center;
  }
}
</style>
