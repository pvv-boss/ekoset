<template>
  <articleList :articleList="articleItems"></articleList>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import articleList from '@/components/ekoset/article/articleList.vue'
import articleShortDetail from '@/models/ekoset/articleShortDetail.ts'

@Component({
  components: {
    articleList
  }
})
export default class Article extends Vue {
  private articleItems: articleShortDetail[] = []

  private async mounted () {
    for (let i = 0; i < 10; i++) {
      this.articleItems.push(new articleShortDetail())
    }

  }

  private testRegex () {
    const textWithImgBase64 = '<p><img src="data:image/jpeg;base64,/9j/4AAAhKYR5lK7omoFjHNIFbA6KrB/iFXG9CgKSlKPyprkCEptpHIagUJb2SN6JR1Qf/2Q==" width="454" style="cursor: nesw-resize;"></p><p><br></p>'
    const regexp = /<img\ssrc="data:image\/([a-z]*?)\;base64\,(.*?=)".*?>/gm
    let match = regexp.exec(textWithImgBase64)
    let base64 = ''
    let ext = ''
    if (match) {
      base64 = match[2]
      ext = match[1]
    }
    const textWithImgSrc = textWithImgBase64.replace(regexp, '<img src="ссылка на файл"/>')
  }

}
</script>
