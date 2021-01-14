<template>
  <BaseModal
    :title="
      work.sheldServicePlanInd === 1 ? 'Изменить дату работ' : 'Заказать услугу'
    "
    @dialogOkClick="onOkClick()"
    @dialogCancelClick="onCancelClick()"
  >
    <div class="deal_continin_form_text">
      <div v-if="!!work && work.sheldServicePlanInd === 1">
        Мы постараемся Вам помочь, но не можем гарантировать, что это возможно.
        <br /><br />
        Когда Вы хотите провести эти работы ?
      </div>

      <div v-if="!!work && work.sheldServicePlanInd === 0">
        Вы хотите еще раз заказать услугу:
        {{ work.sheldServiceName }} ?
      </div>

      <div v-if="!!work && work.sheldServicePlanInd === 1">
        <BaseInput
          v-model="work.sheldServiceNewDate"
          placeholder="Планируемая дата проведения работ"
          type="date"
          :min="currentDate"
          classes="brc-login-form input"
        >
        </BaseInput>
      </div>
      <br /><br />
      <div class="deal_continin_form_contr">
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
import UserService from '@/services/UserService'

@Component
export default class WorkContinionForm extends Vue {

  @Prop()
  work: Work

  @Prop()
  isWorkPlaned: boolean

  public get contractNmbWithDate () {
    return (
      this.work.contractForm +
      ' от ' +
      new Date(this.work.contractDateStart).toLocaleDateString('ru-RU')
    )
  }

  private get currentDate () {
    return new Date().toISOString().split("T")[0];
  }


  public async onOkClick () {
    await this.$serviceRegistry.getService(UserService).continionWork(this.work)
    this.$emit('close')
  }

  public onCancelClick () {
    this.$emit('close')
  }

}
</script>
