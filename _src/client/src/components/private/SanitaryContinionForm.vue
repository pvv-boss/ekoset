<template>
  <BaseModal
    title="Продлить документ"
    @dialogOkClick="onOkClick()"
    @dialogCancelClick="onCancelClick()"
  >
    <div class="deal_continin_form_text">
      <div>Вы хотите отправить заявку на продление документа ?</div>

      <div class="deal_continin_form_contr">
        <div class="label_row">
          <label>Документ №:</label>
          <span class="">
            {{ docNmbWithDate(sanDoc) }}
          </span>
        </div>

        <div class="label_row">
          <label>Срок действия:</label>
          <span class="brc-deal-list__item_strong">
            {{ documentEndDate() }}
          </span>
        </div>
        <br />
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
          <span>{{ sanDoc.contractAddress }}</span>
        </div>
      </div>
    </div>
  </BaseModal>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import SanDoc from '@/models/deal/SanDoc'
import UserService from '@/services/UserService'

@Component
export default class SanitaryContinionForm extends Vue {

  @Prop()
  sanDoc: SanDoc

  public get contractNmbWithDate () {
    return (
      this.sanDoc.contractForm +
      ' от ' +
      new Date(this.sanDoc.contractDateStart).toLocaleDateString('ru-RU')
    )
  }


  public get contractEndDate () {
    return new Date(this.sanDoc.contractDateEnd).toLocaleDateString('ru-RU')
  }

  public docNmbWithDate (sanDoc: SanDoc) {
    return (
      sanDoc.documentNmb +
      ' от ' +
      new Date(sanDoc.documentDateStart).toLocaleDateString('ru-RU')
    )
  }

  public documentEndDate () {
    return new Date(this.sanDoc.documentDateEnd).toLocaleDateString('ru-RU')
  }


  public async onOkClick () {
    await this.$serviceRegistry.getService(UserService).continionSanDoc(this.sanDoc)
    this.$emit('close')
  }

  public onCancelClick () {
    this.$emit('close')
  }

}
</script>
