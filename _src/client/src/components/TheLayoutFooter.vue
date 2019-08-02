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
          <nuxt-link :to="{name: 'main'}">О компании</nuxt-link>
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

