export const focusDirective = {
    mounted(el) {
        setTimeout(() => el.focus(), 100)

    }
}