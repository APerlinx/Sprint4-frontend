<template>
  <div v-if="quickEditDisplay">
    <section class="task-preview-container">
      <div @click.stop="closeQuickEdit" class="quickEditScreen"></div>
      <div class="quickEdit" ref="quickEdit" :style="quickEditPosition">
        <TaskCover :task="task" />

        <div class="labels" @click.stop>
          <div
            v-for="labelId in task.labels"
            :key="labelId"
            class="label"
            :class="{ expanded: areLabelsVisible }"
            :style="{
              backgroundColor:
                (getLabel(labelId) || {}).color || 'defaultColor',
            }"
            @click.stop="toggleLabel(labelId)"
          >
            <span v-if="areLabelsVisible">{{ getLabel(labelId).title }}</span>
          </div>
        </div>

        <div class="title-edit">
          <textarea v-model="localTask.title" autofocus  ref="titleInput"></textarea>
        </div>

        <div class="tool-tip-edit">
          <div v-if="task.members && task.members.length > 0">
            <span class="icon member"></span>
            <span class="member-counter">{{ task.members.length }}</span>
          </div>

          <div
            class="date"
            :class="`due-date ${dueDateStatus} ${task.status}`"
            v-if="task.dueDate"
            @click.stop.prevent="toggleStatus"
          >
            <span class="icon date"></span>
            <span class="date-counter">{{ formatDate(task.dueDate) }}</span>
          </div>

          <div v-if="task.attachments && task.attachments.length > 0">
            <span class="icon attachment"></span>
            <span class="attachment-counter">{{
              task.attachments.length
            }}</span>
          </div>
          <div v-if="task.description">
            <span class="icon desc"></span>
          </div>

          <div v-if="task.comments && task.comments.length > 0">
            <span class="icon comment"></span>
            <span class="comment-counter">{{ task.comments.length }}</span>
          </div>

          <div
            v-if="task.checklists && task.checklists.length > 0"
            :class="{
              'completed-checklist': doneChecklists === totalChecklists,
            }"
          >
            <span class="icon checklist"></span>
            <span class="checklist-counter"
              >{{ doneChecklists }}<span class="slash">/</span
              >{{ totalChecklists }}</span
            >
          </div>
        </div>
      </div>

      <div class="save-button" ref="saveButton" :style="saveButtonPosition">
        <button>Save</button>
      </div>

      <div
        class="action-buttons"
        :class="actionButtonsClass"
        v-if="quickEditDisplay"
        :style="buttonPosition"
      >
        <button @click="openTaskDetails">
          <span class="card-icon"></span>Open card
        </button>

        <button
          v-for="btn in actionBtns"
          :key="btn.type"
          @click.stop="openModal(btn.type)"
        >
          <span :class="btn.icon"></span>
          {{ btn.txt }}
        </button>
        <div @click.stop="removeTask">
          <span class="archive-icon"></span>
        </div>
        <DynamicModal
          v-if="cmpType"
          :actionCmpType="cmpType"
          :taskToEdit="localTask"
          :actionCmpName="CmpName"
          @closeDynamicModal="closeDynamicModal"
          @toggleMember="toggleMember"
          @saveLabel="saveLabel"
          @checklist="addChecklist"
          @removeLabel="removeLabel"
          @updateLable="updateLable"
          @DueDate="addDueDate"
          @attachment="addAttachment"
          @setCover="setCover"
        />
      </div>
    </section>
  </div>
</template>

<script>
import DynamicModal from '../views/DynamicModal.vue'
import TaskCover from './TaskCover.vue'

// import { utilService } from '../../services/util-service.js'
// import { socketService, SOCKET_EMIT_MEMBER_ACTION } from '../../services/socket.service'
// import { userService } from '../../services/user-service'
import { watch } from 'vue'
import { eventBus } from '../services/event-bus.service'

import Popper from 'vue3-popper'

