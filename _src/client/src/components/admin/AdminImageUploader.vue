<template>
  <div class="brc-image-uploader">
    <figure class="brc-page-image__wrapper">
      <img class="brc-page-image" :src="displayImageSrc" />
      <h1 class="brc-page-title">{{onImageText}}</h1>
    </figure>
    <div class="brc-image-uploader__loader">
      <b-field class="file">
        <b-upload v-model="imageFile" drag-drop>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-small"></b-icon>
              </p>
              <p>Перетащите сюда файл или кликните в области</p>
            </div>
          </section>
        </b-upload>
      </b-field>
      <span class="file-name" v-if="imageFile">{{ imageFile.name }}</span>
      <b-button type="is-primary" outlined @click="uploadImage">Сохранить</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class AdminImageUploader extends Vue {
  @Prop()
  private id

  @Prop()
  private srcImage

  @Prop()
  private onImageText

  private imageInputRef = `brc-admin-image-${this.id}`
  private imageFile = null

  private get displayImageSrc() {
    return this.imageFile ? URL.createObjectURL(this.imageFile) : this.srcImage
  }
  private uploadImage() {
    this.$emit('upload', this.imageFile)
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/typography.scss';

.brc-image-uploader {
  position: relative;

  .brc-image-uploader__loader {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    * {
      color: white !important;
    }
  }
}
</style>
 