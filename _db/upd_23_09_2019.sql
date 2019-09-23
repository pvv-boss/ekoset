drop index Relationship_16_FK;

drop index Relationship_15_FK;

alter table ARTICLE_CL_ARTICLE_TAG
   drop constraint PK_ARTICLE_CL_ARTICLE_TAG;

drop table tmp_ARTICLE_CL_ARTICLE_TAG;

alter table ARTICLE_CL_ARTICLE_TAG
   rename to tmp_ARTICLE_CL_ARTICLE_TAG;

drop index Relationship_8_FK;

drop index BUSINESS_SERVICE_PK;

alter table BUSINESS_SERVICE
   drop constraint PK_BUSINESS_SERVICE;

drop table tmp_BUSINESS_SERVICE;

alter table BUSINESS_SERVICE
   rename to tmp_BUSINESS_SERVICE;

drop index CL_ARTICLE_TAG_PK;

alter table CL_ARTICLE_TAG
   drop constraint PK_CL_ARTICLE_TAG;

drop table tmp_CL_ARTICLE_TAG;

alter table CL_ARTICLE_TAG
   rename to tmp_CL_ARTICLE_TAG;

drop table RELATED_ARTICLE;

create table ARTICLE_CL_ARTICLE_TAG (
   ARTICLE_ID           INT4                 not null,
   CL_ARTICLE_TAG_ID    INT4                 not null,
   constraint PK_ARTICLE_CL_ARTICLE_TAG primary key (ARTICLE_ID, CL_ARTICLE_TAG_ID)
);

comment on table ARTICLE_CL_ARTICLE_TAG is
'Relationship_12';

comment on column ARTICLE_CL_ARTICLE_TAG.ARTICLE_ID is
'Идентфикатор Статья';

comment on column ARTICLE_CL_ARTICLE_TAG.CL_ARTICLE_TAG_ID is
'Идентификатор Тэг статьи';

insert into ARTICLE_CL_ARTICLE_TAG (ARTICLE_ID, CL_ARTICLE_TAG_ID)
select ARTICLE_ID, CL_ARTICLE_ID
from tmp_ARTICLE_CL_ARTICLE_TAG;

drop table tmp_ARTICLE_CL_ARTICLE_TAG;

create  index Relationship_15_FK on ARTICLE_CL_ARTICLE_TAG (
ARTICLE_ID
);

create  index Relationship_16_FK on ARTICLE_CL_ARTICLE_TAG (
CL_ARTICLE_TAG_ID
);

