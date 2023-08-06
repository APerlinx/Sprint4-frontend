<template>
    <div class="task-back-drop">
        <div class="task-details-container">
            <section v-if="taskToEdit" class="task-details">
                <!-- <section v-if="taskToEdit" class="task-details" v-click-outside="() => {
                closeModal()
                editTask()
            }"> -->
                <!-- <section v-if="taskToEdit" class="task-details"> -->
                <section class="task-details-header">


                    <div class="task-details-cover" v-if="taskToEdit.cover?.color"
                        :style="{ backgroundColor: taskToEdit.cover?.color }">
                        <!-- <p v-if="haveCover" class="task-details-cover-menu" @click="togglecover()">Cover</p> -->
                    </div>

                    <div class="icon-title-container">
                        <span class="icon card-big"></span>
                        <input type="text" class="details-title" v-model="taskToEdit.title" />
                        <span @click="closeModal(); editTask()" class="icon big-close close-task-details"></span>
                    </div>

                    <span class="task-in-list">
                        in list <span>&nbsp;</span><span class="group-ops"> {{ group.title
                        }}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span :class="{ watchActive: !isWatchActive }"
                            class="icon eye"></span>
                    </span>
                </section>

                <section class="task-details-main">
                    <div class="task-alerts">
                        <!-- <Members /> -->
                        <!-- <Members v-for="member in taskToEdit.members" :key="member.id" :member="member" /> -->
                        <Members :task="taskToEdit" :board="board" />
                        <Labels :task="taskToEdit" :board="board" @saveLabel="saveLabel" @removeLabel="removeLabel"
                            @updateLable="updateLable" />
                        <div class="notifications-container">
                            <h5>Notifications</h5>
                            <button class="btn btn-watch" @click="toggleWatch">
                                <span class="icon eye"></span><span class="word-watch">{{ watch }}</span>
                                <span class="svg-checkbox" :class="{ watchActive: !isWatchActive }"><svg width="35px"
                                        height="35px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                        </g>
                                        <g id="SVGRepo_iconCarrier">
                                            <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                            <title>ic_fluent_checkbox_checked_24_filled</title>
                                            <desc>Created with Sketch.</desc>
                                            <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none"
                                                fill-rule="evenodd">
                                                <g id="ic_fluent_checkbox_checked_24_filled" fill="#626f86"
                                                    fill-rule="nonzero">
                                                    <path
                                                        d="M18,3 C19.6568542,3 21,4.34314575 21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L6,21 C4.34314575,21 3,19.6568542 3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 L18,3 Z M16.4696699,7.96966991 L10,14.4393398 L7.53033009,11.9696699 C7.23743687,11.6767767 6.76256313,11.6767767 6.46966991,11.9696699 C6.1767767,12.2625631 6.1767767,12.7374369 6.46966991,13.0303301 L9.46966991,16.0303301 C9.76256313,16.3232233 10.2374369,16.3232233 10.5303301,16.0303301 L17.5303301,9.03033009 C17.8232233,8.73743687 17.8232233,8.26256313 17.5303301,7.96966991 C17.2374369,7.6767767 16.7625631,7.6767767 16.4696699,7.96966991 Z"
                                                        id="🎨-Color"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg></span>
                            </button>
                        </div>

                        <Dates :task="taskToEdit" @updateTaskStatus="updateTaskStatus" />
                        <!-- <Dates :task="taskToEdit" @updateTaskStatus="updateTaskStatus" /> -->
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
                                <button class="btn btn-save">Save</button>
                                <!-- @click.stop="onTaskEdit" -->
                                <button class="btn" @click="closeTodoTitle">Cancel</button>
                            </div>
                        </div>
                    </div>
                    <div v-if="taskToEdit.attachments">
                        <!-- <pre>{{ taskToEdit.attachments }}</pre> -->
                        <div class="icon-title-container-description attachment-title">
                            <span class="icon attachment-big"></span>
                            <h3 class="details-title-big">Attachments</h3>
                        </div>
                        <Attachment v-for="attachment in taskToEdit.attachments" :key="attachment._id"
                            :attachments="attachment" @updateChecklist="updateChecklist" />
                        <button class="btn">Add an attachment</button>
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
                    <!-- <pre>{{ taskToEdit.comments }}</pre> -->
                    <Comments v-for="comment in taskToEdit.comments" :key="comment._id" :comments="comment" />
                    <!-- v-model="taskToEdit.description" -->
                </section>

                <!-- <pre>{{ this.taskToEdit }}</pre> -->

                <section class="action-btns-container">
                    <div class="suggested-container">
                        <h3 class="details-title-small">Suggested</h3>
                        <button class="btn"><span class="icon member"></span>Join</button>
                    </div>
                    <h3 class="details-title-small">Add to card</h3>
                    <Popper arrow placement="right" v-for="( cmp, idx ) in  cmpOrder " :key="idx">
                        <div>
                            <button class="btn" @click="set(cmp, idx)"> <span class="icon"
                                    :class="`icon ${dynamicIcons[idx]}`"></span>
                                {{ dynamicNames[idx] }} </button>
                        </div>
                        <template #content>
                            <DynamicModal v-if="actionCmpType" :actionCmpType="actionCmpType" :taskToEdit="taskToEdit"
                                :board="board" :actionCmpName="actionCmpName" @closeDynamicModal="closeDynamicModal"
                                @toggleMember="toggleMember" @saveLabel="saveLabel" @checklist="addChecklist"
                                @removeLabel="removeLabel" @updateLable="updateLable" @DueDate="addDueDate"
                                @attachment="addAttachment" @setCover="setCover" />
                        </template>
                    </Popper>
                    <div class="action-btns-in-btns">
                        <h3 class="details-title-small">Actions</h3>
                        <button class="btn"><span class="icon arrow-right"></span>Move</button>
                        <!-- <button class="btn"><span class="icon copy"></span>Copy</button> -->
                        <!-- <button class="btn"><span class="icon card"></span>Make template</button> -->
                        <button class="btn"><span class="icon archive"></span>Archive</button>
                        <!-- <button class="btn"><span class="icon share"></span>Share</button> -->
                    </div>
                    <!-- <pre>{{ isCover }}</pre> -->

                </section>
                <!-- </section> -->
            </section>
        </div>
    </div>
    <!-- <div class="task-back-drop" @click=" closeModal()"></div> -->
