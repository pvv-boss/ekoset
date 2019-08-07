<template functional>
  <footer class="brc-page-footer">
    <div class="brc-page-footer__contacts">
      <a class="brc-footer-logo" href="/">
        <img src="/images/logo.png" alt="Экосеть" />
      </a>
      <div class="brc-page-footer__phone">
        <a href="tel:4952233595">(495) 223-35-95</a>
      </div>
      <div class="brc-page-footer__email">
        <a href="mailto:inbox@ekoset.ru">inbox@ekoset.ru</a>
      </div>
      <div class="brc-page-footer__social">
        <a href="https://vk.com/ekoset">
          <img src="/images/social-vk.png" alt="Экосеть ВКонтакте" />
        </a>
        <a
          href="http://www.facebook.com/pages/%D0%AD%D0%BA%D0%BE%D1%81%D0%B5%D1%82%D1%8C-%D0%9C%D1%8B-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%B5%D0%BC-%D0%93%D0%B0%D1%80%D0%BC%D0%BE%D0%BD%D0%B8%D1%8E/214044655403288"
        >
          <img src="/images/social-facebook.png" alt="Экосеть в Фейсбуке" />
        </a>
        <a href="https://twitter.com/Ekoset77">
          <img src="/images/social-twitter.png" alt="Экосеть в Твиттере" />
        </a>
      </div>
    </div>
    <div class="brc-page-footer__business-activities">
      <h4>Бизнесу</h4>
      <input id="toogleBusinessTypeMenuVisible" type="checkbox" />
      <label class="brc-footer-list-arrow" for="toogleBusinessTypeMenuVisible">&#9660;</label>
      <ul class="brc-footer-list-link">
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
      <h4>Частным лицам</h4>
      <input id="toogleClientTypeMenuVisible" type="checkbox" />
      <label class="brc-footer-list-arrow" for="toogleClientTypeMenuVisible">&#9660;</label>
      <ul class="brc-footer-list-link">
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

<style lang="scss">
@import "@/styles/variables.scss";
.brc-page-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid lightgray;
  img {
    max-width: 160px;
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
      > a {
        color: gray;
        &:hover {
          color: black;
        }
      }
    }
  }
  .brc-footer-list-arrow {
    display: none;
  }
  .brc-page-footer__contacts {
    a {
      color: #26272d;
    }
    &:hover {
      color: black;
    }
  }
}
@media (max-width: 767px) {
  .brc-page-footer {
    flex-direction: column;

    h4,
    label {
      display: inline;
    }

    .brc-footer-list-link {
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
  }
}
</style>