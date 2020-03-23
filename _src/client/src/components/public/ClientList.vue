<template>
  <div class="brc-clients-list">
    <ClientListItem
      v-for="clientItem in clientList"
      :key="clientItem.clActivityId"
      :clientItem="clientItem"
      @more-clients-clicked="($event)=> {clickedMoreClientItem = $event; updateClickedAllClients();}"
    ></ClientListItem>

    <div class="brc-clients-list-popup__wrapper" v-if="moreClientPopupActive">
      <div
        class="brc-clients-list-popup"
        v-show="moreClientPopupActive"
        v-click-outside="()=>{clickedMoreClientItem = false; moreClientPopupActive = false; clickedMoreClientList;clickedMoreClientItem=[];}"
      >
        <div
          class="brc-clients-list-popup__header"
          @click="()=> {clickedMoreClientItem = false; moreClientPopupActive = false;clickedMoreClientItem=[];}"
        >&times;</div>
        <h4>{{clickedMoreClientItem.clActivityName}}</h4>
        <ul class="brc-clients-list-popup__list">
          <li
            v-for="iterBrand in clickedMoreClientList.brandsList"
            :key="iterBrand.id"
          >{{iterBrand.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ClientListItem from '@/components/public/ClientListItem.vue'
import { getServiceContainer } from '@/api/ServiceContainer'
import { NuxtContext } from 'vue/types/options'

@Component({
  components: {
    ClientListItem
  }
})
export default class ClientList extends Vue {
  @Prop(Array)
  private clientList

  private clickedMoreClientItem: any = {}
  private clickedMoreClientList = {}
  private moreClientPopupActive = false

  private async updateClickedAllClients () {
    const res = await getServiceContainer().publicEkosetService.getClientsInfoByActivity(this.clickedMoreClientItem.clActivityId)
    if (!!res && res.length && res.length > 0) {
      this.clickedMoreClientList = res[0]
      this.moreClientPopupActive = true
    } else {
      this.moreClientPopupActive = false
    }
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-clients-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: -30px;
  grid-gap: 1rem;
  padding-top: 30px;
  border-top: 1px solid lightgrey;

  @media (max-width: 768px) {
    margin-top: -20px;
    padding-top: 20px;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 10px;
  }
}

.brc-clients-list-popup__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(64, 64, 64, 0.7);
  width: 100vw;
  height: 100vh;
  z-index: 10000;
}

.brc-clients-list-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 60vh;
  width: 25vw;
  z-index: 2000;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  padding: 25px 35px 20px 35px;
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 20px 20px 10px 20px;
    height: inherit;
    max-height: calc(100vh - 100px);
    width: 90vw;
  }

  h4 {
    text-align: center;
    padding-bottom: 15px;
    color: $text-color;
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    border-bottom: 1px solid $red;
  }

  .brc-clients-list-popup__header {
    position: absolute;
    font-size: 32px !important;
    cursor: pointer;
    color: $red;
    right: 10px;
    top: 10px;
    line-height: 20px;
    margin-top: 0 !important;
  }

  .brc-clients-list-popup__list {
    height: calc(100% - 70px);
    overflow-y: auto;
    margin-top: 10px;
    padding-top: 10px !important;

    li {
      padding-left: 1em !important;
      margin-top: 0 !important;
      word-wrap: break-word;
      overflow-wrap: break-word;
      word-break: break-word;

      @media (max-width: 768px) {
        //  word-break: break-all;
      }
      @media (max-width: 500px) {
        //  font-size: 14px;
      }
    }
  }
}
</style>