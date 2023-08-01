<template>
    <div class="due-date-container" v-if="task.dueDate">
        <h5>Due-date</h5>
        <div class="due-date-checkbox">
            <input type="checkbox" />
            <button class=" btn due-date-long-date" @click="openDueDate">
                <span>{{ formatDate(task.dueDate) }}&nbsp</span>
                at
                <span>&nbsp{{ formatTime(task.dueDate) }}</span>
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
    created() {
        console.log("🚀 ~ file: Dates.Vue:25 ~ taskToEdit:", this.task.dueDate)
    },
    data() {
        return {

        }
    },
    methods: {
        setDueDate() {

        },
        formatDate(timestamp) {
            // console.log(timestamp)
            return format(new Date(timestamp), 'MMM dd')
            // const formatedDate = format(new Date(this.task.dueDate), 'dd MMM')
            // console.log('this.task.dueDate', this.task.dueDate)
            // console.log('this.task.dueDate', formatedDate)
            // return pririDate
        },
        formatTime(timestamp) {
            // console.log(timestamp)
            return format(new Date(timestamp), 'h:mm aa')
            // const formatedDate = format(new Date(this.task.dueDate), 'dd MMM')
            // console.log('this.task.dueDate', this.task.dueDate)
            // console.log('this.task.dueDate', formatedDate)
            // return pririDate
        },
        dueDate() {
        },
    },
}
</script>
