<template>
  <div v-if="!!ekosetClient" class="profile-notif red-inputs">
    <h3>Получать уведомления</h3>
    <div class="profile-notif__deesc">
      Для Вашего удобства мы напомним Вам о предстоящих работах или заканчивающихся документах
    </div>
    <div class="profile-notif__list">
      <div>
        <input id="profile-notif__list_work" v-model="ekosetClient.notifFutureWork" type="checkbox" />
        <label for="profile-notif__list_work">Предстоящие работы по графику</label>
      </div>

      <div>
        <input id="profile-notif__list_work_done" v-model="ekosetClient.notifEndWork" type="checkbox" />
        <label for="profile-notif__list_work_done">Выполненные работы</label>
      </div>

      <div>
        <input id="profile-notif__list_san" v-model="ekosetClient.notifDesignSanitaryDoc" type="checkbox" />
        <label for="profile-notif__list_san">Оформленные сандокументы</label>
      </div>

      <div>
        <input id="profile-notif__list_san_d" v-model="ekosetClient.notifFinishedSanitaryDoc" type="checkbox" />
        <label for="profile-notif__list_san_d">Заканчивающиеся сандокументы</label>
      </div>

      <div>
        <input id="profile-notif__list_lab" v-model="ekosetClient.notifLabProtocol" type="checkbox" />
        <label for="profile-notif__list_lab">Протоколы лаб.исследований</label>
      </div>
    </div>

    <h4 style="margin-top: 16px !important">Методы получения уведомлений:</h4>

    <div class="profile-notif__list">
      <div>
        <input id="profile-notif__list_email" v-model="ekosetClient.notifEmailInd" type="checkbox" />
        <label for="profile-notif__list_email">E-mail</label>
      </div>

      <div>
        <input id="profile-notif__sms" v-model="ekosetClient.notifSmsInd" type="checkbox" />
        <label for="profile-notif__sms">SMS</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EkosetClient from "@/models/EkosetClient";
import AuthStore from "@/store/AuthStore";
import { Component, getModule, Vue } from "nuxt-property-decorator";

@Component
export default class NotificationSettings extends Vue {
  private get ekosetClient(): EkosetClient | null {
    return getModule(AuthStore, this.$store).ekosetClient;
  }
}
</script>

<style lang="scss">
.profile-notif {
  display: flex;
  flex-direction: column;
}

.profile-notif__deesc {
  font-size: 0.85rem;
  margin-top: 10px;
  margin-bottom: 10px;
}

.profile-notif__list {
  display: flex;
  flex-direction: column;
  div {
    margin-top: 10px;
  }
}
</style>
