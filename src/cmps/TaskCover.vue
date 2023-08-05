<template>
  <div
    class="task-cover"
    v-if="task.cover"
    :style="{ ...coverStyle, height: coverHeight }"
  ></div>
</template>

<script>
export default {
  props: ['task'],
  computed: {
    coverStyle() {
      if (this.task.cover.imgUrl) {
        return {
          backgroundImage: `url('${this.task.cover.imgUrl}')`,
          backgroundSize: this.task.cover.isFull === 'true' ? 'cover' : 'cover',
        };
      }
      return {
        backgroundColor: this.task.cover.color,
      };
    },
    coverHeight() {
      if (!this.task.cover.imgUrl && !this.task.cover.color) {
        return '0'
      }
      return this.task.cover.imgUrl ? '160px' : '32px'
    },
  },
    watch: {
    'task.cover.isFull': function (newVal) {
      if (newVal) {
        this.$emit('coverFull', this.task.cover);
      }
    },
  }
};
</script>
