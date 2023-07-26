<template>
    <div class="task-all-page"></div>

    <section class="task-details">
        <section class="task-details-header">
            <input type="text" class="deatils-title" placeholder='v-model="taskToEdit.title"'>
            <!-- v-model="taskToEdit.title" -->
            <!-- {{ taskToEdit.title }} -->
            <p>In list 'need to add {{}}group.title' <span class="active" :class="{ active: isWatch }">i-eye</span></p>
        </section>

        <section class="task-details-main">
            <div>
                <h5 class="deatils-notifications">Notifications</h5>
                <button class="btn-watch" @click="toggleWatch">{{ watch }}</button>
                {{ isWatch }}
            </div>

            <Checklist />

            <div task-details->
                <h4>Description</h4>
                <textarea @blur="hideBtn = false" @focus="hideBtn = true" placeholder="Add a more detailed description..."
                    class="details-description"></textarea>
                <div v-if="hideBtn">
                    <div class="btn-save-close">
                        <button>
                            <form @submit.prevent="save">
                                Save
                            </form>
                        </button>
                        <button @click="closeTodoTitle">Cancel</button>
                    </div>

                </div>
            </div>

            <div class="details-activity">
                <div class="activity-show-details">
                    <h4>Activity</h4>
                    <button class="toggle-show-details">Show details</button>
                </div>
                <input type="text" class="details-activity-comment" placeholder='Write a comment...'>
            </div>
            <!-- v-model="taskToEdit.description" -->

        </section>

        <section class="btns-container">
            <h5>Suggested</h5>
            <button>Join</button>

            <h5>Add To card</h5>
            <button>Members</button>
            <button>Labels</button>
            <button @click="setChecklist">Checklist</button>
            <button>Dates</button>
            <button>Attachments</button>
            <button>Cover</button>
            <button>Custom Fields</button>

            <h5>Actions</h5>
            <button>Move</button>
            <button>Copy</button>
            <button>Make template</button>
            <button>Archive</button>
            <button>Share</button>
        </section>
    </section>
</template>

<script>
import DynamicModal from "./DynamicModal.vue"

import Checklist from "../cmps/Checklist.vue"

export default {
    data() {
        return {
            hideBtn: false,
            isWatch: false,
            watch: 'Watch',
            actionType: null
        }
    },
    methods: {
        toggleWatch() {
            this.isWatch = !this.isWatch
            this.watch = this.isWatch ? 'Watching' : 'Watch'
        },
        closeModal() {

        },
        setChecklist() {
            (this.actionType = 'checklist'),
                (this.actionInfo = { name: "checklist" })
        },
    },
    components: {
        DynamicModal,
        Checklist,
    },
}

</script>