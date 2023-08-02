<template>
    <section class="modal-members" v-if="board">
        <input class="members-search" type="text" placeholder="Search members" v-model="filterString" v-focus />
        <div class="members-container">
            <h3>Board members</h3>
            <ul>
                <li v-for="member in filteredMembers" :key="member.id" @click="toggleMember(member)" class="list">
                    <div class="single-member-container">
                        <div class="member-pic">
                            <img :src="member.imgUrl" defult />
                        </div>
                        <div class="member-name">
                            <span>{{ member.fullname }}&nbsp;<span>({{ member.username }})</span></span>
                        </div>

                        <div>
                            <!-- <span class="icon checked"></span> -->
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <button class="add-member" @click="setMembers">Show other Workspace members</button>
        <!-- <div class="memvers-not-on-board">
            <li v-for="member in members" @click="addMember">
                <div class="member-container">
                    <div class="member-pic"></div>
                    <div class="member-name">
                        <span>{{ member.fullname }}</span>
                        <span>({{ member.username }})</span>
                    </div>
                </div>
            </li>
        </div> -->
    </section>
</template>

<script>
import { utilService } from '../../services/util.service.js'

export default {
    props: {
        board: Object,
    },
    data() {
        return {
            filterString: '',
        }
    },
    methods: {
        toggleMember({ id, username, fullname, imgUrl, backgroundColor }) {
            const member = {
                id,
                fullname,
                username,
                imgUrl,
                backgroundColor,
            }
            // console.log('member:', member)
            this.$emit('toggleMember', member);

        },
        // addV(member) {

        // },
        closeMembers() {
            this.$emit('close')
        },
    },
    computed: {
        // boardMembers() {
        //     // console.log('this.taskToEdit', this.taskToEdit)
        //     // return this.taskToEdit.members
        // },
        filteredMembers() {
            const byName = new RegExp(this.filterString, 'i')
            return this.board.members.filter(member => byName.test(member.fullname))
        },
    }
}
</script>