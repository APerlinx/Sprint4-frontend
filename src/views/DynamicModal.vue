<template>
  <div class="dynamic-modal-container">
    <section class="dynamic-modal-header">
      <h4 class="dynamic-modal-title">{{ actionCmpName }}</h4>
      <span class="dynamic-modal-close" @click="closeModal">X</span>
      <!-- <pre>{{ board }}</pre> -->
    </section>
    <section>
      <component
        v-if="actionCmpType"
        :board="board"
        :is="actionCmpType"
        :taskToEdit="taskToEdit"
        @member="addMember"
        @checklist="addChecklist"
        @saveLabel="saveLabel"
        @dueDate="addDueDate"
        @setBgColor="setBgColor"
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
    setBgColor(color) {
      this.$emit("setBgColor", color);
    },
    closeModal() {
      this.isDynamicModalClose = !this.isDynamicModalClose;
    },
    saveLabel(labelId) {
      this.$emit("saveLabel", labelId);
    },
    addMember() {
      this.$emit("member", addMember);
    },
    addChecklist(newChecklist) {
      this.$emit("checklist", newChecklist);
      console.log("modal2 - newChecklist:", newChecklist);
    },
    addDueDate() {
      this.$emit("dueDate", newDueDate);
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
