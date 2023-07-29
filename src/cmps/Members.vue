<template>
    <div class="details-members">
        <h5>Members</h5>
        <!-- <button class="btn-member" @click="addMember">GD</button>
                    <button class="btn-member" @click="addMember">SZ</button> -->
        <div class="members">
            <div class="member">
                <button class="btn-member" @click="toggleMemberInfo">AP</button>
                <div v-if="isShowen">
                    <MembersModal />
                </div>
            </div>
            <button class="btn-member btn-add-member" @click="addMember">+</button>
        </div>
    </div>
</template>

<script>
import { utilService } from '../services/util.service.js'
import MembersModal from './MembersModal.vue'

export default {
    props: {
    },
    data() {
        return {
            // checklistToEdit: null,
            isShowen: false,
            members: [
                {
                    _id: "member101",
                    name: "Guy Dahan",
                    username: "guydahan4191",
                    imgUrl: "",
                    isPicked: false
                },
                {
                    id: "member102",
                    title: "Alon Perlin",
                    isChecked: "alonp11",
                    imgUrl: "",
                    isPicked: false
                },
                {
                    id: "member103",
                    title: "Shay Zigdon",
                    isChecked: "shayzigdon1",
                    imgUrl: "",
                    isPicked: false
                },
                {
                    id: "member104",
                    title: "Dima Polo",
                    isChecked: "dimapolo1",
                    imgUrl: "",
                    isPicked: false
                },
            ]
        }
    },
    created() {

    },
    methods: {
        toggleMemberInfo() {
            this.isShowen = !this.isShowen
            console.log('this.isShowen:', this.isShowen)
        },
        onclose() {

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
    },
    components: {
        MembersModal,
    },
}
</script>