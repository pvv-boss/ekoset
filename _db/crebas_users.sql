create table ARTICLE (
   ARTICLE_ID           SERIAL               not null,
   SITE_SECTION_ID      INTEGER                 null,
   ARTICLE_PUBLISH_DATE TIMESTAMP(0) WITH TIME ZONE not null,
   ARTICLE_AUTHOR       TEXT                 null,
   ARTICLE_TITLE        TEXT                 not null,
   ARTICLE_SLUG         TEXT                 null,
   ARTICLE_DESCRIPTION  TEXT                 not null,
   ARTICLE_BODY         TEXT                 null,
   ARTICLE_PREVIEW_IMG_SRC TEXT                 null,
   ARTICLE_HEADER_IMG_SRC TEXT                 null,
   ARTICLE_SOURCE       TEXT                 null,
   ARTICLE_VIEWS_NUMBER NUMERIC              null,
   ARTICLE_STATUS       NUMERIC              not null
      constraint CKC_ARTICLE_STATUS_ARTICLE check (ARTICLE_STATUS between 0 and 1 and ARTICLE_STATUS in (0,1)),
   constraint PK_ARTICLE primary key (ARTICLE_ID)
);

comment on table ARTICLE is
'Статья';

comment on column ARTICLE.ARTICLE_ID is
'Идентфикатор Статья';

comment on column ARTICLE.SITE_SECTION_ID is
'Идентификатор Раздел сайта';

comment on column ARTICLE.ARTICLE_PUBLISH_DATE is
'Дата публикации Статья';

comment on column ARTICLE.ARTICLE_AUTHOR is
'Автор Статья';

comment on column ARTICLE.ARTICLE_TITLE is
'Заголовок Статья';

comment on column ARTICLE.ARTICLE_SLUG is
'ЧПУ Статья';

comment on column ARTICLE.ARTICLE_DESCRIPTION is
'Описание Статья';

comment on column ARTICLE.ARTICLE_BODY is
'Текст Статья';

comment on column ARTICLE.ARTICLE_PREVIEW_IMG_SRC is
'Ссылка на картинку-привью Статья';

comment on column ARTICLE.ARTICLE_HEADER_IMG_SRC is
'Ссылка на основную картинку Статья';

comment on column ARTICLE.ARTICLE_SOURCE is
'Источник Статья';

comment on column ARTICLE.ARTICLE_VIEWS_NUMBER is
'Количестиво просмотров Статья';

comment on column ARTICLE.ARTICLE_STATUS is
'Статус Статья';

create unique index NEWS_PK on ARTICLE (
ARTICLE_ID
);

create  index IND_SITE_SECTION_ID on ARTICLE (
SITE_SECTION_ID
);

create table ARTICLE_CL_ARTICLE_TAG (
   ARTICLE_ID           INTEGER                 not null,
   CL_ARTICLE_ID        INTEGER                 not null,
   constraint PK_ARTICLE_CL_ARTICLE_TAG primary key (ARTICLE_ID, CL_ARTICLE_ID)
);

comment on table ARTICLE_CL_ARTICLE_TAG is
'Relationship_12';

comment on column ARTICLE_CL_ARTICLE_TAG.ARTICLE_ID is
'Идентфикатор Статья';

comment on column ARTICLE_CL_ARTICLE_TAG.CL_ARTICLE_ID is
'Идентификатор Тэг статьи';

create  index Relationship_15_FK on ARTICLE_CL_ARTICLE_TAG (
ARTICLE_ID
);

create  index Relationship_16_FK on ARTICLE_CL_ARTICLE_TAG (
CL_ARTICLE_ID
);

