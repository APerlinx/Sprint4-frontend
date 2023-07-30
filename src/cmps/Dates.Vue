<template>
    <div class="dynamic-modal-container">
        <section class="dynamic-modal-header">
            <h4 class="dynamic-modal-title">{{ actionCmpName }}</h4>
            <span class="dynamic-modal-close" @click="closeModal">X</span>
        </section>
        <section>
            <component v-if="actionCmpType" :is="actionCmpType" :info="taskToEdit" @member="addMember"
                @checklist="addChecklist" @saveLabel="saveLabel" @dueDate="adddueDate"></component>
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
    methods: {
        closeModal() {
            // Implement your closeModal logic here
            // Emit an event to the parent component if needed
            this.$emit("closeModal");
        },
        saveLabel() {
            // Emit saveLabel event to the parent component
            this.$emit("saveLabel");
        },
        addMember() {
            // Implement your addMember logic here
            // Emit an event to the parent component if needed
            this.$emit("addMember");
        },
        addChecklist(newChecklist) {
            // Emit checklist event to the parent component
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
