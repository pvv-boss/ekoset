<template>
  <div class="brc-page-header__invent">
    <a href="#brcOfferForm" @click="navigateToOfferForm"
      >Пригласить на тендер</a
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
  }
})
export default class TheHeaderInviteTender extends Vue {
  private navigateToOfferForm (e) {
    const formElement = document.getElementById('btnOrderPopupForm')
    if (formElement) {
      formElement.setAttribute('style', 'display:block');
    }
    e.preventDefault()
  }
}
</script>


<style lang="scss">
.brc-page-header__invent {
  display: flex;
  height: 18px;
  max-height: 18px;
  align-items: center;
  margin-left: 15px;

  > a {
    margin-left: 3px;
    border-bottom: 1px dotted rgba(255, 13, 41, 0.25);
    color: $red;
    letter-spacing: -0.2px;

    &:hover {
      color: darkred;
      border-bottom: 1px dotted darkred;
    }
  }
}
</style>
