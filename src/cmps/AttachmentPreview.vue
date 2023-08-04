<template >
    <li class="attachment-container">
        <div v-for="attachment in attachments" :idx="idx" class="attachment flex align-center"
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
