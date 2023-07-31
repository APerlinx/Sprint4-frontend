<template>
    <section class="modal-members" v-if="board">
        <input class="members-search" type="text" placeholder="Search members" />
        <div class="members-container">
            <h3>Board members</h3>
            <ul>
                <li v-for="member in board.members " @click="addMember" class="list">
                    <div class="single-member-container">
                        <!-- <div class="member-pic" :style="{ backgroundColor: member.backgroundColor }"> -->
                        <div class="member-pic">
                            <img :src="member.imgUrl" defult />
                            <!-- <img :src="member.imgUrl" @error="imageError = true" /> -->
                            <!-- <pre>{{ member.imgUrl }}</pre> -->
                            <!-- <img src=https://ca.slack-edge.com/T04U05NLZ2M-U05794DRP98-f7c5750aa2dd-192 /> -->
                        </div>
                        <div class="member-name">
                            <span>{{ member.fullname }}&nbsp;<span>({{ member.username }})</span></span>
                            <!-- <span>({{ member.username }})</span> -->
                        </div>

                        <div>
                            <span class="icon checked"></span>
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