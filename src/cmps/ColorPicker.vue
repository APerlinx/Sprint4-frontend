<template>
  <section class="color-pallte">
    <div v-for="(img, index) in imgOptions" :key="index" @click="setBg(img)" 
    :style="{ backgroundImage: `url('${img}')` }"
    ></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imgOptions: [
        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg",

        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg",

        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/crystal.svg",

        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/rainbow.svg",

        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/peach.svg",
        
        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/flower.svg",
      ],
    };
  },
  methods: {
    setBg(img) {
      this.$emit("setBg", img)
    },
  },
};
</script>
