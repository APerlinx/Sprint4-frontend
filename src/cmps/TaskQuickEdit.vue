<template>
  <div v-if="quickEditDisplay">
    <section class="task-preview-container">
      <div @click.stop="quickEditDisplay = false" class="quickEditScreen"></div>
      <div class="quickEdit" ref="quickEdit" :style="quickEditPosition">
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
          <textarea v-model="localTask.title"></textarea>
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
            @click.stop="toggleStatus"
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
        <component :is="cmpType"> </component>
        <div @click.stop="removeTask">
          <span class="archive-icon"></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import labelPicker from '../components/label-picker.vue'
// import memberPicker from '../components/member-picker.vue'
// import datePicker from '../components/date-picker.vue'
// import coverPicker from '../components/cover-picker.vue'
// import taskPreviewDetails from '../components/task-preview-details.vue'
// import { utilService } from '../../services/util-service.js'
// import { socketService, SOCKET_EMIT_MEMBER_ACTION } from '../../services/socket.service'
// import { userService } from '../../services/user-service'
import { watch } from 'vue'
import { clickOutsideDirective } from '../directives/index.js'

export default {
  name: 'task-preview',
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
        { txt: 'Labels', icon: 'labels-icon', type: 'labelPicker' },
        { txt: 'Members', icon: 'members-icon', type: 'memberPicker' },
        { txt: 'Cover', icon: 'cover-icon', type: 'coverPicker' },
        { txt: 'Dates', icon: 'dates-icon', type: 'datePicker' },
        { txt: 'Archive', icon: 'archive-icon', type: 'archive' },
      ],
      cmpType: null,
      buttonPosition: {},
      isNearBottom: false,
      saveButtonPosition: {},
      rect: null,
      containerPosition: {},
      quickEditPosition: {},
      quickEditDisplayStyle: {},
      localTask: null,
      actionButtonsClass: '',
    }
  },
  created() {
    this.localTask = { ...this.task }
  },
  computed: {
    areLabelsVisible() {
      return this.$store.getters.areLabelsVisible
    },
  },
  methods: {
    toggleStatus() {
      this.$store.dispatch('toggleStatus', {
        groupId: this.groupId,
        task: this.task,
      })
    },
    openModal() {
      console.log('openModal')
    },
    toggleLabel() {
      this.$store.commit('toggleLabelsVisibility')
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
                left: `${this.rect.left - this.rect.width + 130}px`,
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
  directives: {
    clickOutside: clickOutsideDirective,
  },
}
</script>

<style lang="scss"></style>
