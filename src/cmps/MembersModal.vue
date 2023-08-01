<template>
    <div class="backdrop">
        <div class="members-preview">
            <div class="members-preview-upper">
                <span class="close-member-preview" @click="onclose">X</span>
                <div class="member-name-container">
                    <p class="member-name">Name</p>
                    <!-- {{ member.name }} -->
                    <p class="member-username">@username</p>
                    <!-- @{{ member.username }} -->
                </div>
                <div class="member-pic"></div>
            </div>


            <div class="members-preview-lower">
                <div class="lower-btn">
                    <p class="member-btn" @click="onViewProfile">View profile</p>
                    <hr class="line" />
                    <p class="member-btn" @click="onRemoveFromCard">Remove from card</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { utilService } from '../services/util.service.js'

export default {
    props: {
    },
    data() {
        return {
        }
    },
    created() {

    },
    methods: {
        onViewProfile() {
            //need to add
        },
        onRemoveFromCard() {
            //need to add
        },
        onclose() {

        },
    },
    computed: {

    },
}
</script>