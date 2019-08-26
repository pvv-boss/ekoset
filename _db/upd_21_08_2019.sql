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
'�����';

comment on column CL_BRAND.CL_BRAND_ID is
'������������� �����';

comment on column CL_BRAND.CL_BRAND_NAME is
'������������ �����';

comment on column CL_BRAND.CL_BRAND_IMG_SMALL is
'�������� ����� �����';

comment on column CL_BRAND.CL_BRAND_IMG_BIG is
'�������� ������� �����';

comment on column CL_BRAND.CL_BRAND_URL is
'������ �� �����';

comment on column CL_BRAND.CL_BRAND_PRIORITY is
'��������� �����';

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
'�������';

comment on column PARTNER.PARTNER_ID is
'������������� �������';

comment on column PARTNER.PARTNER_GROUP_ID is
'������������� ������ ��������';

comment on column PARTNER.PARTNER_NAME is
'������������ �������';

comment on column PARTNER.PARTNER_URL is
'������ �������';

comment on column PARTNER.PARTNER_PRIORITY is
'��������� �������';

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
'������ ��������';

comment on column PARTNER_GROUP.PARTNER_GROUP_ID is
'������������� ������ ��������';

comment on column PARTNER_GROUP.PARTNER_GROUP_NAME is
'������������ ������ ��������';

comment on column PARTNER_GROUP.PARTNER_GROUP_PRIORITY is
'��������� ������ ��������';

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

