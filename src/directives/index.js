export const focusDirective = {
  mounted: el => {
    el.focus()
  },
}

export const rainbowDirective = {
  mounted(el) {
    el.onkeyup = () => {
      const color = _getRandomColor()
      el.style.backgroundColor = color
      el.style.color = _isDarkColor(color) ? 'white' : 'black'
    }
  },
}

export const clickOutsideDirective = {
  mounted(el, { value: cb }) {
    el.clickOutside = ({ clientX, clientY }) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      if (
        !(
          clientX > left &&
          clientX < left + width &&
          clientY > top &&
          clientY < top + height
        )
      ) {
        cb()
        console.log('outside')
      } else {
        console.log('inside')
      }
    }
    setTimeout(() => {
      document.addEventListener('click', el.clickOutside)
    }, 0)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutside)
  },
}

export const close = {
  mounted(el, { value }, x) {
    console.log(x)
    el.onkeyup = () => {
      const color = _getRandomColor()
      el.style.backgroundColor = color
      el.style.color = _isDarkColor(color) ? 'white' : 'black'
    }
  },
}

export const scrollHorizontalDirective = {
  mounted(el) {
    let isDown = false;
    let startX;
    let scrollLeft;

    el.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    });

    el.addEventListener('mouseleave', () => {
      isDown = false;
    });

    el.addEventListener('mouseup', () => {
      isDown = false;
    });

    el.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      el.scrollLeft = scrollLeft - walk;
    });
  },
  unmounted(el) {
    el.removeEventListener('mousedown');
    el.removeEventListener('mouseleave');
    el.removeEventListener('mouseup');
    el.removeEventListener('mousemove');
  },
}

function _isDarkColor(c) {
  c = c.substring(1) // strip #
  const rgb = parseInt(c, 16) // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff // extract red
  const g = (rgb >> 8) & 0xff // extract green
  const b = (rgb >> 0) & 0xff // extract blue
  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

  return luma < 100
}

function _getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

