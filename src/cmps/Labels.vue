<template>
  <div class="label-wrapper">
    <h5>Labels</h5>
    <div class="labels">
      <div v-for="label in task.labels">
        <div class="label" :style="{ backgroundColor: getLabel(label).color }" >
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
};
</script>

<style>
input:focus {
  outline: none;
}
</style>

