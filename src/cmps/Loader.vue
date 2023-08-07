<template>
  <div class="loader-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">
      <line class="line animated" x1="28" y1="20" x2="28" y2="100" />
      <line class="line animated line2" x1="60" y1="20" x2="60" y2="100" />
      <line class="line animated line3" x1="92" y1="20" x2="92" y2="100" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style scoped>
.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
}

.line {
  fill: none;
  stroke: #aaa;
  stroke-width: 16;
  stroke-dasharray: 80;
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