create table BUSINESS_SERVICE (
   BUSINESS_SERVICE_ID  SERIAL               not null,
   SITE_SECTION_ID      INTEGER                 not null,
   BUSINESS_SERVICE_NAME TEXT                 not null,
   BUSINESS_SERVICE_SLUG TEXT                 null,
   BUSINESS_SERVICE_UNIT TEXT                 null,
   BUSINESS_SERVICE_PRICE NUMERIC              null,
   BUSINESS_SERVICE_IMG_SMALL TEXT                 null,
   BUSINESS_SERVICE_IMG_BIG TEXT                 null,
   BUSINESS_SERVICE_STATUS NUMERIC              null default 0
      constraint CKC_BUSINESS_SERVICE__BUSINESS check (BUSINESS_SERVICE_STATUS is null or (BUSINESS_SERVICE_STATUS between 0 and 1)),
   BUSINESS_SERVICE_PRIORITY NUMERIC              null,
   BUSINESS_SERVICE_PARENT_ID NUMERIC              null,
   constraint PK_BUSINESS_SERVICE primary key (BUSINESS_SERVICE_ID)
);

comment on table BUSINESS_SERVICE is
'Услуга';

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_ID is
'Идентификатор Услуга';

comment on column BUSINESS_SERVICE.SITE_SECTION_ID is
'Идентификатор Раздел сайта';

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_NAME is
'Наименование Услуга';

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_SLUG is
'ЧПУ Услуга';

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_UNIT is
'Единица измерения Услуга';

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_PRICE is
'Цена Услуга';

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_IMG_SMALL is
'Картинка малая Услуга';

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_IMG_BIG is
'Картинка большая Услуга';

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_STATUS is
'Статус Услуга';

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_PRIORITY is
'Приоритет Услуга';

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_PARENT_ID is
'ID Услуга первого уровня';

create unique index BUSINESS_SERVICE_PK on BUSINESS_SERVICE (
BUSINESS_SERVICE_ID
);

create  index Relationship_8_FK on BUSINESS_SERVICE (
SITE_SECTION_ID
);

create table BUSINESS_SERVICE_ACTIVITY (
   CL_ACTIVITY_ID       INTEGER                 not null,
   BUSINESS_SERVICE_ID  INTEGER                 not null,
   constraint PK_BUSINESS_SERVICE_ACTIVITY primary key (CL_ACTIVITY_ID, BUSINESS_SERVICE_ID)
);

comment on table BUSINESS_SERVICE_ACTIVITY is
'Relationship_9';

comment on column BUSINESS_SERVICE_ACTIVITY.CL_ACTIVITY_ID is
'Идентификатор Вид деятельности';

comment on column BUSINESS_SERVICE_ACTIVITY.BUSINESS_SERVICE_ID is
'Идентификатор Услуга';

create  index Relationship_9_FK on BUSINESS_SERVICE_ACTIVITY (
CL_ACTIVITY_ID
);

create  index Relationship_10_FK on BUSINESS_SERVICE_ACTIVITY (
BUSINESS_SERVICE_ID
);

create table BUSINESS_SERVICE_ARTICLE (
   BUSINESS_SERVICE_ID  INTEGER                 not null,
   ARTICLE_ID           INTEGER                 not null,
   constraint PK_BUSINESS_SERVICE_ARTICLE primary key (BUSINESS_SERVICE_ID, ARTICLE_ID)
);

comment on table BUSINESS_SERVICE_ARTICLE is
'Relationship_11';

comment on column BUSINESS_SERVICE_ARTICLE.BUSINESS_SERVICE_ID is
'Идентификатор Услуга';

comment on column BUSINESS_SERVICE_ARTICLE.ARTICLE_ID is
'Идентфикатор Статья';

create  index Relationship_13_FK on BUSINESS_SERVICE_ARTICLE (
BUSINESS_SERVICE_ID
);

create  index Relationship_14_FK on BUSINESS_SERVICE_ARTICLE (
ARTICLE_ID
);

create table BUSINESS_SERVICE_CL_CLIENT (
   CL_CLIENT_ID         INTEGER                 not null,
   BUSINESS_SERVICE_ID  INTEGER                 not null,
   constraint PK_BUSINESS_SERVICE_CL_CLIENT primary key (CL_CLIENT_ID, BUSINESS_SERVICE_ID)
);

