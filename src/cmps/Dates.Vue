<template>
    <div class="due-date-container" v-if="dueDate">
        <h5>Due-date</h5>
        <div class="due-date-checkbox">
            <!-- @change="updateStatus" -->
            <input type="checkbox" />
            <div class="due-date-long-date">
                <span>{{ formatDate(task.dueDate) }}</span>
                at
                <span>{{ formatTime(task.dueDate) }}</span>
            </div>



            <!-- <button class="btn btn-due-date">
                Aug 10 at 3:27 AM
            </button> -->
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
