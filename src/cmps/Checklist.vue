<template>
    <div class="checklist">
        <section class="checklist-title-container" v-if="checklist">

            <div class="icon-title-container-checklist">
                <span class="icon full-checked-big"></span>
                <!-- <h3 @click="hideBtn">{{ checklistToEdit.title }}</h3> -->
                <textarea class="checklist-title details-title-big" v-model="checklistToEdit.title" @blur="hideBtn = true"
                    @focus="hideBtn = false"></textarea>
            </div>

            <button class="btn btn-checklist-hide-show" v-if="isTodoChecked" @click="isHideChecked = !isHideChecked">
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
            <div v-for="todo in checklistToEdit.todos" :key="todo._id">
                <section class="todo-container" v-if="isHideChecked ? !todo.isChecked : true">
                    <input type="checkbox" @change="updateChecklist" v-model="todo.isChecked" />
                    <textarea class="todo-title" v-model="todo.title" :class="{ finished: todo.isChecked }"
                        @blur="hideTodoBtn = false" @focus="hideTodoBtn = true"></textarea>
                </section>
            </div>
            <div v-if="hideTodoBtn">
                <button class="btn btn-save-close" @click="updateChecklist">
                    save
                </button>
                <button class="btn btn-save-close" @click="updateChecklist">
                    x
                </button>
            </div>

            <button class="btn is-add-todo" v-if="!isAddTodo" @click="isAddTodo = true">Add an item</button>

            <div class="hide-add-todo-btns" v-else>
                <input v-model="newTodoTitle" placeholder="Add an item" class="new-todo-title" />
                <button class="btn-blue add-todo" @click="addTodo">Add</button>
                <button class="btn cancel-todo">Cancel</button>
            </div>

        </section>
    </div>
</template>

<script>
import { utilService } from '../services/util.service.js'

export default {
    props: {
        checklist: Object,
    },
    data() {
        return {
            checklistToEdit: null,
            isHideChecked: false,
            isAddTodo: false,
            isHideAddAnItem: false,
            hideTodoBtn: false,
            hideBtn: true,
            newTodoTitle: '',
        }
    },
    created() {
        this.checklistToEdit = JSON.parse(JSON.stringify(this.checklist))
    },
    methods: {
        deleteChecklist() {
            // console.log('checklistToEdit._id:', this.checklistToEdit)
            this.checklistToEdit = JSON.parse(JSON.stringify(this.checklistToEdit))
            this.$emit('updateChecklist', { type: 'deleteChecklist', newChecklist: this.checklistToEdit })

        },
        addTodo() {
            console.log('adding todo:')
            // if (this.newTodoTitle) return
            const todo = {
                _id: utilService.makeId(),
                title: this.newTodoTitle,
                isChecked: false
            }
            // console.log('todo', todo)
            this.checklistToEdit.todos.push(todo)
            this.newTodoTitle = ''
            this.isAddTodo = false
            this.updateChecklist()
        },
        updateChecklist() {
            // console.log('this.checklistToEdit:', JSON.parse(JSON.stringify(this.checklistToEdit)))
            this.checklistToEdit = JSON.parse(JSON.stringify(this.checklistToEdit))
            this.$emit('updateChecklist', { type: 'editChecklist', newChecklist: this.checklistToEdit })

        }
    },
    computed: {
        isTodoAdd() {

        },
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