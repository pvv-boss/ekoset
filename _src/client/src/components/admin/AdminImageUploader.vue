<template>
  <div>
    <input type="file" :id="id" :ref="imageInputRef" v-on:change="handleImageLoad()" />
    <button type="button" @click="uploadImage()">Отправить</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class AdminImageUploader extends Vue {

  @Prop()
  private id

  private imageInputRef = `brc-admin-image-${this.id}`
  private imageFile = ''

  private handleImageLoad () {
    this.imageFile = (this.$refs[this.imageInputRef] as any).files[0]
  }

  private uploadImage () {
    this.$emit('upload', this.imageFile)
  }

}

</script>
