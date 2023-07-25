<template>
  <section class="board-details">
    <BoardHeader />
    <!-- <GroupList /> -->
    <h1>Here the list group will be renderd</h1>
  </section>
</template>

<script>
import GroupList from '../cmps/GroupList.vue'
import BoardHeader from '../cmps/BoardHeader.vue'
export default {
  components: { GroupList, BoardHeader },
  data() {
    return {}
  },
}
</script>


