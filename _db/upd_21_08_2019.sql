drop table CL_BRAND;

create table CL_BRAND (
   CL_BRAND_ID          SERIAL               not null,
   CL_BRAND_NAME        TEXT                 null,
   CL_BRAND_IMG_SMALL   TEXT                 null,
   CL_BRAND_IMG_BIG     TEXT                 null,
   CL_BRAND_URL         TEXT                 null,
   CL_BRAND_PRIORITY    NUMERIC              null,
   constraint PK_CL_BRAND primary key (CL_BRAND_ID)
);

comment on table CL_BRAND is
'Брэнд';

comment on column CL_BRAND.CL_BRAND_ID is
'Идентфиикатор Брэнд';

comment on column CL_BRAND.CL_BRAND_NAME is
'Наименование Брэнд';

comment on column CL_BRAND.CL_BRAND_IMG_SMALL is
'Картинка малая Брэнд';

comment on column CL_BRAND.CL_BRAND_IMG_BIG is
'Картинка большая Брэнд';

comment on column CL_BRAND.CL_BRAND_URL is
'Ссылка на Брэнд';

comment on column CL_BRAND.CL_BRAND_PRIORITY is
'Приоритет Брэнд';

create unique index CL_BRAND_PK on CL_BRAND (
CL_BRAND_ID
);

create table PARTNER (
   PARTNER_ID           SERIAL               not null,
   PARTNER_GROUP_ID     INT4                 null,
   PARTNER_NAME         TEXT                 null,
   PARTNER_URL          TEXT                 null,
   PARTNER_PRIORITY     NUMERIC              null,
   constraint PK_PARTNER primary key (PARTNER_ID)
);

comment on table PARTNER is
'Партнер';

comment on column PARTNER.PARTNER_ID is
'Идентификатор Партнер';

comment on column PARTNER.PARTNER_GROUP_ID is
'Идентификатор Группа партнера';

comment on column PARTNER.PARTNER_NAME is
'Наименование Партнер';

comment on column PARTNER.PARTNER_URL is
'Ссылка Партнер';

comment on column PARTNER.PARTNER_PRIORITY is
'Приоритет Партнер';

create unique index PARTNER_PK on PARTNER (
PARTNER_ID
);

create  index Relationship_15_FK2 on PARTNER (
PARTNER_GROUP_ID
);

create table PARTNER_GROUP (
   PARTNER_GROUP_ID     SERIAL               not null,
   PARTNER_GROUP_NAME   TEXT                 null,
   PARTNER_GROUP_PRIORITY NUMERIC              null,
   constraint PK_PARTNER_GROUP primary key (PARTNER_GROUP_ID)
);

comment on table PARTNER_GROUP is
'Группа партнера';

comment on column PARTNER_GROUP.PARTNER_GROUP_ID is
'Идентификатор Группа партнера';

comment on column PARTNER_GROUP.PARTNER_GROUP_NAME is
'Наименование Группа партнера';

comment on column PARTNER_GROUP.PARTNER_GROUP_PRIORITY is
'Приоритет Группа партнера';

create unique index PARTNER_GROUP_PK on PARTNER_GROUP (
PARTNER_GROUP_ID
);

alter table PARTNER
   add constraint FK_PARTNER_RELATIONS_PARTNER_ foreign key (PARTNER_GROUP_ID)
      references PARTNER_GROUP (PARTNER_GROUP_ID)
      on delete restrict on update restrict;

alter table SITE_SECTION_BRAND
   add constraint FK_SITE_SEC_SITE_SECT_CL_BRAND foreign key (CL_BRAND_ID)
      references CL_BRAND (CL_BRAND_ID)
      on delete restrict on update restrict;