create table BUSINESS_SERVICE (
   BUSINESS_SERVICE_ID  SERIAL               not null,
   SITE_SECTION_ID      INT4                 not null,
   BUSINESS_SERVICE_NAME TEXT                 not null,
   BUSINESS_SERVICE_SLUG TEXT                 null,
   BUSINESS_SERVICE_IMG_SMALL TEXT                 null,
   BUSINESS_SERVICE_IMG_BIG TEXT                 null,
   BUSINESS_SERVICE_STATUS NUMERIC              null default 0
      constraint CKC_BUSINESS_SERVICE__BUSINESS check (BUSINESS_SERVICE_STATUS is null or (BUSINESS_SERVICE_STATUS between 0 and 1)),
   BUSINESS_SERVICE_PRIORITY NUMERIC              null,
   BUSINESS_SERVICE_PARENT_ID NUMERIC              null,
   BUSINESS_SERVICE_FREE_TEXT1 TEXT                 null,
   BUSINESS_SERVICE_FREE_TEXT2 TEXT                 null,
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

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_FREE_TEXT1 is
'Текстовый блок 1 Услуга';

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_FREE_TEXT2 is
'Текстовый блок 2 Услуга';

insert into BUSINESS_SERVICE (BUSINESS_SERVICE_ID, SITE_SECTION_ID, BUSINESS_SERVICE_NAME, BUSINESS_SERVICE_SLUG, BUSINESS_SERVICE_IMG_SMALL, BUSINESS_SERVICE_IMG_BIG, BUSINESS_SERVICE_STATUS, BUSINESS_SERVICE_PRIORITY, BUSINESS_SERVICE_PARENT_ID, BUSINESS_SERVICE_FREE_TEXT1, BUSINESS_SERVICE_FREE_TEXT2)
select BUSINESS_SERVICE_ID, SITE_SECTION_ID, BUSINESS_SERVICE_NAME, BUSINESS_SERVICE_SLUG, BUSINESS_SERVICE_IMG_SMALL, BUSINESS_SERVICE_IMG_BIG, BUSINESS_SERVICE_STATUS, BUSINESS_SERVICE_PRIORITY, BUSINESS_SERVICE_PARENT_ID, BUSINESS_SERVICE_FREE_TEXT1, BUSINESS_SERVICE_FREE_TEXT2
from tmp_BUSINESS_SERVICE;

drop table tmp_BUSINESS_SERVICE;

create unique index BUSINESS_SERVICE_PK on BUSINESS_SERVICE (
BUSINESS_SERVICE_ID
);

create  index Relationship_8_FK on BUSINESS_SERVICE (
SITE_SECTION_ID
);

create table BUSINESS_SERVICE_PRICE (
   BUSINESS_SERVICE_PRICE_ID SERIAL               not null,
   BUSINESS_SERVICE_ID  INT4                 null,
   BUSINESS_SERVICE_PRICE_UNIT TEXT                 null,
   BUSINESS_SERVICE_PRICE_VAL NUMERIC              null,
   constraint PK_BUSINESS_SERVICE_PRICE primary key (BUSINESS_SERVICE_PRICE_ID)
);

comment on table BUSINESS_SERVICE_PRICE is
'Прайс лист услуги';

comment on column BUSINESS_SERVICE_PRICE.BUSINESS_SERVICE_PRICE_ID is
'Идентфиикатор Прайс лист услуги';

comment on column BUSINESS_SERVICE_PRICE.BUSINESS_SERVICE_ID is
'Идентификатор Услуга';

comment on column BUSINESS_SERVICE_PRICE.BUSINESS_SERVICE_PRICE_UNIT is
'Единица измерения Прайс лист услуги';

comment on column BUSINESS_SERVICE_PRICE.BUSINESS_SERVICE_PRICE_VAL is
'Цена Прайс лист услуги';

create unique index BUSINESS_SERVICE_PRICE_PK on BUSINESS_SERVICE_PRICE (
BUSINESS_SERVICE_PRICE_ID
);

create  index Relationship_20_FK2 on BUSINESS_SERVICE_PRICE (
BUSINESS_SERVICE_ID
);

create table CL_ARTICLE_TAG (
   CL_ARTICLE_TAG_ID    SERIAL               not null,
   CL_ARTICLE_TAG_NAME  TEXT                 null,
   constraint PK_CL_ARTICLE_TAG primary key (CL_ARTICLE_TAG_ID)
);

comment on table CL_ARTICLE_TAG is
'Тэг статьи';

comment on column CL_ARTICLE_TAG.CL_ARTICLE_TAG_ID is
'Идентификатор Тэг статьи';

comment on column CL_ARTICLE_TAG.CL_ARTICLE_TAG_NAME is
'Наименование Тэг статьи';

insert into CL_ARTICLE_TAG (CL_ARTICLE_TAG_ID, CL_ARTICLE_TAG_NAME)
select CL_ARTICLE_ID, CL_ARTICLE_NAME
from tmp_CL_ARTICLE_TAG;

drop table tmp_CL_ARTICLE_TAG;

create unique index CL_ARTICLE_TAG_PK on CL_ARTICLE_TAG (
CL_ARTICLE_TAG_ID
);

alter table ARTICLE_CL_ARTICLE_TAG
   add constraint FK_ARTICLE__ARTICLE_C_ARTICLE foreign key (ARTICLE_ID)
      references ARTICLE (ARTICLE_ID)
      on delete restrict on update restrict;

alter table ARTICLE_CL_ARTICLE_TAG
   add constraint FK_ARTICLE__ARTICLE_C_CL_ARTIC foreign key (CL_ARTICLE_TAG_ID)
      references CL_ARTICLE_TAG (CL_ARTICLE_TAG_ID)
      on delete restrict on update restrict;

alter table BUSINESS_SERVICE
   add constraint FK_BUSINESS_RELATIONS_SITE_SEC foreign key (SITE_SECTION_ID)
      references SITE_SECTION (SITE_SECTION_ID)
      on delete restrict on update restrict;

alter table BUSINESS_SERVICE_ACTIVITY
   add constraint FK_BUSINESS_BUSINESS__BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

alter table BUSINESS_SERVICE_ARTICLE
   add constraint FK_BUSINESS_BUSINESS__BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

alter table BUSINESS_SERVICE_CL_CLIENT
   add constraint FK_BUSINESS_BUSINESS__BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

alter table BUSINESS_SERVICE_PRICE
   add constraint FK_BUSINESS_RELATIONS_BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

alter table CL_BRAND_BUSINESS_SERVICE
   add constraint FK_CL_BRAND_CL_BRAND__BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

alter table META_TAG_CONTENT
   add constraint FK_META_TAG_RELATIONS_BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

