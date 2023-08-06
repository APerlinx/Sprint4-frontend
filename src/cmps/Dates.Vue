<template>
    <div class="due-date-container" v-if="task.dueDate">
        <h5>Due-date</h5>
        <div class="due-date-checkbox">
            <input type="checkbox" v-model="dateStatus" @change="checkDueDate" />
            <button class=" btn due-date-long-date" @click="openDueDate">
                <span>{{ formatDate(task.dueDate) }}</span>
                at
                <span>&nbsp;{{ formatTime(task.dueDate) }}</span>
                <div class="due-date-status" :class="`due-date ${dueDateStatus} ${task.status}`" v-if="task.dueDate"
                    @click.stop="toggleStatus">
                    <!-- <span class="icon date"></span> -->
                    <!-- <span class="date-counter"></span> -->
                    <span class="status"
                        :class="{ done: task.status === 'done', overdue: task.status === 'overdue-long' }">{{
                            dueDateStatus }}</span>
                </div>
            </button>

        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { format } from 'date-fns'

export default {
    props: {
        task: Object,
    },
    data() {
        return {
            dateStatus: false,
        }
    },
    created() {
        if (this.task.status === 'done') this.dateStatus = true
    },
    methods: {
        setDueDate() {

        },
        formatDate(timestamp) {
            return format(new Date(timestamp), 'MMM dd')
        },
        formatTime(timestamp) {
            return format(new Date(timestamp), 'h:mm aa')
        },
        openDueDate() {
            this.$emit('addDueDate')
        },
        checkDueDate() {

            this.dateStatus = !!this.dateStatus

            this.$emit('updateTaskStatus', this.dateStatus)

        },
        toggleStatus() {
            this.$store.dispatch('toggleStatus', {
                groupId: this.groupId,
                task: this.task,
            })
        },
    },
    computed: {
        dueDateStatus() {
            if (!this.task.dueDate) return 'no-due-date'
            if (this.task.status === 'done') return 'Completed'
            console.log("🚀 ~ file: Dates.vue:73 ~ dueDateStatus ~ this.task.status:", this.task.status)
            console.log(this.task.status)

            const now = Date.now()
            const dueDate = new Date(this.task.dueDate).getTime()
            const diffHours = (dueDate - now) / 1000 / 60 / 60

            if (diffHours < -48) {
                this.task.status === 'overdue-long'
                return 'Overdue-long'
            }
            if (diffHours < 0) return 'Overdue'
            if (diffHours < 24) return 'Due-Soon'
            return 'normal'
        },
    }
}
</script>