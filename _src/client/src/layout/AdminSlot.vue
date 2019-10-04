<template>
  <div
    v-show="!loading"
    class="brc-admin-layout"
    :class="{'brc-admin-layout__wide': !isVisibleNavigation}"
  >
    <header id="header">
      <slot name="header">Header</slot>
    </header>
    <aside id="aside">
      <div class="brc-aside__toggler">
        <button @click="toogleNavigation">
          <b-icon icon="arrow-collapse-left" v-show="isVisibleNavigation"></b-icon>
          <b-icon icon="arrow-collapse-right" v-show="!isVisibleNavigation"></b-icon>
        </button>
      </div>
      <div class="brc-aside__nav">
        <slot name="aside">Боковое меню</slot>
      </div>
    </aside>
    <main id="main">
      <slot>Main content</slot>
    </main>
    <footer id="footer">
      <slot name="footer">Footer</slot>
    </footer>
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

@Component({})
export default class AdminSlotLayout extends Vue {
  private loading = true
  private isVisibleNavigation = true


  private mounted () {
    this.$nextTick(() => {
      this.checkLoading()
    })
  }

  private toogleNavigation () {
    this.isVisibleNavigation = !this.isVisibleNavigation
  }

  private checkLoading () {
    const el = document.getElementById('main')
    if (el) {
      this.loading = false
    } else {
      setTimeout(this.checkLoading, 1500)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/index.scss";

.brc-admin-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "aside main"
    "footer footer";
  grid-template-rows: 40px 1fr 40px;
  grid-template-columns: 20% 1fr;
  grid-gap: 10px;
  height: 100vh;
  margin: 0;

  button {
    border: none;
    background-color: white;
    cursor: pointer;
  }
  #header {
    grid-area: header;
    background-color: #f0f0f0;
    img {
      max-height: 100%;
    }
  }
  #footer {
    grid-area: footer;
    background-color: #333;
    color: white;
  }
  #main {
    grid-area: main;
  }
  #aside {
    grid-area: aside;
    float: none;
    width: unset;
    height: unset;
  }
  .brc-aside__toggler {
    width: 100%;
    text-align: right;
  }
}
.brc-admin-layout__wide {
  grid-template-columns: 30px 1fr !important;
  .brc-aside__nav {
    display: none;
  }
}
</style>