comment on table BUSINESS_SERVICE_CL_CLIENT is
'Relationship_10';

comment on column BUSINESS_SERVICE_CL_CLIENT.CL_CLIENT_ID is
'Идентификатор Тип клиента';

comment on column BUSINESS_SERVICE_CL_CLIENT.BUSINESS_SERVICE_ID is
'Идентификатор Услуга';

create unique index Relationship_10_PK on BUSINESS_SERVICE_CL_CLIENT (
CL_CLIENT_ID,
BUSINESS_SERVICE_ID
);

create  index Relationship_12_FK on BUSINESS_SERVICE_CL_CLIENT (
BUSINESS_SERVICE_ID
);

create table CL_ACTIVITY (
   CL_ACTIVITY_ID       SERIAL               not null,
   CL_ACTIVITY_NAME     TEXT                 null,
   CL_ACTIVITY_IMG_BIG  TEXT                 null,
   CL_ACTIVITY_IMG_SMALL TEXT                 null,
   CL_ACTIVITY_STATUS   NUMERIC              null
      constraint CKC_CL_ACTIVITY_STATU_CL_ACTIV check (CL_ACTIVITY_STATUS is null or (CL_ACTIVITY_STATUS between 0 and 1)),
   CL_ACTIVITY_PRIORITY NUMERIC              null,
   constraint PK_CL_ACTIVITY primary key (CL_ACTIVITY_ID)
);

comment on table CL_ACTIVITY is
'Вид деятельности (объект)';

comment on column CL_ACTIVITY.CL_ACTIVITY_ID is
'Идентификатор Вид деятельности';

comment on column CL_ACTIVITY.CL_ACTIVITY_NAME is
'Наименование Вид деятельности';

comment on column CL_ACTIVITY.CL_ACTIVITY_IMG_BIG is
'Картинка большая Вид деятельности';

comment on column CL_ACTIVITY.CL_ACTIVITY_IMG_SMALL is
'Картинка малая Вид деятельности';

comment on column CL_ACTIVITY.CL_ACTIVITY_STATUS is
'Статус Вид деятельности';

comment on column CL_ACTIVITY.CL_ACTIVITY_PRIORITY is
'Приоритет Вид деятельности';

create unique index CL_ACTIVITY_PK on CL_ACTIVITY (
CL_ACTIVITY_ID
);

create table CL_ARTICLE_TAG (
   CL_ARTICLE_ID        SERIAL               not null,
   CL_ARTICLE_NAME      TEXT                 null,
   constraint PK_CL_ARTICLE_TAG primary key (CL_ARTICLE_ID)
);

comment on table CL_ARTICLE_TAG is
'Тэг статьи';

comment on column CL_ARTICLE_TAG.CL_ARTICLE_ID is
'Идентификатор Тэг статьи';

comment on column CL_ARTICLE_TAG.CL_ARTICLE_NAME is
'Наименование Тэг статьи';

create unique index CL_ARTICLE_TAG_PK on CL_ARTICLE_TAG (
CL_ARTICLE_ID
);

create table CL_BRAND (
   CL_BRAND_ID          SERIAL               not null,
   BUSINESS_SERVICE_ID  INTEGER                 null,
   CL_BRAND_NAME        TEXT                 null,
   CL_BRAND_IMG_SMALL   TEXT                 null,
   CL_BRAND_IMG_BIG     TEXT                 null,
   CL_BRAND_URL         TEXT                 null,
   constraint PK_CL_BRAND primary key (CL_BRAND_ID)
);

comment on table CL_BRAND is
'Брэнд';

comment on column CL_BRAND.CL_BRAND_ID is
'Идентфиикатор Брэнд';

comment on column CL_BRAND.BUSINESS_SERVICE_ID is
'Идентификатор Услуга';

comment on column CL_BRAND.CL_BRAND_NAME is
'Наименование Брэнд';

