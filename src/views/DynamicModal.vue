<template>
  <div class="dynamic-modal-container">
    <section class="dynamic-modal-header">
      <h4 class="dynamic-modal-title">{{ actionCmpName }}</h4>
      <span class="dynamic-modal-close" @click="closeDynamicModal"></span>
    </section>
    <section>
      <component
        :board="board"
        :is="actionCmpType"
        :taskToEdit="taskToEdit"
        @updateLable="updateLable"
        @toggleMember="toggleMember"
        @checklist="addChecklist"
        @saveLabel="saveLabel"
        @dueDate="addDueDate"
        @removeLabel="removeLabel"
        @setCover="setCover"
        @closeEditModal="closeDynamicModal"
      >
      </component>
    </section>
  </div>
</template>
<script>
import ChecklistPicker from "../cmps/taskDeatilsOpts/CheckListPicker.vue";
import LabelsPicker from "../cmps/taskDeatilsOpts/LabelsPicker.vue";
import MemberPicker from "../cmps/taskDeatilsOpts/MemberPicker.vue";
import DueDatePicker from "../cmps/taskDeatilsOpts/DueDatePicker.vue";
import CoverPicker from "../cmps/taskDeatilsOpts/CoverPicker.vue";
export default {
  props: {
    taskToEdit: Object,
    board: Object,
    actionCmpType: String,
    actionCmpName: String,
  },
  data() {
    return {};
  },
  methods: {
    setCover(cover) {
      this.$emit("setCover", cover);
    },
    saveLabel(labelId) {
      this.$emit("saveLabel", labelId);
    },
    toggleMember(member) {
      this.$emit("toggleMember", member);
    },
    addChecklist(newChecklist) {
      this.$emit("checklist", newChecklist);
      console.log("modal2 - newChecklist:", newChecklist);
    },
    addDueDate() {
      this.$emit("dueDate", newDueDate);
    },
    updateLable(label) {
      this.$emit("updateLable", label);
    },
    removeLabel(label) {
      this.$emit("removeLabel", label);
    },
    closeDynamicModal() {
      this.$emit("closeDynamicModal");
    },
  },
  components: {
    ChecklistPicker,
    LabelsPicker,
    MemberPicker,
    DueDatePicker,
    CoverPicker,
  },
};
</script>
