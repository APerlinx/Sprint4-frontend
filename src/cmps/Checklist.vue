<template>
    <div class="checklist">
        <section>
            <section class="checklist-title-container">
                <span>icon</span>
                <input type="text" class="checklist-title" v-model="checklistToEdit.title" />

                <button class="btn-checklist-hide-show" v-if="isTodoChecked" @click="isHideChecked = !isHideChecked">{{
                    hideCheckedTxt }}</button>
                <button @click="deleteChecklist">Delete</button>
            </section>
        </section>

        <section class="percentage-bar">
            <p class="percentage-bar-num" v-if='todos'>{{ percentage }}%</p>
            <progress :value="checkedTodosPercentage" max="100"></progress>
        </section>

        <section class="todos-container">
            <div v-for="todo in checklistToEdit.todos" :key="todo._id">

                <section class="todo-container" v-if="isHideChecked ? !todo.isChecked : true">
                    <input type="checkbox" @change="updateTask" v-model="todo.isChecked" />
                    <textarea :class="{ completed: todo.isChecked }" v-model="todo.title"></textarea>
                    <button class="todo-save" @click="updateTask">
                        save
                    </button>
                </section>
            </div>

        </section>
    </div>
</template>

<script>
import { utilService } from '../services/util.service.js'

export default {
    props: {
    },
    data() {
        return {
            checklistToEdit: null,
            isHideChecked: false,
            checklistToEdit: {
                title: 'test',
                todos: [
                    {
                        "id": "212jX",
                        "title": "Guy",
                        "isChecked": true
                    },
                    {
                        "id": "212jXx",
                        "title": "Alon",
                        "isChecked": false
                    },
                    {
                        "id": "212jXx",
                        "title": "Shay",
                        "isChecked": false
                    },
                ],
            },
        }
    },
    created() {

    },
    methods: {
        deleteChecklist() {
            //need to add
        },
        updateTask() {
            //need to add
        }
    },
    computed: {
        isTodoChecked() {
            return this.checklistToEdit.todos.some(todo => todo.isDone)
        },
        hideCheckedTxt() {
            if (!this.isHideChecked) return 'Hide checked items'
            const countCheckedTodos = this.checklistToEdit.todos.reduce((acc, todo) => todo.isDone ? acc + 1 : acc, 0)
            return `Show checked items (${countCheckedTodos})`
        },
        checkedTodosPercentage() {
            const numOfTodos = this.checklistToEdit.todos.length
            if (!numOfTodos) return 0
            const numOfDoneTodos = this.checklistToEdit.todos.reduce((acc, todo) => todo.isDone ? acc + 1 : acc, 0)
            return parseInt(numOfDoneTodos / numOfTodos * 100)
        },
    }
}
</script>