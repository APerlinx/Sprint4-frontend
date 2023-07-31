<template>
  <div class="filter-label">
    <input type="text" v-model="searchLabels" placeholder="Search labels..." />
  </div>

  <div class="labels-container">
    <h6 class="sub-title">Labels</h6>

    <div class="label" v-for="label in this.board.labels" :key="label.id">
      <div
        @click="onSetLabel(label.id)"
        :class="{
          checkbox: !isLabelChecked(label.id),
          'checkbox checked': isLabelChecked(label.id),
        }"
      >
        <span class="v-check"></span>
      </div>
      <div
        :style="{ backgroundColor: label.color }"
        class="label-picker-color"
        @click="toggleLabel(label.id)"
      ></div>
    <i class="fa-sharp fa-solid fa-pencil"></i>

    </div>
    
    <button class="create-label">Create a new label</button>
  </div>
</template>

<script>
import { utilService } from "../../services/util.service.js";

export default {
  props: {
    board: Object,
    taskToEdit: Object,
  },

  data() {
    return {
      info: {
        taskToEdit: this.taskToEdit,
        board: this.board,
      },
    };
  },
  methods: {
    onSetLabel(labelId) {
      this.$emit("saveLabel", labelId);
    },
    isLabelChecked(labelId) {
      return this.taskToEdit.labels?.includes(labelId);
    },
  },
};
</script>

<style></style>
