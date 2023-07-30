<template>
    <div 
    class="task-cover" 
    v-if="task.cover" 
    :style="{...coverStyle, height: coverHeight}"
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
          backgroundSize: this.task.cover.isFull === 'true' ? 'cover' : 'contain',
        };
      }
      return {
        backgroundColor: this.task.cover.color,
      };
    },
    coverHeight() {
      return this.task.cover.imgUrl ? '160px' : '32px';
    }
  },
};
</script>

<style scoped>
.task-cover {
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 8px 8px 0 0;
}
</style>
