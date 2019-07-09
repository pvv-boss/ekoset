<template>
  <div v-show="!loading" class="brc-page-container">
    <TheLayoutHeader></TheLayoutHeader>
    <main class="brc-body brc-body_admin">
      <nav class="brc-admin-navigation">
        <ul class="brc-admin-navigation__list">
          <li class="brc-admin-navigation__item">
            <nuxt-link :to="{ name: 'admin-news'}" class="brc-admin-navigation__item-link">Новости</nuxt-link>
          </li>
          <li class="brc-admin-navigation__item">1.2 Menu</li>
          <li class="brc-admin-navigation__item">1.3 Menu</li>
          <li class="brc-admin-navigation__item">1.4 Menu</li>
        </ul>
      </nav>
      <nuxt></nuxt>
    </main>
    <no-ssr>
      <TheLayoutFooter v-if="!loading"></TheLayoutFooter>
    </no-ssr>
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import TheLayoutHeader from '@/components/TheLayoutHeader.vue'
import TheLayoutFooter from '@/components/TheLayoutFooter.vue'


@Component({
  components: {
    TheLayoutHeader,
    TheLayoutFooter
  }
})
export default class AdminLayout extends Vue {
  private loading = true

  private mounted () {
    this.$nextTick(() => {
      this.checkLoading()
    })
  }

  private checkLoading () {
    const el = document.getElementsByClassName('brc-body')
    if (el && el.length > 0) {
      this.loading = false
    } else {
      setTimeout(this.checkLoading, 1500)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/index.scss";

.brc-body_admin {
  display: flex;
  flex-direction: row !important;
  max-width: 100% !important;

  .brc-admin-navigation {
    width: 100px;
    padding: 10px;
    border-right: 1px solid lightgray;

    .brc-admin-navigation__list {
      list-style-type: none;
      padding-left: 0;
    }
  }
}
</style>
