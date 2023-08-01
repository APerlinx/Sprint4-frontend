<template>
  <div class="title">
    <span class="perv-btn">></span>
    <h2 v-if="labelToEdit">Edit label</h2>
    <h2 v-else>Create a label</h2>
    <span class="close-btn">X</span>
  </div>

  <div class="display">
    <div class="label" :style="{ backgroundColor: label.color }">
      <h2>{{ label.title }}</h2>
    </div>
  </div>

  <h6>Title</h6>
  <div class="label-title">
    <input type="text" v-model="label.title" />
  </div>

  <h6>Select a color</h6>
  <div class="color-pick">
    <div
      @click="setBgColor(label)"
      v-for="(label, idx) in labels"
      :key="idx"
      class="label"
      :style="{ backgroundColor: label }"
    ></div>
  </div>

  <div class="remove-btn">
    <h2>Remove</h2>
  </div>

  <div class="line"></div>

  <div class="actions">
    <div @click="updateLabel" class="save-btn"><h6>Save</h6></div>
    <div @click="removeLabel" class="delete-btn"><h6>Delete</h6></div>
  </div>

  <!-- <h2>{{ labelToEdit }}</h2> -->
</template>

<script>
import { utilService } from "../../services/util.service.js";

export default {
  props: {
    labelToEdit: Object,
  },

  data() {
    return {
      label: {
        title: this.labelToEdit?.title || "",
        color: this.labelToEdit?.color || "",
        id: this.labelToEdit?.id || utilService.makeId(),
      },
      labels: [
        "#F34E4E", // Ruby Red
        "#FF66CC", // Pink
        "#FF99CC", // Pastel Pink
        "#FFB347", // Amber
        "#FFD700", // Gold
        "#FFA500", // Orange
        "#FF7F50", // Coral
        "#FF6347", // Tomato
        "#E6E6FA", // Lavender
        "#9370DB", // Medium Purple
        "#40E0D0", // Turquoise
        "#00CED1", // Dark Turquoise
        "#4682B4", // Steel Blue
        "#1E90FF", // Dodger Blue
        "#87CEFA", // Light Sky Blue
        "#7FFFD4", // Aquamarine
        "#3CB371", // Medium Sea Green
        "#2E8B57", // Sea Green
        "#20B2AA", // Light Sea Green
        "#FF69B4", // Hot Pink
        "#FF1493", // Deep Pink
        "#BA55D3", // Medium Orchid
        "#DA70D6", // Orchid
        "#8A2BE2", // Blue Violet
        "#7B68EE", // Medium Slate Blue
        "#9370DB", // Medium Purple
        "#4B0082", // Indigo
        "#483D8B", // Dark Slate Blue
        "#4169E1", // Royal Blue
        "#0000CD", // Medium Blue
      ],
    };
  },
  methods: {
    setBgColor(color) {
      this.label.color = color;
    },
    updateLabel() {
      this.$emit("updateLabel", this.label);
    },
    removeLabel() {
      this.$emit("removeLabel", this.label);
    },
  },
  getters: {},
};
</script>

<style></style>
