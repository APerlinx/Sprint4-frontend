<template >
    <div class="attachment-container" v-if="attachments">
        <div class="attachment-img-container">
            <img :src="attachments.url" alt />
        </div>

        <article class="attachment-details">
            <h4>{{ attachments.fileName }}</h4>
            <div class="main-actions">
                Added
                <span>{{ timeFormat(attachments.createdAt) }} &#x2022 </span>
                <span class="attachment-action">Comment</span> &#x2022
                <span class="attachment-action" @click="removeAttachment(attachment.id)">Delete</span> &#x2022
                <span class="attachment-action">Edit</span>
            </div>
            <div>
                <span class="attachment-action">Make Cover</span>
            </div>
        </article>
    </div>
</template>

<script>

export default {
    props: {
        attachments: Array,
    },
    methods: {
        removeAttachment(attachmentId) {
            const idx = this.attachments.findIndex(attachment => attachmentId === attachment.id)
            console.log('id:', id)
            this.attachments.splice(idx, 1);
            this.updateAttachments(JSON.parse(JSON.stringify(this.attachments)))
        },
        updateAttachments(attachments) {
            this.$emit('updateAttachments', { type: 'attachments', val: attachments })
        },
        timeFormat(timestamp) {
            const now = Date.now()
            const timeDiff = now - timestamp

            if (timeDiff < 1000 * 60) {
                return 'Just now'
            } else if (timeDiff < 1000 * 60 * 60) {
                return Math.round(timeDiff / (1000 * 60)) + ' minutes ago'
            } else if (timeDiff < 1000 * 60 * 60 * 24) {
                return Math.round(timeDiff / (1000 * 60 * 60)) + ' hours ago'
            } else if (timeDiff < 1000 * 60 * 60 * 24 * 7) {
                return Math.round(timeDiff / (1000 * 60 * 60 * 24)) + ' days ago'
            } else if (timeDiff < 1000 * 60 * 60 * 24 * 30) {
                return Math.round(timeDiff / (1000 * 60 * 60 * 24 * 7)) + ' weeks ago'
            } else {
                const date = new Date(timestamp)
                const options = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }
                return date.toLocaleDateString(undefined, options)
            }
        },
    },
    computed: {

    },
}
</script >
