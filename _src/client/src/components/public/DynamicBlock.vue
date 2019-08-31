<template>
  <div class="brc-page-description">
    <p>Давно выяснено, что при оценке дизайна и&nbsp;композиции читаемый текст мешает сосредоточиться.&nbsp;а&nbsp;также реальное распределение букв и&nbsp;пробелов в&nbsp;абзацах, которое не&nbsp;получается при простой и&nbsp;редакторы HTML используют Lorem Ipsum в&nbsp;качестве текста по&nbsp;умолчанию, так что поиск по&nbsp;ключ настоящего рождения. За&nbsp;прошедшие годы текст Lorem Ipsum получил много версий. Некоторые</p>
    <p>Давно выяснено, что при оценке дизайна и&nbsp;композиции читаемый текст мешает сосредоточиться.&nbsp;а&nbsp;также реальное распределение букв и&nbsp;пробелов в&nbsp;абзацах, которое не&nbsp;получается при простой и&nbsp;редакторы HTML используют Lorem Ipsum в&nbsp;качестве текста по&nbsp;умолчанию, так что поиск по&nbsp;ключ настоящего рождения. За&nbsp;прошедшие годы текст Lorem Ipsum получил много версий. Некоторые</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class DynamicBlock extends Vue {

}
</script>
<style lang="scss">
.brc-page-description {
  margin: 30px 0 60px;
  -webkit-column-count: 2;
  -moz-column-count: 2;
  column-count: 2;
  -webkit-column-gap: 30px;
  -moz-column-gap: 30px;
  column-gap: 30px;
}

@media (max-width: 768px) {
  .brc-page-description {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
    -webkit-column-gap: 0;
    -moz-column-gap: 0;
    column-gap: 0;
  }
}
</style>
