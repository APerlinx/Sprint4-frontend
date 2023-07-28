<template>
    <div class="task-back-drop">
        <!-- <section class="task-details" v-if="taskToEdit"> -->
        <section v-if="taskToEdit" class="task-details">

            <section class="task-details-header">
                <div class="close-task-details">
                    <span @click="closeModal(); editTask()">X</span>
                </div>

                <div class="task-details-cover" :class="{ coverActive: !isCoverActive }">
                    <span class="span-cover" @click="togglecover()">Cover</span>
                </div>

                <div class="task-details-under-cover">
                    <input type="text" class="deatils-title" v-model="taskToEdit.title">
                    <!-- placeholder="COOSssssEMEK" -->
                    <p class="task-in-list">in list <span class="group-ops">{{ group.title }}</span><span
                            :class="{ watchActive: !isWatchActive }"> i-eye</span></p>
                </div>
            </section>

            <section class="task-details-main">
                <div class="task-alerts">

                    <Members />

                    <div class="details-notification">
                        <h5>Notifications</h5>
                        <button class="btn-watch" @click="toggleWatch">{{ watch }}</button>
                    </div>

                    <div class="task-due-date">
                        <h5>Due-date</h5>
                        <input type="checkbox" @change="updateTask" />
                        <!-- v-model="dueDate.isChecked" -->
                        <button class="btn-due-date" @click="openCalender">
                            need to add date lib</button>
                    </div>
                </div>

                <div task-details->
                    <h3 class="details-title-big">Description</h3>
                    <textarea v-model="taskToEdit.description" @blur="hideBtn = false" @focus="hideBtn = true"
                        placeholder="Add a more detailed description..." class="details-description"></textarea>
                    <div v-if="hideBtn">
                        <div class="btn-save-close">
                            <button>
                                Save
                            </button>
                            <!-- @click.stop="onTaskEdit" -->
                            <button @click="closeTodoTitle">Cancel</button>
                        </div>
                    </div>
                </div>

                <Checklist />

                <div class="details-activity">
                    <div class="activity-show-details">
                        <h3 class="details-title-big">Activity</h3>
                        <button class="toggle-show-details">Show details</button>
                    </div>
                    <input type="text" class="details-activity-comment" placeholder='Write a comment...'>
                </div>
                <!-- v-model="taskToEdit.description" -->

            </section>

            <section class="action-btns-container">
                <DynamicModal v-if="isDynamicModalOpen" />

                <h3 class="details-title-small">Suggested</h3>
                <button @click="toggleOpenModal">Join</button>

                <h3 class="details-title-small">Add To card</h3>
                <button @click="toggleOpenModal">Members</button>
                <button @click="toggleOpenModal">Labels</button>
                <button @click="toggleOpenModal">Checklist</button>
                <button @click="toggleOpenModal">Dates</button>
                <button @click="toggleOpenModal">Attachments</button>
                <button @click="toggleOpenModal(); togglecover();">Cover</button>
                <button @click="toggleOpenModal">Custom Fields</button>

                <h3 class="details-title-small">Actions</h3>
                <button @click="toggleOpenModal">Move</button>
                <button @click="toggleOpenModal">Copy</button>
                <button @click="toggleOpenModal">Make template</button>
                <button @click="toggleOpenModal">Archive</button>
                <button @click="toggleOpenModal">Share</button>
            </section>
        </section>
    </div>
</template>

<script>

import DynamicModal from "./DynamicModal.vue"
import Checklist from "../cmps/Checklist.vue"
import Members from "../cmps/Members.vue"
import { boardService } from "../services/board.service.local.js"


export default {
    data() {
        return {
            taskToEdit: null,
            group: null,
            board: null,
            hideBtn: false,
            isWatchActive: false,
            watch: 'Watch',
            // actionType: null,
            isDynamicModalOpen: false,
            isCoverActive: false,

        }
    },
    created() {
        this.setTask()
    },
    methods: {
        async setTask() {
            try {
                const boardId = this.$route.params.boardId
                const board = await boardService.getById(boardId)
                const taskId = this.$route.params.taskId
                const groupId = this.$route.params.groupId
                console.log('groupId:', groupId)

                this.board = JSON.parse(JSON.stringify(board))
                this.group = this.board.groups.find(group => group.id === groupId)
                this.taskToEdit = this.group.tasks.find(task => task.id === taskId)
            } catch (err) {
                console.log('error:')
            }
        },
        toggleWatch() {
            this.isWatchActive = !this.isWatchActive
            this.watch = this.isWatchActive ? 'Watching' : 'Watch'
        },
        toggleOpenModal() {
            // need to check if the specific action-btn that clicked, is the last clicked button. => Y? close modal. N? open the modal with new content from the other action-btn.
            this.isDynamicModalOpen = !this.isDynamicModalOpen
        },
        togglecover() {
            this.isCoverActive = !this.isCoverActive
        },
        closeModal() {
            (this.actionCmpType = null),
                (this.actionCmpInfo = null)
        },
        setChecklist() {
            (this.actionType = 'checklist'),
                (this.actionInfo = { name: "checklist" })
        },
        closeModal() {
            this.$router.back()

        },
        editTask() {
            console.log('edit task:')
            const editedTask = JSON.parse(JSON.stringify(this.taskToEdit))
            console.log('editedTask:', editedTask)
            const taskIdx = this.group.tasks.findIndex(task => task.id === this.taskToEdit.id)
            // replace task with editTask
            this.group.tasks.splice(taskIdx, 1, this.taskToEdit)
            this.$store.dispatch({ type: 'updateBoard', board: this.board })
        },
    },
    computed: {
    },
    unmounted() {
        // this.$store.commit({ type: 'setCurrTask', task: null })
    },
    components: {
        DynamicModal,
        Checklist,
        Members,
    },
}


</script>