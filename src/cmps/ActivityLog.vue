<template>
  <section class="activity-section" v-if="activities">
    <!-- <div class="activity-header">
        <span class="activity-icon"></span>
        <div class="activity-header-text">Activity</div>
      </div>
      <div class="activity-log">
        <div class="activity-list" v-for="activity in activities" :key="activity.id">
          <img v-if="activity.byMember.fullname !== 'Guest'" :src="activity.byMember?.imgUrl" />
          <div v-else class="active-user">G</div>
          <div class="activity-details">
            <div class="activity-member-name">{{ activity.byMember.fullname + ' ' }}</div>
            <div class="activity-txt">{{ activity.txt + ' ' }}</div>
            <div class="activity-task-title">{{ activity.task.title }}</div>
            <div class="activity-created-at">{{ timeFormat(activity.createdAt) }}</div>
          </div>
        </div>
      </div>
       -->
  </section>
</template>

<script>
export default {
  boardActivity: {
    type: Array,
    default: () => ({}),
  },
  data() {
    return {}
  },
  created() {
    console.log('this.boardActivity', this.boardActivity)
  },
  methods: {},
}
</script>
