<template>
    <div class="dynamic-modal-container">
        <section class="dynamic-modal-header">
            <h4 class="dynamic-modal-title">{{ actionCmpName }}</h4>
            <span class="dynamic-modal-close" @click="closeModal">X</span>
        </section>

        <section>
            <component v-if="actionCmpType" :is="actionCmpType" :info="taskToEdit" @member="addMember"
                @checklist="addChecklist" @saveLabel="saveLabel">
            </component>
        </section>
    </div>
</template>

<script>
import ChecklistPicker from "../cmps/taskDeatilsOpts/CheckListPicker.vue";
import LabelsPicker from "../cmps/taskDeatilsOpts/LabelsPicker.vue";
import MemberPicker from "../cmps/taskDeatilsOpts/MemberPicker.vue";

export default {
    props: {
        taskToEdit: Object,
        actionCmpType: String,
        actionCmpName: String,
    },
    data() {
        return {};
    },
    methods: {
        closeModal() {
            this.isDynamicModalClose = !this.isDynamicModalClose;
        },
        saveLabel() {
            this.$emit('saveLabel')
        },
        addMember() { },
        addChecklist(newChecklist) {
            this.$emit("checklist", newChecklist);
            console.log("modal2 - newChecklist:", newChecklist);
        },
    },
    components: {
      ChecklistPicker,
        LabelsPicker,
        MemberPicker,
    },
};
</script>
