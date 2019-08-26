drop table META_TAG_CONTENT;

drop table SITE_PAGE;

alter table CL_BRAND
   add column CL_BRAND_MAIN_PAGE_VISIBLE NUMERIC;

comment on column CL_BRAND.CL_BRAND_MAIN_PAGE_VISIBLE is
'Отображать на главной странице Брэнд';

create table META_TAG_CONTENT (
   META_TAG_CONTENT_ID  SERIAL               not null,
   BUSINESS_SERVICE_ID  INT4                 null,
   ARTICLE_ID           INT4                 null,
   IND_OFFER_ID         INT4                 null,
   CL_META_TAG_ID       INT4                 not null,
   SITE_SECTION_ID      INT4                 null,
   META_TAG_CONTENT_VAL TEXT                 null,
   constraint PK_META_TAG_CONTENT primary key (META_TAG_CONTENT_ID)
);

comment on table META_TAG_CONTENT is
'Значение мета тэга';

comment on column META_TAG_CONTENT.META_TAG_CONTENT_ID is
'Идентификатор Значение мета тэга';

comment on column META_TAG_CONTENT.BUSINESS_SERVICE_ID is
'Идентификатор Услуга';

comment on column META_TAG_CONTENT.ARTICLE_ID is
'Идентфикатор Статья';

comment on column META_TAG_CONTENT.IND_OFFER_ID is
'Идентификатор ИндП';

comment on column META_TAG_CONTENT.CL_META_TAG_ID is
'Идентификатор Мета тэг';

comment on column META_TAG_CONTENT.SITE_SECTION_ID is
'Идентификатор Раздел сайта';

comment on column META_TAG_CONTENT.META_TAG_CONTENT_VAL is
'Згачение метатэга';

create unique index META_TAG_CONTENT_PK on META_TAG_CONTENT (
META_TAG_CONTENT_ID
);

create  index Relationship_16_FK2 on META_TAG_CONTENT (
SITE_SECTION_ID
);

create  index Relationship_18_FK2 on META_TAG_CONTENT (
IND_OFFER_ID
);

create  index Relationship_19_FK on META_TAG_CONTENT (
ARTICLE_ID
);

create  index Relationship_18_FK on META_TAG_CONTENT (
CL_META_TAG_ID
);

create  index IND_BS_META_TAG on META_TAG_CONTENT (
BUSINESS_SERVICE_ID
);

alter table META_TAG_CONTENT
   add constraint FK_META_TAG_RELATIONS_CL_META_ foreign key (CL_META_TAG_ID)
      references CL_META_TAG (CL_META_TAG_ID)
      on delete restrict on update restrict;

alter table META_TAG_CONTENT
   add constraint FK_META_TAG_RELATIONS_SITE_SEC foreign key (SITE_SECTION_ID)
      references SITE_SECTION (SITE_SECTION_ID)
      on delete restrict on update restrict;

alter table META_TAG_CONTENT
   add constraint FK_META_TAG_RELATIONS_ARTICLE foreign key (ARTICLE_ID)
      references ARTICLE (ARTICLE_ID)
      on delete restrict on update restrict;

alter table META_TAG_CONTENT
   add constraint FK_META_TAG_RELATIONS_INDIVIDU foreign key (IND_OFFER_ID)
      references INDIVIDUAL_OFFER (IND_OFFER_ID)
      on delete restrict on update restrict;

alter table META_TAG_CONTENT
   add constraint FK_META_TAG_RELATIONS_BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

