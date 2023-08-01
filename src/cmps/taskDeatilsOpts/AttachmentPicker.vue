<template >
    <div class="attachment-picker">
        <h3>Attach a file from your computer</h3>

        <label v-if="!isLoading" for="imgUploader" @drop.prevent="handleFile" @dragover.prevent class="drag-container">
            <h3>You can also drag and drop files to upload them.</h3>
        </label>

        <h5></h5>
        <button>Choose a file or drag it</button>

        <h5>Search or paste a link</h5>
        <input v-model="imgUrl" type="text" id="Attach-link" placeholder="Attach a new link" />

        <h5>Display text (optional)</h5>
        <input type="text" placeholder="Text to display" />

    </div>
</template>


<script>
import { utilService } from '../../services/util.service.js'
import { uploadService } from '../../services/upload.service.js'

export default {
    data() {
        return {
            isLoading: false,
            isDragOver: false,
            attachment: {
                createdAt: null,
                fileName: null,
                url: null,
                type: 'image',
                id: utilService.makeId()
            },
            imgUrl: ''

        }
    },
    methods: {

    }

}
</script>
