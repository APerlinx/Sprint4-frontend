<template>
  <div class="label-wrapper">
    <h5>Labels</h5>
    <div class="labels">
      <div v-for="labelId in task.labels" :key="labelId">
        <div
          class="label"
          :style="{ backgroundColor: getLabel(labelId).color }">
          <h6>{{ getLabelTitle(labelId) }}</h6>
        </div>
      </div>
      <button class="add-label"><span class="icon plus"></span></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
    board: Object,
  },
  data() {
    return {};
  },
  methods: {
    getLabel(id) {
      return this.board.labels.find((label) => label.id === id);
    },
  },
  computed: {
    getLabelTitle() {
      return (id) => {
        const label = this.board.labels.find((label) => label.id === id);
        return label ? label.title : "";
      };
    },
  },
};
</script>

<style>
input:focus {
  outline: none;
}
</style>
