<template>
  <div class="dynamic-modal-container">
    <section class="dynamic-modal-header">
      <h4 class="dynamic-modal-title">{{ actionCmpName }}</h4>
      <span class="dynamic-modal-close" @click="closeModal"><span class="icon close"></span></span>
      <!-- <pre>{{ board }}</pre> -->
    </section>
    <section>
      <component v-if="actionCmpType" :board="board" :is="actionCmpType" :taskToEdit="taskToEdit"
        @toggleMember="toggleMember" @checklist="addChecklist" @saveLabel="saveLabel" @addDueDate="addDueDate"
        @setBgColor="setBgColor" @attachment="addAttachment">
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
import AttachmentPicker from "../cmps/taskDeatilsOpts/AttachmentPicker.vue";

export default {
  props: {
    taskToEdit: Object,
    board: Object,
    actionCmpType: String,
    actionCmpName: String,
  },
  data() {
    return {

    };
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
    toggleMember(member) {
      this.$emit("toggleMember", member);
    },
    addChecklist(newChecklist) {
      this.$emit("checklist", newChecklist);
      console.log("modal2 - newChecklist:", newChecklist);
    },
    addAttachment(newAttachment) {
      this.$emit("attachment", newAttachment);
      console.log("modal2 - newAttachment:", newAttachment);
    },
    addDueDate(date) {
      this.$emit("addDueDate", date);
      console.log("modal2 - date:", date);
    },
  },
  components: {
    ChecklistPicker,
    LabelsPicker,
    MemberPicker,
    DueDatePicker,
    CoverPicker,
    AttachmentPicker,
  },
};
</script>
