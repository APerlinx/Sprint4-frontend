<template >
    <li class="attachment-container">
        <div v-for="(attachment, idx) in attachments" :idx="idx" class="attachment flex align-center"
            @click="goTo(attachment.link)">
            <div class="icon-title-container-description">
                <span class="icon attachment-big"></span>
                <h3 class="details-title-big">Attachment</h3>
            </div>
            <div class="img-container">
                <img :src="attachment.url" alt />
            </div>
            <article class="attachment-details">
                <h4>{{ attachment.fileName }}</h4>
                <div class="main-actions">
                    Added
                    <span>{{ createdAt }} &#x2022 </span>
                    <span class="attachment-action">Comment</span> &#x2022
                    <span class="attachment-action" @click="removeAttachment(attachment.id)">Delete</span> &#x2022
                    <span class="attachment-action">Edit</span>
                </div>
                <div>
                    <span class="attachment-action">Make Cover</span>
                </div>
            </article>
        </div>
    </li>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        attachments: Array,
    },
    // methods: {
    //     removeAttachment(attachmentId) {
    //         this.$emit('removeAttachment', attachmentId)
    //     },
    // },
    // computed: {
    //     createdAt() {
    //         return moment(this.attachment.createdAt).startOf('hour').fromNow();
    //         // return moment(this.attachment.createdAt).startOf('day').fromNow();
    //     }
    // },
    methods: {
        goTo(url) {
            window.open(url, '_blank')
        },
        removeAttachment(idx) {
            const activity = {
                txt: 'removed an attachment',
                createdAt: Date.now(),
                byMember: this.$store.getters.loggedinUser,
                task: this.taskData.task,
            }
            this.$store.commit({ type: 'newActivity', activity })

            this.$store.dispatch({
                type: 'setState',
                action: 'removeAttachment',
                groupId: this.taskData.group.id,
                taskId: this.taskData.task.id,
                idx
            })
        },
        isImage(link) {
            return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(link)
        },


    },
    computed: {
        taskData() {
            return this.$store.getters.currTaskData
        },
    },
    unmounted() { },
    components: {},
}
</script >
