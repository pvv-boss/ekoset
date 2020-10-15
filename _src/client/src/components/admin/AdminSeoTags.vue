<template>
  <div style="margin-top:25px; margin-bottom:20px;">
    <h3>Мета теги (SEO)</h3>
    <b-field label="Title">
      <b-input
        type="text"
        :value="seoTitle"
        @input="(val)=>{$emit('update:seoTitle', val);$emit('updated')}"
      ></b-input>
    </b-field>
    <b-field label="Description">
      <b-input
        type="text"
        :value="seoDescription"
        @input="(val)=>{$emit('update:seoDescription', val);$emit('updated')}"
      ></b-input>
    </b-field>
    <b-field label="Keywords">
      <b-input
        type="text"
        :value="seoKeywords"
        @input="(val)=>{$emit('update:seoKeywords', val);$emit('updated')}"
      ></b-input>
    </b-field>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import SeoMeta from '@/models/ekoset/SeoMeta'

@Component
export default class AdminSeoTags extends Vue {
  @Prop()
  private seoTitle

  @Prop()
  private seoDescription

  @Prop()
  private seoKeywords
}

</script>