comment on column CL_BRAND.CL_BRAND_IMG_SMALL is
'Картинка малая Брэнд';

comment on column CL_BRAND.CL_BRAND_IMG_BIG is
'Картинка большая Брэнд';

comment on column CL_BRAND.CL_BRAND_URL is
'Ссылка на Брэнд';

create unique index CL_BRAND_PK on CL_BRAND (
CL_BRAND_ID
);

create  index BUSINESS_SERVICE_BRAND_FK on CL_BRAND (
BUSINESS_SERVICE_ID
);

create table CL_META_TAG (
   CL_META_TAG_ID       SERIAL               not null,
   CL_META_TAG_NAME     TEXT                 null,
   CL_META_TAG_HID      TEXT                 null,
   CL_META_TAG_PROPERTY TEXT                 null,
   constraint PK_CL_META_TAG primary key (CL_META_TAG_ID)
);

comment on table CL_META_TAG is
'Мета тэг';

comment on column CL_META_TAG.CL_META_TAG_ID is
'Идентификатор Мета тэг';

comment on column CL_META_TAG.CL_META_TAG_NAME is
'name Мета тэг';

comment on column CL_META_TAG.CL_META_TAG_HID is
'hid Мета тэг';

comment on column CL_META_TAG.CL_META_TAG_PROPERTY is
'property Мета тэг';

create unique index CL_META_TAG_PK on CL_META_TAG (
CL_META_TAG_ID
);

create table CL_SITE_SETTING (
   CL_SITE_SETTING_ID   SERIAL               not null,
   CL_SITE_SETTING_NAME TEXT                 null,
   CL_SITE_SETTING_VAL  TEXT                 null,
   CL_SITE_SETTING_DISPLAY_NAME TEXT                 null,
   constraint PK_CL_SITE_SETTING primary key (CL_SITE_SETTING_ID)
);

comment on table CL_SITE_SETTING is
'Настройки сайта';

comment on column CL_SITE_SETTING.CL_SITE_SETTING_ID is
'Идентификатор Настройки сайта';

comment on column CL_SITE_SETTING.CL_SITE_SETTING_NAME is
'Наименование Настройки сайта';

comment on column CL_SITE_SETTING.CL_SITE_SETTING_VAL is
'Значение Настройки сайта';

comment on column CL_SITE_SETTING.CL_SITE_SETTING_DISPLAY_NAME is
'Наименование для отображения Настройки сайта';

create unique index CL_SITE_SETTING_PK on CL_SITE_SETTING (
CL_SITE_SETTING_ID
);

create table INDIVIDUAL_OFFER (
   IND_OFFER_ID         SERIAL               not null,
   CL_ACTIVITY_ID       INTEGER                 null,
   CL_CLIENT_ID         INTEGER                 null,
   SITE_SECTION_ID      INTEGER                 null,
   IND_OFFER_NAME       TEXT                 not null,
   IND_OFFER_SLUG       TEXT                 null,
   IND_OFFER_IMG_SMALL  TEXT                 null,
   IND_OFFER_IMG_BIG    TEXT                 null,
   IND_OFFER_PRIORITY   NUMERIC              null,
   IND_OFFER_STATUS     NUMERIC              null
      constraint CKC_IND_OFFER_STATUS_INDIVIDU check (IND_OFFER_STATUS is null or (IND_OFFER_STATUS between 0 and 1)),
   constraint PK_INDIVIDUAL_OFFER primary key (IND_OFFER_ID)
);

comment on table INDIVIDUAL_OFFER is
'Индивидуальное предложение';

comment on column INDIVIDUAL_OFFER.IND_OFFER_ID is
'Идентификатор ИндП';

comment on column INDIVIDUAL_OFFER.CL_ACTIVITY_ID is
'Идентификатор Вид деятельности';

comment on column INDIVIDUAL_OFFER.CL_CLIENT_ID is
'Идентификатор Тип клиента';

comment on column INDIVIDUAL_OFFER.SITE_SECTION_ID is
'Идентификатор Раздел сайта';

