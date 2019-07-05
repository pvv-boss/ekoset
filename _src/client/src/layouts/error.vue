<template>
  <main class="brc-body">
    <div class="brc-error-container">
      <BaseNotFound v-if="error.statusCode === 404"></BaseNotFound>
      <BaseError v-else :error-message="error.message" :status="error.statusCode"></BaseError>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import BaseNotFound from '@/components/base/BaseNotFound.vue'
import BaseError from '@/components/base/BaseError.vue'

@Component({
  components: {
    BaseError,
    BaseNotFound
  }
})
export default class Error extends Vue {
  @Prop()
  private error
}
</script>
