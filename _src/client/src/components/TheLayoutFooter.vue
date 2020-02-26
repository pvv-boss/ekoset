<template>
  <footer>
    <div class="brc-page-footer">
      <div class="brc-page-footer__contacts" style="display: flex;flex-direction: column;">
        <div class="brc-footer-logo__wrapper" style="margin: auto;">
          <nuxt-link :to="{name: 'main'}" class="brc-footer-logo">
            <img src="/images/logo.png" alt="Экосеть" style="max-height: 40px;height: 40px;" />
          </nuxt-link>
        </div>
        <div class="brc-page-footer__phone">
          <a href="tel:4952233595">+7 (495) 223-35-95</a>
        </div>
        <div class="brc-page-footer__social">
          <a href="mailto:inbox@ekoset.ru">
            <img src="/images/mail.svg" alt="Экосеть Эл.почта" />
          </a>
          <a href="https://vk.com/ekoset" style="margin-left:15px;">
            <img src="/images/vk.svg" alt="Экосеть ВКонтакте" />
          </a>
        </div>
      </div>
      <div class="brc-page-footer__business-activities">
        <input id="toogleBusinessTypeMenuVisible" type="checkbox" />
        <label class="brc-footer-list-arrow" for="toogleBusinessTypeMenuVisible">
          <h4>Услуги для Бизнеса</h4>
        </label>
        <ul class="brc-footer-list-link">
          <li v-for="serviceItem in serviceListForBusiness" :key="serviceItem.businessServiceId">
            <nuxt-link
              :to="{ name: 'service-card', params: { service: serviceItem.businessServiceUrl, siteSection: getCurrentSiteSection}}"
            >{{serviceItem.businessServiceName}}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="brc-page-footer__private-activities">
        <input id="toogleClientTypeMenuVisible" type="checkbox" />
        <label class="brc-footer-list-arrow" for="toogleClientTypeMenuVisible">
          <h4 for="toogleClientTypeMenuVisible">Услуги для Частных лиц</h4>
        </label>
        <ul class="brc-footer-list-link">
          <li v-for="serviceItem in serviceListForPerson" :key="serviceItem.businessServiceId">
            <nuxt-link
              :to="{ name: 'service-card', params: { service: serviceItem.businessServiceUrl, siteSection: serviceItem.siteSectionUrl}}"
            >{{serviceItem.businessServiceName}}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="brc-page-footer__menu">
        <ul>
          <li>
            <nuxt-link :to="{name: 'about'}">О компании</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{name: 'clients'}">Наши клиенты</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{name: 'prices', params:{siteSection: getCurrentSiteSection}}">Цены</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{name: 'news', params:{siteSection: getCurrentSiteSection}}">Новости</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{name: 'contacts'}">Контакты</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="brc-page-footer__last">
      <span>&#xa9; Группа компаний "ЭКОСЕТЬ"</span>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import AppStore from '@/store/AppStore'
import { getModule } from 'vuex-module-decorators'
import BusinessService from '@/models/ekoset/BusinessService'
import { getServiceContainer } from '@/api/ServiceContainer'

@Component({
})
export default class TheLayoutFooter extends Vue {
  private serviceListForBusiness: BusinessService[] = []
  private serviceListForPerson: BusinessService[] = []


  private async mounted () {
    this.serviceListForPerson = await getServiceContainer().businessServiceService.getServicesForFooter('private')
    this.serviceListForBusiness = await getServiceContainer().businessServiceService.getServicesForFooter('business')
  }

  private get getCurrentSiteSection () {
    return getModule(AppStore, this.$store).currentSiteSection
  }

}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.brc-page-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid lightgray;
  margin-top: 30px;
  padding-top: 25px;
  padding-bottom: 25px;
  // background-color: #f5f5f5;

  .brc-footer-list-link {
    margin-top: 15px;
  }

  a {
    color: $text-color;
  }
  input {
    display: none;
    visibility: hidden;
  }
  ul {
    margin: 0;
    padding: 0;
    > li {
      list-style: none;
      list-style-type: none;
      // font-size: 0.9rem;
    }

    > li + li {
      margin-top: 5px;
    }
  }
  .brc-page-footer__contacts {
    a {
      color: $text-color;
    }
  }

  .brc-page-footer__phone {
    margin: auto;
    font-weight: 500;
    font-size: 18px;
    margin-top: 5px;
  }

  .brc-page-footer__social {
    margin: auto;
    display: flex;
    margin-top: 20px;
    a {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      // border: 1px solid #a6a6a6;
      // border-radius: 50%;
    }
    img {
      // width: 20px;
      // height: 12px;
    }
  }
}

.brc-page-footer__last {
  font-size: $font-big;
  color: $text-muted;
  padding-top: 20px;
  border-top: 1px solid lightgray;
  padding-bottom: 25px;
  // background-color: #f5f5f5;
}

@media (max-width: 768px) {
  .brc-page-footer {
    margin-top: 20px;
  }

  .brc-page-footer__menu {
    a {
      color: $text-color;
    }
  }
  .brc-footer-log {
    height: 34px;
  }
  .brc-page-footer img {
    max-height: 60px;
    height: 60px;
  }

  .brc-page-footer__phone {
    font-weight: 500;
    font-size: 20px;
  }

  .brc-footer-logo__wrapper {
    text-align: center;
  }
  .brc-page-footer__social {
    float: right;
    margin-top: 15px;
  }
  .brc-page-footer__contacts {
    float: left;
    margin-top: 15px;
    font-weight: 500 !important;
    font-size: 18px;
  }

  .brc-page-footer__menu {
    margin-top: 25px;
  }

  .brc-page-footer__business-activities {
    margin-top: 25px;
    border-top: 1px solid lightgray;
    padding-top: 10px;
  }

  .brc-page-footer__private-activities {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    padding-top: 10px;
  }

  .brc-page-footer__menu {
    font-size: 18px;
  }
  .brc-page-footer {
    padding-top: 0;
    flex-direction: column;

    h4 {
      font-size: 20px !important;
    }
    h4,
    label {
      display: inline;
    }

    .brc-footer-list-link {
      margin-top: 15px;
      height: 0px;
      overflow: hidden;
      transition: height 0.5s;
      font-size: 16px;
    }

    .brc-footer-list-arrow {
      display: inline;
      cursor: pointer;
    }

    #toogleClientTypeMenuVisible:checked ~ .brc-footer-list-link,
    #toogleBusinessTypeMenuVisible:checked ~ .brc-footer-list-link {
      height: min-content;
    }

    .brc-footer-list-arrow:after {
      content: '\25bc';
    }

    #toogleClientTypeMenuVisible:checked ~ .brc-footer-list-arrow,
    #toogleBusinessTypeMenuVisible:checked ~ .brc-footer-list-arrow {
      &:after {
        content: '\25ba';
      }
    }
  }
}
</style>