comment on column INDIVIDUAL_OFFER.IND_OFFER_NAME is
'Наименование ИндП';

comment on column INDIVIDUAL_OFFER.IND_OFFER_SLUG is
'ЧПУ ИндП';

comment on column INDIVIDUAL_OFFER.IND_OFFER_IMG_SMALL is
'Картинка малая ИндП';

comment on column INDIVIDUAL_OFFER.IND_OFFER_IMG_BIG is
'Картинка большая ИндП';

comment on column INDIVIDUAL_OFFER.IND_OFFER_PRIORITY is
'Приоритет ИндП';

comment on column INDIVIDUAL_OFFER.IND_OFFER_STATUS is
'Статус ИндП';

create unique index INDIVIDUAL_OFFER_PK on INDIVIDUAL_OFFER (
IND_OFFER_ID
);

create  index Relationship_5_FK on INDIVIDUAL_OFFER (
CL_ACTIVITY_ID
);

create  index Relationship_6_FK on INDIVIDUAL_OFFER (
SITE_SECTION_ID
);

create table META_TAG_CONTENT (
   META_TAG_CONTENT_ID  SERIAL               not null,
   SITE_PAGE_ID         INTEGER                 not null,
   CL_META_TAG_ID       INTEGER                 not null,
   META_TAG_CONTENT_VAL TEXT                 null,
   constraint PK_META_TAG_CONTENT primary key (META_TAG_CONTENT_ID)
);

comment on table META_TAG_CONTENT is
'Значение мета тэга';

comment on column META_TAG_CONTENT.META_TAG_CONTENT_ID is
'Идентификатор Значение мета тэга';

comment on column META_TAG_CONTENT.SITE_PAGE_ID is
'Идентификатор Страница';

comment on column META_TAG_CONTENT.CL_META_TAG_ID is
'Идентификатор Мета тэг';

comment on column META_TAG_CONTENT.META_TAG_CONTENT_VAL is
'Згачение метатэга';

create unique index META_TAG_CONTENT_PK on META_TAG_CONTENT (
META_TAG_CONTENT_ID
);

create  index Relationship_17_FK on META_TAG_CONTENT (
SITE_PAGE_ID
);

create  index Relationship_18_FK on META_TAG_CONTENT (
CL_META_TAG_ID
);

create table RELATED_ARTICLE (
   RELATED_ARTICLE_ID   SERIAL               not null,
   ARTICLE_ID           INTEGER                 null,
   ART_ARTICLE_ID       INTEGER                 null,
   constraint PK_RELATED_ARTICLE primary key (RELATED_ARTICLE_ID)
);

comment on table RELATED_ARTICLE is
'Связанные статьи';

comment on column RELATED_ARTICLE.RELATED_ARTICLE_ID is
'Связанные новости Идентификатор';

comment on column RELATED_ARTICLE.ARTICLE_ID is
'Идентфикатор Статья';

comment on column RELATED_ARTICLE.ART_ARTICLE_ID is
'Ста_Идентфикатор Статья';

create unique index RELATED_NEWS_PK on RELATED_ARTICLE (
RELATED_ARTICLE_ID
);

create  index IND_ARTICLE_ID on RELATED_ARTICLE (
ARTICLE_ID
);

create  index IND_ART_ARTICLE_ID on RELATED_ARTICLE (
ART_ARTICLE_ID
);

create table SITE_PAGE (
   SITE_PAGE_ID         SERIAL               not null,
   SITE_PAGE_NAME       TEXT                 null,
   constraint PK_SITE_PAGE primary key (SITE_PAGE_ID)
);

comment on table SITE_PAGE is
'Страница';

comment on column SITE_PAGE.SITE_PAGE_ID is
'Идентификатор Страница';

comment on column SITE_PAGE.SITE_PAGE_NAME is
'Наименование Страница';

create unique index SITE_PAGE_PK on SITE_PAGE (
SITE_PAGE_ID
);

