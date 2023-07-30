<template>
    <div class="task-back-drop">
        <!-- <section class="task-details" v-if="taskToEdit"> -->
        <section v-if="taskToEdit" class="task-details">
            <section class="task-details-header">
                <div class="close-task-details">
                    <span @click="
                        closeModal();
                    editTask();
                    " class="icon close"></span>
                </div>

                <div class="task-details-cover" :style="{ backgroundColor: coverColor }">
                    <span class="span-cover" @click="togglecover()">Cover</span>
                </div>

                <div class="task-details-under-cover">
                    <div class="icon-title-container">
                        <span class="icon card-big"></span>
                        <input type="text" class="deatils-title" v-model="taskToEdit.title" />
                    </div>
                    <p class="task-in-list">
                        in list <span class="group-ops">{{ group.title }}</span><span
                            :class="{ watchActive: !isWatchActive }" class="icon eye"></span>
                    </p>
                </div>
            </section>

            <section class="task-details-main">
                <div class="task-alerts">
                    <Members />

                    <Labels :task="taskToEdit" />


                    <div class="details-notification">
                        <h5>Notifications</h5>
                        <button class="btn btn-watch" @click="toggleWatch">
                            <span class="icon eye"></span><span class="word-watch">{{ watch }}</span><span
                                class="icon full-checked-big"></span>
                        </button>
                    </div>

                    <div class="task-due-date">
                        <h5>Due-date</h5>
                        <input type="checkbox" @change="updateTask" />
                        <!-- v-model="dueDate.isChecked" -->
                        <button class="btn btn-due-date" @click="openCalender">
                            Aug 10 at 3:27 AM
                        </button>
                    </div>
                </div>

                <div class="details-description-container">
                    <div class="icon-title-container-description">
                        <span class="icon description-big"></span>
                        <h3 class="details-title-big">Description</h3>
                    </div>
                    <textarea v-model="taskToEdit.description" @blur="hideBtn = false" @focus="hideBtn = true"
                        placeholder="Add a more detailed description..." class="details-description"></textarea>
                    <div v-if="hideBtn">
                        <div class="btn-save-close">
                            <button class="btn">Save</button>
                            <!-- @click.stop="onTaskEdit" -->
                            <button class="btn" @click="closeTodoTitle">Cancel</button>
                        </div>
                    </div>
                </div>

                <!-- <Checklist /> -->
                <Checklist v-for="checklist in taskToEdit.checklists" :key="checklist._id" :checklist="checklist"
                    @updateChecklist="updateChecklist" />

                <div class="details-activity">
                    <div class="activity-show-details">
                        <div class="icon-title-container">
                            <span class="icon activity-big"></span>
                            <h3 class="details-title-big">Activity</h3>
                        </div>
                        <button class="btn toggle-show-details">Show details</button>
                    </div>
                    <input type="text" class="details-activity-comment" placeholder="Write a comment..." />
                </div>
                <!-- v-model="taskToEdit.description" -->
            </section>

            <section class="action-btns-container">
                <h3 class="details-title-small">Suggested</h3>
                <button class="btn"><span class="icon member"></span>Join</button>

                <h3 class="details-title-small">Add To card</h3>
                <Popper arrow placement="right">
                    <div v-for="(cmp, idx) in cmpOrder" :key="idx">
                        <button class="btn" @click="set(cmp, idx)"> <span class="icon"
                                :class="`icon ${dynamicIcons[idx]}`"></span>
                            {{ dynamicNames[idx] }} </button>

                    </div>

                    <template #content>
                        <DynamicModal v-if="actionCmpType" :actionCmpType="actionCmpType" :taskToEdit="taskToEdit"
                            :actionCmpName="actionCmpName" @closeDynamicModal="closeDynamicModal" @checklist="addChecklist"
                            @member="addMember" @saveLabel="saveLabel" @setBgColor="setBgColor" />
                    </template>
                </Popper>

                <!-- <button class="btn" @member="addMember"><span class="icon member"></span>Members</button>
                <button class="btn" @saveLabel="saveLabel"><span class="icon label"></span>Labels</button>
                <button class="btn" @checklist="addChecklist"><span class="icon checklist"></span>Checklist</button>
                <button class="btn" @dueDate="addDueDate"><span class="icon date"></span>Dates</button>
                <button class="btn"><span class="icon attachments"></span>Attachments</button>
                <button class="btn" @setBgColor="setBgColor"><span class="icon cover"></span>Cover</button>
                <button class="btn"><span class="icon date"></span>Custom Fields</button> -->
                <h3 class="details-title-small">Actions</h3>
                <button class="btn"><span class="icon arrow-right"></span>Move</button>
                <button class="btn"><span class="icon copy"></span>Copy</button>
                <button class="btn"><span class="icon card"></span>Make template</button>
                <button class="btn"><span class="icon archive"></span>Archive</button>
                <button class="btn"><span class="icon share"></span>Share</button>

                <!-- <Popper arrow placement="right">
                    <DynamicModal v-if="actionCmpType" :actionCmpType="actionCmpType" :taskToEdit="taskToEdit"
                        :actionCmpName="actionCmpName" @closeDynamicModal="closeDynamicModal" @checklist="addChecklist"
                        @member="addMember" @saveLabel="saveLabel" @setBgColor="setBgColor" />
                </Popper> -->
            </section>
        </section>
    </div>
