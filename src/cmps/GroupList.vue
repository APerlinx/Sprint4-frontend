<template>
  <section class="group-list-section">
    <ul class="group-list">
      <Container
        :get-child-payload="getGroupPayload"
        @drop="onGroupDrop"
        orientation="horizontal"
        behaviour="contain"
      >
        <Draggable v-for="group in groups" :key="group._id">
          <GroupPreview
            :group="group"
            @update-title="updateGroup"
            @remove="removeGroup"
          >
            <template #actions>
              <div class="group-actions">
                <button
                  v-if="!(showTaskForm && currentGroupId === group.id)"
                  @click="showAddTaskForm(group.id)"
                  class="group-btn"
                >
                  + Add a card
                </button>

                <AddTask
                  v-if="showTaskForm && currentGroupId === group.id"
                  :groupId="currentGroupId"
                  @addTask="addTask"
                  @close="closeTaskForm"
                />
              </div>
            </template>
          </GroupPreview>
        </Draggable>
      </Container>

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
import AddTask from './AddTask.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  data() {
    return {
      title: '',
      toggleAddForm: false,
      currentGroupId: null,
      showTaskForm: false,
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
    getGroupPayload(index) {
      return this.groups[index]
    },
    onGroupDrop(dropResult) {
      this.$store.dispatch('moveGroup', dropResult)
    },
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
      console.log('groupId', groupId)
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
    async addTask({ groupId, taskTitle }) {
      try {
        await this.$store.dispatch({
          type: 'addTask',
          groupId,
          task: { title: taskTitle },
        })
        this.showTaskForm = false
        showSuccessMsg('Task was added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add task')
      }
    },
    closeTaskForm() {
      this.showTaskForm = false
    },
    printGroupToConsole(group) {
      console.log('Group msgs:', group.msgs)
    },
    handleCloseComponent() {
      this.toggleAddForm = false
    },
    showAddTaskForm(groupId) {
      this.currentGroupId = groupId
      this.showTaskForm = true
    },
  },
  components: {
    GroupPreview,
    AddGroup,
    AddTask,
    Container,
    Draggable,
  },
  directives: {
    clickOutside: clickOutsideDirective,
  },
}
</script>

<style></style>