create table SITE_SECTION (
   SITE_SECTION_ID      SERIAL               not null,
   SITE_SECTION_NAME    TEXT                 not null,
   SITE_SECTION_SLUG    TEXT                 null,
   SITE_SECTION_IMG_BIG TEXT                 null,
   SITE_SECTION_IMG_SMALL TEXT                 null,
   SITE_SECTION_PRIORITY NUMERIC              null,
   SITE_SECTION_STATUS  NUMERIC              null
      constraint CKC_SITE_SECTION_STAT_SITE_SEC check (SITE_SECTION_STATUS is null or (SITE_SECTION_STATUS between 0 and 1)),
   constraint PK_SITE_SECTION primary key (SITE_SECTION_ID)
);

comment on table SITE_SECTION is
'Раздел сайта';

comment on column SITE_SECTION.SITE_SECTION_ID is
'Идентификатор Раздел сайта';

comment on column SITE_SECTION.SITE_SECTION_NAME is
'Наименование Раздел сайта';

comment on column SITE_SECTION.SITE_SECTION_SLUG is
'ЧПУ Раздел сайта';

comment on column SITE_SECTION.SITE_SECTION_IMG_BIG is
'Картинка большая Раздел сайта';

comment on column SITE_SECTION.SITE_SECTION_IMG_SMALL is
'Картинка малая Раздел сайта';

comment on column SITE_SECTION.SITE_SECTION_PRIORITY is
'Приоритет Раздел сайта';

comment on column SITE_SECTION.SITE_SECTION_STATUS is
'Статус Раздел сайта';

create unique index SITE_SECTION_PK on SITE_SECTION (
SITE_SECTION_ID
);

create table SITE_SECTION_BRAND (
   SITE_SECTION_ID      INTEGER                 not null,
   CL_BRAND_ID          INTEGER                 not null,
   constraint PK_SITE_SECTION_BRAND primary key (SITE_SECTION_ID, CL_BRAND_ID)
);

comment on table SITE_SECTION_BRAND is
'Relationship_15';

comment on column SITE_SECTION_BRAND.SITE_SECTION_ID is
'Идентификатор Раздел сайта';

comment on column SITE_SECTION_BRAND.CL_BRAND_ID is
'Идентфиикатор Брэнд';

create  index SITE_SECTION_BRAND_FK on SITE_SECTION_BRAND (
SITE_SECTION_ID
);

create  index SITE_SECTION_BRAND2_FK on SITE_SECTION_BRAND (
CL_BRAND_ID
);

create table SITE_SOCIAL_NETWORK (
   SITE_SOCIAL_NET_ID   SERIAL               not null,
   SITE_SOCIAL_NET_NAME TEXT                 null,
   SITE_SOCIAL_NET_IMG  TEXT                 null,
   SITE_SOCIAL_NET_URL  TEXT                 null,
   constraint PK_SITE_SOCIAL_NETWORK primary key (SITE_SOCIAL_NET_ID)
);

comment on table SITE_SOCIAL_NETWORK is
'Социальная сеть сайта';

comment on column SITE_SOCIAL_NETWORK.SITE_SOCIAL_NET_ID is
'Идентификатор Социальная сеть сайта';

comment on column SITE_SOCIAL_NETWORK.SITE_SOCIAL_NET_NAME is
'Наименование Социальная сеть сайта';

comment on column SITE_SOCIAL_NETWORK.SITE_SOCIAL_NET_IMG is
'Изображение Социальная сеть сайта';

comment on column SITE_SOCIAL_NETWORK.SITE_SOCIAL_NET_URL is
'Ссылка на профиль Социальная сеть сайта';

create unique index SITE_SOCIAL_NETWORK_PK on SITE_SOCIAL_NETWORK (
SITE_SOCIAL_NET_ID
);

alter table ARTICLE
   add constraint FK_ARTICLE_RELATIONS_SITE_SEC foreign key (SITE_SECTION_ID)
      references SITE_SECTION (SITE_SECTION_ID)
      on delete restrict on update restrict;

