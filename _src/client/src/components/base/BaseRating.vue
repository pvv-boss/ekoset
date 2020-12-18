<template>
  <div class="base-rating-container" v-on="$listeners">
    <span
      v-for="index1 in goodRatingCount"
      :key="`good-rating-${id}-${index1}`"
      :data-key="id"
      class="good-rating"
      :style="startFontSizeStyle"
      @click="onStarClick(true, index1)"
    ></span>
    <span
      v-for="index2 in badRatingCount"
      :key="`bad-rating-${id}-${index2}`"
      class="bad-rating"
      :style="startFontSizeStyle"
      @click="onStarClick(false, index2)"
    ></span>
    <div v-if="showReviews" class="base-rating-review">{{ reviews }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { v4 as uuidv4 } from "uuid";

@Component
export default class BaseRating extends Vue {
  @Prop({ default: () => uuidv4() })
  id: string;

  @Prop({ default: 5 })
  value: number;

  @Prop({ default: 0 })
  reviews: number;

  @Prop({ default: true })
  showReviews: boolean

  @Prop({ default: 26 })
  starFontSize: number

  get goodRatingCount () {
    return this.value > 5 ? 5 : Math.round(this.value);
  }

  get badRatingCount () {
    return 5 - this.goodRatingCount;
  }

  get startFontSizeStyle () {
    return {
      "font-size": `${this.starFontSize}px`
    }
  }

  onStarClick (good: boolean, index: number) {
    const newRating = good ? index : (5 - this.badRatingCount) + index
    this.$emit("input", newRating)
  }
}
</script>

<style lang="scss">
.base-rating-container {
  display: flex;
  align-items: center;

  .good-rating::before,
  .bad-rating::before {
    display: block;
    content: "\2605";
    // font-size: 26px;
  }

  .good-rating::before {
    color: #ffd975;
  }

  .bad-rating {
    color: #bfc8d1;
  }

  span + span {
    margin-left: 4px;
  }
}
</style>
