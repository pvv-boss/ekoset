<template>
  <div>
    <VueFileAgent
      ref="vueFileAgent"
      :theme="'list'"
      :multiple="true"
      :deletable="true"
      :meta="true"
      :accept="'image/*'"
      :maxSize="'10MB'"
      :maxFiles="maxFiles"
      :helpText="'Выберите изображение'"
      :errorText="{
      type: 'Неверный тип файла. Загружать можно только изображения',
      size: 'Размер файла не должен превышать 10Мб',
    }"
      v-model="filesData"
    ></VueFileAgent>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import vueFileAgent from 'vue-file-agent'

@Component
export default class AdminFileUploader extends Vue {
  @Prop({ default: 1 })
  private maxFiles

  private filesData = []
  private uploadUrl = 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3'
  private uploadHeaders = { 'X-Test-Header': 'vue-file-agent' }
  private filesDataForUpload = []

  // private uploadFiles () {
  //   // Using the default uploader. You may use another uploader instead.
  //   this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.filesDataForUpload);
  //   this.filesDataForUpload = [];
  // }
  // private deleteUploadedFile (fileData) {
  //   // Using the default uploader. You may use another uploader instead.
  //   this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileData);
  // }
  // private filesSelected (filesDataNewlySelected) {
  //   var validFilesData = filesDataNewlySelected.filter(fileData => !fileData.error);
  //   this.filesDataForUpload = this.filesDataForUpload.concat(validFilesData);
  // }
  // private fileDeleted (fileData) {
  //   var i = this.filesDataForUpload.indexOf(fileData);
  //   if (i !== -1) {
  //     this.filesDataForUpload.splice(i, 1);
  //   }
  //   else {
  //     this.deleteUploadedFile(fileData);
  //   }

  // }
}
</script>
