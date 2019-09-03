drop index Relationship_21_FK;

drop index Relationship_20_FK;

alter table CL_BRAND_BUSINESS_SERVICE
   drop constraint PK_CL_BRAND_BUSINESS_SERVICE;

drop table tmp_CL_BRAND_BUSINESS_SERVICE;

alter table CL_BRAND_BUSINESS_SERVICE
   rename to tmp_CL_BRAND_BUSINESS_SERVICE;

alter table BUSINESS_SERVICE
   add column BUSINESS_SERVICE_FREE_TEXT1 TEXT;

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_FREE_TEXT1 is
'Текстовый блок 1 Услуга';

alter table BUSINESS_SERVICE
   add column BUSINESS_SERVICE_FREE_TEXT2 TEXT;

comment on column BUSINESS_SERVICE.BUSINESS_SERVICE_FREE_TEXT2 is
'Текстовый блок 2 Услуга';

create table CL_BRAND_BUSINESS_SERVICE (
   CL_BRAND_ID          INT4                 not null,
   BUSINESS_SERVICE_ID  INT4                 not null,
   constraint PK_CL_BRAND_BUSINESS_SERVICE primary key (CL_BRAND_ID, BUSINESS_SERVICE_ID)
);

comment on table CL_BRAND_BUSINESS_SERVICE is
'Relationship_21';

comment on column CL_BRAND_BUSINESS_SERVICE.CL_BRAND_ID is
'Идентфиикатор Брэнд';

comment on column CL_BRAND_BUSINESS_SERVICE.BUSINESS_SERVICE_ID is
'Идентификатор Услуга';

insert into CL_BRAND_BUSINESS_SERVICE (CL_BRAND_ID, BUSINESS_SERVICE_ID)
select CL_BRAND_ID, BUSINESS_SERVICE_ID
from tmp_CL_BRAND_BUSINESS_SERVICE;

drop table tmp_CL_BRAND_BUSINESS_SERVICE;

create  index Relationship_20_FK on CL_BRAND_BUSINESS_SERVICE (
CL_BRAND_ID
);

create  index Relationship_21_FK on CL_BRAND_BUSINESS_SERVICE (
BUSINESS_SERVICE_ID
);

alter table CL_CLIENT
   add column CL_CLIENT_FREE_TEXT1 TEXT;

comment on column CL_CLIENT.CL_CLIENT_FREE_TEXT1 is
'Текстовый блок 1 Тип клиента';

alter table CL_CLIENT
   add column CL_CLIENT_FREE_TEXT2 TEXT;

comment on column CL_CLIENT.CL_CLIENT_FREE_TEXT2 is
'Текстовый блок 2 Тип клиента';

alter table INDIVIDUAL_OFFER
   add column IND_OFFER_FREE_TEXT1 TEXT;

comment on column INDIVIDUAL_OFFER.IND_OFFER_FREE_TEXT1 is
'Текстовый блок 1 ИндП';

alter table INDIVIDUAL_OFFER
   add column IND_OFFER_FREE_TEXT2 TEXT;

comment on column INDIVIDUAL_OFFER.IND_OFFER_FREE_TEXT2 is
'Текстовый блок 2 ИндП';

alter table SITE_SECTION
   add column SITE_SECTION_FREE_TEXT1 TEXT;

comment on column SITE_SECTION.SITE_SECTION_FREE_TEXT1 is
'Текстовый блок 1 Раздел сайта';

alter table SITE_SECTION
   add column SITE_SECTION_FREE_TEXT2 TEXT;

comment on column SITE_SECTION.SITE_SECTION_FREE_TEXT2 is
'Текстовый блок 2 Раздел сайта';

alter table CL_BRAND_BUSINESS_SERVICE
   add constraint FK_CL_BRAND_CL_BRAND__CL_BRAND foreign key (CL_BRAND_ID)
      references CL_BRAND (CL_BRAND_ID)
      on delete restrict on update restrict;

alter table CL_BRAND_BUSINESS_SERVICE
   add constraint FK_CL_BRAND_CL_BRAND__BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

