<template>
  <div class="filter-label">
    <input
      type="text"
      v-model="searchLabels"
      placeholder="Search labels..."
      v-focus
    />
  </div>

  <div class="labels-container">
    <div class="edit-label" v-if="isEditModeModal">
      <EditLabel :labelToEdit="labelToEdit" @updateLabel="updateLabel" @removeLabel="removeLabel" />
    </div>
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
      >
        <h5>{{ label.title }}</h5>
      </div>
      <img
        @click="isEditMode(label)"
        class="pencil"
        src="../../assets/styles/img/pencil.svg"
        alt="edit"
      />
    </div>

    <button @click="isEditMode('')" class="create-label">
      Create a new label
    </button>
  </div>
</template>

<script>
import { utilService } from "../../services/util.service.js";
import EditLabel from "./EditLabel.vue";

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
      isEditModeModal: false,
      labelToEdit: null,
    };
  },
  methods: {
    onSetLabel(labelId) {
      this.$emit("saveLabel", labelId);
    },
    isLabelChecked(labelId) {
      return this.taskToEdit.labels?.includes(labelId);
    },
    isEditMode(label) {
      if (!label) {
        this.labelToEdit = null;
      } else {
        this.labelToEdit = label;
      }
      this.isEditModeModal = !this.isEditModeModal;
    },
    updateLabel(lable) {
      this.$emit("updateLable", lable);
    },
    removeLabel(label) {
      this.$emit("removeLabel", label);
    },
  },
  components: {
    EditLabel,
  },
};
</script>

<style></style>
