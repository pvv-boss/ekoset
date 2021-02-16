<template>
  <div class="brc-admin_page_wrapper">
    <div class="brc_admin-brand-list-container">
      <div class="brc-card__header__toolbar">
        <h2>Бренды</h2>
        <span class="brc_admin-brand-list-container__help">
          <i>(Для измнения порядка следования перетащите блок вверх или вниз)</i>
        </span>

        <div v-if="createNewBrandMode" class="brc-admin-card-create-row">
          <b-field label="Наименование:" horizontal>
            <b-input
              v-model="newBrand.clBrandName"
              placeholder="Наименование"
              type="text"
              required
              validation-message="Наименование не может быть пустым"
            ></b-input>
          </b-field>
          <b-button type="is-primary" @click="saveNewBrand">Сохранить</b-button>
          <b-button @click="cancelSaveNewBrand">Отмена</b-button>
        </div>

        <b-button v-show="!createNewBrandMode" type="is-primary" outlined @click="createNewBrandMode = true">Создать</b-button>
      </div>

      <div class="brc_admin-brand-list">
        <div class="brc_admin-brand-list-item">
          <span>Статус</span>
          <span>Отображать ГлСтр</span>
          <span>Наименование</span>
          <span>Вид деятельности</span>
          <span>Фото (логотип)</span>
          <span>Письмо</span>
          <span>Удалить</span>
        </div>

        <draggable v-model="brandList" @change="handleChange">
          <div v-for="iterBrand in brandList" :key="iterBrand.clBrandId" class="brc_admin-brand-list-item">
            <b-switch
              v-model="iterBrand.clBrandStatus"
              true-value="1"
              false-value="0"
              type="is-success"
              size="is-small"
              style="justify-content: flex-end"
              @input="saveBrand(iterBrand)"
            ></b-switch>

            <b-switch
              v-model="iterBrand.clBrandMainPageVisible"
              true-value="1"
              false-value="0"
              type="is-success"
              size="is-small"
              @input="saveBrand(iterBrand)"
            ></b-switch>

            <nuxt-link
              :to="{
                name: 'admin-brand-card',
                params: { brand: iterBrand.clBrandId },
              }"
              >{{ iterBrand.clBrandName }}</nuxt-link
            >

            <LazyAdminClActivitySelector
              v-model="iterBrand.clActivityId"
              :cl-activity-list="clActivityList"
              @input="saveBrand(iterBrand)"
            ></LazyAdminClActivitySelector>
            <div>
              <b-upload @input="saveBrandImage(...arguments, iterBrand)">
                <a class="button is-link">
                  <b-icon icon="upload"></b-icon>
                </a>
              </b-upload>
              <b-button
                v-if="!!iterBrand.clBrandImgSmall && iterBrand.clBrandImgSmall != '/img/empty-image.png'"
                icon-right="file-find"
                type="is-success"
                size="is-medium"
                outlined
                style="margin-left: 20px"
                @click="showBrandImage(iterBrand)"
              ></b-button>
            </div>

            <div>
              <b-upload @input="saveLetterImage(...arguments, iterBrand)">
                <a class="button is-link">
                  <b-icon icon="upload"></b-icon>
                </a>
              </b-upload>
              <b-button
                v-if="!!iterBrand.clBrandImgBig && iterBrand.clBrandImgBig != '/img/empty-image.png'"
                icon-right="file-find"
                type="is-success"
                size="is-medium"
                outlined
                style="margin-left: 15px"
                @click="showLetterImage(iterBrand)"
              ></b-button>
              <b-button
                v-if="!!iterBrand.clBrandImgBig && iterBrand.clBrandImgBig != '/img/empty-image.png'"
                type="is-danger"
                size="is-medium"
                outlined
                style="margin-left: 15px"
                icon-right="delete"
                @click="deleteLetter(iterBrand)"
              ></b-button>
            </div>

            <b-button type="is-danger" icon-right="delete" @click="deleteBrand(iterBrand)"></b-button>
          </div>
        </draggable>
      </div>
    </div>

    <b-modal :active.sync="isShowBrandImageActive" :can-cancel="true" :width="400">
      <RecommendationListItem
        :brand="previewImageBrand"
        style="width: 190px; margin: 0px; background-color: white"
      ></RecommendationListItem>
    </b-modal>

    <b-modal :active.sync="isShowLetterImageActive" :can-cancel="true" :width="400">
      <RecommLetterListItem :brand="previewLetterBrand" style="background-color: white"></RecommLetterListItem>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { BrcDialogType } from "@/plugins/brc-dialog/BrcDialogType";
import ClBrand from "@/models/ekoset/ClBrand";
import { getModule } from "vuex-module-decorators";
import AdminStore from "@/store/AdminStore";
import ClActivity from "@/models/ekoset/ClActivity";
import PublicEkosetService from "@/services/PublicEkosetService";
import { ServiceRegistry } from "@/ServiceRegistry";
import { Context } from "@nuxt/types";

