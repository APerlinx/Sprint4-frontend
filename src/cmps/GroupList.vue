<template>
  <section class="group-list-section">
    <ul class="group-list">
      <GroupPreview
        v-for="group in groups"
        :key="group._id"
        :group="group"
        @update-title="updateGroup"
        @remove="removeGroup"
      >
        <template #actions>
          <div class="group-actions">
            <button @click="addTask(group.id)" class="group-btn">
              + Add a card
            </button>
          </div>
        </template>
      </GroupPreview>

      <li
        class="list-btn-wrapper"
        v-if="!toggleAddForm"
        @click="toggleAddForm = !toggleAddForm"
      >
        <button class="list-btn">+ Add another list</button>
      </li>
      <li
        class="open-form-wrapper"
        v-if="toggleAddForm"
        v-click-outside="handleCloseComponent"
      >
        <AddGroup @addGroup="addGroup" @close="handleCloseComponent" />
      </li>
    </ul>
  </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { boardService } from '../services/board.service.local.js'
import { clickOutsideDirective } from '../directives/index.js'
import GroupPreview from './GroupPreview.vue'
import AddGroup from './AddGroup.vue'

export default {
  data() {
    return {
      title: '',
      toggleAddForm: false,
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    groups() {
      const boardId = this.$route.params.boardId
      const groups = this.$store.getters.getGroupsByBoardId(boardId)
      return groups
    },
  },
  created() {},
  methods: {
    async addGroup(title) {
      try {
        const groupToAdd = boardService.getEmptyGroup()
        groupToAdd.title = title
        await this.$store.dispatch({
          type: 'addGroup',
          group: groupToAdd,
        })
        showSuccessMsg('Group added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add group')
      }
    },
    async removeGroup(groupId) {
      console.log('groupId', groupId);
      try {
        await this.$store.dispatch({
          type: 'removeGroup',
          groupId,
        })
        showSuccessMsg('Group removed')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove group')
      }
    },
    async updateGroup(group, changes) {
      try {
        group = { ...group, ...changes }
        await this.$store.dispatch(getActionUpdateGroup(group))
        showSuccessMsg('Group updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update group')
      }
    },
    async addTask(groupId, task) {
      try {
        await this.$store.dispatch({
          type: 'addTask',
          groupId,
          task,
        })
        showSuccessMsg('Task was added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add task')
      }
    },

    printGroupToConsole(group) {
      console.log('Group msgs:', group.msgs)
    },
    handleCloseComponent() {
      this.toggleAddForm = false
    },
  },
  components: {
    GroupPreview,
    AddGroup,
  },
  directives: {
    clickOutside: clickOutsideDirective,
  },
}
</script>

<style></style>
