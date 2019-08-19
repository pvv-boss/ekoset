<template>
  <div class="vue-back-to-top" :class="{active: isVisible === true}" @click="scrollToWindowTop">
    <slot>
      <span class="vue-back-to-top_text__default">{{text}}</span>
    </slot>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseBackToTop extends Vue {
  @Prop({ default: '^' })
  public text: string

  @Prop({ default: 40 })
  public offsetTopStart: number

  public isVisible = false

  public mounted () {
    window.addEventListener('scroll', this.catchScroll)
  }

  public destroyed () {
    window.removeEventListener('scroll', this.catchScroll);
  }

  public catchScroll () {
    this.isVisible = window.pageYOffset > this.offsetTopStart
  }

  private scrollToWindowTop () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
}

</script>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/typography.scss";

.vue-back-to-top {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  z-index: 1000;
  bottom: 20px;
  right: 20px;

  transition: all 0.4s ease-in-out;

  opacity: 0;
  transform: translateX(120%);
  background-color: $red;
  border-radius: 50%;
  height: 40px;
  text-align: center;
  width: 40px;

  //  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.09), 0 2px 14px rgba(0, 0, 0, 0.19);

  &.active {
    opacity: 1;
    transform: none;
  }

  .vue-back-to-top_text__default {
    font-size: 20px;
    font-weight: $font-medium;
    color: white;
    text-align: center;
    margin: auto;
  }
}
</style>