<template>
  <div class="profile-notif red-inputs">
    <h3>Получать уведомления</h3>
    <div class="profile-notif__deesc">
      Для Вашего удобства мы напомним Вам о предстоящих работах или
      заканчивающихся документах
    </div>
    <div class="profile-notif__list">
      <div>
        <input id="profile-notif__list_work" type="checkbox" />
        <label for="profile-notif__list_work"
          >Предстоящие работы по графику</label
        >
      </div>

      <div>
        <input id="profile-notif__list_work_done" type="checkbox" />
        <label for="profile-notif__list_work_done">Выполненные работы</label>
      </div>

      <div>
        <input id="profile-notif__list_san" type="checkbox" />
        <label for="profile-notif__list_san">Оформленные сандокументы</label>
      </div>

      <div>
        <input id="profile-notif__list_san_d" type="checkbox" />
        <label for="profile-notif__list_san_d"
          >Заканчивающиеся сандокументы</label
        >
      </div>

      <div>
        <input id="profile-notif__list_lab" type="checkbox" />
        <label for="profile-notif__list_lab">Протоколы лаб.исследований</label>
      </div>
    </div>

    <h3 style="margin-top: 16px !important">Методы получения уведомлений:</h3>

    <div class="profile-notif__list">
      <div>
        <input id="profile-notif__list_work_done" type="checkbox" />
        <label for="profile-notif__list_work_done">E-mail</label>
      </div>

      <div>
        <input id="profile-notif__list_san" type="checkbox" />
        <label for="profile-notif__list_san">SMS</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class NotificationSettings extends Vue {

}
</script>

<style lang="scss">
.profile-notif {
  display: flex;
  flex-direction: column;
}

.profile-notif__deesc {
  font-size: 0.9rem;
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
