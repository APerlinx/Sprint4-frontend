<template>
  <section class="group-list-section">
    <ul class="group-list">
      <Container
        :get-child-payload="getGroupPayload"
        @drop="onDrop($event)"
        orientation="horizontal"
        :drop-placeholder="dropPlaceholderOptions"
        dragClass="group-drag"
        dropClass="group-drop"
        class="group-container"
        v-if="groups"
        group-name="groups"
      >
        <Draggable v-for="group in groupList" :key="group._id">
          <GroupPreview
            :group="group"
            :key="group.id"
            class="group-preview"
            @update-title="updateGroup"
            @remove="removeGroup"
            @updateGroup="updateGroups"
          >
            <template #actions>
              <div class="group-actions">
                <button
                  v-if="!(showTaskForm && currentGroupId === group.id)"
                  @click="showAddTaskForm(group.id)"
                  class="group-btn"
                >
                  <span class="icon"></span> Add a card
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
        <button class="list-btn"><span class="icon"></span> Add another list</button>
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
import { scrollHorizontalDirective } from '../directives/index.js'
import { applyDrag } from '../services/util.service.js'
export default {
  name: 'group-list',
  data() {
    return {
      title: '',
      toggleAddForm: false,
      currentGroupId: null,
      showTaskForm: false,
      groups: [],
      currBoard: {},
      groupsStack: [],
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    groupList() {
      const boardId = this.$route.params.boardId
      this.groups = this.$store.getters.getGroupsByBoardId(boardId)
      this.groups = JSON.parse(JSON.stringify(this.groups))
      return this.groups
    },
    dropPlaceholderOptions() {
      return {
        className: 'group-drag',
        animationDuration: '150',
        showOnTop: false,
      }
    },
  },
  async created() {
    this.groups = JSON.parse(JSON.stringify(this.groups))
    this.currBoard = this.$store.getters.getCurrBoard
  },
  methods: {
    getGroupPayload(index) {
      return this.groups[index]
    },
    onDrop(dropRes) {
      this.groups = applyDrag(this.groups, dropRes)
      this.$store.dispatch({
        type: 'saveGroups',
        groups: this.groups,
        currBoard: this.currBoard,
      })
    },
    updateGroups({ info }) {
      info.group.tasks = info.tasks
      this.groupsStack.push(info.group)

      if (this.groupsStack.length === this.currBoard.groups.length) {
        let boardToUpdate = JSON.parse(JSON.stringify(this.currBoard))
        boardToUpdate.groups = this.groupsStack

        this.$store.dispatch({
          type: 'saveBoard',
          board: boardToUpdate,
        })

        this.groupsStack = []
      }
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
          board: this.currBoard,
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
    scrollHorizontal: scrollHorizontalDirective,
  },
}
</script>

<style scoped>
.group-drag {
  transform: rotate(3deg);
  /* box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1); */
}
</style>
