<template >
    <div class="attachment-container" v-if="attachments">
        <div class="attachment-img-container">
            <img :src="attachments.url" alt />
        </div>

        <article class="attachment-details">
            <h4>{{ attachments.fileName }}</h4>
            <div class="main-actions">
                Added
                <span>{{ attachments.createdAt }} &#x2022 </span>
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
            this.attachments.splice(idx, 1);
            this.updateAttachments(JSON.parse(JSON.stringify(this.attachments)))
        },
        updateAttachments(attachments) {
            this.$emit('updateAttachments', { type: 'attachments', val: attachments })
        },
    },
    computed: {

    },
}
</script >
