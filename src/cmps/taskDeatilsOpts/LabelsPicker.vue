<template>
  <div class="filter-label">
    <input type="text" v-model="searchLabels" />
  </div>

  
  <div class="labels-container">
    <h6 class="sub-title">Labels</h6>


    <div class="label" v-for="label in labels" :key="label.id">
      <input
        @input="toggleLabel(label.id)"
        type="checkbox"
        :name="'labels-' + label.id"
        :id="'label-' + label.id"
        :checked="label.checked"
      />
      <div :style="{ backgroundColor: label.bgColor }" class="label-picker-color" @click="toggleLabel(label.id)">
        <input type="text" v-model="label.txt">
      </div>

      <p>edit</p>
    </div>
  </div>

  <button @click="check">check</button>
</template>

<script>
import { utilService } from "../../services/util.service.js";

export default {
  props: {
    info: Object,
  },

  data() {
    return {
      searchLabels: "",
      labels:  this.info.labelIds,
      //  [
      //   { id: "l101", checked: false, bgColor: "#bc9609", txt: '' },
      //   { id: "l102", checked: false, bgColor: "#bbf3db", txt: '' },
      //   { id: "l103", checked: false, bgColor: "#faa63d", txt: '' },
      //   { id: "l104", checked: false, bgColor: "#f87562", txt: '' },
      //   { id: "l105", checked: false, bgColor: "#9f90ef", txt: '' },
      // ],
      checkedLabels: [], 
    };
  },
  methods: {
    check() {
      console.log(this.labels);
    },
    toggleLabel(id) {
      const labelIndex = this.labels.findIndex((label) => label.id === id);
      if (labelIndex !== -1) {
        this.labels[labelIndex].checked = !this.labels[labelIndex].checked;
      }

      this.$emit("setLabel", this.labels[labelIndex]);
    },
  },
};
</script>

<style></style>
