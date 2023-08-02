<template>
  <h6>Size</h6>
  <div class="layout">
    <div class="layout1" @click="setLayout(false)" :style="{ background: !isCover && !preview ? '#ececec' : coverToEdit.color }">
      <div class="bottom-section">
        <div class="line1" :style="{ background: !isCover && !preview ? '#ececec' : '' }"></div>
        <div class="line2" :style="{ background: !isCover && !preview ? '#ececec' : '' }"></div>
        <div class="bottom-line">
          <div class="line3" :style="{ background: !isCover && !preview ? '#ececec' : '' }"></div>
          <div class="line3" :style="{ background: !isCover && !preview ? '#ececec' : '' }"></div>
          <div class="circle" :style="{ background: !isCover && !preview ? '#ececec' : '' }"></div>
        </div>
      </div>
    </div>

    <div class="layout2" @click="setLayout(true)" :style="{ background: !isCover ? '#ececec' : coverToEdit.color }">
      <div class="div"></div>
      <div class="bottom-section">
        <div class="line4" :style="{ background: !isCover && !preview ? 'white' : '' }"></div>
        <div class="line5" :style="{ background: !isCover && !preview ? 'white' : '' }"></div>
      </div>
    </div>
  </div>

  <div v-if="isCover" class="remove-cover">
    <button @click="(isCover = false), (preview = ''), (lastPick = '')">
      Remove cover
    </button>
  </div>

  <h6 class="colors-title">Colors</h6>
  <section class="color-pallate-wide">
    <div v-for="(color, index) in colorOptions" :key="index" @click="setBgColor(color)" :class="colorClass[index]">
    </div>
  </section>

  <h6>Attachment</h6>

  <button>Upload a cover image</button>

  <p>Tip: choose the red one</p>

  <h6>Photos from unsplash</h6>

  <section class="img-pallte">
    <div v-for="(img, index) in imgOptions" :key="index" @click="setBgImg(img)" :class="imgClass[index]"></div>
  </section>
</template>

<script>
export default {
  props: {
    taskToEdit: Object
  },
  data() {
    return {
      coverToEdit: {
        color:'',
        img:'',
        isFull: false
      },
      isCover: false,
      lastPick: "",
      colorOptions: [
        //green
        "#f87462",

        //gold
        "#e1b304",

        //orange
        "#faa63d",

        //light-orange
        "#faa73d",

        //purple
        "#9f90ef",

        //blue
        "#589dff",

        //tourq
        "#61c7d2",

        //pink
        "#f77cb2",

        //grey
        "#8591a2",

        //red
        "#e85151",
      ],

      colorClass: [
        "green",
        "gold",
        "orange",
        "light-orange",
        "purple",
        "blue",
        "tourq",
        "pink",
        "grey",
        "red",
      ],

      imgOptions: [
        "https://images.unsplash.com/photo-1690207714547-6e76b0e61b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1690205074022-560b3587cbc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1688902325269-8f4593b5d6a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1661956601030-fdfb9c7e9e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      ],
      imgClass: ["img1", "img2", "img3", "img4"],
    };
  },
  methods: {
    setBgColor(color) {
    if (this.lastPick === color && this.isCover) {
      this.isCover = false;
      this.lastPick = "";
      this.coverToEdit.color = "";
    } else {
      this.isCover = true;
      this.lastPick = color;
      this.coverToEdit.color = color;
    }

    this.setCover();
  },
    setLayout(state) {
      this.coverToEdit.isFull = state
      this.setCover()
    },
    
    setCover() {
      this.$emit("setCover", this.coverToEdit);
    }
  },
};
</script>
