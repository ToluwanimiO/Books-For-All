<template>
  <div class=" is-flex is-flex-column">
    <eden-page-header
      title="Corporate dashboard"
      subtitle="Activity feed"
    />
    <div>
      <eden-back-button />
    </div>
   <div class="is-flex justify-between mt-4 pb-2 mb-2" style="border-bottom: 1px solid #f0f4f2;">
        <p class="text-bold">Activity feed</p>
        <span>
          <span class="text-grey-tertiary font-sm mr-2" @click="expandAll">Expand all</span>
          <span class="text-grey-tertiary font-sm mr-2" @click="collapseAll">Collapse all</span>
        <!-- <el-dropdown  v-if="Object.keys(pageData).length">
          <el-button disabled type="plain">
            <span class="font-sm">All time</span>
            <i class="eden-icon-arrow-down ml-1"></i>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
             <el-dropdown-item
              >All time</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
        </span>
      </div>
   <div class="demo-collapse">
        <el-collapse class="eden-custom-activity--collapse" v-model="activeNames">
          <el-collapse-item 
            v-for="(activity, date, index) in pageData.data"
            :key="index"
            :title="formatDate(date.toString(),'do m')"
            :name="index"
            class="text-grey-primary"
          >
            <div
              class="is-flex justify-between"
              v-for="(item, index) in activity"
              :key="index"
            >
              <span>{{ item.description }}</span>
              <!-- {{ formatTime(item.created_at, "12h") }}     -->
              <span>{{ formatTime(item.created_at, "12h") }}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
  </div>
</template>

<script lang="ts" setup>
import EdenBackButton from "@/components/Global/EdenBackButton.vue";
import EdenPageHeader from "@/components/Global/EdenPageHeader.vue";
import useDate from "@/composables/date";
import useSupport from "@/composables/support";
import dashboardRequest from "@/requests/dashboard"; 

import { onMounted, ref } from "vue";
const { formatDate,formatTime } = useDate();
const recentActivities = ref<any>({
  "25th Sept": [
    {
      created_at: "10:48 AM",
      description:
        "Aderinsola Oluwafemi paused her Food service from 11th Sept - 17th Sept. ",
    },
    {
      created_at: "10:48 AM",
      description: "Aderinsola Oluwafemi’s Food service has been unpaused.",
    },
    {
      created_at: "10:48 AM",
      description:
        "Aderinsola Oluwafemi’s employee account has been deactivated. ",
    },
    {
      created_at: "10:48 AM",
      description: "Aderinsola Oluwafemi’s employee account has been deleted. ",
    },
  ],
  "24th Sept": [
    {
      created_at: "10:48 AM",
      description:
        "Aderinsola Oluwafemi paused her Food service from 11th Sept - 17th Sept. ",
    },
    {
      created_at: "10:48 AM",
      description: "Aderinsola Oluwafemi’s Food service has been unpaused.",
    },
  ],
  "23rd Sept": [
    {
      created_at: "10:48 AM",
      description:
        "Aderinsola Oluwafemi paused her Food service from 11th Sept - 17th Sept. ",
    },
    {
      created_at: "10:48 AM",
      description: "Aderinsola Oluwafemi’s Food service has been unpaused.",
    },
  ],
});
const expandAll = () => {
    activeNames.value = Object.keys(pageData.value.data).map((i,index) => index)
}
const collapseAll = () => {
    activeNames.value = []
}
const pageData = ref<any>();
const activeNames = ref([0]);
const loading = ref(false)
const getActivityFeed =(endDate='')=>{
  dashboardRequest.getActivityFeed(`${endDate?`/?${endDate}`:''}`)
  .then((response)=>{
    loading.value = false
    console.log(response.data.data )
    pageData.value = response.data.data
  })
  .catch((error)=>{
    console.log(error)
    loading.value = false
  })
}
onMounted(()=>{
  getActivityFeed()

})
</script>

<style lang="scss" scoped>
.cycle {
  display: flex;
  align-items: center;

  i {
    margin: 0 20px;
  }
}
.activity-item {
  margin-bottom: 32px;
  border: 1px solid #e2e9e6;
  border-radius: 8px;
  padding: 20px;
  margin-top: 50px;
  .date {
    margin-bottom: 24px;
  }

  .el-tag {
    background: var(--eden-blue-septenary);
    color: var(--eden-grey-primary);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .activities {
    padding: 0 10px;
    .el-row {
      align-items: center;
    }

    .description {
      padding: 12px 0;
      border-top: 1px solid #e2e9e6;
    }

    &:last-child {
      .description {
        border-bottom: 1px solid #e2e9e6;
      }
    }
  }
}
</style>
