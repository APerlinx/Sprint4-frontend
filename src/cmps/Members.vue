<template>
    <div class="details-members" v-if="members?.length">
        <h5>Members</h5>
        <!-- <button class="btn-member" @click="addMember">GD</button>
                    <button class="btn-member" @click="addMember">SZ</button> -->
        <div class="members">
            <div class="member" v-for="member in task.members" :key="member.id">
                <button class="btn-member" @click="toggleMemberInfo">
                    <img class="member-pic" :src="member.imgUrl" defult />
                </button>
                <!-- <button class="btn-member" @click="toggleMemberInfo">AP</button> -->
                <div v-if="isShowen">
                    <MemberDetails />
                </div>
            </div>
            <button class="btn-member btn-add-member" @click="addMember"><span class="icon plus"></span></button>
        </div>
    </div>
</template>

<script>
import { utilService } from '../services/util.service.js'
import MemberDetails from './MemberDetails.vue'

export default {
    props: {
        task: Object,
        board: Object,
    },
    data() {
        return {
            isShowen: false,
        }
    },
    created() {

    },
    methods: {
        toggleMemberInfo() {
            this.isShowen = !this.isShowen
        },
        onclose() {

        },
        updateTask() {
            //need to add
        },
        addMember() {
            this.$emit('toggleMember')
        }
    },
    // computed: {
    // getLabelTitle() {
    //     return (id) => {
    //         const label = this.board.labels.find((label) => label.id === id);
    //         return label ? label.title : "";
    //     };
    // },
    // },
    computed: {
        members() {
            return this.task.members;

        },
        components: {
            MemberDetails,
        },
    }
}
</script>