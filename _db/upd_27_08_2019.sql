drop index Relationship_10_PK;

create  index BUSINESS_SERVICE_CL_CLIENT_FK on BUSINESS_SERVICE_CL_CLIENT (
CL_CLIENT_ID
);

create table CL_BRAND_BUSINESS_SERVICE (
   CL_BRAND_ID          INTEGER                 not null,
   BUSINESS_SERVICE_ID  INTEGER                 not null,
   constraint PK_CL_BRAND_BUSINESS_SERVICE primary key (CL_BRAND_ID, BUSINESS_SERVICE_ID)
);

comment on table CL_BRAND_BUSINESS_SERVICE is
'Relationship_21';

comment on column CL_BRAND_BUSINESS_SERVICE.CL_BRAND_ID is
'Идентфиикатор Брэнд';

comment on column CL_BRAND_BUSINESS_SERVICE.BUSINESS_SERVICE_ID is
'Идентификатор Услуга';

create  index Relationship_20_FK on CL_BRAND_BUSINESS_SERVICE (
CL_BRAND_ID
);

create  index Relationship_21_FK on CL_BRAND_BUSINESS_SERVICE (
BUSINESS_SERVICE_ID
);

create table CL_CLIENT (
   CL_CLIENT_ID         SERIAL               not null,
   CL_CLIENT_NAME       TEXT                 not null,
   CL_CLIENT_IMG_SMALL  TEXT                 null,
   CL_CLIENT_IMG_BIG    TEXT                 null,
   constraint PK_CL_CLIENT primary key (CL_CLIENT_ID)
);

comment on table CL_CLIENT is
'Тип клиента';

comment on column CL_CLIENT.CL_CLIENT_ID is
'Идентификатор Тип клиента';

comment on column CL_CLIENT.CL_CLIENT_NAME is
'Наименование Тип клиента';

comment on column CL_CLIENT.CL_CLIENT_IMG_SMALL is
'Картинка малая Тип клиента';

comment on column CL_CLIENT.CL_CLIENT_IMG_BIG is
'Картинка большая Тип клиента';

create unique index CL_CLIENT_PK on CL_CLIENT (
CL_CLIENT_ID
);

create  index Relationship_7_FK on INDIVIDUAL_OFFER (
CL_CLIENT_ID
);

alter table BUSINESS_SERVICE_CL_CLIENT
   add constraint FK_BUSINESS_BUSINESS__CL_CLIEN foreign key (CL_CLIENT_ID)
      references CL_CLIENT (CL_CLIENT_ID)
      on delete restrict on update restrict;

alter table CL_BRAND_BUSINESS_SERVICE
   add constraint FK_CL_BRAND_BUSINESS__CL_BRAND foreign key (CL_BRAND_ID)
      references CL_BRAND (CL_BRAND_ID)
      on delete restrict on update restrict;

alter table CL_BRAND_BUSINESS_SERVICE
   add constraint FK_CL_BRAND_BUSINESS__BUSINESS foreign key (BUSINESS_SERVICE_ID)
      references BUSINESS_SERVICE (BUSINESS_SERVICE_ID)
      on delete restrict on update restrict;

alter table INDIVIDUAL_OFFER
   add constraint FK_INDIVIDU_RELATIONS_CL_CLIEN foreign key (CL_CLIENT_ID)
      references CL_CLIENT (CL_CLIENT_ID)
      on delete restrict on update restrict;

