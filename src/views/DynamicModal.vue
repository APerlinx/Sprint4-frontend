<template>
    <div class="dynamic-modal-container">
        <section>
            <h4 class="dynamic-modal-title">one of the btns</h4>
            <span class="dynamic-modal-close" @click="$emit('onClose')">X</span>
        </section>

        <section>
            <!-- <component :is="actionCmp.type" :info="actionCmp.info" @set-val="setAns($event, idx)"> -->
            <!-- need to watch day38 recording again -->
            <!-- </component> -->
        </section>
    </div>
</template>

<script>
// import Checklist from "../cmps/taskDeatilsOpts/CheckList.vue"

export default {
    props: {
        // need to get same props
    },
    methods: {
        closeModal() {
            this.$emit("closeModal")
        },
    },
    components: {
        // Checklist,
    }
}
</script>