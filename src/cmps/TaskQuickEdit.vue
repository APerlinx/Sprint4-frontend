<template>
  <section class="quickEdit" :style="{ display: quickEditDisplay }">
    <div class="title-edit">
      <img v-if="task.style?.bgImgUrl" :src="task.style.bgImgUrl" />
      <h5>{{ task.title }}</h5>
    </div>

    <div class="action-buttons">
      <button><span class="card-icon"></span>Open card</button>
      <button><span class="labels-icon"></span>Edit lables</button>
      <button><span class="members-icon"></span>Change members</button>
      <button><span class="cover-icon"></span>Change cover</button>
      <button><span class="dates-icon"></span>Edit dates</button>
      <button><span class="archive-icon"></span>Archive</button>
    </div>

    <div class="save-button">
      <button>Save</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'taskQuickEdit',
  props: {
    task: {
      type: Object,
    },
    groupId: {
      type: String,
    },
  },
  data() {
    return {
      quickEditDisplay: 'block',
    }
  },
  methods: {
    openTaskDetails() {
      this.$router.push(
        `/board/${this.getCurrBoard._id}/${this.groupId}/${this.task.id}`
      )
    },
  },
  computed: {
    getCurrBoard() {
      return this.$store.getters.getCurrebtBoard
    },
  },
}
</script>

<style lang="scss" scoped>
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
    position: fixed;
    margin-left: -8px;
    background-color: white;
    box-shadow: 0 1px 0 #091e4240;
    z-index: 30;
    max-width: em(256px);
    height: fit-content;
    overflow: visible;
    border-radius: 3px;
  
    .action-buttons {
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 100%;
      top: 0;
      left: em(261px);

      button {
        width: fit-content;
        color: white;
        background-color: #0009;
        border: none;
        padding: em(8px) em(15px);
        margin: em(2px);
        border-radius: em(4px);
        font-size: em(14px);
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
          padding-right: em(5px);
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

    .title-edit {
      border-radius: 5px;
      height: fit-content;
      overflow: hidden;

      textarea {
        min-width: 255px;
        padding-left: em(8px);
        padding-bottom: 50px;
        overflow-y: hidden;
        border: none;
        color: #172b4d;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
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
