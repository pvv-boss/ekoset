<template>
  <div class="brc-page-header__order">
    <a href="#brcOfferForm" @click="navigateToOfferForm">Заказать</a>
    <div class="brc-buscet-counter">{{getBuscetCount}}</div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import BuscetStore from '@/store/BuscetStore'
import { getModule } from 'vuex-module-decorators'

@Component({
  components: {

  }
})
export default class TheHeaderOrder extends Vue {

  private buscetStore: BuscetStore = getModule(BuscetStore, this.$store)

  private get getBuscetCount () {
    return this.buscetStore.addedServiceCount
  }

  private navigateToOfferForm (e) {
    const formElement = document.getElementById('btnRequestServicePopupForm')
    if (formElement) {
      formElement.setAttribute('style', 'display:block');
    }
    e.preventDefault()
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';
@import '@/styles/typography.scss';

.brc-page-header__order {
  position: relative;
  background-color: $red;
  width: 120px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  // font-weight: $font-medium;
  letter-spacing: 0.055rem;
  color: white;
  margin-left: 10px;
  border-radius: 4px;
  > a {
    color: white !important;
  }

  .brc-buscet-counter {
    position: absolute;
    top: -13px;
    right: -13px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid white;
    background-color: black;
    color: white;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>