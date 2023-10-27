<template>
  <Loader v-if="isUploading"/>
  <template v-else>
    <input class="img-upload" type="file" @change="uploadImg" accept="img/*" id="imgUpload" />
    <label for="imgUpload"> Upload a cover image</label>
  </template>


</template>

<script>
import { uploadService } from "../services/upload.service.js";
import Loader from "../cmps/Loader.vue";

export default {
  data() {
    return {
      imgUrl: null,
      height: 500,
      width: 500,
      isUploading: false,
    };
  },
  methods: {
    async uploadImg(ev) {
      this.isUploading = true;
      this.$nextTick(async () => {
        const { secure_url, height, width } = await uploadService.uploadImg(ev);
        this.isUploading = false;
        this.imgUrl = secure_url;
        this.height = height;
        this.width = width;
        this.$emit("uploaded", this.imgUrl);
      });
    },
  },
  components: {
    Loader,
  },
};
</script>
