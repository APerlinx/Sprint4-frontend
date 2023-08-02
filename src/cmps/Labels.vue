<template>
  <div class="label-wrapper">
    <h5>Labels</h5>
    <div class="labels">
      <div v-for="labelId in task.labels" :key="labelId">
        <div
          class="label"
          :style="{ backgroundColor: getLabel(labelId).color }"
        >
          <h6 :style="{color: isDarkColor(getLabel(labelId).color) ? 'white' : ''} ">{{ getLabelTitle(labelId) }}</h6>
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
    isDarkColor(c) {
      c = c.substring(1); // strip #
      const rgb = parseInt(c, 16); // convert rrggbb to decimal
      const r = (rgb >> 16) & 0xff; // extract red
      const g = (rgb >> 8) & 0xff; // extract green
      const b = (rgb >> 0) & 0xff; // extract blue
      var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

      return luma < 100;
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
