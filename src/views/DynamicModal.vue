<template>
    <div class="dynamic-modal">
        <section>
            <h4>one of the btns</h4>
            <span @click="$emit('closeModal')">X</span>
        </section>

        <section>
            <component :is="cmp.type" :info="cmp.info" @set-val="setAns($event, idx)">
                <!-- need to watch day38 recording again -->
            </component>
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