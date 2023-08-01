<template>
  <section class="activity-section" v-if="boardActivity">
    <header class="activity-header">
      <div>
        <span class="back-icon" @click="this.$emit('close')"></span>
        <h1 class="activity-header-text">Activity</h1>
        <span class="close-icon" @click="this.$emit('closeMenu')"></span>
      </div>

      <hr />
    </header>
    <div class="activity-log">
      <div
        class="activity-list"
        v-for="activity in boardActivity"
        :key="activity.id"
      >
        <!-- <div class="image-warpper"></div> -->
        <img
          v-if="activity.byMember.fullname !== 'Guest'"
          :src="activity.byMember?.imgUrl"
        />
        <div v-else class="active-user">G</div>
        <div class="activity-details">
          <span class="activity-member-name">
            {{ activity.byMember.fullname + ' ' }}
          </span>
          <span class="activity-txt">{{ activity.txt + ' ' }} </span>
          <span
            class="activity-task-title"
            v-if="activity.task && activity.task.title"
          >
            {{ activity.task.title }}
          </span>
          <span
            class="activity-group-title"
            v-else-if="activity.group && activity.group.title"
          >
            {{ activity.group.title }}
          </span>
          <br />
          <span class="activity-created-at">
            {{ timeFormat(activity.createdAt) }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  emits: ['close', 'closeMenu'],
  props: {
    boardActivity: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    timeFormat(timestamp) {
      const now = Date.now()
      const timeDiff = now - timestamp

      if (timeDiff < 1000 * 60) {
        return 'Just now'
      } else if (timeDiff < 1000 * 60 * 60) {
        return Math.round(timeDiff / (1000 * 60)) + ' minutes ago'
      } else if (timeDiff < 1000 * 60 * 60 * 24) {
        return Math.round(timeDiff / (1000 * 60 * 60)) + ' hours ago'
      } else if (timeDiff < 1000 * 60 * 60 * 24 * 7) {
        return Math.round(timeDiff / (1000 * 60 * 60 * 24)) + ' days ago'
      } else if (timeDiff < 1000 * 60 * 60 * 24 * 30) {
        return Math.round(timeDiff / (1000 * 60 * 60 * 24 * 7)) + ' weeks ago'
      } else {
        const date = new Date(timestamp)
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }
        return date.toLocaleDateString(undefined, options)
      }
    },
  },
}
</script>
