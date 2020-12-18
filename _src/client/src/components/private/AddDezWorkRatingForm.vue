<template>
  <BaseModal
    title="Оцените работу мастера"
    @dialogOkClick="onOkClick()"
    @dialogCancelClick="onCancelClick()"
  >
    <div class="deal_continin_form_text">
      <br /><br />
      <div style="display: flex; align-items: center">
        <span>Ваша оценка:</span>
        <BaseRating
          v-model="editRating"
          style="margin-left: 16px"
          star-font-size="42"
          :show-reviews="false"
        ></BaseRating>
      </div>

      <br /><br />
      <div class="deal_continin_form_contr">
        <div class="label_row">
          <label>Услуга</label>
          <span class="">
            {{ work.sheldServiceName }}
          </span>
        </div>

        <div class="label_row">
          <label>Дата работ:</label>
          <span class="brc-deal-list__item_strong">
            {{ workDate() }}
          </span>
        </div>
        <br />

        <div class="label_row">
          <label>Договор №:</label>
          <span>{{ contractNmbWithDate }}</span>
        </div>

        <div class="label_row">
          <label>Адрес:</label>
          <span>{{ work.contractAddress }}</span>
        </div>
      </div>
    </div>
  </BaseModal>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Work from '@/models/deal/Work'

@Component
export default class AddDezWorkRatingForm extends Vue {

  @Prop()
  work: Work

  @Prop()
  isWorkPlaned: boolean

  editRating: number

  constructor () {
    super()
    this.editRating = this.work.sheldServiceBall
  }


  get contractNmbWithDate () {
    return (
      this.work.contractForm +
      ' от ' +
      new Date(this.work.contractDateStart).toLocaleDateString('ru-RU')
    )
  }

  workDate () {
    return new Date(this.work.sheldServiceDate).toLocaleDateString('ru-RU')
  }

  async onOkClick () {
    this.work.sheldServiceBall = this.editRating
    this.$emit('close')
  }

  onCancelClick () {
    this.$emit('close')
  }

}
</script>
