<template>
    <section class="modal-members" v-if="board">
        <input type="text" placeholder="Search members" />
        <h3>Board members</h3>
        <div class="member-container">
            <ul>
                <li v-for="member in board.members" @click="addMember">
                    <div class="member-container">
                        <div class="member-pic"></div>
                        <div class="member-name">
                            <span>{{ member.fullname }}</span>
                            <span>({{ member.username }})</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <button class="add-member">Show other Workspace members</button>
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
    },
    methods: {
        addMember() {
            this.$emit('addMember', member);
        }
    }
}
</script>