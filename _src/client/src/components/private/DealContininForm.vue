<template>
  <BaseModal
    title="Продлить договор"
    @dialogOkClick="onOkClick()"
    @dialogCancelClick="onCancelClick()"
  >
    <div class="deal_continin_form_text">
      <div>Вы хотите отправить заявку на продление договора?</div>

      <div class="deal_continin_form_contr">
        <div class="label_row">
          <label>Договор №:</label>
          <span>{{ contractNmbWithDate }}</span>
        </div>

        <div class="label_row">
          <label>Срок действия:</label>
          <span class="brc-deal-list__item_strong">
            {{ contractEndDate }}
          </span>
        </div>

        <div class="label_row">
          <label>Адрес:</label>
          <span>{{ contract.contractAddress }}</span>
        </div>
        <div class="label_row">
          <label>Услуги:</label>
          <span>{{ contract.contractServiceList }}</span>
        </div>
      </div>
    </div>
  </BaseModal>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Contract from '@/models/deal/Contract'
import UserService from '@/services/UserService'

@Component
export default class DealContininForm extends Vue {

  @Prop()
  contract: Contract

  public get contractNmbWithDate () {
    return (
      this.contract.contractForm +
      ' от ' +
      new Date(this.contract.contractDateStart).toLocaleDateString('ru-RU')
    )
  }

  public get contractEndDate () {
    return new Date(this.contract.contractDateEnd).toLocaleDateString('ru-RU')
  }

  public async onOkClick () {
    await this.$serviceRegistry.getService(UserService).continionContract(this.contract)
    this.$emit('close')
  }

  public onCancelClick () {
    this.$emit('close')
  }

}
</script>

<style lang="scss">
.deal_continin_form_text {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
}

.deal_continin_form_contr {
  margin-top: 24px;
}
</style>