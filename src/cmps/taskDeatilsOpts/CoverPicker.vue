<template>
  <h2>{{ taskToEdit.cover.color }}</h2>
  <h6>Size</h6>
  <div class="layout">
    <div
      class="layout1"
      @click="setLayout(false)"
      :style="{ background: hasCover ? taskToEdit.cover?.color : '#ececec' }"
    >
      <div class="bottom-section">
        <div
          class="line1"
          :style="{ background: hasCover ? '#ececec' : '' }"
        ></div>
        <div
          class="line2"
          :style="{ background: hasCover ? '#ececec' : '' }"
        ></div>
        <div class="bottom-line">
          <div
            class="line3"
            :style="{ background: hasCover ? '#ececec' : '' }"
          ></div>
          <div
            class="line3"
            :style="{ background: hasCover ? '#ececec' : '' }"
          ></div>
          <div
            class="circle"
            :style="{ background: hasCover ? '#ececec' : '' }"
          ></div>
        </div>
      </div>
    </div>

    <div
      class="layout2"
      @click="setLayout(true)"
      :style="{ background: hasCover ? taskToEdit.cover?.color : '#ececec' }"
    >
      <div class="div"></div>
      <div class="bottom-section">
        <div
          class="line4"
          :style="{ background: hasCover ? 'white' : '' }"
        ></div>
        <div
          class="line5"
          :style="{ background: hasCover ? 'white' : '' }"
        ></div>
      </div>
    </div>
  </div>

  <div v-if="isCover" class="remove-cover">
    <button
      @click="(isCover = false), (coverToEdit.color = ''), (lastPick = '')"
    >
      Remove cover
    </button>
  </div>

  <h6 class="colors-title">Colors</h6>
  <section class="color-pallate-wide">
    <div
      v-for="(color, index) in colorOptions"
      :key="index"
      @click="setBgColor(color)"
      :class="colorClass[index]"
    ></div>
  </section>

  <h6>Attachment</h6>

  <button>Upload a cover image</button>

  <p>Tip: choose the red one</p>

  <h6>Photos from unsplash</h6>

  <!-- <section class="img-pallte">
    <div
      v-for="(imgUrl, index) in imgUrls"
      :key="index"
      @click="setBgImg(img)"
      :class="imgClass[index]"
    >
   <pre>{{ imgUrl }}</pre>
  </div>
  </section> -->

</template>

<script>
export default {
  props: {
    taskToEdit: Object,
  },
  created() {
    this.fetchListOfPhotos(this.query)
  },
  data() {
    return {
      coverToEdit: {
        color:'',
        img:'',
        isFull: false
      },
      accesKey: 'MW3WlTYHFpvQZJwkJp360WPZFpDiNui3_1sdi4VjuhY',
      imgUrls: [],
      query: 'dogs',
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
    async fetchListOfPhotos(query = this.query) {
      console.log(query);
      // try {
      //   const response = await fetch(
      //     `https://api.unsplash.com/search/photos?client_id=${this.accesKey}&query=${query}`
      //   )
      //   const json = await response.json()

      //   console.log(json);

        // const imageUrls = json.results.map((img) => img.urls.regular)

        // if (imageUrls.length > 12) {
        //   this.imageUrls = imageUrls.slice(0, 12)
        // } else {
        //   this.imageUrls = imageUrls
        // }
      // } catch (err) {
      //   console.log('Cannot load photos', err)
      //   throw err
      // }
    },
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
  computed:{
    hasCover(){
      return this.taskToEdit.cover?.color
    }
  }
};
</script>
