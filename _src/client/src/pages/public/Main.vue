<template>
  <section>
    <h1 itemprop="headline name">Экосеть: главная страница</h1>
    <div>
      <p>Давно выяснено, что при оценке дизайна и&nbsp;композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а&nbsp;также реальное распределение букв и&nbsp;пробелов в&nbsp;абзацах, которое не&nbsp;получается при простой дубликации «Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст..»</p>
<p>Многие программы электронной вёрстки и&nbsp;редакторы HTML используют Lorem Ipsum в&nbsp;качестве так что поиск по&nbsp;ключевым словам «lorem ipsum» сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За&nbsp;прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по&nbsp;ошибке, некоторые&nbsp;— намеренно (например, юмористические варианты).</p>
    </div>
    <MessageForm></MessageForm>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import MessageForm from '@/components/public/MessageForm.vue'

@Component({
  components: {
    MessageForm
  }
})
export default class Main extends Vue {
  private head () {
    return { title: 'Экосеть' }
  }
}
</script>
