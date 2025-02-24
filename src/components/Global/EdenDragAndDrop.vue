<template>
  <!-- add `data-active` and the event listeners -->
  <div
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <!-- share state with the scoped slot -->
    <slot :dropZoneActive="active"></slot>
  </div>
</template>

<script setup lang="ts">
// make sure to import `ref` from Vue
import { ElMessage } from "element-plus";
import { ref, onMounted, onUnmounted } from "vue";
const emit = defineEmits(["files-dropped"]);

const props = withDefaults(defineProps<{ types: string[]; error?: string }>(), {
  types: () => [],
});

let active = ref(false);
let inActiveTimeout: any = null; // add a variable to hold the timeout key

function setActive() {
  active.value = true;
  clearTimeout(inActiveTimeout); // clear the timeout
}
function setInactive() {
  // wrap it in a `setTimeout`
  inActiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
}

function onDrop(e: DragEvent) {
  setInactive(); // add this line too
  const droppedFiles: File[] = [...e.dataTransfer!.files];

  if (
    props.types.length > 0 &&
    droppedFiles.some((item: File) => !props.types.includes(item.type))
  ) {
    ElMessage.error({ message: props.error ?? "Incorrect file type uploaded" });
  } else {
    emit("files-dropped", [...droppedFiles]);
  }
  //   console.log("dropped", droppedFiles[droppedFiles.length - 1]);
}

function preventDefaults(e: Event) {
  e.preventDefault();
}

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>
