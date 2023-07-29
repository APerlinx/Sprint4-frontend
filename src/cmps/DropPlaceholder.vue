<template>
  <div class="drop-placeholder" :style="{ height: height + 'px', width: width + '%', backgroundColor: color, border: border }"></div>
</template>

<script>
export default {
  name: 'DropPlaceholder',
  props: ['height', 'width', 'color', 'border'],
}
</script>

<style scoped>
.drop-placeholder {
    border: 10px solid black;
  background-color: black;
}
</style>