@Component({
  components: {
    draggable: () => import(/* webpackChunkName: "vuedraggable" */ "vuedraggable"),
  },
})
export default class AdminBrandList extends Vue {
  private brandList: ClBrand[] = [];
  private createNewBrandMode = false;
  private newBrand: ClBrand = new ClBrand();

  private isShowBrandImageActive = false;
  private previewImageBrand: ClBrand = new ClBrand();

  private isShowLetterImageActive = false;
  private previewLetterBrand: ClBrand = new ClBrand();

  private clActivityList: ClActivity[] = [];

  private layout() {
    return "admin";
  }

  private async updateBrandList() {
    this.brandList = await ServiceRegistry.instance.getService(PublicEkosetService).getAdminAllBands();
  }

  private async asyncData(context: Context) {
    const breadCrumbList: any[] = [];
    breadCrumbList.push({ name: "Администрирование", link: "admin" });
    breadCrumbList.push({ name: "Бренды", link: "admin-brands" });
    getModule(AdminStore, context.store).changeBreadCrumbList(breadCrumbList);

    const data = await ServiceRegistry.instance.getService(PublicEkosetService).getAdminAllBands();
    const clActivityList = await ServiceRegistry.instance.getService(PublicEkosetService).getClActivityList();
    return {
      brandList: data,
      clActivityList,
    };
  }

  private async saveNewBrand() {
    await ServiceRegistry.instance.getService(PublicEkosetService).saveBrand(this.newBrand);
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`);
    this.newBrand = new ClBrand();
    this.createNewBrandMode = false;
    this.updateBrandList();
  }

  private async saveBrand(brand: ClBrand) {
    await ServiceRegistry.instance.getService(PublicEkosetService).saveBrand(brand);
    this.$BrcNotification(BrcDialogType.Success, `Выполнено`);
  }

  private async deleteBrand(brand: ClBrand) {
    const okCallback = async () => {
      await ServiceRegistry.instance.getService(PublicEkosetService).deleteBrand(brand.clBrandId);
      this.updateBrandList();
    };
    this.$BrcAlert(BrcDialogType.Warning, "Удалить бренд?", "Подтвердите удаление", okCallback);
  }

  private cancelSaveNewBrand() {
    this.newBrand = new ClBrand();
    this.createNewBrandMode = false;
  }

  private async handleChange() {
    for (let i = 0; i < this.brandList.length; i++) {
      this.brandList[i].clBrandPriority = this.brandList.length - i;
      await ServiceRegistry.instance.getService(PublicEkosetService).saveBrand(this.brandList[i]);
    }
  }

  private async saveBrandImage(imageFile: string, brandItem: ClBrand) {
    const formData: FormData = new FormData();
    formData.append("file", imageFile);
    brandItem.smallImageFormData = formData;

    await ServiceRegistry.instance.getService(PublicEkosetService).saveBrand(brandItem);
  }

  private async showBrandImage(brandItem: ClBrand) {
    this.previewImageBrand = brandItem;
    this.isShowBrandImageActive = !this.isShowBrandImageActive;
  }

  private async showLetterImage(brandItem: ClBrand) {
    this.previewLetterBrand = brandItem;
    this.isShowLetterImageActive = !this.isShowLetterImageActive;
  }

  private async saveLetterImage(imageFile: string, brandItem: ClBrand) {
    const formData: FormData = new FormData();
    formData.append("file", imageFile);
    brandItem.recommendImageFormData = formData;
    await ServiceRegistry.instance.getService(PublicEkosetService).saveBrand(brandItem);
  }

  private async deleteLetter(brandItem: ClBrand) {
    const okCallback = async () => {
      await ServiceRegistry.instance.getService(PublicEkosetService).deleteRecommendationLetter(brandItem.clBrandId);
      this.updateBrandList();
    };
    this.$BrcAlert(BrcDialogType.Warning, "Удалить рекомендательное письмо ?", "Подтвердите удаление", okCallback);
  }
}
</script>

<style lang="scss">
.brc_admin-brand-list-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: $box-shadow;
  background-color: white;

  .brc_admin-brand-list-item {
    margin-top: 10px;

    display: grid;
    //  grid-template-columns: 1fr 280px 80px;
    grid-template-columns: 50px 150px 1fr 1fr 200px 200px 60px;
    grid-column-gap: 20px;
    justify-content: flex-end;

    padding: 5px;
    padding-left: 10px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    line-height: 2em;

    * {
      margin-bottom: 0px !important;
      font-weight: $font-regular !important;
      font-size: 15px !important;
    }

    cursor: move;
  }

  .brc_admin-brand-list-container__help {
    font-size: 0.78rem;
    line-height: 18px;
    letter-spacing: 0.48px;
    margin-bottom: 5px;
  }
}
</style>
