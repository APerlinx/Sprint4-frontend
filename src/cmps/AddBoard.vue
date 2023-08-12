<template>
  <div class="add-modal">
    <div class="action">
      <div class="check"></div>
      <h3 class="title">Create board</h3>
      <span class="close-icon" @click="closeModal"></span>
    </div>

    <div class="board-layout" :style="{ background: preview, 'background-size': 'cover', 'background-position': 'center' }">
      <img
        src="https://workflow-g0zq.onrender.com/static/media/board-preview-skeleton.14cda5dc635d1f13bc4828f5113d1e86.svg"/>
    </div>

    <h6 class="background-title">Background</h6>
    <div class="img-picker">
      <ImgPicker @setBgImg="setBgImg" />
    </div>

    <div class="bg-picker">
      <ColorPicker @setBgColor="setBgColor" />
    </div>

    <div class="add-board-input">
      <h2>Board title <span>*</span></h2>
      <form @submit.prevent="saveBoard">
        <input autofocus type="text" v-model="boardToEdit.title" />
        <p v-if="!boardToEdit.title">👋 Board title is required</p>
        <button></button>
        <div
          @click="saveBoard"
          class="save-btn"
          :class="{ check: titleLength }"
        >
          Create
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// import { boardService } from "../services/board.service.local";
import { boardService } from "../services/board.service.js";
import ColorPicker from "../cmps/ColorPicker.vue";
import ImgPicker from "../cmps/ImgPicker.vue";

export default {
  data() {
    return {
      boardToEdit: boardService.getEmptyBoard(),
      preview: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    saveBoard() {
      if (!this.boardToEdit.title) return;
      this.boardToEdit.createdBy = this.getLoggendInUser
      console.log(this.boardToEdit);
      this.$emit("save", this.boardToEdit);
    },
    setBgColor(color) {
      this.preview = color;
      this.boardToEdit.style.backgroundColor = color;
    },
    setBgImg(img) {
      this.preview = `url(${img})`;
      this.boardToEdit.style.backgroundImage =`url(${img})` ;
    },
  },
  computed: {
    titleLength() {
      return this.boardToEdit.title.length;
    },
    imgUrl() {
      return `url(${this.preview})` || "";
    },
    getLoggendInUser() {
      this.$store.getters.getLoggendInUser
    }
  },
  components: {
    ColorPicker,
    ImgPicker,
  },
};
</script>
<style>
.board-layout {
  background-position: center;
  background-size: cover;
}
</style>
