<template>
    <div class="dynamic-modal-container">
        <section class="dynamic-modal-header">
            <h4 class="dynamic-modal-title">{{ actionCmpName }}</h4>
            <span class="dynamic-modal-close" @click="closeModal">X</span>
        </section>

        <section>
            <component v-if="actionCmpType" :is="actionCmpType" @member="addMember" @cheklist="addChecklist">
            </component>
        </section>
    </div>
</template>

<script>
import ChecklistModal from "../cmps/taskDeatilsOpts/ChecklistModal.vue"
// import MembersModal from "../cmps/taskDeatilsOpts/MembersModal.vue"

export default {
    props: {
        taskToEdit: Object,
        actionCmpType: String,
        actionCmpName: String,
    },
    data() {
        return {
        }
    },
    methods: {
        closeModal() {
            this.isDynamicModalClose = !this.isDynamicModalClose
        },
        addMember() {

        },
        addChecklist() {
            this.$emit('addChecklist', newChecklist)
            console.log('newChecklist:', newChecklist)
        }
    },
    components: {
        ChecklistModal,
    }
}
</script>