<template>
  <div class="add-modal">
    <div class="action">
      <div class="close"></div>
      <h3 class="title">Create board</h3>
      <div @click="closeModal" class="close">x</div>
    </div>

    <div class="board-layout" :style="{ background: preview }">
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
          class="create-btn"
          :class="{ check: titleLength }"
        >
          Create
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { boardService } from "../services/board.service.local";
import ColorPicker from "../cmps/ColorPicker.vue";
import ImgPicker from "../cmps/ImgPicker.vue";

export default {
  data() {
    return {
      isTitle: false,
      boardToEdit: boardService.getEmptyBoard(),
      preview: "",
    };
  },
  methods: {
    saveBoard() {
      if (!this.boardToEdit.title) return;
      this.$emit("save", this.boardToEdit);
    },
    closeModal() {
      this.$emit("close");
    },
    setBgColor(color) {
      this.preview = color;
      this.boardToEdit.bgColor = color;
    },
    setBgImg(img) {
      this.preview = img;
      this.boardToEdit.imgUrl = img;
    },
  },
  computed: {
    titleLength() {
      return this.boardToEdit.title.length;
    },
    imgUrl() {
      return `url(${this.preview})` || "";
    },
  },
  components: {
    ColorPicker,
    ImgPicker,
  },
};
</script>
<style>
.board-layout {
  background: v-bind(imgUrl);
  background-position: center;
  background-size: cover;
}
</style>
