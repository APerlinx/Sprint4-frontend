<template>
  <section class="bg-menu" v-if="!photos && !colors">
    <header class="bg-menu-header">
      <div>
        <span class="back-icon" @click="this.$emit('close')"></span>
        <h1>Change background</h1>
        <span class="close-icon" @click="this.$emit('closeMenu')"></span>
      </div>
      <hr />
    </header>
    <div class="bg-nav">
      <div class="bg-option" @click="photoSection">
        <div class="bg-img-wrapper">
          <img
            class="bg-img"
            src="https://trello.com/assets/8f9c1323c9c16601a9a4.jpg"
            alt="photos"
          />
        </div>

        <button class="bg-text">Photos</button>
      </div>
      <div class="bg-option" @click="colorSection">
        <div class="bg-img-wrapper">
          <img
            class="bg-img"
            src="https://trello.com/assets/97db30fe74a58b7b7a18.png"
            alt="colors"
          />
        </div>

        <button class="bg-text">Colors</button>
      </div>
    </div>
    <hr />
    <h2>Custom</h2>
    <div class="bg-option upload">
      <input
        type="file"
        accept="image/*"
        @change="handleImageUpload"
        class="image-upload-input"
        ref="fileInput"
      />
      <button class="bg-icon" @click="triggerFileInput"></button>
    </div>
  </section>

  <section class="bg-picker" v-if="!photos && colors">
    <header class="bg-picker-header">
      <div>
        <span class="back-icon" @click="this.$emit('close')"></span>
        <h1>Colors</h1>
        <span class="close-icon" @click="this.$emit('closeMenu')"></span>
      </div>
      <hr />
    </header>

    <div class="bg-picker-content">
      <div class="gradient-options">
        <div
          v-for="gradient in gradientList"
          :key="gradient.id"
          :style="{ backgroundImage: 'url(' + gradient.color + ')' }"
          class="gradient-option"
          @click="changeBoardBgGrad(gradient.color)"
        >
          <span class="emoji">{{ gradient.emoji }}</span>
        </div>
      </div>

      <hr />
      <div class="color-options">
        <div
          v-for="color in colorList"
          :key="color.id"
          :style="{ backgroundColor: color.color }"
          class="color-option"
          @click="changeBoardBgClr(color.color)"
        ></div>
      </div>
    </div>
  </section>

  <section class="unsplash" v-if="photos && !colors">
    <header class="unsplash-header">
      <div>
        <span class="back-icon" @click="this.$emit('close')"></span>
        <h1>Photos by <a href="#">Unsplash</a></h1>
        <span class="close-icon" @click="this.$emit('closeMenu')"></span>
      </div>
      <hr />
    </header>
    <div class="input-field-container">
      <span class="search-icon"></span>
      <input type="text" placeholder="Photos" v-model="query" />
    </div>

    <div class="unsplash-images">
      <div
        class="unsplash-image"
        v-for="(imageUrl, index) in imageUrls"
        :key="index"
        @click="changeBoardBgGrad(imageUrl)"
      >
        <img :src="imageUrl" />
      </div>
    </div>
  </section>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  emits: ['close', 'closeMenu', 'backgroundChanged'],
  props: {
    colorOption: {
      type: Object,
    },
  },
  data() {
    return {
      colorList: this.colorOption.colors,
      gradientList: this.colorOption.gradients,
      accesKey: 'MW3WlTYHFpvQZJwkJp360WPZFpDiNui3_1sdi4VjuhY',
      photos: false,
      colors: false,
      imageUrls: [],
      query: '',
    }
  },
  created() {
    this.debouncedGetResult = debounce(this.fetchListOfPhotos, 300)
    this.fetchListOfPhotos()
  },
  methods: {
    async fetchListOfPhotos(query = this.query || 'nature view') {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?client_id=${this.accesKey}&query=${query}`
        )
        const json = await response.json()

        const imageUrls = json.results.map((img) => img.urls.regular)

        if (imageUrls.length > 12) {
          this.imageUrls = imageUrls.slice(0, 12)
        } else {
          this.imageUrls = imageUrls
        }
      } catch (err) {
        console.log('Cannot load photos', err)
        throw err
      }
    },
    handleImageUpload(e) {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.$store.dispatch('changeBoardBgGrad', {
            gradient: e.target.result,
          })
          this.$emit('backgroundChanged', e.target.result)
        }
        reader.readAsDataURL(file)
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    changeBoardBgClr(color) {
      this.$store.dispatch('changeBoardBgClr', {
        color: color,
      })
      this.$emit('backgroundChanged', color)
    },
    changeBoardBgGrad(gradient) {
      this.$store.dispatch('changeBoardBgGrad', {
        gradient: gradient,
      })
      this.$emit('backgroundChanged', gradient)
    },
    colorSection() {
      this.colors = true
    },
    photoSection() {
      this.photos = true
    },
  },
  watch: {
    query() {
      this.debouncedGetResult()
    },
  },
}
</script>

<style scoped>
.image-upload-input {
  display: none;
}
</style>
