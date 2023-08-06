<template>
  <div
    class="task-cover"
    v-if="task.cover"
    :style="{ ...coverStyle, height: coverHeight }"
  >
    <i
      class="icon-pencil-cover"
      v-show="showEditIcon"
      @click.stop="openQuickEdit"
    ></i>
  </div>
</template>

<script>
export default {
  props: {
    task: Object,
    showEditIcon: Boolean,
  },
  computed: {
    coverStyle() {
      if (this.task.cover.imgUrl) {
        return {
          backgroundImage: `url('${this.task.cover.imgUrl}')`,
          backgroundSize: this.task.cover.isFull === 'true' ? 'cover' : 'cover',
        }
      }
      return {
        backgroundColor: this.task.cover.color,
      }
    },
    coverHeight() {
      if (!this.task.cover.imgUrl && !this.task.cover.color) {
        return '0'
      }
      return this.task.cover.imgUrl ? '160px' : '32px'
    },
  },
  methods: {
    openQuickEdit() {
      this.$emit('openQuickEdit')
    },
  },
  watch: {
    'task.cover.isFull': function (newVal) {
      if (newVal) {
        this.$emit('coverFull', this.task.cover)
      }
    },
  },
}
</script>
