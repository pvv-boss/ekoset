<template>
  <BaseModal v-if="!$fetchState.pending" title="Права доступа" @dialogOkClick="onOkClick()" @dialogCancelClick="onCancelClick()">
    <div class="manager_perm_wrapper">
      <div v-for="(iter, index) of getEnumValues()" :key="iter">
        <div v-if="isSectionCaption(iter)" style="font-size: 17px; font-weight: 500; margin-top: 16px">
          {{ getSectionCaption(iter) }}
          <div class="login-hr"></div>
        </div>
        <div v-else class="red-inputs" style="margin-top: 12px; margin-left: 24px">
          <input :id="'permiss' + index" v-model="adminMenuSections" :value="iter" type="checkbox" />
          <label :for="'permiss' + index">{{ iter }}</label>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { AdminMenuSection, AdminMenuSectionPermissionsManager } from "@/models/AdminMenuSectionPermissionsManager";
import UserService from "@/services/UserService";

@Component
export default class ManagerPermissions extends Vue {
  @Prop()
  private returnDataResolver;

  @Prop()
  appUserId: number;

  private adminMenuSections: any[] = [];

  private async fetch() {
    await this.updateAdminMenuSections();
  }

  private async updateAdminMenuSections() {
    const sessUser = await this.$serviceRegistry.getService(UserService).getSessionUserbyAppUserId(this.appUserId);
    sessUser.menuPermissions = AdminMenuSectionPermissionsManager.fromString(sessUser.appUserPermissions);
    sessUser.menuPermissions.forEach((iter) => {
      this.adminMenuSections.push(iter);
    });
  }

  private getEnumValues() {
    return Object.values(AdminMenuSection);
  }

  private isSectionCaption(val: string) {
    return val.indexOf("__section") > -1;
  }

  private getSectionCaption(val: string) {
    return val.split("__")[0];
  }

  public async onOkClick() {
    if (!!this.returnDataResolver) {
      this.returnDataResolver(this.adminMenuSections);
    }
    this.$emit("close");
  }

  public onCancelClick() {
    this.$emit("close");
  }
}
</script>

<style lang="scss">
.login-hr {
  // padding: 10px;
  height: 10px;
  border-bottom: 1px solid lightgray;
  display: block;
  margin-bottom: 10px;
}

.manager_perm_wrapper {
  label {
    font-size: 14px;
  }
}
</style>
