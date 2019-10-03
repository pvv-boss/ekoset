<template>
  <footer class="brc-page-footer">
    <div class="brc-page-footer__contacts">
      <div class="brc-footer-logo__wrapper">
        <nuxt-link :to="{name: 'main'}" class="brc-footer-logo">
          <img src="/images/logo.png" alt="Экосеть" />
        </nuxt-link>
      </div>
      <div class="brc-page-footer__contacts">
        <div class="brc-page-footer__phone">
          <a href="tel:4952233595">(495) 223-35-95</a>
        </div>
        <div class="brc-page-footer__email">
          <a href="mailto:inbox@ekoset.ru">inbox@ekoset.ru</a>
        </div>
      </div>
      <div class="brc-page-footer__social">
        <a href="https://vk.com/ekoset">
          <img src="/images/vk-social.png" alt="Экосеть ВКонтакте" />
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
            :to="{ name: 'service-card', params: { service: serviceItem.businessServiceUrl, siteSection: getCurrentSiteSection}}"
          >{{serviceItem.businessServiceName}}</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="brc-page-footer__menu">
      <ul>
        <li>
          <nuxt-link :to="{name: 'about', params:{siteSection: getCurrentSiteSection}}">О компании</nuxt-link>
        </li>
        <li>
          <nuxt-link
            :to="{name: 'clients', params:{siteSection: getCurrentSiteSection}}"
          >Наши клиенты</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name: 'prices', params:{siteSection: getCurrentSiteSection}}">Цены</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name: 'news', params:{siteSection: getCurrentSiteSection}}">Новости</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name: 'contacts', params:{siteSection: getCurrentSiteSection}}">Контакты</nuxt-link>
        </li>
      </ul>
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
}
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.brc-page-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid lightgray;
  margin-top: 30px;
  padding-top: 30px;

  .brc-footer-list-link {
    margin-top: 15px;
  }

  a {
    color: $text-color;
  }
  img {
    max-height: 40px;
    height: 40px;
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

  .brc-page-footer__social {
    margin-top: 10px;
    a {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #a6a6a6;
      border-radius: 50%;
    }
    img {
      width: 20px;
      height: 12px;
    }
  }
}
@media (max-width: 768px) {
  .brc-page-footer__menu {
    a {
      color: $text-color;
    }
  }
  .brc-footer-log {
    height: 34px;
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
  }
  .brc-page-footer__menu,
  .brc-page-footer__private-activities,
  .brc-page-footer__business-activities {
    margin-top: 15px;
  }
  .brc-page-footer {
    padding-top: 0;
    margin-bottom: 100px;
    flex-direction: column;

    h4,
    label {
      display: inline;
    }

    .brc-footer-list-link {
      margin-top: 15px;
      height: 0px;
      overflow: hidden;
      transition: height 0.5s;
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
      content: "\25bc";
    }

    #toogleClientTypeMenuVisible:checked ~ .brc-footer-list-arrow,
    #toogleBusinessTypeMenuVisible:checked ~ .brc-footer-list-arrow {
      &:after {
        content: "\25ba";
      }
    }
  }
}
</style>