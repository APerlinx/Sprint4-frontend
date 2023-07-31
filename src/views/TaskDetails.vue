<template>
    <div class="task-back-drop">
        <!-- <section class="task-details" v-if="taskToEdit"> -->
        <section v-if="taskToEdit" class="task-details">
            <section class="task-details-header">

                <div class="task-details-cover" v-if="coverColor" :style="{ backgroundColor: coverColor }">
                    <p class="task-details-cover-menu" @click="togglecover()">Cover</p>
                </div>

                <div class="icon-title-container">
                    <span class="icon card-big"></span>
                    <input type="text" class="details-title" v-model="taskToEdit.title" />
                    <span @click="closeModal(); editTask();" class="icon close close-task-details"></span>
                </div>

                <span class="task-in-list">
                    in list <span>&nbsp;</span><span class="group-ops"> {{ group.title
                    }}</span><span>&nbsp;&nbsp;&nbsp;</span><span :class="{ watchActive: !isWatchActive }"
                        class="icon eye"></span>
                </span>
            </section>

            <section class="task-details-main">

                <div class="task-alerts">
                    <Members />
                    <Labels :task="taskToEdit"
                    :board="board"
                     />

                    <div class="notifications-container">
                        <h5>Notifications</h5>
                        <button class="btn btn-watch" @click="toggleWatch">
                            <span class="icon eye"></span><span class="word-watch">{{ watch }}</span><span
                                class="svg-checkbox"><svg width="35px" height="35px" viewBox="0 0 24 24" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    fill="#000000">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                        <title>ic_fluent_checkbox_checked_24_filled</title>
                                        <desc>Created with Sketch.</desc>
                                        <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none"
                                            fill-rule="evenodd">
                                            <g id="ic_fluent_checkbox_checked_24_filled" fill="#626f86" fill-rule="nonzero">
                                                <path
                                                    d="M18,3 C19.6568542,3 21,4.34314575 21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L6,21 C4.34314575,21 3,19.6568542 3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 L18,3 Z M16.4696699,7.96966991 L10,14.4393398 L7.53033009,11.9696699 C7.23743687,11.6767767 6.76256313,11.6767767 6.46966991,11.9696699 C6.1767767,12.2625631 6.1767767,12.7374369 6.46966991,13.0303301 L9.46966991,16.0303301 C9.76256313,16.3232233 10.2374369,16.3232233 10.5303301,16.0303301 L17.5303301,9.03033009 C17.8232233,8.73743687 17.8232233,8.26256313 17.5303301,7.96966991 C17.2374369,7.6767767 16.7625631,7.6767767 16.4696699,7.96966991 Z"
                                                    id="🎨-Color"> </path>
                                            </g>
                                        </g>
                                    </g>
                                </svg></span>
                        </button>
                    </div>

                    <div class="due-date-container">
                        <h5 class="h5h5">Due-date</h5>
                        <div due-date-checkbox>
                            <input type="checkbox" @change="updateTask" />
                            <!-- v-model="dueDate.isChecked" -->
                            <button class="btn btn-due-date" @click="openCalender">
                                Aug 10 at 3:27 AM
                            </button>
                        </div>
                    </div>
                </div>

                <div class="details-description-container">
                    <div class="icon-title-container-description">
                        <span class="icon description-big"></span>
                        <h3 class="details-title-big">Description</h3>
                    </div>
                    <textarea class="description-input" v-model="taskToEdit.description" @blur="hideBtn = false"
                        @focus="hideBtn = true" placeholder="Add a more detailed description..."></textarea>
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
                        <div class="icon-title-container-activity">
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
                        <DynamicModal v-if="actionCmpType"
                         :actionCmpType="actionCmpType"
                         :taskToEdit="taskToEdit"
                         :board="board"
                         :actionCmpName="actionCmpName"
                             @closeDynamicModal="closeDynamicModal"
                              @checklist="addChecklist"
                            @member="addMember"
                             @saveLabel="saveLabel"
                             @setBgColor="setBgColor" />
                    </template>
                </Popper>

                <h3 class="details-title-small">Actions</h3>
                <button class="btn"><span class="icon arrow-right"></span>Move</button>
                <button class="btn"><span class="icon copy"></span>Copy</button>
                <button class="btn"><span class="icon card"></span>Make template</button>
                <button class="btn"><span class="icon archive"></span>Archive</button>
                <button class="btn"><span class="icon share"></span>Share</button>


            </section>
        </section>
    </div>
</template>

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
            currColor: '',
            check:'hello'
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
            if (this.color === this.currColor) {
                this.preview = ''
                this.currColor = color
            } else {
                this.currColor = color
                this.coverColor = color
                this.isCoverActive = true
            }
        },
        addDueDate() {

        },
        saveLabel(labelId) {
        const idx = this.taskToEdit.labels?.findIndex(
        (label) => label === labelId);
        if (idx >= 0) this.taskToEdit.labels?.splice(idx, 1);
        else {
        this.taskToEdit.labels.push(labelId);
        }
         this.$store.dispatch({ type: "updateBoard", board: this.board });
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