</template>

<script>
import { focusDirective, clickOutsideDirective } from "../directives/index.js";

import DynamicModal from "./DynamicModal.vue";
import Checklist from "../cmps/Checklist.vue";
import Members from "../cmps/Members.vue";
import Labels from "../cmps/Labels.vue";
import Attachment from "../cmps/AttachmentPreview.vue"
import Dates from "../cmps/Dates.vue"
import Comments from "../cmps/Comments.vue"
import {
    socketService,
    SOCKET_EMIT_SET_TOPIC,
    SOCKET_EVENT_MEMBER_MSG,
    SOCKET_EVENT_STATUS_MSG,
    SOCKET_EVENT_NOTIFICATIONS_MSG,
    SOCKET_EMIT_SEND_MSG,

} from "../services/socket.service.js";

// import { boardService } from "../services/board.service.local.js";
import { boardService } from "../services/board.service.js";
import { userService } from "../services/user.service";

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
            isDynamicModal: false,
            actionCmpType: null,
            actionCmpName: null,
            isCover: false,
            dynamicNames: ["Members", "Labels", "Checklist", "Dates", "Attachment", "Cover", "Custom Fields"],
            dynamicIcons: ["member", "label-details", "checklist", "date", "attachment", "cover", "date"],
            coverColor: '',
            currColor: '',
        };
    },
    created() {
        socketService.on('on-update-task', (task) => this.taskToEdit = task);

        this.setTask();
    },
    methods: {
        toggleMemberBySocket(clickedMember) {
            socketService.emit(SOCKET_EMIT_SEND_MSG, { action: 'member', payload: clickedMember })
        },

        updateTaskStatusBySocket(isCompleted) {
            socketService.emit(SOCKET_EMIT_SEND_MSG, { action: 'status', payload: isCompleted })
        },

        updateTaskStatus(isCompleted) {
            if (isCompleted) this.taskToEdit.status = 'done'
            else this.taskToEdit.status = ''
            this.editTask()

        },
        set(cmp, idx) {
            this.isDynamicModal = true
            this.actionCmpType = cmp;
            this.actionCmpName = this.dynamicNames[idx];
        },
        setCover(cover) {
            if (this.taskToEdit.hasOwnProperty('cover')) {
                this.taskToEdit.cover = cover
            } else {
                this.taskToEdit = { ...this.taskToEdit, cover: cover }
            }
            this.editTaskBySocket()
        },
        removeLabel(board) {
            this.board = board
            this.editTaskBySocket()
        },
        updateLable(board) {
            this.board = board
            this.editTaskBySocket()
        },
        addDueDate(date) {
            this.taskToEdit.dueDate = date
            this.editTask()
        },
        saveLabel(labelId) {
            const idx = this.taskToEdit.labels?.findIndex(
                (label) => label === labelId);
            if (idx >= 0) this.taskToEdit.labels?.splice(idx, 1);
            else {
                this.taskToEdit.labels.push(labelId);
            }
            // this.editTaskBySocket()
            this.$store.dispatch({ type: "updateBoard", board: this.board });
        },
        addAttachment(newAttachment) {
            // console.log('newAttachment:', newAttachment)
            if (!this.taskToEdit.attachments) this.taskToEdit.attachments = [];
            this.taskToEdit.attachments.push(newAttachment);
            this.editTask();
        },
        addChecklist(newChecklist) {
            if (!this.taskToEdit.checklists) this.taskToEdit.checklists = []
            this.taskToEdit.checklists.push(newChecklist)
            // console.log("modal3 - newChecklist:", newChecklist)
            this.editTask()
        },
        toggleMember(clickedMember) {


            const notification = {
                byUser: this.loggedinUser.fullname,
                toUser: clickedMember.fullname,
                createdAt: Date.now(),
                action: '',
                task: this.taskToEdit.title,
                board: this.board.title,
                date: this.taskToEdit?.dueDate
            };

            if (!this.taskToEdit.members) {
                this.taskToEdit.members = [];
                this.taskToEdit.members.push(clickedMember);
                notification.action = "Added you"
            } else {
                if (this.taskToEdit.members.some(member => member.id === clickedMember.id)) {
                    const idx = this.taskToEdit.members.findIndex(member => member.id === clickedMember.id);
                    this.taskToEdit.members.splice(idx, 1)
                    notification.action = "Removed you"
                } else {
                    this.taskToEdit.members.push(clickedMember);
                    notification.action = "Added you"
                }


            }
            // socketService.emit(SOCKET_EMIT_SEND_MSG, { action: 'notification', payload: notification })
            // this.$store.dispatch({ type: "updateUserNot", notification });
            this.editTask(notification);
        },
        // updateUserNot(notification) {
        //     this.$store.dispatch({ type: "updateUserNot", notification });
        // },

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
            this.editTask()
        },
        async setTask() {
            try {
                const boardId = this.$route.params.boardId;

                const board = await boardService.getById(boardId);

                const taskId = this.$route.params.taskId;
                const groupId = this.$route.params.groupId;

                this.board = JSON.parse(JSON.stringify(board));
                this.group = this.board.groups.find((group) => group.id === groupId);
                this.taskToEdit = this.group.tasks.find((task) => task.id === taskId);

                // socketService.emit(SOCKET_EMIT_SET_TOPIC, this.taskToEdit.id);

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
            this.isDynamicModal = false
        },
        closeModal() {
            this.$router.back();
        },
        editTask(notification) {
            const editedTask = JSON.parse(JSON.stringify(this.taskToEdit));
            const taskIdx = this.group.tasks.findIndex(
                task => task.id === this.taskToEdit.id
            );
            this.group.tasks.splice(taskIdx, 1, this.taskToEdit);

            socketService.emit('update-task', this.taskToEdit)

            socketService.emit('notification-push', { notification, members: this.board.members })

            this.$store.dispatch({ type: "updateBoard", board: this.board });
        },
        closeComponent() {
            this.taskTitle = ''
            this.$emit('close')
        },
    },
    computed: {
        cmpOrder() {
            return this.$store.getters.cmpsOrder;
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser;
        },
        users() {
            return this.$store.getters.users;
        },
        haveCover() {
            if (this.taskToEdit.cover?.color) {
                this.isCover = true
            }
            return this.taskToEdit.cover?.color
        },
        showCoverButton() {
            return this.cmpOrder.map((cmp, idx) => {
                return !cmp.isCover;
            });
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
        Labels,
        Attachment,
        Dates,
        Comments,
    },
    directives: {
        focus: focusDirective,
        clickOutside: clickOutsideDirective,
    },
};
</script>

<style>
/* .task-details-container {
    transform: translate(-50%, -50%);
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10;
} */
</style>
