<template>
  <section class="color-pallte">
    <div
      v-for="(color, index) in colorOptions"
      :key="index"
      @click="setBgColor(color)"
      :class="colorClass[index]"
    ></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      colorOptions: [
        //green
        "linear-gradient(328deg, rgba(9, 55, 118, 1) 0%, rgba(159, 226, 17, 1) 100%)", 
        
        //blue
            "linear-gradient(328deg, rgba(9, 55, 118, 1) 0%, rgba(17, 107, 226, 1) 100%)",

        //dark-blue

            "linear-gradient(328deg, rgba(11, 97, 216, 1) 0%, rgba(9, 55, 118, 1) 100%)",
        //dark-purple

            "linear-gradient(328deg, rgba(121, 96, 196, 1) 0%, rgba(25, 52, 111, 1) 100%)",
        //purple

            "linear-gradient(328deg, rgba(121, 96, 196, 1) 0%, rgba(219, 115, 189, 1) 100%)",
        //orange

            "linear-gradient(328, rgba(230, 85, 55, 1) 0%, rgba(247, 154, 60, 1) 100%)",
      ],
      colorClass: [
        "green",
        "blue",
        "dark-blue",
        "dark-purple",
        "purple",
        "unique",
      ],
    };
  },
  methods: {
    setBgColor(color) {
      this.$emit("setBgColor", color)
    },
  },
};
</script>