</template>
<!--  -->

<script>
import DynamicModal from "./DynamicModal.vue";
import Checklist from "../cmps/Checklist.vue"
import Members from "../cmps/Members.vue";
import Labels from "../cmps/Labels.vue";
import { boardService } from "../services/board.service.local.js";

import { defineComponent } from "vue";
import Popper from "vue3-popper";

export default {
    data() {
        return {
            taskToEdit: null,
            group: null,
            board: null,
            hideBtn: false,
            isWatchActive: false,
            watch: "Watch",
            // isDynamicModalOpen: true,
            actionCmpType: null,
            actionCmpName: null,
            isCoverActive: false,
            dynamicNames: ["Members", "Labels", "Checklist", "Dates", "Attachments", "Cover", "Custom Fields"],
            dynamicIcons: ["member", "label", "checklist", "date", "attachments", "cover", "date"],
            coverColor: '',
        };
    },
    created() {
        this.setTask();
    },
    methods: {
        set(cmp, idx) {
            this.actionCmpType = cmp;
            this.actionCmpName = this.dynamicNames[idx];
        },

        setBgColor(color) {
            this.coverColor = color
            this.isCoverActive = true
        },
        addDueDate() {

        },
        saveLabel() {
            this.$store.dispatch({ type: "updateBoard", board: this.board })
        },

        addChecklist(newChecklist) {
            if (!this.taskToEdit.checklists) this.taskToEdit.checklists = [];
            this.taskToEdit.checklists.push(newChecklist);
            // console.log("modal3 - newChecklist:", newChecklist)
            this.editTask();
        },
        addMember(newMember) {
            if (!this.taskToEdit.checklists) this.taskToEdit.checklists = [];
            this.taskToEdit.checklists.push(newChecklist);
            // console.log("modal3 - newChecklist:", newChecklist)

            // this.closeDynamicModal()
        },
        updateChecklist({ type, newChecklist }) {
            // console.log('111111111Checklist:', Checklist)
            const checklists = this.taskToEdit.checklists;
            const idx = checklists.findIndex(
                (checklist) => checklist._id === newChecklist._id
            );
            // console.log('idx:', idx)
            // console.log('newChecklist.title:', newChecklist.title)
            if (type === "editChecklist") checklists.splice(idx, 1, newChecklist);
            // if (newChecklist.title) checklists.splice(idx, 1, newChecklist)
            else checklists.splice(idx, 1);
            this.editTask();
        },
        updateMembers({ type, newMember }) {
            console.log('111111111member:', newMember)
            if (!this.taskToEdit.members) this.taskToEdit.members = [];
            if (this.taskToEdit.members.some(member => member._id === newMember._id)) {
                const idx = this.taskToEdit.members.findIndex(member => member._id === newMember._id);
                this.taskToEdit.members.splice(idx, 1);
            } else {
                this.taskToEdit.members.push(newMember);
            }
        },
        async setTask() {
            try {
                const boardId = this.$route.params.boardId;
                // console.log("🚀 ~ file: TaskDetails.vue:192 ~ setTask ~ boardId:", boardId)

                const board = await boardService.getById(boardId);
                console.log("🚀 ~ file: TaskDetails.vue:205 ~ setTask ~ board:", board)

                const taskId = this.$route.params.taskId;
                const groupId = this.$route.params.groupId;
                console.log("groupId:", groupId);

                this.board = JSON.parse(JSON.stringify(board));
                this.group = this.board.groups.find((group) => group.id === groupId);
                this.taskToEdit = this.group.tasks.find((task) => task.id === taskId);
            } catch (err) {
                console.log("error in setTask");
            }
        },
        toggleWatch() {
            this.isWatchActive = !this.isWatchActive;
            this.watch = this.isWatchActive ? "Watching" : "Watch";
        },
        // toggleOpenModal() {
        //     // need to check if the specific action-btn that clicked, is the last clicked button. => Y? close modal. N? open the modal with new content from the other action-btn.
        //     this.isDynamicModalOpen = !this.isDynamicModalOpen
        // },
        togglecover() {
            this.isCoverActive = !this.isCoverActive;
        },
        closeDynamicModal() {
            // this.actionCmpType = null
            // this.actionCmpName = null
        },
        closeModal() {
            this.$router.back();
        },
        editTask() {
            console.log("edit task:");
            const editedTask = JSON.parse(JSON.stringify(this.taskToEdit));
            // console.log("editedTask:", editedTask)
            const taskIdx = this.group.tasks.findIndex(
                (task) => task.id === this.taskToEdit.id
            );
            // replace task with editTask
            this.group.tasks.splice(taskIdx, 1, this.taskToEdit);
            this.$store.dispatch({ type: "updateBoard", board: this.board });
        },
    },
    computed: {
        cmpOrder() {
            return this.$store.getters.cmpsOrder;
        },
    },
    unmounted() {
        // this.$store.commit({ type: 'setCurrTask', task: null })
    },
    components: {
        DynamicModal,
        Checklist,
        Members,
        Popper,
        defineComponent,
        Labels
    },
};
</script>