<template>
  <div class="brc-page-header__top-actions p_small">
    <div class="brc-page-header__action">
      <img src="/images/note.png" />
      <a>Задать вопрос</a>
    </div>
    <div class="brc-page-header__action">
      <img src="/images/tender.png" />
      <a>Пригласить на тендер</a>
    </div>
    <div class="brc-page-header__action">
      <img src="/images/user_small.png" />
      <a>Личный кабинет</a>
      <!-- <UserAuthHeader></UserAuthHeader> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'
import UserAuthHeader from '@/components/user/UserAuthHeader.vue'

@Component({
  components: {
    UserAuthHeader
  }
})
export default class TheHeaderActions extends Vue {

}
</script>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/typography.scss";

$action_item_padding_left: 20px;

.brc-page-header__top-actions {
  margin: 0;
  display: flex;
  > div {
    > a {
      border-bottom: 1px dotted rgba(255, 13, 41, 0.25);
      color: $red;
      letter-spacing: -0.2px;
    }
  }

  > div + div {
    padding-left: $action_item_padding_left;
    @media (max-width: 768px) {
      padding-left: $action_item_padding_left - 5px;
    }
  }
}

.brc-page-header__action {
  display: flex;
  height: 18px;
  max-height: 18px;
  justify-content: center;
  align-items: center;
  > img {
    height: 100%;
    min-height: 100%;
  }
  > a {
    margin-left: 5px;
  }
}
</style>
