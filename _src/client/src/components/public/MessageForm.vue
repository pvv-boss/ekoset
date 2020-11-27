<template>
  <section>
    <LazyMessageFormMobile
      v-if="!showCloseBtn"
      :title="title"
    ></LazyMessageFormMobile>

    <div class="brc-feedback_busket">
      <div
        v-if="showCloseBtn"
        class="brc-message-arise__close"
        @click="$emit('closeForm')"
      >
        &times;
      </div>
      <h2 style="text-align: center !important">{{ title }}</h2>
      <form
        class="brc-message-form"
        :class="{ 'brc-message-form__error': !isValidForm }"
      >
        <div class="brc-message-form__data">
          <div class="brc-message-form__row">
            <div class="brc-message-form__block">
              <label for="userName">Имя Фамилия</label>
              <input
                v-model.lazy="formMessageData.userRequestUser"
                type="text"
              />
              <span
                class="brc-error-message"
                :class="{
                  'brc-error-message_visible':
                    isSubmit &&
                    formMessageData.userRequestUser.trim().length === 0,
                }"
                >Введите имя</span
              >
            </div>
            <div v-if="isBrowser" class="brc-message-form__block">
              <label for="phone">Телефон</label>
              <span class="brc-input-addon">
                <span class="phone_add_seven">+7</span>
                <input
                  v-model.lazy="formMessageData.userRequestPhone"
                  v-phone
                  type="tel"
                  name="phone"
                  placeholder="(555) 555-5555"
                  autocomplete="tel"
                  maxlength="14"
                  class="form-control form-control_phone"
                  pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}"
                />
                <span
                  class="brc-error-message"
                  :class="{
                    'brc-error-message_visible':
                      (isSubmit ||
                        formMessageData.userRequestPhone.length > 0) &&
                      $v.formMessageData.userRequestPhone.$invalid,
                  }"
                  >Введите телефон</span
                >
              </span>
            </div>
            <div v-if="isBrowser" class="brc-message-form__block">
              <label for="email">Email</label>
              <input
                v-model.lazy="formMessageData.userRequestMail"
                type="email"
              />
              <span
                class="brc-error-message"
                :class="{
                  'brc-error-message_visible':
                    (isSubmit || formMessageData.userRequestMail.length > 0) &&
                    $v.formMessageData.userRequestMail.$invalid,
                }"
                >Введите настоящий email</span
              >
            </div>

            <div
              class="brc-message-form__block brc-message-form__block_message"
            >
              <label for="message">Комментарий</label>
              <textarea
                v-model.lazy="formMessageData.userRequestText"
              ></textarea>
              <span
                class="brc-error-message"
                :class="{
                  'brc-error-message_visible':
                    isSubmit &&
                    formMessageData.userRequestText.trim().length === 0,
                }"
                >Напишите комментарий</span
              >
              <div class="brc-message-form__block">
                <label class="attach-file">
                  <input
                    id="file"
                    ref="file"
                    type="file"
                    multiple
                    name="file"
                    @change="handleFileUpload()"
                  />
                  <div class="attach-file-file-name">Прикрепить файл(ы)</div>
                  <div
                    v-show="!!files && files.length > 0"
                    class="attached-file-name"
                  >
                    {{ fileNames }}
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div class="brc-message-form__row">
            <label>Корзина</label>
            <BuscetContaner
              :class="{ 'brc-message-form__error': !isValidForm }"
            ></BuscetContaner>
          </div>
        </div>
      </form>
      <div class="brc-message-form__button">
        <button type="button" @click="sendMessage">Отправить</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { required } from 'vuelidate/lib/validators'
import { emailTest, phoneTest } from '@/utils/Validators'
import UserRequest from '@/models/ekoset/UserRequest';
import { BrcDialogType } from '@/plugins/brc-dialog/BrcDialogType'
import { getModule } from 'vuex-module-decorators';
import AppStore from '@/store/AppStore';
import BuscetStore from '@/store/BuscetStore';
import BuscetContaner from '@/components/public/BuscetContaner.vue'
import MessageFormMobile from '@/components/public/MessageFormMobile.vue'
import PublicEkosetService from '@/services/PublicEkosetService';
import { ServiceRegistry } from '@/ServiceRegistry';

@Component({
  components: {
    BuscetContaner,
    MessageFormMobile
  },
  validations: {
    formMessageData: {
      userRequestMail: {
        required,
        validFormat: (val) => {
          return emailTest.test(val);
        }
      },
      userRequestPhone: {
        required,
        validFormat: (val) => phoneTest.test(val)
      },
      userRequestUser: {
        required
      },
      userRequestText: {
        required
      }
    }
  }
})
export default class MessageForm extends Vue {
  public $refs!: {
    file: HTMLFormElement
  }

  private isValidForm = true
  private files: any[] = []
  private fileNames = ''
  private formMessageData: UserRequest = new UserRequest()

  @Prop()
  private title

  @Prop()
  private mode

  @Prop({ default: false })
  private showCloseBtn

  private isBrowser = false
  private isSubmit = false

  private handleFileUpload () {
    this.files = this.$refs.file.files;
    this.updateFileNames()
  }

  private mounted () {
    this.isBrowser = true
  }

  private validateForm (): boolean {
    this.isSubmit = true
    return !this.$v.$invalid && this.formMessageData.userRequestText.trim().length > 0 && this.formMessageData.userRequestUser.trim().length > 0
  }

  private async sendMessage () {
    if (this.validateForm()) {

      this.isValidForm = true
      this.formMessageData.userRequestService = getModule(BuscetStore, this.$store).addedServiceListAsText
      this.formMessageData.userRequestSection = getModule(AppStore, this.$store).currentSiteSectionName
      this.formMessageData.userRequestType = this.title

      const formData: FormData = new FormData()
      formData.append('formMessageData', JSON.stringify(this.formMessageData))

      for (const iterItem of this.files) {
        formData.append('files', iterItem)
      }

      ServiceRegistry.instance.getService(PublicEkosetService).sendFormMessage(formData, this.mode)

      if (this.showCloseBtn) {
        this.$emit('closeForm')
      }

      this.isSubmit = false
      this.formMessageData = new UserRequest()
      this.files = []
    } else {
      this.isValidForm = false
      this.$BrcNotification(BrcDialogType.Error, this.title, `Заполните все поля правильно`)
    }
  }

  private updateFileNames () {
    const names: string[] = []
    for (const iterItem of this.files) {
      names.push(iterItem.name as string)
    }
    this.fileNames = names.join(', ')
  }
}
</script>

