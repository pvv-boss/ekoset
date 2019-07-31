<template>
  <section>
    <h1 itemprop="headline name">Личный кабинет</h1>
    <section class="brc-page-content">
      <ContractList v-if="privacyType === 'contract'" :userId="userId" :mode="mode"></ContractList>
      <WorkList v-if="privacyType === 'work'" :userId="userId" :mode="mode"></WorkList>
      <ResearchList v-if="privacyType === 'research'" :userId="userId" :mode="mode"></ResearchList>
      <DocumentList v-if="privacyType === 'document'" :userId="userId" :mode="mode"></DocumentList>
    </section>
    <aside>
      <MessageForm></MessageForm>
    </aside>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ContractList from '@/components/private/ContractList.vue'
import WorkList from '@/components/private/WorkList.vue'
import ResearchList from '@/components/private/ResearchList.vue'
import DocumentList from '@/components/private/DocumentList.vue'
import MessageForm from '@/components/public/MessageForm.vue'

import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({
  components: {
    ContractList,
    WorkList,
    ResearchList,
    DocumentList,
    MessageForm
  }
})
export default class Privacy extends Vue {
  private privacyType = 'contract'
  private userId = 0
  private mode = 'tile'

  private mounted () {
    this.userId = Number(this.$route.params.userId)
    this.privacyType = this.$route.params.privacyType
    this.mode = this.$route.params.mode
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

