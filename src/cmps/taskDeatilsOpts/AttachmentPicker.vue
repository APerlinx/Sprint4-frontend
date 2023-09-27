<template >
    <div class="attachment-picker">
        <h3>Attach a file from your computer</h3>

        <div className="upload-preview">
            <img v-if="imgUrl" :src="imgUrl" :style="{ maxWidth: '200px', float: 'right' }" />
            <label for="imgUpload">{{ uploadMsg }}</label>
            <input type="file" @change="uploadImg" accept="img/*" id="imgUpload" />
        </div>
        <!-- <label v-if="!isLoading" for="imgUploader" @drop.prevent="handleFile" class="drag-container"> -->
        <!-- <h3>You can also drag and drop files to upload them.</h3> -->
        <!-- </label> -->

        <!-- <h5></h5>
        <button>Choose a file</button> -->

        <h5>Search or paste a link</h5>
        <input v-model="imgUrl" type="text" id="Attach-link" placeholder="Attach a new link" />

        <!-- <h5>Display text (optional)</h5>
        <input type="text" placeholder="Text to display" /> -->

    </div>
</template>

<script>
import { uploadService } from '../../services/upload.service.js'
import { utilService } from '../../services/util.service.js'

export default {
    data() {
        return {
            imgUrl: null,
            height: 500,
            width: 500,
            isUploading: false,
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
        async uploadImg(ev) {
            this.isUploading = true
            const { secure_url, height, width } = await uploadService.uploadImg(ev)
            this.isUploading = false
            this.imgUrl = secure_url
            this.height = height
            this.width = width
            const fileName = this.imgUrl.substring(this.imgUrl.lastIndexOf('/') + 1)
            // this.$emit('uploaded', this.imgUrl)
            this.setAttachment(this.imgUrl, fileName)
            this.$emit('addAttachment', this.attachment)
            this.$emit('closeDynamicModal')
        },
        async AddAttachment() {
        },
        setAttachment(url, filename) {
            this.attachment.createdAt = Date.now()
            this.attachment.url = url
            this.attachment.fileName = filename
            console.log('this.attachment:', this.attachment)
        }
    },
    computed: {
        uploadMsg() {
            // if (this.imgUrl) return 'Upload Another?'
            return this.isUploading ? 'Uploading....' : ''
        }
    }
}
</script>

<!-- 
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
        handleFile(ev) {
            //added to determine if its change from input or drop , and gets the file
            // let file;
            // if (ev.type === 'change') file = ev.target.files[0];
            // // else if (ev.type === 'drop') file = ev.dataTransfer.files[0];
            console.log('handleFile:',ev)
            this.onUploadImg(file); // send the file to upload it
        },
        async onUploadImg(file) {
            this.isLoading = true
            const fileName = file.name;
            const res = await uploadService(file)
            this.setAttachment(res.url, fileName)
            const item = {
                type: 'attachment',
                item: JSON.parse(JSON.stringify(this.attachment))
            }
            this.$emit('addItem', item)
            this.isLoading = false;
            this.$emit('closePopup')
        },
        async AddAttachment() {
            const fileName = this.imgUrl.substring(this.imgUrl.lastIndexOf('/') + 1);
            this.setAttachment(this.imgUrl, fileName)
            const item = {
                type: 'attachment',
                item: JSON.parse(JSON.stringify(this.attachment))
            }
            this.$emit('addItem', item)
            this.$emit('closePopup')

        },
        setAttachment(url, filename) {
            this.attachment.createdAt = Date.now()
            this.attachment.url = url;
            this.attachment.fileName = filename
        }
    }

}
</script> -->
