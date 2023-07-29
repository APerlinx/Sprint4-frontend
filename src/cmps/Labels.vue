<template>
  <div class="label-wrapper">
    <h5>Labels</h5>
    <template v-for="label in task.labelIds">
      <div
        v-if="label.checked"
        class="label"
        :style="{ backgroundColor: label.bgColor }"
      >
        <h6>{{ label.txt }}</h6>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props:["task"],
  data() {
    return {
    };
  },
};
</script>

<style>
input:focus {
  outline: none;
}
</style>
