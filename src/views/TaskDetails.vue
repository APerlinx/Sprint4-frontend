<template>
    <div class="task-all-page"></div>

    <!-- <section class="task-details" v-if="taskToEdit"> -->
    <section v-if="taskToEdit" class="task-details">
        <section class="task-details-header">
            <input type="text" class="deatils-title" v-model="taskToEdit.title" @blur="onTaskEdit">
            <!-- placeholder="COOSssssEMEK" -->
            <button @click="closeModal">X</button>
            <p class="task-in-list">in list <span class="group-ops">{{ group.title }}</span><span
                    :class="{ active: !isWatch }">i-eye</span></p>
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
                            <button @click.stop="onTaskEdit">
                                Save
                            </button>
                        </button>
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
            <button @click="toggleOpenModal">Cover</button>
            <button @click="toggleOpenModal">Custom Fields</button>

            <h3 class="details-title-small">Actions</h3>
            <button @click="toggleOpenModal">Move</button>
            <button @click="toggleOpenModal">Copy</button>
            <button @click="toggleOpenModal">Make template</button>
            <button @click="toggleOpenModal">Archive</button>
            <button @click="toggleOpenModal">Share</button>
        </section>
    </section>
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
            isWatch: false,
            watch: 'Watch',
            actionType: null,
            isDynamicModalOpen: false,

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
                console.log("🚀 ~ file: TaskDetails.vue:116 ~ setTask ~ this.taskToEdit:", this.taskToEdit)
            } catch (err) {
                console.log('error:')
            }
        },
        toggleWatch() {
            this.isWatch = !this.isWatch
            console.log("🚀 ~ file: TaskDetails.vue:131 ~ toggleWatch ~ this.isWatch:", this.isWatch)
            this.watch = this.isWatch ? 'Watching' : 'Watch'
            this.onTaskEdit
        },
        toggleOpenModal() {
            // need to check if the specific action-btn that clicked, is the last clicked button. => Y? close modal. N? open the modal with new content from the other action-btn.

            this.isDynamicModalOpen = !this.isDynamicModalOpen

        },
        closeModal() {
            this.actionCmpType = null
            this.actionCmpInfo = null
        },
        setChecklist() {
            (this.actionType = 'checklist'),
                (this.actionInfo = { name: "checklist" })
        },
        closeModal() {
            this.$router.back();

        },
        onTaskEdit() {
            console.log('edit')
            this.$emit('editedTask', JSON.parse(JSON.stringify(this.taskToEdit)));
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