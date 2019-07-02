<template>
  <div class="brc-nonauth-block">
    <div class="brc-nonauth-message-withform" v-html="message"></div>
    <LoginForm mode="login"></LoginForm>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import LoginForm from '@/components/user/LoginForm.vue'

@Component({
  components: {
    LoginForm
  }
})
export default class NonAuthComponent extends Vue {
  @Prop(String)
  private message
}
</script>
