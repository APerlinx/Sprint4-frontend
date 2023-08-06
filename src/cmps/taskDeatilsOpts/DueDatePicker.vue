<template>
    <div class="date-picker">
        <VDatePicker expanded locale="en" v-model="date" mode="dateTime" is24hr hide-time-header />
    </div>
    <button @click="saveDueDate" class="btn-date-save">Save</button>
    <button @click="removeDueDate" class="btn-date-remove">Remove</button>
</template>

<script>
import { ref } from 'vue'

export default {
    emits: ['addDueDate'],
    components: {

    },
    data() {
        return {
            date: ref(new Date()),
        };
    },
    methods: {
        saveDueDate() {
            const date = (Date.parse((this.date)))
            console.log('date', date)
            this.$emit('addDueDate', date);
        }
    },
}
</script>