<template>
    <div class="checklist">
        <section class="checklist-title-container">
            <span></span>
            <textarea class="checklist-title details-title-big" v-model="checklistToEdit.title" @blur="hideBtn = true"
                @focus="hideBtn = false"></textarea>

            <button class="btn btn-checklist-hide-show" v-if="isTodoChecked && hideBtn"
                @click="isHideChecked = !isHideChecked">
                {{ hideCheckedTxt }}</button>
            <div v-if="!hideBtn" class="btn-save-close">
                <button class="btn" @click.stop="onTaskEdit">
                    Save
                </button>
                <button class="btn" @click="closeTodoTitle">Cancel</button>
            </div>
            <button class="btn" v-if="hideBtn" @click="deleteChecklist">Delete</button>
        </section>

        <section class="percentage-bar">
            <p class="percentage-bar-num">{{ checkedTodosPercentage }}%</p>
            <progress :value="checkedTodosPercentage" max="100"></progress>
        </section>

        <section class="todos-container">
            <div v-for=" todo  in  checklistToEdit.todos " :key="todo._id">

                <section class="todo-container" v-if="isHideChecked ? !todo.isChecked : true">
                    <input type="checkbox" @change="updateTask" v-model="todo.isChecked" />
                    <textarea class="todo-title" v-model="todo.title" @blur="hideTodoBtn = false"
                        @focus="hideTodoBtn = true"></textarea>
                    <div v-if="hideTodoBtn">
                        <button class="btn btn-save-close" @click="updateTask">
                            save
                        </button>
                    </div>
                </section>
            </div>
            <button class="btn" @click="addTodo">Add an item</button>

        </section>
    </div>
</template>

<script>
import { utilService } from '../services/util.service.js'

export default {
    props: {
        checklist: Object
    },
    data() {
        return {
            // checklistToEdit: null,
            isHideChecked: false,
            hideTodoBtn: false,
            hideBtn: true,
            checklistToEdit:
            {
                _id: 'abc123',
                title: 'test',
                todos: [
                    {
                        id: "check101",
                        title: "Guy",
                        isChecked: true
                    },
                    {
                        id: "check102",
                        title: "Alon",
                        isChecked: false
                    },
                    {
                        id: "check103",
                        title: "Shay",
                        isChecked: false
                    },
                ],
            },
        }
    },
    created() {
        // this.checklistToEdit = JSON.parse(JSON.stringify(this.checklist))
    },
    methods: {
        deleteChecklist() {
            //need to add
        },
        addTodo() {
            if (!this.newTodoTitle) return
            const todo = {
                _id: utilService.makeId(),
                title: this.newTodoTitle,
                isDone: false
            }
            this.checklistToEdit.todos.push(todo)
            this.newTodoTitle = ''
            this.addItemMode = false
            this.updateTask()
        },
        updateTask() {
            //need to add
        }
    },
    computed: {
        isTodoChecked() {
            return this.checklistToEdit.todos.some(todo => todo.isChecked)
        },
        hideCheckedTxt() {
            if (!this.isHideChecked) return 'Hide checked items'
            const countCheckedTodos = this.checklistToEdit.todos.reduce((acc, todo) => todo.isChecked ? acc + 1 : acc, 0)
            return `Show checked items (${countCheckedTodos})`
        },
        checkedTodosPercentage() {
            const countOfTodos = this.checklistToEdit.todos.length
            if (!countOfTodos) return 0
            // console.log('countOfTodos:', countOfTodos)

            const countOfCheckedTodos = this.checklistToEdit.todos.reduce((acc, todo) => todo.isChecked ? acc + 1 : acc, 0)
            // console.log('countOfCheckedTodos:', countOfCheckedTodos)
            const percentage = parseInt(countOfCheckedTodos / countOfTodos * 100)
            return percentage
        },
    }
}
</script>