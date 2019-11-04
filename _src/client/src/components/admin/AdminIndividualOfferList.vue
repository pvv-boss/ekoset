V<template>
  <div class="brc_admin-offer-list-container">
    <div class="brc-card__header__toolbar">
      <span class="brc_admin-offer-list-container__help" v-if="!createNewOfferMode">
        <i>(Для измнения порядка следования перетащите блок вверх или вниз)</i>
      </span>

      <div v-if="createNewOfferMode" class="brc-admin-card-create-row">
        <b-field label="Наименование:" horizontal>
          <b-input
            placeholder="Наименование"
            type="text"
            required
            validation-message="Наименование не может быть пустым"
            v-model="newOffer.indOfferName"
          ></b-input>
        </b-field>

        <b-field label="Направление:" horizontal>
          <AdminClActivitySelector v-model="newOffer.clActivityId"></AdminClActivitySelector>
        </b-field>

        <b-button @click="saveNewOffer" type="is-primary">Сохранить</b-button>
        <b-button @click="cancelSaveNewOffer">Отмена</b-button>
      </div>

      <b-button
        type="is-primary"
        outlined
        @click="createNewOfferMode = true"
        v-show="!createNewOfferMode"
      >Создать</b-button>
    </div>

    <div class="brc_admin-offer-list">
      <div class="brc_admin-offer-list-item">
        <span>Наименование предложения</span>
        <span>Направление деятельности</span>
        <span>Фото на странице</span>
        <span>Фото на карточке</span>
        <span>Статус</span>
      </div>

      <draggable v-model="offerList" @change="handleChange">
        <div
          class="brc_admin-offer-list-item"
          v-for="iterOffer in offerList"
          :key="iterOffer.indOfferId"
        >
          <nuxt-link
            :to="{ name: 'admin-individual-offer-card', params: { siteSection: siteSection.siteSectionUrl, offer: iterOffer.indOfferUrl}}"
          >{{iterOffer.indOfferName}}</nuxt-link>

          <AdminClActivitySelector v-model="iterOffer.clActivityId"></AdminClActivitySelector>

          <b-upload @input="addOfferImage(...arguments,iterOffer,true)">
            <a class="button is-link">
              <b-icon icon="upload"></b-icon>
            </a>
          </b-upload>

          <b-upload @input="addOfferImage(...arguments,iterOffer,false)">
            <a class="button is-link">
              <b-icon icon="upload"></b-icon>
            </a>
          </b-upload>

          <b-switch
            v-model="iterOffer.indOfferStatus"
            true-value="1"
            false-value="0"
            type="is-success"
            size="is-small"
            style="justify-content: flex-end;"
          ></b-switch>
        </div>
      </draggable>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { getServiceContainer } from '@/api/ServiceContainer'
import BusinessService from '@/models/ekoset/BusinessService';
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType';
import IndividualOffer from '@/models/ekoset/IndividualOffer';
import AdminClActivitySelector from '@/components/admin/AdminClActivitySelector.vue'

@Component({
  components: {
    AdminClActivitySelector
  }
})
export default class AdminIndividualOfferList extends Vue {
  @Prop()
  private siteSection

  @Prop()
  private value

  private offerList: IndividualOffer[] = this.value
  private createNewOfferMode = false
  private newOffer: IndividualOffer = new IndividualOffer()

  @Watch('value', { immediate: true })
  private async updateOfferList () {
    this.offerList = this.value
  }

  private handleChange () {
    for (let i = 0; i < this.offerList.length; i++) {
      this.offerList[i].indOfferPriority = this.offerList.length - i;
    }
    this.$emit('input', this.offerList)
  }

  private async saveNewOffer () {
    this.newOffer.siteSectionId = this.siteSection.siteSectionId

    const saved = await getServiceContainer().individualOfferService.save(this.newOffer)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newOffer = new IndividualOffer()
    this.createNewOfferMode = false
    this.$emit('newoffer:saved', saved)
  }

  private cancelSaveNewOffer () {
    this.newOffer = new IndividualOffer()
    this.createNewOfferMode = false
  }

  private async addOfferImage (imageFile: string, offerItem: IndividualOffer, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    if (isBig) {
      offerItem.bigImageFormData = formData
    } else {
      offerItem.smallImageFormData = formData
    }
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc_admin-offer-list-container {
  display: flex;
  flex-direction: column;

  .brc_admin-offer-list-item {
    margin-top: 10px;

    display: grid;
    grid-template-columns: 1fr 350px 180px 180px 50px;
    grid-column-gap: 20px;
    justify-content: flex-end;

    padding: 5px;
    padding-left: 10px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    line-height: 2em;

    * {
      margin-bottom: 0px !important;
      font-weight: $font-regular !important;
      font-size: 15px !important;
    }

    cursor: move;
  }

  .brc_admin-offer-list-container__help {
    font-size: 0.78rem;
    line-height: 18px;
    letter-spacing: 0.48px;
    margin-bottom: 5px;
  }
}
</style>  