<template>
  <div class="brc-image-uploader">
    <slot :imageSrc="displayImageSrc"></slot>
    <div class="brc-image-uploader__loader" :class="{left:isLeft}">
      <b-upload v-model="imageFile">
        <a class="button is-link">
          <b-icon icon="upload"></b-icon>
        </a>
      </b-upload>

      <b-button
        v-if="showDeleteButton===true"
        class="brc-image-uploader__save-button"
        @click="deleteImage"
      >Удалить</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class AdminImageUploader extends Vue {
  @Prop()
  private id

  @Prop()
  private srcImage

  @Prop()
  private isLeft

  @Prop()
  private showDeleteButton

  private imageInputRef = `brc-admin-image-${this.id}`
  private imageFile = null

  @Watch('imageFile')
  private imageLoaded (newImageFile) {
    this.$emit('uploader:newimageloaded', newImageFile)
  }

  private get displayImageSrc () {
    return this.imageFile ? URL.createObjectURL(this.imageFile) : this.srcImage
  }

  private deleteImage () {
    this.$emit('uploader:delete')
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
    opacity: 0.5;
    bottom: 10px;
    right: 10px;
    display: flex;
    flex-direction: row;
    &.left {
      left: 5px;
      bottom: 5px;
    }
  }

  .brc-image-uploader__save-button {
    margin-left: 10px;
  }
}
</style>
 