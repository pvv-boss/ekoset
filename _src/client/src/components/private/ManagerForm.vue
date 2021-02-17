<template>
  <BaseModal :title="title" @dialogOkClick="onOkClick()" @dialogCancelClick="onCancelClick()">
    <div class="brc-login-form account-main-form">
      <div class="brc-login-form__block">
        <BaseInput v-model="innerManagerState.managerName" label="ФИО" placeholder="Фамилия Имя Отчество">
          <span v-if="!innerManagerState.managerName"> Укажите фамилию,имя, отчество </span>
        </BaseInput>
      </div>
      <div class="brc-login-form__block">
        <BaseInput v-model="innerManagerState.managerEmail" label="Почта (логин)">
          <span v-if="!innerManagerState.managerEmail"> Укажите Email </span>
        </BaseInput>
      </div>

      <div class="brc-login-form__block">
        <BaseInputMask
          id="reg-phone-input"
          v-model="innerManagerState.managerPhone"
          :mask="phoneMask"
          label="Телефон"
          placeholder="Телефон"
        >
        </BaseInputMask>
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import EkosetManager from "@/models/EkosetManager";
import { Component, Vue, Prop, Watch } from "nuxt-property-decorator";
import { phoneNumberMask } from "@/utils/InputMaskDefinitions";

@Component
export default class ManagerForm extends Vue {
  @Prop()
  private returnDataResolver;

  @Prop()
  private manager: EkosetManager;

  private innerManagerState: EkosetManager = new EkosetManager();

  @Watch("manager", { immediate: true })
  private onManagerChanged() {
    this.innerManagerState = { ...this.manager } as any;
  }

  private get phoneMask() {
    return phoneNumberMask;
  }

  private get title() {
    return this.manager?.managerName || "Новый пользователь";
  }

  public async onOkClick() {
    if (!!this.innerManagerState.managerName && this.innerManagerState.managerEmail) {
      if (!!this.returnDataResolver) {
        this.returnDataResolver(this.innerManagerState);
      }
      this.$emit("close", this.innerManagerState);
    }
  }

  public onCancelClick() {
    this.$emit("close");
  }
}
</script>
