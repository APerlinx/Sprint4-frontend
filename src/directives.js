export const focusDirective = {
    mounted(el) {
        console.log(el)
        setTimeout(()=> el.focus(), 100)
        
    }
}