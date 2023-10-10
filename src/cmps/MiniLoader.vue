<template>
  <div class="loader-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="50">
      <line class="line animated" x1="10" y1="20" x2="10" y2="100" />
      <line class="line animated line2" x1="20" y1="20" x2="20" y2="50" />
      <line class="line animated line3" x1="30" y1="20" x2="30" y2="50" />
    </svg>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.loader-container {
  position: absolute;
  left: 50%;
  top: 0;
  z-index: 1000;
  transform: translateX(-15%);
}

.line {
  fill: none;
  stroke: #aaa;
  stroke-width: 5;
  stroke-dasharray: 70;
}

.animated {
  animation: draw 0.8s ease-in-out;
  animation-iteration-count: infinite;
  stroke-dashoffset: 0;
}

.line2 {
  animation-delay: 0.08s;
}

.line3 {
  animation-delay: 0.16s;
}

@keyframes draw {
  0% {
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dashoffset: 60;
  }

  100% {
    stroke-dashoffset: 0;
  }
}
</style>