alter table ARTICLE_CL_ARTICLE_TAG
   add constraint FK_ARTICLE__ARTICLE_C_ARTICLE foreign key (ARTICLE_ID)
      references ARTICLE (ARTICLE_ID)
      on delete restrict on update restrict;

alter table ARTICLE_CL_ARTICLE_TAG
   add constraint FK_ARTICLE__ARTICLE_C_CL_ARTIC foreign key (CL_ARTICLE_ID)
      references CL_ARTICLE_TAG (CL_ARTICLE_ID)
      on delete restrict on update restrict;

alter table BUSINESS_SERVICE
   add constraint FK_BUSINESS_RELATIONS_SITE_SEC foreign key (SITE_SECTION_ID)
      references SITE_SECTION (SITE_SECTION_ID)
      on delete restrict on update restrict;

alter table BUSINESS_SERVICE_ACTIVITY
   add constraint FK_BUSINESS_BUSINESS__CL_ACTIV foreign key (CL_ACTIVITY_ID)
      references CL_ACTIVITY (CL_ACTIVITY_ID)
      on delete restrict on update restrict;

alter table BUSINESS_SERVICE_ACTIVITY
   add constraint FK_BUSINESS_BUSINESS__BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

alter table BUSINESS_SERVICE_ARTICLE
   add constraint FK_BUSINESS_BUSINESS__BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

alter table BUSINESS_SERVICE_ARTICLE
   add constraint FK_BUSINESS_BUSINESS__ARTICLE foreign key (ARTICLE_ID)
      references ARTICLE (ARTICLE_ID)
      on delete restrict on update restrict;

alter table BUSINESS_SERVICE_CL_CLIENT
   add constraint FK_BUSINESS_BUSINESS__BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

alter table CL_BRAND
   add constraint FK_CL_BRAND_BUSINESS__BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

alter table INDIVIDUAL_OFFER
   add constraint FK_INDIVIDU_RELATIONS_CL_ACTIV foreign key (CL_ACTIVITY_ID)
      references CL_ACTIVITY (CL_ACTIVITY_ID)
      on delete restrict on update restrict;

alter table INDIVIDUAL_OFFER
   add constraint FK_INDIVIDU_RELATIONS_SITE_SEC foreign key (SITE_SECTION_ID)
      references SITE_SECTION (SITE_SECTION_ID)
      on delete restrict on update restrict;

alter table META_TAG_CONTENT
   add constraint FK_META_TAG_RELATIONS_SITE_PAG foreign key (SITE_PAGE_ID)
      references SITE_PAGE (SITE_PAGE_ID)
      on delete restrict on update restrict;

alter table META_TAG_CONTENT
   add constraint FK_META_TAG_RELATIONS_CL_META_ foreign key (CL_META_TAG_ID)
      references CL_META_TAG (CL_META_TAG_ID)
      on delete restrict on update restrict;

alter table RELATED_ARTICLE
   add constraint FK_RELATED__RELATIONS_ARTICLE2 foreign key (ARTICLE_ID)
      references ARTICLE (ARTICLE_ID)
      on delete restrict on update restrict;

alter table RELATED_ARTICLE
   add constraint FK_RELATED__RELATIONS_ARTICLE foreign key (ART_ARTICLE_ID)
      references ARTICLE (ARTICLE_ID)
      on delete restrict on update restrict;

alter table SITE_SECTION_BRAND
   add constraint FK_SITE_SEC_SITE_SECT_SITE_SEC foreign key (SITE_SECTION_ID)
      references SITE_SECTION (SITE_SECTION_ID)
      on delete restrict on update restrict;

alter table SITE_SECTION_BRAND
   add constraint FK_SITE_SEC_SITE_SECT_CL_BRAND foreign key (CL_BRAND_ID)
      references CL_BRAND (CL_BRAND_ID)
      on delete restrict on update restrict;

