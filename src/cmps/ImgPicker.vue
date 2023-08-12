<template>
  <section class="img-pallte">
    <div class="img-preview" v-for="(img, index) in imgOptions" :key="index" @click="setBg(img)"
    :style="{ backgroundImage: `url('${img}')` }"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      imgOptions: [
        "https://images.unsplash.com/photo-1690207714547-6e76b0e61b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1690205074022-560b3587cbc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1688902325269-8f4593b5d6a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1661956601030-fdfb9c7e9e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      ],
    };
  },
  methods: {
    setBg(img) {
      this.$emit("setBg", img);
    },
  },
};
</script>
