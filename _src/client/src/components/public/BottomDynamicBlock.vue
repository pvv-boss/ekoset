<template>
  <div class="brc-page-description_bottom">
    <div>
      <h4>Экосеть</h4>
      <p>Давно выяснено, что при оценке дизайна и&nbsp;композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а&nbsp;также реальное распределение букв и&nbsp;пробелов в&nbsp;абзацах, которое не&nbsp;получается при простой дубликации «Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст..»</p>
      <p>Многие программы электронной вёрстки и&nbsp;редакторы HTML используют Lorem Ipsum в&nbsp;качестве так что поиск по&nbsp;ключевым словам «lorem ipsum» сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За&nbsp;прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по&nbsp;ошибке, некоторые&nbsp;— намеренно (например, юмористические варианты).</p>
    </div>
    <div>
      <img src="/images/firm-image-1.png" alt="Экосеть" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class BottomDynamicBlock extends Vue {

}
</script>
<style lang="scss">
.brc-page-description_bottom {
  display: flex;
  flex-direction: row;
  margin: 60px -15px 0;

  > div {
    flex-grow: 1;
    margin: 0 15px;
    max-width: 50%;
    > p {
      color: gray;
      margin-top: 10px;
      font-size: 14px;
    }
  }

  img {
    max-width: 100%;
  }
}
@media (max-width: 768px) {
  .brc-page-description_bottom {
    flex-direction: column;
    div {
      max-width: 100%;
    }
  }
}
</style>
