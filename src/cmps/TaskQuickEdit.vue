<template>
  <div v-if="quickEditDisplay">
    <section class="task-preview-container">
      <div
        @click.stop="quickEditDisplay = 'none'"
        class="quickEditScreen"
      ></div>
      <div class="quickEdit" ref="quickEdit">
        {{ task.title }}
      </div>

      <div
        class="action-buttons"
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
        <!-- <div @click.stop="removeTask">
        <span class="archive-icon"></span>Archive
      </div> -->
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
  },
  data() {
    return {
      actionBtns: [
        { txt: 'Labels', icon: 'labels-icon', type: 'labelPicker' },
        { txt: 'Members', icon: 'members-icon', type: 'memberPicker' },
        { txt: 'Cover', icon: 'cover-icon', type: 'coverPicker' },
        { txt: 'Dates', icon: 'dates-icon', type: 'datePicker' },
      ],
      cmpType: null,
      buttonPosition: {},
      isNearBottom: false, // New data property
    }
  },
  methods: {},
 mounted() {
    watch(
      () => this.quickEditDisplay,
      (newVal, oldVal) => {
        if (newVal !== oldVal && newVal) {
          this.$nextTick(() => {
            const rect = this.$refs.quickEdit.getBoundingClientRect()

            // Calculate distance from bottom of viewport to bottom of button element
            const distanceFromBottom = window.innerHeight - (rect.top + rect.height)

            // Calculate distance from right of viewport to right of button element
            const distanceFromRight = window.innerWidth - (rect.left + rect.width)

            // Change the position of the buttons if they are too close to the bottom or right
            this.isNearBottom = distanceFromBottom < 100 // Adjust this value as needed
            const isNearRight = distanceFromRight < 100 // Adjust this value as needed

            if (this.isNearBottom && isNearRight) {
              // Position buttons above and to the left of the modal
              this.buttonPosition = {
                position: 'fixed',
                top: `${rect.top - rect.height}px`,
                left: `${rect.left - rect.width}px`,
              }
            } else if (this.isNearBottom) {
              // Position buttons above the modal
              this.buttonPosition = {
                position: 'fixed',
                top: `${rect.top - rect.height}px`,
                left: `${rect.left}px`,
              }
            } else if (isNearRight) {
              // Position buttons to the left of the modal
              this.buttonPosition = {
                position: 'fixed',
                top: `${rect.top}px`,
                left: `${rect.left - rect.width}px`,
              }
            } else {
              // Position buttons to the right of the modal
              this.buttonPosition = {
                position: 'fixed',
                top: `${rect.top}px`,
                left: `${rect.left + rect.width}px`,
              }
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

<style lang="scss">
.task-preview-container {
  position: relative;
  display: flex;
  flex-direction: column;

  .task-preview-img {
    margin-bottom: em(-5px);
  }

  .quickEditScreen {
    height: 100%;
    width: 100%;
    background-color: #0009;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
  }

  .quickEdit {
    background-color: white;
    box-shadow: 0 1px 0 #091e4240;
    z-index: 30;
    width: 256px;
    height: 140px;
    overflow: visible;
    border-radius: 8px;
    position: fixed;

    padding: 8px 8px 4px 12px;

    .title-edit {
      border-radius: 5px;
      height: fit-content;
      overflow: hidden;

      textarea {
        min-width: 255px;
        padding-left: 8px;
        padding-bottom: 50px;
        overflow-y: hidden;
        border: none;
        color: #172b4d;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;

        &:focus-visible {
          outline: none;
        }
      }

      h5 {
        padding: 7px;
      }
    }
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 999;
    width: 100%;
    top: 0;
    left: 580px;

    button {
      width: fit-content;
      color: white;
      background-color: #0009;
      border: none;
      padding: 6px 12px 6px 10px;
      margin: 0 0 4px 8px;
      border-radius: 3px;
      font-size: 14px;
      letter-spacing: 0.8px;
      font-weight: 200;
      transition: transform 0.2s, background-color 0.2s;
      &:hover {
        transform: translateX(8%);
        background-color: rgba(0, 0, 0, 0.752);
        cursor: pointer;
      }

      .card-icon {
        font-family: trellicons;
        font-size: em(16px);
        padding-right: 5px;
        &::before {
          content: '\e912';
        }
      }

      .labels-icon {
        font-family: trellicons;
        font-size: em(16px);
        padding-right: em(5px);
        &::before {
          content: '\e93f';
        }
      }

      .members-icon {
        font-family: trellicons;
        font-size: em(16px);
        padding-right: em(5px);
        &::before {
          content: '\e946';
        }
      }

      .cover-icon {
        font-family: trellicons;
        font-size: em(16px);
        padding-right: em(5px);
        &::before {
          content: '\e914';
        }
      }

      .dates-icon {
        font-family: trellicons;
        font-size: em(16px);
        padding-right: em(5px);
        &::before {
          content: '\e91b';
        }
      }

      .archive-icon {
        font-family: trellicons;
        font-size: em(16px);
        padding-right: em(5px);
        &::before {
          content: '\e907';
        }
      }
    }
  }
}

.save-button {
  position: absolute;
  // top: 0;
  z-index: 50;
  &:hover {
    background-color: transparent;
    border: none;
  }

  button {
    margin-top: 10px;
    background-color: #0079bf;
    border: none;
    padding: 8.5px 24px;
    font-size: 14px;
    border-radius: 3px;
    box-shadow: 0px 0px 1px black;
    box-shadow: none;
    color: #fff;
    transition: background-color 0.2s;
    &:hover {
      background-color: #026aa7;
      border: none;
      box-shadow: none;
      color: #fff;
    }
  }
}
</style>
