<template>
    <section class="modal-members" v-if="board">
        <input type="text" placeholder="Search members" />
        <h3>Board members</h3>
        <div class="member-container">
            <ul>
                <li @click="addMember">
                    <div class="member-pic"></div>

                    <div class="member-name">
                        <span>{{ member.fullname }}</span>
                        <span>({{ member.username }})</span>
                    </div>
                </li>
            </ul>
        </div>
        <button class="add-member">Show other Workspace members</button>
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

        }
    }
}
</script>