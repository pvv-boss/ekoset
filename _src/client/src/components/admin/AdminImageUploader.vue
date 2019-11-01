<template>
  <div class="brc-image-uploader" :class="{inlinemode:isInlineMode}">
    <slot :imageSrc="displayImageSrc"></slot>
    <div class="brc-image-uploader__loader" :class="{inlinemode:isInlineMode}">
      <b-field class="file">
        <b-upload v-model="imageFile">
          <a class="button is-link">
            <b-icon icon="upload"></b-icon>
            <span>Загрузить</span>
          </a>
        </b-upload>
      </b-field>
      <b-button
        class="brc-image-uploader__save-button"
        type="is-primary"
        @click="uploadImage"
      >Сохранить</b-button>
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
  private isInlineMode

  private imageInputRef = `brc-admin-image-${this.id}`
  private imageFile = null

  private get displayImageSrc () {
    return this.imageFile ? URL.createObjectURL(this.imageFile) : this.srcImage
  }
  private uploadImage () {
    this.$emit('upload', this.imageFile)
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/typography.scss';

.brc-image-uploader {
  position: relative;

  &.inlinemode {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .brc-image-uploader__loader {
    position: absolute;
    bottom: 0px;
    right: 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-left: auto;

    &.inlinemode {
      bottom: 0px;
      right: 0px;
      position: initial;
      margin-top: 1rem;
    }
  }

  .brc-image-uploader__save-button {
    margin-left: 10px;
  }
}
</style>
 