export default {
  name: 'task-preview',
  components: {
    DynamicModal,
    Popper,
    TaskCover,
  },
  props: {
    task: {
      type: Object,
    },
    groupId: {
      type: String,
    },
    quickEditDisplay: {
      type: Boolean,
      required: true,
    },
    quickEditDisplay: {
      type: Boolean,
      required: true,
    },
    getLabel: {
      type: Function,
      required: true,
    },
    totalChecklists: {
      type: Number,
      required: true,
    },
    doneChecklists: {
      type: Number,
      required: true,
    },
    dueDateStatus: {
      type: String,
      required: true,
    },
    formatDate: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      actionBtns: [
        { txt: 'Edit labels', icon: 'labels-icon', type: 'LabelsPicker' },
        { txt: 'Change members', icon: 'members-icon', type: 'MemberPicker' },
        { txt: 'Change cover', icon: 'cover-icon', type: 'CoverPicker' },
        { txt: 'Edit dates', icon: 'dates-icon', type: 'DueDatePicker' },
        { txt: 'Archive', icon: 'archive-icon', type: 'archive' },
      ],
      cmpType: null,
      cmpName: '',
      buttonPosition: {},
      isNearBottom: false,
      saveButtonPosition: {},
      rect: null,
      containerPosition: {},
      quickEditPosition: {},
      quickEditDisplayStyle: {},
      localTask: null,
      actionButtonsClass: '',
      taskToEdit: null,
      group: null,
      board: null,
      hideBtn: false,
      isWatchActive: false,
      watch: 'Watch',
      isDynamicModal: false,
      actionCmpType: null,
      actionCmpName: null,
      isCoverActive: false,
      coverColor: '',
      currColor: '',
    }
  },
  created() {
    this.localTask = { ...this.task }
    // this.setTask()
  },
  computed: {
    areLabelsVisible() {
      return this.$store.getters.areLabelsVisible
    },
    cmpOrder() {
      return this.$store.getters.cmpsOrder
    },
  },
  methods: {
    set(cmp, idx) {
      this.isDynamicModal = true
      this.actionCmpType = cmp
      this.actionCmpName = this.dynamicNames[idx]
    },

    setCover(cover) {
      if (this.taskToEdit.hasOwnProperty('cover')) {
        this.taskToEdit.cover = cover
      } else {
        this.taskToEdit = { ...this.taskToEdit, cover: cover }
      }
      this.editTask()
    },

    removeLabel(board) {
      this.board = board
      this.editTask()
    },
    updateLable(board) {
      this.board = board
      this.editTask()
    },
    addDueDate(date) {
      this.taskToEdit.dueDate = date

      this.editTask()
    },
    saveLabel(labelId) {
      const idx = this.taskToEdit.labels?.findIndex(
        (label) => label === labelId
      )
      if (idx >= 0) this.taskToEdit.labels?.splice(idx, 1)
      else {
        this.taskToEdit.labels.push(labelId)
      }
      this.$store.dispatch({ type: 'updateBoard', board: this.board })
    },
    addAttachment(newAttachment) {
      if (!this.taskToEdit.attachments) this.taskToEdit.attachments = []
      this.taskToEdit.attachments.push(newAttachment)
      this.onTaskEdit()
    },
    addChecklist(newChecklist) {
      if (!this.taskToEdit.checklists) this.taskToEdit.checklists = []
      this.taskToEdit.checklists.push(newChecklist)
      this.editTask()
    },
    toggleMember(clickedMember) {
      if (!this.taskToEdit.members) {
        this.taskToEdit.members = []
        this.taskToEdit.members.push(clickedMember)
      } else {
        if (
          this.taskToEdit.members.some(
            (member) => member.id === clickedMember.id
          )
        ) {
          const idx = this.taskToEdit.members.findIndex(
            (member) => member.id === clickedMember.id
          )
          this.taskToEdit.members.splice(idx, 1)
        } else {
          this.taskToEdit.members.push(clickedMember)
        }
      }
    },
    async setTask() {
      try {
        const boardId = this.$route.params.boardId
        const board = await boardService.getById(boardId)
        const taskId = this.$route.params.taskId
        const groupId = this.$route.params.groupId
        // console.log("groupId:", groupId);

        this.board = JSON.parse(JSON.stringify(board))
        this.group = this.board.groups.find((group) => group.id === groupId)
        this.taskToEdit = this.group.tasks.find((task) => task.id === taskId)
      } catch (err) {
        console.log('error in setTask')
      }
    },
    togglecover() {
      this.isCoverActive = !this.isCoverActive
    },
    closeDynamicModal() {
      this.isDynamicModal = false
    },
    closeModal() {
      this.$router.back()
    },
    editTask() {
      console.log('edit task:')
      const editedTask = JSON.parse(JSON.stringify(this.taskToEdit))
      // console.log("editedTask:", editedTask)
      const taskIdx = this.group.tasks.findIndex(
        (task) => task.id === this.taskToEdit.id
      )
      // replace task with editTask
      this.group.tasks.splice(taskIdx, 1, this.taskToEdit)
      this.$store.dispatch({ type: 'updateBoard', board: this.board })
    },
    closeComponent() {
      this.taskTitle = ''
      this.$emit('close')
    },
    openModal(type) {
      switch (type) {
        case 'LabelsPicker':
          this.cmpType = 'LabelsPicker'
          this.CmpName = 'Edit labels'
          break
        case 'MemberPicker':
          this.cmpType = 'MemberPicker'
          this.CmpName = 'Change Members'

          break
        case 'CoverPicker':
          this.cmpType = 'CoverPicker'
          this.CmpName = 'Change cover'

          break
        case 'DueDatePicker':
          this.cmpType = 'DueDatePicker'
          this.CmpName = 'Edit dates'

          break
        default:
          this.cmpType = null
          // handle the archive action or other actions that do not correspond to a modal.
          break
      }
    },
    toggleStatus() {
      this.$emit('status-toggled')
    },
    toggleLabel() {
      this.$store.commit('toggleLabelsVisibility')
    },
    closeQuickEdit(e) {
      console.log('closeQuickEdit was called')
      if (e.target.classList.contains('quickEditScreen')) {
        this.$emit('close')
      }
    },
    goToTaskDetails() {
      this.$router.push(
        `/details/${this.board}/group/${this.groupId}/task/${this.task.id}`
      )
    },
  },
  mounted() {
    watch(
      () => this.quickEditDisplay,
      (newVal, oldVal) => {
        if (newVal !== oldVal && newVal) {
          this.$nextTick(() => {
            this.rect = this.$refs.quickEdit.getBoundingClientRect()

            const distanceFromBottom =
              window.innerHeight - (this.rect.top + this.rect.height)

            const distanceFromRight =
              window.innerWidth - (this.rect.left + this.rect.width)

            this.isNearBottom = distanceFromBottom < 100
            const isNearRight = distanceFromRight < 200
            this.actionButtonsClass = isNearRight ? 'modal-left' : 'modal-right'
            const adjustedTop = this.rect.top - 100
            this.$refs.titleInput.focus();
            this.$refs.titleInput.select();
            if (this.isNearBottom && isNearRight) {
              this.buttonPosition = {
                position: 'fixed',
                top: `${adjustedTop - this.rect.height + 115}px`,
                left: `${this.rect.left - this.rect.width + 125}px`,
              }
            } else if (this.isNearBottom) {
              this.buttonPosition = {
                position: 'fixed',
                top: `${adjustedTop - this.rect.height + 115}px`,
                left: `${this.rect.left + 256}px`,
              }
            } else if (isNearRight) {
              this.buttonPosition = {
                position: 'fixed',
                top: `${adjustedTop}px`,
                left: `${this.rect.left - this.rect.width + 80}px`,
              }
            } else {
              this.buttonPosition = {
                position: 'fixed',
                top: `${adjustedTop}px`,
                left: `${this.rect.left + this.rect.width}px`,
              }
            }
            this.saveButtonPosition = {
              position: 'fixed',
              top: `${adjustedTop + this.rect.height}px`,
              left: `${this.rect.left}px`,
            }

            this.quickEditPosition = {
              position: 'fixed',
              top: `${adjustedTop}px`,
              left: `${this.rect.left}px`,
            }
          })
        }
      },
      { immediate: true }
    )
  },
}
</script>

<style lang="scss"></style>
