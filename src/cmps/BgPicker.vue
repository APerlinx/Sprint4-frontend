<template>
  <section class="bg-picker">
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
          v-for="gradient in gradients"
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
          v-for="color in colors"
          :key="color.id"
          :style="{ backgroundColor: color.color }"
          class="color-option"
          @click="changeBoardBgClr(color.color)"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    colorOption: {
      type: Object,
    },
  },
  data() {
    return {
      colors: this.colorOption.colors,
      gradients: this.colorOption.gradients,
      accesKey: 'MW3WlTYHFpvQZJwkJp360WPZFpDiNui3_1sdi4VjuhY',
    }
  },
  created() {
    this.fetchListOfPhotos()
  },
  methods: {
    async fetchListOfPhotos() {
      try {
        const query = this.query || 'develop'
        const response = await fetch(
          `https://api.unsplash.com/search/photos?client_id=${this.accesKey}&query=${query}`
        )
        const json = await response.json()

        const imageUrls = json.results.map((img) => img.urls.regular)

        if (imageUrls.length > 12) {
          return imageUrls.slice(0, 12)
        } else {
          return imageUrls
        }
      } catch (err) {
        console.log('Cannot load photos', err)
        throw err
      }
    },
    changeBoardBgClr(color) {
      this.$store.dispatch('changeBoardBgClr', {
        color: color,
      })
    },
    changeBoardBgGrad(gradient) {
      this.$store.dispatch('changeBoardBgGrad', {
        gradient: gradient,
      })
    },
  },
}
</script>
