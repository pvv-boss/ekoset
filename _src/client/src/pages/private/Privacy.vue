<template>
  <section>
    <h1 itemprop="headline name">Личный кабинет</h1>

    <section class="brc-page-content">
      <DisinfectionWorkList
        v-if="privacyType === 'disinfectionwork'"
        :userId="sessionUser.appUserId"
        :mode="mode"
      ></DisinfectionWorkList>
      <ResearchList
        v-else-if="privacyType === 'research'"
        :userId="sessionUser.appUserId"
        :mode="mode"
      ></ResearchList>
      <DocumentList
        v-else-if="privacyType === 'document'"
        :userId="sessionUser.appUserId"
        :mode="mode"
      ></DocumentList>
      <ContractList v-else :userId="sessionUser.appUserId" :mode="mode"></ContractList>
    </section>
    <aside>
      <MessageForm></MessageForm>
    </aside>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ContractList from '@/components/private/ContractList.vue'
import DisinfectionWorkList from '@/components/private/DisinfectionWorkList.vue'
import ResearchList from '@/components/private/ResearchList.vue'
import DocumentList from '@/components/private/DocumentList.vue'
import MessageForm from '@/components/public/MessageForm.vue'
import AuthStore from '@/store/AuthStore'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'
import { getModule } from 'vuex-module-decorators'

@Component({
  components: {
    ContractList,
    DisinfectionWorkList,
    ResearchList,
    DocumentList,
    MessageForm
  }
})
export default class Privacy extends Vue {
  private privacyType = ''
  private mode = 'tile'

  private userStore = getModule(AuthStore, this.$store)

  private get sessionUser () {
    return this.userStore.sessionUser
  }

  private mounted () {
    this.privacyType = this.$route.params.privacyType
    //this.mode = this.$route.params.mode
  }

  private head () {
    return { title: 'Личный кабинет' }
  }
}
</script>

<style lang="scss">
.brc-page-content {
  float: left;
  width: 70%;
}
aside {
  float: right;
  width: 30%;
}
</style>

