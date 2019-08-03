<template functional>
  <footer class="brc-page-footer">
    <div class="brc-page-footer__contacts">
      <a class="footer-logo" href="/">
        <img src="/images/logo.png" alt="Экосеть" />
      </a>
      <div class="brc-page-footer__phone">
        <a href="tel:4952233595">(495) 223-35-95</a>
      </div>
      <div class="brc-page-footer__email">
        <a href="mailto:inbox@ekoset.ru">inbox@ekoset.ru</a>
      </div>
      <div class="brc-page-footer__social">
        <small>Иконки для соцсетей</small>
      </div>
    </div>
    <div class="brc-page-footer__business-activities">
      <h3>Услуги для Бизнеса</h3>
      <ul class="footer-list-link">
        <li>
          <a href="#">Ежедневная уборка</a>
        </li>
        <li>
          <a href="#">Пэст-контроль</a>
        </li>
        <li>
          <a href="#">Лабораторные исследования</a>
        </li>
        <li>
          <a href="#">Оформление сандокументов</a>
        </li>
        <li>
          <a href="#">Дезинфекция автотранспорта</a>
        </li>
        <li>
          <a href="#">Очистка вентиляции</a>
        </li>
        <li>
          <a href="#">Уничтожение борщевика</a>
        </li>
      </ul>
    </div>
    <div class="brc-page-footer__private-activities">
      <h3>Услуги для Частных лиц</h3>
      <ul class="footer-list-link">
        <li>
          <a href="#">Уничтожение кротов</a>
        </li>
        <li>
          <a href="#">Уничтожение комаров</a>
        </li>
        <li>
          <a href="#">Уничтожение клещей</a>
        </li>
        <li>
          <a href="#">Уничтожение любых вредителей</a>
        </li>
        <li>
          <a href="#">Уничтожение борщевика</a>
        </li>
        <li>
          <a href="#">Анализ воды</a>
        </li>
        <li>
          <a href="#">Анализ почвы</a>
        </li>
        <li>
          <a href="#">Анализ радиации</a>
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
          <nuxt-link :to="{name: 'prices'}">Цены</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name: 'news'}">Новости</nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{name: 'contacts'}">Контакты</nuxt-link>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.brc-page-footer {
  display: flex;
  flex-direction: row;
  padding: 10px 0 10px 0px;
  border-top: 1px solid lightgray;

  @media (max-width: 480px) {
    padding: 5px 0 5px 0;
  }

  img {
    max-width: 160px !important;
  }

  > div {
    flex-grow: 1;
  }

  h3 {
    padding-left: 25px;
  }

  ul {
    margin: 0;
    padding: 0;

    > li {
      list-style: none;
      padding: 2px 0;

      > a {
        color: gray;
        font-size: 13px;
        padding: 2px 0 2px 25px;

        &:hover {
          color: black;
          background-image: url(/images/sun-icon.png);
          background-repeat: no-repeat;
        }
      }
    }
  }

  .brc-page-footer__contacts {
    a {
      color: #26272d;
      font-size: 16px;
      font-weight: 900;
      line-height: 25px;
    }
  }

  .brc-page-footer__menu {
    padding-top: 20px;
  }
}
</style>