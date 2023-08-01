<template >
    <li class="attachment-container">
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
    </li>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        attachment: Object,
    },
    methods: {
        removeAttachment(attachmentId) {
            this.$emit('removeAttachment', attachmentId)
        },
    },
    computed: {
        createdAt() {
            return moment(this.attachment.createdAt).startOf('hour').fromNow();
            // return moment(this.attachment.createdAt).startOf('day').fromNow();
        }
    }
}
</script>