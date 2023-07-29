<template>
  <input type="text" v-model="searchLables" />

  <h6>labels</h6>

  <div class="labels-container">
    <div class="label">
        <input @input="labels.push('1')" type="checkbox" name="labels" id="labels" />
        <h2>green</h2>
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
      searchLables: "",
      labels: [],
    };
  },
  methods: {
    check() {
      console.log(this.labels);
    },
  },
};
</script>
<style></style>
