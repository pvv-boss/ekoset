<template>
  <div class="brc_admin-offer-list-container">
    <div class="brc-card__header__toolbar">
      <span
        v-if="!createNewOfferMode"
        class="brc_admin-offer-list-container__help"
      >
        <i>(Для измнения порядка следования перетащите блок вверх или вниз)</i>
      </span>

      <div v-if="createNewOfferMode" class="brc-admin-card-create-row">
        <b-field label="Наименование:" horizontal>
          <b-input
            v-model="newOffer.indOfferName"
            placeholder="Наименование"
            type="text"
            required
            validation-message="Наименование не может быть пустым"
          ></b-input>
        </b-field>

        <b-field label="Вид деятельности:" horizontal>
          <LazyAdminClActivitySelector
            v-model="newOffer.clActivityId"
          ></LazyAdminClActivitySelector>
        </b-field>

        <b-button type="is-primary" @click="saveNewOffer">
          <b-icon icon="check"></b-icon>
        </b-button>
        <b-button @click="cancelSaveNewOffer">
          <b-icon icon="cancel"></b-icon>
        </b-button>
      </div>

      <b-button
        v-show="!createNewOfferMode"
        type="is-primary"
        outlined
        @click="createNewOfferMode = true"
        >Создать</b-button
      >
    </div>

    <div class="brc_admin-offer-list">
      <div class="brc_admin-offer-list-item">
        <span>Статус</span>
        <span>Наименование предложения</span>
        <span>Вид деятельности</span>
        <span>Фото на странице</span>
        <span>Фото на карточке</span>
        <span>Удалить</span>
      </div>

      <draggable v-model="offerList" @change="handleChange">
        <div
          v-for="iterOffer in offerList"
          :key="iterOffer.indOfferId"
          class="brc_admin-offer-list-item"
        >
          <b-switch
            v-model="iterOffer.indOfferStatus"
            true-value="1"
            false-value="0"
            type="is-success"
            size="is-small"
            style="justify-content: flex-end"
            @input="saveOffer(iterOffer)"
          ></b-switch>

          <nuxt-link
            :to="{
              name: 'admin-individual-offer-card',
              params: {
                siteSection: siteSection.siteSectionUrl,
                offer: iterOffer.indOfferUrl,
              },
            }"
            >{{ iterOffer.indOfferName }}</nuxt-link
          >

          <LazyAdminClActivitySelector
            v-model="iterOffer.clActivityId"
            @input="saveOffer(iterOffer)"
          ></LazyAdminClActivitySelector>

          <b-upload @input="addOfferImage(...arguments, iterOffer, true)">
            <a class="button is-link">
              <b-icon icon="upload"></b-icon>
            </a>
          </b-upload>

          <b-upload @input="addOfferImage(...arguments, iterOffer, false)">
            <a class="button is-link">
              <b-icon icon="upload"></b-icon>
            </a>
          </b-upload>

          <b-button
            type="is-danger"
            icon-right="delete"
            @click="deleteOffer(iterOffer)"
          ></b-button>
        </div>
      </draggable>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType';
import IndividualOffer from '@/models/ekoset/IndividualOffer';
import { ServiceRegistry } from '@/ServiceRegistry';
import IndividualOfferService from '@/services/IndividualOfferService';
import MediaService from '@/services/MediaService';

@Component({
  components: {
    draggable: () => import(/* webpackChunkName: "vuedraggable" */ 'vuedraggable')
  }
})
export default class AdminIndividualOfferList extends Vue {
  @Prop()
  private siteSection

  @Prop()
  private value


  private offerList: IndividualOffer[] = []
  private createNewOfferMode = false
  private newOffer: IndividualOffer = new IndividualOffer()

  @Watch('value', { immediate: true })
  private async updateOfferList () {
    this.offerList = this.value
  }

  private handleChange () {
    for (let i = 0; i < this.offerList.length; i++) {
      this.offerList[i].indOfferPriority = this.offerList.length - i;
      this.saveOffer(this.offerList[i])
    }
    this.$emit('input', this.offerList)
  }

  private async saveNewOffer () {
    this.newOffer.siteSectionId = this.siteSection.siteSectionId
    this.newOffer.indOfferH1 = this.newOffer.indOfferName

    const saved = await ServiceRegistry.instance.getService(IndividualOfferService).save(this.newOffer)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
    this.newOffer = new IndividualOffer()
    this.createNewOfferMode = false
    this.$emit('newoffer:saved', saved)
  }

  private async saveOffer (offer: IndividualOffer) {
    ServiceRegistry.instance.getService(IndividualOfferService).save(offer)
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`)
  }

  private cancelSaveNewOffer () {
    this.newOffer = new IndividualOffer()
    this.createNewOfferMode = false
  }

  private async addOfferImage (imageFile: string, offerItem: IndividualOffer, isBig: boolean) {
    const formData: FormData = new FormData()
    formData.append('file', imageFile)
    ServiceRegistry.instance.getService(MediaService).saveOfferImage(offerItem.indOfferId, formData, isBig)
  }

  private async deleteOffer (offer: IndividualOffer) {
    const okCallback = async () => {
      await ServiceRegistry.instance.getService(IndividualOfferService).delete(offer.indOfferId)
      this.$emit('offer:deleted')
    }
    this.$BrcAlert(BrcDialogType.Warning, 'Удалить индивидуальное предложение?', 'Подтвердите удаление', okCallback)
  }

}
</script>

<style lang="scss">
.brc_admin-offer-list-container {
  display: flex;
  flex-direction: column;

  .brc_admin-offer-list-item {
    margin-top: 10px;

    display: grid;
    grid-template-columns: 50px 1fr 350px 180px 180px 70px;
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