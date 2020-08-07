--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: brc_ekoset; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA brc_ekoset;


--
-- Name: f_admin_add_activitytype2service(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_add_activitytype2service(li_service_id integer, li_activity_type_id integer) RETURNS numeric
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
BEGIN
  INSERT INTO brc_ekoset.business_service_activity (cl_activity_id,business_service_id) values (li_activity_type_id, li_service_id)
  ON CONFLICT ON CONSTRAINT pk_business_service_activity DO NOTHING;
  
  return 1;
END;
$$;


--
-- Name: f_admin_add_article2service(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_add_article2service(li_service_id integer, li_article_id integer) RETURNS numeric
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
BEGIN
  INSERT INTO brc_ekoset.business_service_article (article_id,business_service_id) values (li_article_id, li_service_id)
  ON CONFLICT ON CONSTRAINT pk_business_service_article DO NOTHING;
  
  return 1;
END;
$$;


--
-- Name: f_admin_add_block_info_offer(integer, integer, integer, integer, text, text, text, text, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_add_block_info_offer(li_ind_offer_id integer, li_block_code integer, li_block_visible_ind integer, li_block_position integer, li_block_name text, li_block_header text, li_block_content text, li_block_content_right text, li_block_id integer) RETURNS numeric
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
BEGIN
if li_block_id =0 then 
  insert into brc_ekoset.site_block 
  (
      cl_site_block_d,
      IND_OFFER_ID,
      site_block_visible_ind,
      site_block_position,
      site_block_name, 
      site_block_header, 
      site_block_content, 
      site_block_content_right     
  )
  SELECT
   (select 
      cl_site_block_id 
      from brc_ekoset.cl_site_block
      where cl_site_block_code = li_block_code
    ),
    li_ind_offer_id,
    li_block_visible_ind,
    li_block_position,
    li_block_name, 
    li_block_header, 
    li_block_content, 
    li_block_content_right;

else 
      UPDATE 
    brc_ekoset.site_block set
        cl_site_block_d = (select 
              cl_site_block_id 
              from brc_ekoset.cl_site_block
              where cl_site_block_code = li_block_code
        ),
        IND_OFFER_ID = li_ind_offer_id,
        site_block_visible_ind = li_block_visible_ind,
        site_block_position = li_block_position,
        site_block_name = li_block_name, 
        site_block_header = li_block_header, 
        site_block_content = li_block_content, 
        site_block_content_right =li_block_content_right
        
        where site_block_id = li_block_id;
end if;
  
  return 1;
END;
$$;


--
-- Name: f_admin_add_block_info_page(integer, integer, integer, integer, text, text, text, text, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_add_block_info_page(li_sitepage_id integer, li_block_code integer, li_block_visible_ind integer, li_block_position integer, li_block_name text, li_block_header text, li_block_content text, li_block_content_right text, li_block_id integer) RETURNS numeric
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
BEGIN

if li_block_id =0 then 
  insert into brc_ekoset.site_block 
  (
      cl_site_block_d,
      site_page_id,
      site_block_visible_ind,
      site_block_position,
      site_block_name, 
      site_block_header, 
      site_block_content, 
      site_block_content_right     
  )
  SELECT
   (select 
      cl_site_block_id 
      from brc_ekoset.cl_site_block
      where cl_site_block_code = li_block_code
    ),
    li_sitepage_id,
    li_block_visible_ind,
    li_block_position,
    li_block_name, 
    li_block_header, 
    li_block_content, 
    li_block_content_right;
 
else 
    UPDATE 
    brc_ekoset.site_block set
        cl_site_block_d = (select 
              cl_site_block_id 
              from brc_ekoset.cl_site_block
              where cl_site_block_code = li_block_code
        ),
        site_page_id = li_sitepage_id,
        site_block_visible_ind = li_block_visible_ind,
        site_block_position = li_block_position,
        site_block_name = li_block_name, 
        site_block_header = li_block_header, 
        site_block_content = li_block_content, 
        site_block_content_right =li_block_content_right
        
        where site_block_id = li_block_id;
end if;
  return 1;
END;
$$;


--
-- Name: f_admin_add_block_info_service(integer, integer, integer, integer, text, text, text, text, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_add_block_info_service(li_service_id integer, li_block_code integer, li_block_visible_ind integer, li_block_position integer, li_block_name text, li_block_header text, li_block_content text, li_block_content_right text, li_block_id integer) RETURNS numeric
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
BEGIN
  
  
  
if li_block_id =0 then 
  insert into brc_ekoset.site_block 
  (
      cl_site_block_d,
      BUSINESS_SERVICE_ID,
      site_block_visible_ind,
      site_block_position,
      site_block_name, 
      site_block_header, 
      site_block_content, 
      site_block_content_right     
  )
  SELECT
   (select 
      cl_site_block_id 
      from brc_ekoset.cl_site_block
      where cl_site_block_code = li_block_code
    ),
    li_service_id,
    li_block_visible_ind,
    li_block_position,
    li_block_name, 
    li_block_header, 
    li_block_content, 
    li_block_content_right;

else 
      UPDATE 
    brc_ekoset.site_block set
        cl_site_block_d = (select 
              cl_site_block_id 
              from brc_ekoset.cl_site_block
              where cl_site_block_code = li_block_code
        ),
        BUSINESS_SERVICE_ID = li_service_id,
        site_block_visible_ind = li_block_visible_ind,
        site_block_position = li_block_position,
        site_block_name = li_block_name, 
        site_block_header = li_block_header, 
        site_block_content = li_block_content, 
        site_block_content_right =li_block_content_right
        
        where site_block_id = li_block_id;
end if;
  
  return 1;
END;
$$;


--
-- Name: f_admin_add_block_info_sitesection(integer, integer, integer, integer, text, text, text, text, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_add_block_info_sitesection(li_sitesection_id integer, li_block_code integer, li_block_visible_ind integer, li_block_position integer, li_block_name text, li_block_header text, li_block_content text, li_block_content_right text, li_block_id integer) RETURNS numeric
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
BEGIN

if li_block_id =0 then 
  insert into brc_ekoset.site_block 
  (
      cl_site_block_d,
      site_section_id,
      site_block_visible_ind,
      site_block_position,
      site_block_name, 
      site_block_header, 
      site_block_content, 
      site_block_content_right     
  )
  SELECT
   (select 
      cl_site_block_id 
      from brc_ekoset.cl_site_block
      where cl_site_block_code = li_block_code
    ),
    li_sitesection_id,
    li_block_visible_ind,
    li_block_position,
    li_block_name, 
    li_block_header, 
    li_block_content, 
    li_block_content_right;
 
else 
    UPDATE 
    brc_ekoset.site_block set
        cl_site_block_d = (select 
              cl_site_block_id 
              from brc_ekoset.cl_site_block
              where cl_site_block_code = li_block_code
        ),
        site_section_id = li_sitesection_id,
        site_block_visible_ind = li_block_visible_ind,
        site_block_position = li_block_position,
        site_block_name = li_block_name, 
        site_block_header = li_block_header, 
        site_block_content = li_block_content, 
        site_block_content_right =li_block_content_right
        
        where site_block_id = li_block_id;
end if;
  return 1;
END;
$$;


--
-- Name: f_admin_add_brand2service(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_add_brand2service(brand_id integer, service_id integer) RETURNS numeric
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
BEGIN
  INSERT INTO brc_ekoset.cl_brand_business_service (cl_brand_id,business_service_id) values (brand_id, service_id)
  ON CONFLICT ON CONSTRAINT pk_cl_brand_business_service DO NOTHING;
  
  return 1;
END;
$$;


--
-- Name: f_admin_add_brand2sitesection(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_add_brand2sitesection(li_brand_id integer, li_sitesection_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  INSERT INTO brc_ekoset.site_section_brand (cl_brand_id,site_section_id) values (li_brand_id, li_sitesection_id)
  ON CONFLICT ON CONSTRAINT pk_site_section_brand DO NOTHING;
  
  return 1;
END;
$$;


--
-- Name: f_admin_add_clienttype2service(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_add_clienttype2service(li_cl_client_id integer, li_service_id integer) RETURNS numeric
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
BEGIN
  INSERT INTO brc_ekoset.business_service_cl_client (cl_client_id,business_service_id) values (li_cl_client_id, li_service_id)
  ON CONFLICT ON CONSTRAINT pk_business_service_cl_client DO NOTHING;
  
  return 1;
END;
$$;


--
-- Name: f_admin_add_related_service(integer, integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_add_related_service(li_service_id integer, li_related_service_id integer, li_priority integer) RETURNS numeric
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
BEGIN
  INSERT INTO brc_ekoset.business_service_related (business_service_id,bus_business_service_id,business_service_related_priori) 
  values (li_service_id, li_related_service_id,li_priority)
 ON CONFLICT ON CONSTRAINT business_service_related_idx 
 DO 
 update 
 set business_service_related_priori = li_priority
 /*where business_service_id = li_service_id and
       bus_business_service_id = li_related_service_id*/
 ;
  
  return 1;
END;
$$;


--
-- Name: f_admin_article_service(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_article_service(li_article_id integer, li_site_section_id integer) RETURNS TABLE(business_service_id integer, business_service_name text, business_service_slug text, has_relation boolean)
    LANGUAGE plpgsql
    AS $$
DECLARE
  test integer;
BEGIN
  RETURN QUERY 
  SELECT 
  	   servis.business_service_id, 
	   servis.business_service_name, 
       servis.business_service_slug  ,
	CASE
        WHEN  
          exists 
            (SELECT 1 
            	FROM brc_ekoset.business_service_article bsa
            	WHERE servis.business_service_id = bsa.business_service_id and bsa.article_id = li_article_id
            ) 
        THEN true::boolean
        ELSE false::boolean
	END AS has_relation
FROM brc_ekoset.v_api_business_service servis
where servis.site_section_id =li_site_section_id;


END;
$$;


--
-- Name: f_admin_article_tags_relation(integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_article_tags_relation(li_article_id integer) RETURNS TABLE(cl_article_id integer, cl_article_name text, has_relation boolean)
    LANGUAGE plpgsql
    AS $$
DECLARE
  test integer;
BEGIN
  RETURN QUERY 
  SELECT 
  	   tags.cl_article_id,
       tags.cl_article_name,
	CASE
        WHEN  
          exists 
            (SELECT 1 
            	FROM brc_ekoset.article_cl_article_tag arttag
            	WHERE arttag.article_id = li_article_id and arttag.cl_article_id = tags.cl_article_id
            ) 
        THEN true::boolean
        ELSE false::boolean
	END AS has_relation
FROM brc_ekoset.cl_article_tag tags;


END;
$$;


--
-- Name: f_admin_brands_service(integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_brands_service(li_sitesection_id integer) RETURNS TABLE(cl_brand_id integer, cl_brand_name text, cl_brand_url text, cl_brand_priority numeric, has_relation boolean, cl_activity_name text)
    LANGUAGE plpgsql
    AS $$
DECLARE
  test integer;
BEGIN
  RETURN QUERY 
  SELECT 
  	   clbrand.cl_brand_id, 
	   clbrand.cl_brand_name, 
       clbrand.cl_brand_url, 
       clbrand.cl_brand_priority,    
	CASE
        WHEN  
          exists 
            (SELECT 1 
            	FROM brc_ekoset.cl_brand_business_service ss 
            	WHERE ss.business_service_id = li_sitesection_id and ss.cl_brand_id=clbrand.cl_brand_id
            ) 
        THEN true::boolean
        ELSE false::boolean
	END AS has_relation,
    activ.cl_activity_name
FROM brc_ekoset.cl_brand clbrand
JOIN brc_ekoset.cl_activity activ ON clbrand.cl_activity_id = activ.cl_activity_id
order by activ.cl_activity_name, clbrand.cl_brand_name;

END;
$$;


--
-- Name: f_admin_brands_sitesection(integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_brands_sitesection(li_sitesection_id integer) RETURNS TABLE(cl_brand_id integer, cl_brand_name text, cl_brand_url text, cl_brand_priority numeric, cl_activity_name text, has_relation boolean)
    LANGUAGE plpgsql
    AS $$
DECLARE
  test integer;
BEGIN
  RETURN QUERY 
  SELECT 
  	   clbrand.cl_brand_id, 
	   clbrand.cl_brand_name, 
       clbrand.cl_brand_url, 
       clbrand.cl_brand_priority,
       activ.cl_activity_name,    
	CASE
        WHEN  
          exists 
            (SELECT 1 
            	FROM brc_ekoset.site_section_brand ss 
            	WHERE site_section_id = li_sitesection_id and ss.cl_brand_id=clbrand.cl_brand_id
            ) 
        THEN true::boolean
        ELSE false::boolean
	END AS has_relation
FROM brc_ekoset.cl_brand clbrand
JOIN brc_ekoset.cl_activity activ ON clbrand.cl_activity_id = activ.cl_activity_id
order by activ.cl_activity_name, clbrand.cl_brand_name;

END;
$$;


--
-- Name: f_admin_cl_activities_service(integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_cl_activities_service(li_business_service_id integer) RETURNS TABLE(cl_activity_id integer, cl_activity_name text, has_relation boolean)
    LANGUAGE plpgsql
    AS $$
DECLARE
  test integer;
BEGIN
  RETURN QUERY 
  SELECT 
  	   clactivity.cl_activity_id, 
	   clactivity.cl_activity_name, 
    CASE
        WHEN  
          exists 
            (SELECT 1 
            	FROM brc_ekoset.business_service_activity ss 
            	WHERE ss.business_service_id = li_business_service_id and ss.cl_activity_id=clactivity.cl_activity_id
            ) 
        THEN true::boolean
        ELSE false::boolean
	END AS has_relation
FROM brc_ekoset.cl_activity clactivity;


END;
$$;


--
-- Name: f_admin_cl_client_service(integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_cl_client_service(li_service_id integer) RETURNS TABLE(cl_client_id integer, cl_client_name text, has_relation boolean)
    LANGUAGE plpgsql
    AS $$
DECLARE
  test integer;
BEGIN
  RETURN QUERY 
  SELECT 
  	   client.cl_client_id, 
	   client.cl_client_name, 
    CASE
        WHEN  
          exists 
            (SELECT 1 
            	from brc_ekoset.business_service_cl_client ss 
            	WHERE ss.business_service_id = li_service_id and ss.cl_client_id =client.cl_client_id
            ) 
        THEN true::boolean
        ELSE false::boolean
	END AS has_relation
	FROM brc_ekoset.cl_client client;
END;
$$;


--
-- Name: f_admin_related_service(integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_related_service(li_service_id integer) RETURNS TABLE("businessServiceId" integer, "businessServiceName" text, business_service_slug text, "hasRelation" boolean, site_section_id integer, service_parent_id numeric)
    LANGUAGE plpgsql
    AS $$
DECLARE
  test integer;
BEGIN
  RETURN QUERY 
   SELECT 
  	   servis.business_service_id as businessServiceId, 
	   servis.business_service_name as businessServiceName, 
       servis.business_service_slug  ,
	CASE
        WHEN  
          exists 
            (SELECT 1 
            	FROM brc_ekoset.business_service_related relat
            	WHERE servis.business_service_id = relat.bus_business_service_id and relat.business_service_id = li_service_id
            ) 
        THEN true::boolean
        ELSE false::boolean
	END as hasRelation,
    servis.site_section_id,
    servis.business_service_parent_id
FROM brc_ekoset.v_api_service_recurcive servis;

END;
$$;


--
-- Name: f_admin_related_service_new(integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_related_service_new(li_service_id integer) RETURNS TABLE(site_section_id integer, site_section_name text, services jsonb)
    LANGUAGE plpgsql
    AS $$
DECLARE
  test integer;
BEGIN
  RETURN QUERY 
  SELECT brc_ekoset.site_section.site_section_id,
       brc_ekoset.site_section.site_section_name,
       jsonb_agg(to_jsonb(serv) - 'site_section_id') as services
FROM brc_ekoset.site_section
JOIN (select * from brc_ekoset.f_admin_related_service(li_service_id)) serv ON serv.site_section_id = brc_ekoset.site_section.site_section_id
GROUP BY brc_ekoset.site_section.site_section_id
ORDER BY brc_ekoset.site_section.site_section_name;

END;
$$;


--
-- Name: f_admin_remove_activitytypefromservice(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_remove_activitytypefromservice(li_service_id integer, li_activity_type_id integer) RETURNS numeric
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
BEGIN
  delete from brc_ekoset.business_service_activity where cl_activity_id = li_activity_type_id and business_service_id = li_service_id;
  
  return 1;
END;
$$;


--
-- Name: f_admin_remove_brand_from_service(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_remove_brand_from_service(li_brand_id integer, li_service_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  delete from brc_ekoset.cl_brand_business_service 
  where cl_brand_id = li_brand_id and business_service_id = li_service_id;
  return 1;
END;
$$;


--
-- Name: f_admin_remove_brand_from_sitesection(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_remove_brand_from_sitesection(li_brand_id integer, li_sitesection_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  DELETE FROM brc_ekoset.site_section_brand 
  WHERE cl_brand_id = li_brand_id AND site_section_id= li_sitesection_id;
  
  return 1;
END;
$$;


--
-- Name: f_admin_remove_clienttype_from_service(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_remove_clienttype_from_service(li_cl_client_id integer, li_service_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  delete from brc_ekoset.business_service_cl_client 
  where cl_client_id = li_cl_client_id and business_service_id = li_service_id;
  return 1;
END;
$$;


--
-- Name: f_admin_remove_related_service(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_remove_related_service(li_service_id integer, li_related_service_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  delete from brc_ekoset.business_service_related 
  where business_service_id = li_service_id and bus_business_service_id = li_related_service_id;
  return 1;
END;
$$;


--
-- Name: f_admin_remove_service_from_article(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_admin_remove_service_from_article(li_service_id integer, li_article_id integer) RETURNS numeric
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
BEGIN
  delete from brc_ekoset.business_service_article where article_id = li_article_id and business_service_id = li_service_id;
  
  return 1;
END;
$$;


--
-- Name: f_clone_activity_type(integer, integer); Type: FUNCTION; Schema: brc_ekoset; Owner: -
--

CREATE FUNCTION brc_ekoset.f_clone_activity_type(an_service_id integer, an_parent_service_id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  
BEGIN
  insert into brc_ekoset.business_service_activity (cl_activity_id, business_service_id)
	select cl_activity_id, an_service_id from brc_ekoset.business_service_activity parent_serv where parent_serv.business_service_id = an_parent_service_id;

 insert into brc_ekoset.business_service_cl_client (cl_client_id, business_service_id)
	select cl_client_id, an_service_id from brc_ekoset.business_service_cl_client parent_serv where parent_serv.business_service_id = an_parent_service_id;

END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_user; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.app_user (
    app_user_id integer NOT NULL,
    app_user_full_name text,
    app_user_email text,
    app_user_pwd_hash text,
    app_user_reg_date timestamp(0) with time zone,
    app_user_blocked_ind integer DEFAULT 0,
    app_user_blocked_date timestamp(0) with time zone,
    app_user_reset_pwd text,
    app_user_reset_exp_date timestamp(0) with time zone,
    app_user_reset_pwd_date timestamp(0) with time zone,
    app_user_reg_verified_ind integer DEFAULT 0,
    app_user_reg_token character varying(36)
);


--
-- Name: TABLE app_user; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.app_user IS 'Пользователь системы';


--
-- Name: COLUMN app_user.app_user_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_id IS 'Идентификатор пользователя';


--
-- Name: COLUMN app_user.app_user_full_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_full_name IS 'Полное имя';


--
-- Name: COLUMN app_user.app_user_email; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_email IS 'Почта пользователя';


--
-- Name: COLUMN app_user.app_user_pwd_hash; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_pwd_hash IS 'Хэш пароля пользователя';


--
-- Name: COLUMN app_user.app_user_reg_date; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_reg_date IS 'Дата регистрации пользователя';


--
-- Name: COLUMN app_user.app_user_blocked_ind; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_blocked_ind IS 'Признак блокировки пользователя';


--
-- Name: COLUMN app_user.app_user_blocked_date; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_blocked_date IS 'Дата блокировки пользователя';


--
-- Name: COLUMN app_user.app_user_reset_pwd; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_reset_pwd IS 'Токен для восстановления пароля';


--
-- Name: COLUMN app_user.app_user_reset_exp_date; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_reset_exp_date IS 'Дата истечения действия токена';


--
-- Name: COLUMN app_user.app_user_reset_pwd_date; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_reset_pwd_date IS 'Дата запроса восстановления пароля';


--
-- Name: COLUMN app_user.app_user_reg_verified_ind; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_reg_verified_ind IS 'Признак подтверждения регистрации';


--
-- Name: COLUMN app_user.app_user_reg_token; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user.app_user_reg_token IS 'GUID для подтверждения регистрации';


--
-- Name: app_user_app_user_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.app_user_app_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: app_user_app_user_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.app_user_app_user_id_seq OWNED BY brc_ekoset.app_user.app_user_id;


--
-- Name: app_user_session; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.app_user_session (
    user_session_id integer NOT NULL,
    app_user_id integer NOT NULL,
    user_session_created_at timestamp(0) with time zone NOT NULL,
    user_session_updated_at timestamp(0) with time zone,
    user_session_expired_at timestamp(0) with time zone,
    user_session_ip cidr,
    user_session_os text,
    user_session_browser text,
    user_session_agent text,
    user_session_token character varying(36),
    user_session_block_ind integer
);


--
-- Name: TABLE app_user_session; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.app_user_session IS 'Журнал активности пользователя';


--
-- Name: COLUMN app_user_session.user_session_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user_session.user_session_id IS 'Идентификатор активности пользователя';


--
-- Name: COLUMN app_user_session.app_user_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user_session.app_user_id IS 'Идентификатор пользователя';


--
-- Name: COLUMN app_user_session.user_session_created_at; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user_session.user_session_created_at IS 'Дата активности пользователя';


--
-- Name: app_user_session_user_session_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.app_user_session_user_session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: app_user_session_user_session_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.app_user_session_user_session_id_seq OWNED BY brc_ekoset.app_user_session.user_session_id;


--
-- Name: app_user_social_net_profile; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.app_user_social_net_profile (
    user_sn_profile_id integer NOT NULL,
    app_user_id integer NOT NULL,
    user_sn_profile_code numeric NOT NULL,
    user_sn_profile_type text NOT NULL,
    user_sn_profile_nick text,
    user_sn_profile_email text,
    user_sn_profile_link text,
    user_sn_profile_avatar text
);


--
-- Name: TABLE app_user_social_net_profile; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.app_user_social_net_profile IS 'Профиль (соцсети) пользователя';


--
-- Name: COLUMN app_user_social_net_profile.user_sn_profile_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user_social_net_profile.user_sn_profile_id IS 'Идентификатор профиля соцсети';


--
-- Name: COLUMN app_user_social_net_profile.app_user_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user_social_net_profile.app_user_id IS 'Идентификатор пользователя';


--
-- Name: COLUMN app_user_social_net_profile.user_sn_profile_code; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user_social_net_profile.user_sn_profile_code IS 'Код профиля соцсети пользователя';


--
-- Name: COLUMN app_user_social_net_profile.user_sn_profile_type; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user_social_net_profile.user_sn_profile_type IS 'Тип профиля соцсети пользователя';


--
-- Name: COLUMN app_user_social_net_profile.user_sn_profile_nick; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user_social_net_profile.user_sn_profile_nick IS 'Никнейм пользователя в соцсети';


--
-- Name: COLUMN app_user_social_net_profile.user_sn_profile_email; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user_social_net_profile.user_sn_profile_email IS 'Почта пользователя в соцсети';


--
-- Name: COLUMN app_user_social_net_profile.user_sn_profile_link; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user_social_net_profile.user_sn_profile_link IS 'Ссылка на профиль пользователя в соцсети';


--
-- Name: COLUMN app_user_social_net_profile.user_sn_profile_avatar; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.app_user_social_net_profile.user_sn_profile_avatar IS 'Ссылка на аватар пользователя в соц сети';


--
-- Name: app_user_social_net_profile_user_sn_profile_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.app_user_social_net_profile_user_sn_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: app_user_social_net_profile_user_sn_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.app_user_social_net_profile_user_sn_profile_id_seq OWNED BY brc_ekoset.app_user_social_net_profile.user_sn_profile_id;


--
-- Name: article; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.article (
    article_id integer NOT NULL,
    site_section_id integer,
    article_publish_date timestamp(0) with time zone,
    article_author text,
    article_title text NOT NULL,
    article_slug text,
    article_description text,
    article_body text,
    article_preview_img_src text,
    article_header_img_src text,
    article_source text,
    article_views_number numeric DEFAULT 0,
    article_status numeric DEFAULT 1,
    article_h1 text,
    seo_title text,
    seo_description text,
    seo_keywords text,
    seo_image text,
    seo_url text,
    CONSTRAINT ckc_article_status_article CHECK (((article_status >= (0)::numeric) AND (article_status <= (1)::numeric) AND (article_status = ANY (ARRAY[(0)::numeric, (1)::numeric]))))
);


--
-- Name: TABLE article; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.article IS 'Статья';


--
-- Name: COLUMN article.article_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_id IS 'Идентфикатор Статья';


--
-- Name: COLUMN article.site_section_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.site_section_id IS 'Идентификатор Раздел сайта';


--
-- Name: COLUMN article.article_publish_date; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_publish_date IS 'Дата публикации Статья';


--
-- Name: COLUMN article.article_author; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_author IS 'Автор Статья';


--
-- Name: COLUMN article.article_title; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_title IS 'Заголовок Статья';


--
-- Name: COLUMN article.article_slug; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_slug IS 'ЧПУ Статья';


--
-- Name: COLUMN article.article_description; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_description IS 'Описание Статья';


--
-- Name: COLUMN article.article_body; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_body IS 'Текст Статья';


--
-- Name: COLUMN article.article_preview_img_src; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_preview_img_src IS 'Ссылка на картинку-привью Статья';


--
-- Name: COLUMN article.article_header_img_src; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_header_img_src IS 'Ссылка на основную картинку Статья';


--
-- Name: COLUMN article.article_source; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_source IS 'Источник Статья';


--
-- Name: COLUMN article.article_views_number; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_views_number IS 'Количестиво просмотров Статья';


--
-- Name: COLUMN article.article_status; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article.article_status IS 'Статус Статья';


--
-- Name: article_article_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.article_article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: article_article_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.article_article_id_seq OWNED BY brc_ekoset.article.article_id;


--
-- Name: article_cl_article_tag; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.article_cl_article_tag (
    article_id integer NOT NULL,
    cl_article_id integer NOT NULL
);


--
-- Name: TABLE article_cl_article_tag; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.article_cl_article_tag IS 'Relationship_12';


--
-- Name: COLUMN article_cl_article_tag.article_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article_cl_article_tag.article_id IS 'Идентфикатор Статья';


--
-- Name: COLUMN article_cl_article_tag.cl_article_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.article_cl_article_tag.cl_article_id IS 'Идентификатор Тэг статьи';


--
-- Name: business_service; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE UNLOGGED TABLE brc_ekoset.business_service (
    business_service_id integer NOT NULL,
    site_section_id integer NOT NULL,
    business_service_name text NOT NULL,
    business_service_slug text,
    business_service_unit text,
    business_service_price text,
    business_service_img_small text,
    business_service_img_big text,
    business_service_status numeric DEFAULT 0,
    business_service_priority numeric DEFAULT 0,
    business_service_parent_id numeric,
    business_service_free_text1 text,
    business_service_free_text2 text,
    business_service_h1 text,
    business_service_footer_content_left text,
    business_service_footer_content_right text,
    seo_title text,
    seo_description text,
    seo_keywords text,
    seo_image text,
    seo_url text,
    bs_banner_in_section_ind integer DEFAULT 0,
    bs_banner_in_section_title text,
    bs_banner_in_main_ind integer DEFAULT 0,
    bs_banner_in_main_title text,
    CONSTRAINT ckc_business_service__business CHECK (((business_service_status IS NULL) OR ((business_service_status >= (0)::numeric) AND (business_service_status <= (1)::numeric))))
);


--
-- Name: TABLE business_service; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.business_service IS 'Услуга';


--
-- Name: COLUMN business_service.business_service_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_id IS 'Идентификатор Услуга';


--
-- Name: COLUMN business_service.site_section_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.site_section_id IS 'Идентификатор Раздел сайта';


--
-- Name: COLUMN business_service.business_service_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_name IS 'Наименование Услуга';


--
-- Name: COLUMN business_service.business_service_slug; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_slug IS 'ЧПУ Услуга';


--
-- Name: COLUMN business_service.business_service_unit; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_unit IS 'Единица измерения Услуга';


--
-- Name: COLUMN business_service.business_service_price; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_price IS 'Цена Услуга';


--
-- Name: COLUMN business_service.business_service_img_small; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_img_small IS 'Картинка малая Услуга';


--
-- Name: COLUMN business_service.business_service_img_big; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_img_big IS 'Картинка большая Услуга';


--
-- Name: COLUMN business_service.business_service_status; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_status IS 'Статус Услуга';


--
-- Name: COLUMN business_service.business_service_priority; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_priority IS 'Приоритет Услуга';


--
-- Name: COLUMN business_service.business_service_parent_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_parent_id IS 'ID Услуга первого уровня';


--
-- Name: COLUMN business_service.business_service_free_text1; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_free_text1 IS 'Текстовый блок 1 Услуга';


--
-- Name: COLUMN business_service.business_service_free_text2; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service.business_service_free_text2 IS 'Текстовый блок 2 Услуга';


--
-- Name: business_service_activity; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE UNLOGGED TABLE brc_ekoset.business_service_activity (
    cl_activity_id integer NOT NULL,
    business_service_id integer NOT NULL
);


--
-- Name: TABLE business_service_activity; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.business_service_activity IS 'Relationship_9';


--
-- Name: COLUMN business_service_activity.cl_activity_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service_activity.cl_activity_id IS 'Идентификатор Вид деятельности';


--
-- Name: COLUMN business_service_activity.business_service_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service_activity.business_service_id IS 'Идентификатор Услуга';


--
-- Name: business_service_article; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE UNLOGGED TABLE brc_ekoset.business_service_article (
    business_service_id integer NOT NULL,
    article_id integer NOT NULL
);


--
-- Name: TABLE business_service_article; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.business_service_article IS 'Relationship_11';


--
-- Name: COLUMN business_service_article.business_service_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service_article.business_service_id IS 'Идентификатор Услуга';


--
-- Name: COLUMN business_service_article.article_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service_article.article_id IS 'Идентфикатор Статья';


--
-- Name: business_service_business_service_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.business_service_business_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: business_service_business_service_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.business_service_business_service_id_seq OWNED BY brc_ekoset.business_service.business_service_id;


--
-- Name: business_service_cl_client; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE UNLOGGED TABLE brc_ekoset.business_service_cl_client (
    cl_client_id integer NOT NULL,
    business_service_id integer NOT NULL,
    footer_include_ind integer DEFAULT 0
);


--
-- Name: TABLE business_service_cl_client; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.business_service_cl_client IS 'Relationship_10';


--
-- Name: COLUMN business_service_cl_client.cl_client_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service_cl_client.cl_client_id IS 'Идентификатор Тип клиента';


--
-- Name: COLUMN business_service_cl_client.business_service_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service_cl_client.business_service_id IS 'Идентификатор Услуга';


--
-- Name: business_service_related; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE UNLOGGED TABLE brc_ekoset.business_service_related (
    business_service_related_id integer NOT NULL,
    business_service_id integer,
    bus_business_service_id integer,
    business_service_related_priori numeric
);


--
-- Name: TABLE business_service_related; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.business_service_related IS 'Связанная услуга';


--
-- Name: COLUMN business_service_related.business_service_related_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service_related.business_service_related_id IS 'Идентификатор Связанная услуга';


--
-- Name: COLUMN business_service_related.business_service_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service_related.business_service_id IS 'Идентификатор Услуга';


--
-- Name: COLUMN business_service_related.bus_business_service_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service_related.bus_business_service_id IS 'Усл_Идентификатор Услуга';


--
-- Name: COLUMN business_service_related.business_service_related_priori; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.business_service_related.business_service_related_priori IS 'Приоритет Связанная услуга';


--
-- Name: business_service_related_business_service_related_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.business_service_related_business_service_related_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: business_service_related_business_service_related_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.business_service_related_business_service_related_id_seq OWNED BY brc_ekoset.business_service_related.business_service_related_id;


--
-- Name: cl_activity; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.cl_activity (
    cl_activity_id integer NOT NULL,
    cl_activity_name text,
    cl_activity_status numeric DEFAULT 1,
    cl_activity_priority numeric DEFAULT 1,
    cl_activity_main_client_img text
);


--
-- Name: TABLE cl_activity; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.cl_activity IS 'Вид деятельности (объект)';


--
-- Name: COLUMN cl_activity.cl_activity_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_activity.cl_activity_id IS 'Идентификатор Вид деятельности';


--
-- Name: COLUMN cl_activity.cl_activity_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_activity.cl_activity_name IS 'Наименование Вид деятельности';


--
-- Name: COLUMN cl_activity.cl_activity_status; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_activity.cl_activity_status IS 'Статус Вид деятельности';


--
-- Name: COLUMN cl_activity.cl_activity_priority; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_activity.cl_activity_priority IS 'Приоритет Вид деятельности';


--
-- Name: cl_activity_cl_activity_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.cl_activity_cl_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cl_activity_cl_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.cl_activity_cl_activity_id_seq OWNED BY brc_ekoset.cl_activity.cl_activity_id;


--
-- Name: cl_article_tag; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.cl_article_tag (
    cl_article_id integer NOT NULL,
    cl_article_name text
);


--
-- Name: TABLE cl_article_tag; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.cl_article_tag IS 'Тэг статьи';


--
-- Name: COLUMN cl_article_tag.cl_article_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_article_tag.cl_article_id IS 'Идентификатор Тэг статьи';


--
-- Name: COLUMN cl_article_tag.cl_article_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_article_tag.cl_article_name IS 'Наименование Тэг статьи';


--
-- Name: cl_article_tag_cl_article_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.cl_article_tag_cl_article_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cl_article_tag_cl_article_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.cl_article_tag_cl_article_id_seq OWNED BY brc_ekoset.cl_article_tag.cl_article_id;


--
-- Name: cl_brand; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.cl_brand (
    cl_brand_id integer NOT NULL,
    cl_brand_name text,
    cl_brand_img_small text,
    cl_brand_img_big text,
    cl_brand_url text,
    cl_brand_priority numeric DEFAULT 0,
    cl_brand_main_page_visible numeric DEFAULT 0,
    cl_brand_status numeric(1,0) DEFAULT 0,
    cl_activity_id integer
);


--
-- Name: TABLE cl_brand; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.cl_brand IS 'Брэнд';


--
-- Name: COLUMN cl_brand.cl_brand_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_brand.cl_brand_id IS 'Идентфиикатор Брэнд';


--
-- Name: COLUMN cl_brand.cl_brand_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_brand.cl_brand_name IS 'Наименование Брэнд';


--
-- Name: COLUMN cl_brand.cl_brand_img_small; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_brand.cl_brand_img_small IS 'Картинка малая Брэнд';


--
-- Name: COLUMN cl_brand.cl_brand_img_big; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_brand.cl_brand_img_big IS 'Картинка большая Брэнд';


--
-- Name: COLUMN cl_brand.cl_brand_url; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_brand.cl_brand_url IS 'Ссылка на Брэнд';


--
-- Name: COLUMN cl_brand.cl_brand_priority; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_brand.cl_brand_priority IS 'Приоритет Брэнд';


--
-- Name: COLUMN cl_brand.cl_brand_main_page_visible; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_brand.cl_brand_main_page_visible IS 'Отображать на главной странице Брэнд';


--
-- Name: cl_brand_business_service; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE UNLOGGED TABLE brc_ekoset.cl_brand_business_service (
    cl_brand_id integer NOT NULL,
    business_service_id integer NOT NULL
);


--
-- Name: TABLE cl_brand_business_service; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.cl_brand_business_service IS 'Relationship_21';


--
-- Name: COLUMN cl_brand_business_service.cl_brand_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_brand_business_service.cl_brand_id IS 'Идентфиикатор Брэнд';


--
-- Name: COLUMN cl_brand_business_service.business_service_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_brand_business_service.business_service_id IS 'Идентификатор Услуга';


--
-- Name: cl_brand_cl_brand_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.cl_brand_cl_brand_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cl_brand_cl_brand_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.cl_brand_cl_brand_id_seq OWNED BY brc_ekoset.cl_brand.cl_brand_id;


--
-- Name: cl_client; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.cl_client (
    cl_client_id integer NOT NULL,
    cl_client_name text NOT NULL,
    cl_client_img_small text,
    cl_client_img_big text,
    cl_client_free_text1 text,
    cl_client_free_text2 text
);


--
-- Name: TABLE cl_client; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.cl_client IS 'Тип клиента';


--
-- Name: COLUMN cl_client.cl_client_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_client.cl_client_id IS 'Идентификатор Тип клиента';


--
-- Name: COLUMN cl_client.cl_client_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_client.cl_client_name IS 'Наименование Тип клиента';


--
-- Name: COLUMN cl_client.cl_client_img_small; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_client.cl_client_img_small IS 'Картинка малая Тип клиента';


--
-- Name: COLUMN cl_client.cl_client_img_big; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_client.cl_client_img_big IS 'Картинка большая Тип клиента';


--
-- Name: COLUMN cl_client.cl_client_free_text1; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_client.cl_client_free_text1 IS 'Текстовый блок 1 Тип клиента';


--
-- Name: COLUMN cl_client.cl_client_free_text2; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_client.cl_client_free_text2 IS 'Текстовый блок 2 Тип клиента';


--
-- Name: cl_client_cl_client_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.cl_client_cl_client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cl_client_cl_client_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.cl_client_cl_client_id_seq OWNED BY brc_ekoset.cl_client.cl_client_id;


--
-- Name: cl_meta_tag; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.cl_meta_tag (
    cl_meta_tag_id integer NOT NULL,
    cl_meta_tag_name text,
    cl_meta_tag_hid text,
    cl_meta_tag_property text
);


--
-- Name: TABLE cl_meta_tag; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.cl_meta_tag IS 'Мета тэг';


--
-- Name: COLUMN cl_meta_tag.cl_meta_tag_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_meta_tag.cl_meta_tag_id IS 'Идентификатор Мета тэг';


--
-- Name: COLUMN cl_meta_tag.cl_meta_tag_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_meta_tag.cl_meta_tag_name IS 'name Мета тэг';


--
-- Name: COLUMN cl_meta_tag.cl_meta_tag_hid; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_meta_tag.cl_meta_tag_hid IS 'hid Мета тэг';


--
-- Name: COLUMN cl_meta_tag.cl_meta_tag_property; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_meta_tag.cl_meta_tag_property IS 'property Мета тэг';


--
-- Name: cl_meta_tag_cl_meta_tag_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.cl_meta_tag_cl_meta_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cl_meta_tag_cl_meta_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.cl_meta_tag_cl_meta_tag_id_seq OWNED BY brc_ekoset.cl_meta_tag.cl_meta_tag_id;


--
-- Name: cl_site_block; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.cl_site_block (
    cl_site_block_id integer NOT NULL,
    cl_site_block_name text,
    cl_site_block_code numeric,
    cl_site_block_memo text
);


--
-- Name: TABLE cl_site_block; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.cl_site_block IS 'Тип блока сайта';


--
-- Name: COLUMN cl_site_block.cl_site_block_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_site_block.cl_site_block_id IS 'Идентфиикатор Тип блока сайта';


--
-- Name: COLUMN cl_site_block.cl_site_block_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_site_block.cl_site_block_name IS 'Наименовани Тип блока сайта';


--
-- Name: COLUMN cl_site_block.cl_site_block_code; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_site_block.cl_site_block_code IS 'Код Тип блока сайта';


--
-- Name: cl_site_block_cl_site_block_d_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.cl_site_block_cl_site_block_d_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cl_site_block_cl_site_block_d_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.cl_site_block_cl_site_block_d_seq OWNED BY brc_ekoset.cl_site_block.cl_site_block_id;


--
-- Name: cl_site_setting; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.cl_site_setting (
    cl_site_setting_id integer NOT NULL,
    cl_site_setting_name text,
    cl_site_setting_val text,
    cl_site_setting_display_name text
);


--
-- Name: TABLE cl_site_setting; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.cl_site_setting IS 'Настройки сайта';


--
-- Name: COLUMN cl_site_setting.cl_site_setting_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_site_setting.cl_site_setting_id IS 'Идентификатор Настройки сайта';


--
-- Name: COLUMN cl_site_setting.cl_site_setting_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_site_setting.cl_site_setting_name IS 'Наименование Настройки сайта';


--
-- Name: COLUMN cl_site_setting.cl_site_setting_val; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_site_setting.cl_site_setting_val IS 'Значение Настройки сайта';


--
-- Name: COLUMN cl_site_setting.cl_site_setting_display_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.cl_site_setting.cl_site_setting_display_name IS 'Наименование для отображения Настройки сайта';


--
-- Name: cl_site_setting_cl_site_setting_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.cl_site_setting_cl_site_setting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cl_site_setting_cl_site_setting_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.cl_site_setting_cl_site_setting_id_seq OWNED BY brc_ekoset.cl_site_setting.cl_site_setting_id;


--
-- Name: individual_offer; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.individual_offer (
    ind_offer_id integer NOT NULL,
    cl_activity_id integer,
    cl_client_id integer,
    site_section_id integer NOT NULL,
    ind_offer_name text NOT NULL,
    ind_offer_slug text,
    ind_offer_img_small text,
    ind_offer_img_big text,
    ind_offer_priority numeric,
    ind_offer_status numeric DEFAULT 0,
    ind_offer_free_text1 text,
    ind_offer_free_text2 text,
    ind_offer_h1 text,
    ind_offer_footer_content_left text,
    ind_offer_footer_content_right text,
    seo_title text,
    seo_description text,
    seo_keywords text,
    seo_image text,
    seo_url text,
    CONSTRAINT ckc_ind_offer_status_individu CHECK (((ind_offer_status IS NULL) OR ((ind_offer_status >= (0)::numeric) AND (ind_offer_status <= (1)::numeric))))
);


--
-- Name: TABLE individual_offer; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.individual_offer IS 'Индивидуальное предложение';


--
-- Name: COLUMN individual_offer.ind_offer_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.ind_offer_id IS 'Идентификатор ИндП';


--
-- Name: COLUMN individual_offer.cl_activity_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.cl_activity_id IS 'Идентификатор Вид деятельности';


--
-- Name: COLUMN individual_offer.cl_client_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.cl_client_id IS 'Идентификатор Тип клиента';


--
-- Name: COLUMN individual_offer.site_section_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.site_section_id IS 'Идентификатор Раздел сайта';


--
-- Name: COLUMN individual_offer.ind_offer_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.ind_offer_name IS 'Наименование ИндП';


--
-- Name: COLUMN individual_offer.ind_offer_slug; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.ind_offer_slug IS 'ЧПУ ИндП';


--
-- Name: COLUMN individual_offer.ind_offer_img_small; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.ind_offer_img_small IS 'Картинка малая ИндП';


--
-- Name: COLUMN individual_offer.ind_offer_img_big; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.ind_offer_img_big IS 'Картинка большая ИндП';


--
-- Name: COLUMN individual_offer.ind_offer_priority; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.ind_offer_priority IS 'Приоритет ИндП';


--
-- Name: COLUMN individual_offer.ind_offer_status; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.ind_offer_status IS 'Статус ИндП';


--
-- Name: COLUMN individual_offer.ind_offer_free_text1; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.ind_offer_free_text1 IS 'Текстовый блок 1 ИндП';


--
-- Name: COLUMN individual_offer.ind_offer_free_text2; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.individual_offer.ind_offer_free_text2 IS 'Текстовый блок 2 ИндП';


--
-- Name: individual_offer_ind_offer_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.individual_offer_ind_offer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: individual_offer_ind_offer_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.individual_offer_ind_offer_id_seq OWNED BY brc_ekoset.individual_offer.ind_offer_id;


--
-- Name: meta_tag_content; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE UNLOGGED TABLE brc_ekoset.meta_tag_content (
    meta_tag_content_id integer NOT NULL,
    business_service_id integer,
    article_id integer,
    ind_offer_id integer,
    cl_meta_tag_id integer NOT NULL,
    site_section_id integer,
    meta_tag_content_val text
);


--
-- Name: TABLE meta_tag_content; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.meta_tag_content IS 'Значение мета тэга';


--
-- Name: COLUMN meta_tag_content.meta_tag_content_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.meta_tag_content.meta_tag_content_id IS 'Идентификатор Значение мета тэга';


--
-- Name: COLUMN meta_tag_content.business_service_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.meta_tag_content.business_service_id IS 'Идентификатор Услуга';


--
-- Name: COLUMN meta_tag_content.article_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.meta_tag_content.article_id IS 'Идентфикатор Статья';


--
-- Name: COLUMN meta_tag_content.ind_offer_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.meta_tag_content.ind_offer_id IS 'Идентификатор ИндП';


--
-- Name: COLUMN meta_tag_content.cl_meta_tag_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.meta_tag_content.cl_meta_tag_id IS 'Идентификатор Мета тэг';


--
-- Name: COLUMN meta_tag_content.site_section_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.meta_tag_content.site_section_id IS 'Идентификатор Раздел сайта';


--
-- Name: COLUMN meta_tag_content.meta_tag_content_val; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.meta_tag_content.meta_tag_content_val IS 'Згачение метатэга';


--
-- Name: meta_tag_content_meta_tag_content_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.meta_tag_content_meta_tag_content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: meta_tag_content_meta_tag_content_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.meta_tag_content_meta_tag_content_id_seq OWNED BY brc_ekoset.meta_tag_content.meta_tag_content_id;


--
-- Name: partner; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.partner (
    partner_id integer NOT NULL,
    partner_group_id integer,
    partner_name text,
    partner_url text,
    partner_priority numeric,
    partner_status numeric DEFAULT 0
);


--
-- Name: TABLE partner; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.partner IS 'Партнер';


--
-- Name: COLUMN partner.partner_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.partner.partner_id IS 'Идентификатор Партнер';


--
-- Name: COLUMN partner.partner_group_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.partner.partner_group_id IS 'Идентификатор Группа партнера';


--
-- Name: COLUMN partner.partner_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.partner.partner_name IS 'Наименование Партнер';


--
-- Name: COLUMN partner.partner_url; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.partner.partner_url IS 'Ссылка Партнер';


--
-- Name: COLUMN partner.partner_priority; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.partner.partner_priority IS 'Приоритет Партнер';


--
-- Name: partner_group; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.partner_group (
    partner_group_id integer NOT NULL,
    partner_group_name text,
    partner_group_priority numeric
);


--
-- Name: TABLE partner_group; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.partner_group IS 'Группа партнера';


--
-- Name: COLUMN partner_group.partner_group_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.partner_group.partner_group_id IS 'Идентификатор Группа партнера';


--
-- Name: COLUMN partner_group.partner_group_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.partner_group.partner_group_name IS 'Наименование Группа партнера';


--
-- Name: COLUMN partner_group.partner_group_priority; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.partner_group.partner_group_priority IS 'Приоритет Группа партнера';


--
-- Name: partner_group_partner_group_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.partner_group_partner_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: partner_group_partner_group_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.partner_group_partner_group_id_seq OWNED BY brc_ekoset.partner_group.partner_group_id;


--
-- Name: partner_partner_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.partner_partner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: partner_partner_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.partner_partner_id_seq OWNED BY brc_ekoset.partner.partner_id;


--
-- Name: proxy_list; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.proxy_list (
    proxy_list_id integer NOT NULL,
    proxy_list_source text,
    proxy_list_country text,
    proxy_list_port numeric,
    proxy_list_ip_address text,
    proxy_list_protocol text,
    proxy_list_anonymitylevel text,
    proxy_list_verify_date timestamp(0) with time zone,
    proxy_list_add_date timestamp(0) with time zone,
    proxy_list_response_time numeric
);


--
-- Name: proxy_list_proxy_list_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.proxy_list_proxy_list_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: proxy_list_proxy_list_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.proxy_list_proxy_list_id_seq OWNED BY brc_ekoset.proxy_list.proxy_list_id;


--
-- Name: recommendation; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.recommendation (
    recomm_id integer NOT NULL,
    cl_brand_id integer,
    recomm_title text,
    recomm_date timestamp(0) with time zone,
    recomm_text text,
    recomm_brand_img text,
    recomm_brand_url text,
    recomm_slug text
);


--
-- Name: TABLE recommendation; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.recommendation IS 'Рекомендация';


--
-- Name: COLUMN recommendation.recomm_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.recommendation.recomm_id IS 'Идентификатор Рекомендация';


--
-- Name: COLUMN recommendation.cl_brand_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.recommendation.cl_brand_id IS 'Идентфиикатор Брэнд';


--
-- Name: COLUMN recommendation.recomm_title; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.recommendation.recomm_title IS 'Заголовок Рекомендация';


--
-- Name: COLUMN recommendation.recomm_date; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.recommendation.recomm_date IS 'Дата Рекомендация';


--
-- Name: COLUMN recommendation.recomm_text; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.recommendation.recomm_text IS 'Текст Рекомендация';


--
-- Name: COLUMN recommendation.recomm_brand_img; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.recommendation.recomm_brand_img IS 'Картинка брэнда Рекомендация';


--
-- Name: COLUMN recommendation.recomm_brand_url; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.recommendation.recomm_brand_url IS 'Ссылка на брэнд Рекомендация';


--
-- Name: COLUMN recommendation.recomm_slug; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.recommendation.recomm_slug IS 'ЧПУ Рекомендация';


--
-- Name: recommendation_recomm_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.recommendation_recomm_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: recommendation_recomm_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.recommendation_recomm_id_seq OWNED BY brc_ekoset.recommendation.recomm_id;


--
-- Name: site_block; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE UNLOGGED TABLE brc_ekoset.site_block (
    site_block_id integer NOT NULL,
    cl_site_block_d integer,
    site_page_id integer,
    site_section_id integer,
    business_service_id integer,
    ind_offer_id integer,
    site_block_name text,
    site_block_header text,
    site_block_content text,
    site_block_visible_ind numeric,
    site_block_position numeric,
    site_block_content_right text
);


--
-- Name: TABLE site_block; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.site_block IS 'Блок сайта';


--
-- Name: COLUMN site_block.site_block_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_block.site_block_id IS 'Идентификатор Блок сайта';


--
-- Name: COLUMN site_block.cl_site_block_d; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_block.cl_site_block_d IS 'Идентфиикатор Тип блока сайта';


--
-- Name: COLUMN site_block.site_page_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_block.site_page_id IS 'Идентификатор Страница сайта';


--
-- Name: COLUMN site_block.site_section_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_block.site_section_id IS 'Идентификатор Раздел сайта';


--
-- Name: COLUMN site_block.business_service_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_block.business_service_id IS 'Идентификатор Услуга';


--
-- Name: COLUMN site_block.ind_offer_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_block.ind_offer_id IS 'Идентификатор ИндП';


--
-- Name: COLUMN site_block.site_block_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_block.site_block_name IS 'Наименование Блок сайта';


--
-- Name: COLUMN site_block.site_block_header; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_block.site_block_header IS 'Заголовок Блок сайта';


--
-- Name: COLUMN site_block.site_block_content; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_block.site_block_content IS 'Содержание Блок сайта';


--
-- Name: COLUMN site_block.site_block_visible_ind; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_block.site_block_visible_ind IS 'Видимость Блок сайта';


--
-- Name: COLUMN site_block.site_block_position; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_block.site_block_position IS 'Порядок следования Блок сайта';


--
-- Name: site_block_site_block_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.site_block_site_block_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: site_block_site_block_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.site_block_site_block_id_seq OWNED BY brc_ekoset.site_block.site_block_id;


--
-- Name: site_document; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.site_document (
    site_document_id integer NOT NULL,
    site_document_file text,
    site_document_status boolean,
    site_document_name text,
    site_section_id integer,
    site_document_url text
);


--
-- Name: site_document_site_document_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.site_document_site_document_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: site_document_site_document_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.site_document_site_document_id_seq OWNED BY brc_ekoset.site_document.site_document_id;


--
-- Name: site_page; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.site_page (
    site_page_id integer NOT NULL,
    site_page_name text,
    site_page_code numeric,
    site_page_h1 text,
    site_page_menu_name text,
    site_page_banner text,
    site_page_menu_position numeric,
    site_page_status numeric(1,0) DEFAULT 1,
    site_section_id integer,
    site_page_route_name text,
    site_page_logo text,
    seo_title text,
    seo_description text,
    seo_keywords text,
    seo_image text,
    seo_url text
);


--
-- Name: TABLE site_page; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.site_page IS 'Страница сайта';


--
-- Name: COLUMN site_page.site_page_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_page.site_page_id IS 'Идентификатор Страница сайта';


--
-- Name: COLUMN site_page.site_page_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_page.site_page_name IS 'Наименование Страница сайта';


--
-- Name: COLUMN site_page.site_page_code; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_page.site_page_code IS 'Код Страница сайта';


--
-- Name: site_page_site_page_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.site_page_site_page_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: site_page_site_page_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.site_page_site_page_id_seq OWNED BY brc_ekoset.site_page.site_page_id;


--
-- Name: site_section; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.site_section (
    site_section_id integer NOT NULL,
    site_section_name text NOT NULL,
    site_section_slug text,
    site_section_img_big text,
    site_section_img_small text,
    site_section_priority numeric,
    site_section_status numeric DEFAULT 0,
    site_section_free_text1 text,
    site_section_free_text2 text,
    site_section_h1 text,
    site_section_footer_content_left text,
    site_section_footer_content_right text,
    site_section_logo text,
    seo_title text,
    seo_description text,
    seo_keywords text,
    seo_image text,
    seo_url text,
    CONSTRAINT ckc_site_section_stat_site_sec CHECK (((site_section_status IS NULL) OR ((site_section_status >= (0)::numeric) AND (site_section_status <= (1)::numeric))))
);


--
-- Name: TABLE site_section; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.site_section IS 'Раздел сайта';


--
-- Name: COLUMN site_section.site_section_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section.site_section_id IS 'Идентификатор Раздел сайта';


--
-- Name: COLUMN site_section.site_section_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section.site_section_name IS 'Наименование Раздел сайта';


--
-- Name: COLUMN site_section.site_section_slug; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section.site_section_slug IS 'ЧПУ Раздел сайта';


--
-- Name: COLUMN site_section.site_section_img_big; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section.site_section_img_big IS 'Картинка большая Раздел сайта';


--
-- Name: COLUMN site_section.site_section_img_small; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section.site_section_img_small IS 'Картинка малая Раздел сайта';


--
-- Name: COLUMN site_section.site_section_priority; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section.site_section_priority IS 'Приоритет Раздел сайта';


--
-- Name: COLUMN site_section.site_section_status; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section.site_section_status IS '0Статус Раздел сайта';


--
-- Name: COLUMN site_section.site_section_free_text1; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section.site_section_free_text1 IS 'Текстовый блок 1 Раздел сайта';


--
-- Name: COLUMN site_section.site_section_free_text2; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section.site_section_free_text2 IS 'Текстовый блок 2 Раздел сайта';


--
-- Name: COLUMN site_section.site_section_logo; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section.site_section_logo IS 'Логотип в шапке';


--
-- Name: site_section_brand; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.site_section_brand (
    site_section_id integer NOT NULL,
    cl_brand_id integer NOT NULL
);


--
-- Name: TABLE site_section_brand; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.site_section_brand IS 'Relationship_15';


--
-- Name: COLUMN site_section_brand.site_section_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section_brand.site_section_id IS 'Идентификатор Раздел сайта';


--
-- Name: COLUMN site_section_brand.cl_brand_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_section_brand.cl_brand_id IS 'Идентфиикатор Брэнд';


--
-- Name: site_section_site_section_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.site_section_site_section_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: site_section_site_section_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.site_section_site_section_id_seq OWNED BY brc_ekoset.site_section.site_section_id;


--
-- Name: site_settings; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.site_settings (
    site_settings_id integer NOT NULL,
    site_settings_param_code integer,
    site_settings_param_value text
);
ALTER TABLE ONLY brc_ekoset.site_settings ALTER COLUMN site_settings_id SET STATISTICS 0;
ALTER TABLE ONLY brc_ekoset.site_settings ALTER COLUMN site_settings_param_code SET STATISTICS 0;
ALTER TABLE ONLY brc_ekoset.site_settings ALTER COLUMN site_settings_param_value SET STATISTICS 0;


--
-- Name: site_settings_site_settings_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.site_settings_site_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: site_settings_site_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.site_settings_site_settings_id_seq OWNED BY brc_ekoset.site_settings.site_settings_id;


--
-- Name: site_social_network; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.site_social_network (
    site_social_net_id integer NOT NULL,
    site_social_net_name text,
    site_social_net_img text,
    site_social_net_url text
);


--
-- Name: TABLE site_social_network; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.site_social_network IS 'Социальная сеть сайта';


--
-- Name: COLUMN site_social_network.site_social_net_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_social_network.site_social_net_id IS 'Идентификатор Социальная сеть сайта';


--
-- Name: COLUMN site_social_network.site_social_net_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_social_network.site_social_net_name IS 'Наименование Социальная сеть сайта';


--
-- Name: COLUMN site_social_network.site_social_net_img; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_social_network.site_social_net_img IS 'Изображение Социальная сеть сайта';


--
-- Name: COLUMN site_social_network.site_social_net_url; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.site_social_network.site_social_net_url IS 'Ссылка на профиль Социальная сеть сайта';


--
-- Name: site_social_network_site_social_net_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.site_social_network_site_social_net_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: site_social_network_site_social_net_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.site_social_network_site_social_net_id_seq OWNED BY brc_ekoset.site_social_network.site_social_net_id;


--
-- Name: user_request; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.user_request (
    user_request_id integer NOT NULL,
    user_request_date timestamp(0) with time zone,
    user_request_type text,
    user_request_user text,
    user_request_phone text,
    user_request_mail text,
    user_request_section text,
    user_request_service text,
    user_request_text text,
    user_request_file_name text
);


--
-- Name: TABLE user_request; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON TABLE brc_ekoset.user_request IS 'USER_REQUEST';


--
-- Name: COLUMN user_request.user_request_id; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.user_request.user_request_id IS 'USER_REQUEST_ID';


--
-- Name: COLUMN user_request.user_request_date; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.user_request.user_request_date IS 'USER_REQUEST_DATE';


--
-- Name: COLUMN user_request.user_request_type; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.user_request.user_request_type IS 'USER_REQUEST_TYPE';


--
-- Name: COLUMN user_request.user_request_user; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.user_request.user_request_user IS 'USER_REQUEST_USER';


--
-- Name: COLUMN user_request.user_request_phone; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.user_request.user_request_phone IS 'USER_REQUEST_PHONE';


--
-- Name: COLUMN user_request.user_request_mail; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.user_request.user_request_mail IS 'USER_REQUEST_MAIL';


--
-- Name: COLUMN user_request.user_request_section; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.user_request.user_request_section IS 'USER_REQUEST_SECTION';


--
-- Name: COLUMN user_request.user_request_service; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.user_request.user_request_service IS 'USER_REQUEST_SERVICE';


--
-- Name: COLUMN user_request.user_request_text; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.user_request.user_request_text IS 'USER_REQUEST_TEXT';


--
-- Name: COLUMN user_request.user_request_file_name; Type: COMMENT; Schema: brc_ekoset; Owner: -
--

COMMENT ON COLUMN brc_ekoset.user_request.user_request_file_name IS 'USER_REQUEST_FILE_NAME';


--
-- Name: user_request_file; Type: TABLE; Schema: brc_ekoset; Owner: -
--

CREATE TABLE brc_ekoset.user_request_file (
    user_request_file_id integer NOT NULL,
    user_request_file_name text,
    user_request_id integer NOT NULL
);


--
-- Name: user_request_file_user_request_file_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.user_request_file_user_request_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_request_file_user_request_file_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.user_request_file_user_request_file_id_seq OWNED BY brc_ekoset.user_request_file.user_request_file_id;


--
-- Name: user_request_user_request_id_seq; Type: SEQUENCE; Schema: brc_ekoset; Owner: -
--

CREATE SEQUENCE brc_ekoset.user_request_user_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_request_user_request_id_seq; Type: SEQUENCE OWNED BY; Schema: brc_ekoset; Owner: -
--

ALTER SEQUENCE brc_ekoset.user_request_user_request_id_seq OWNED BY brc_ekoset.user_request.user_request_id;


--
-- Name: v_api_business_service; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_business_service AS
 SELECT business_service.business_service_id,
    business_service.site_section_id,
    business_service.business_service_name,
    business_service.business_service_slug,
    business_service.business_service_unit,
    business_service.business_service_price,
    COALESCE(business_service.business_service_img_small, '/img/empty-image.png'::text) AS business_service_img_small,
    business_service.business_service_img_big,
    business_service.business_service_status,
    business_service.business_service_priority,
    business_service.business_service_parent_id,
    ((business_service.business_service_slug || '-'::text) || business_service.business_service_id) AS business_service_url,
    business_service.business_service_free_text1,
    business_service.business_service_free_text2,
    ((sect.site_section_slug || '-'::text) || sect.site_section_id) AS site_section_url,
    sect.site_section_name,
    business_service.business_service_h1,
    business_service.business_service_footer_content_right,
    business_service.business_service_footer_content_left,
    COALESCE(business_service.seo_title, business_service.business_service_name) AS seo_title,
    business_service.seo_description,
    business_service.seo_keywords,
    COALESCE(business_service.business_service_img_small, '/img/main/page_logo_1_ck71lvkv50000kciace7g1eik.svg'::text) AS seo_image,
    ((business_service.business_service_slug || '-'::text) || business_service.business_service_id) AS seo_url,
    business_service.bs_banner_in_section_ind,
    business_service.bs_banner_in_section_title,
    business_service.bs_banner_in_main_ind,
    business_service.bs_banner_in_main_title
   FROM (brc_ekoset.business_service
     JOIN brc_ekoset.site_section sect ON ((sect.site_section_id = business_service.site_section_id)))
  ORDER BY business_service.business_service_priority DESC, business_service.business_service_id;


--
-- Name: v_api_activity_business_service; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_activity_business_service AS
 SELECT bisserv.business_service_id,
    bisserv.site_section_id,
    bisserv.business_service_name,
    bisserv.business_service_slug,
    bisserv.business_service_unit,
    bisserv.business_service_price,
    bisserv.business_service_img_small,
    bisserv.business_service_img_big,
    bisserv.business_service_status,
    bisserv.business_service_priority,
    bisserv.business_service_parent_id,
    act.cl_activity_id,
    bisserv.business_service_url,
    bisserv.site_section_url,
    bisserv.site_section_name
   FROM (brc_ekoset.v_api_business_service bisserv
     JOIN brc_ekoset.business_service_activity act ON ((bisserv.business_service_id = act.business_service_id)))
  WHERE (bisserv.business_service_status = (1)::numeric)
  ORDER BY bisserv.business_service_name;


--
-- Name: v_api_article_list; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_article_list AS
 SELECT article.article_id,
    article.site_section_id,
    article.article_publish_date,
    article.article_author,
    article.article_title,
    article.article_slug,
    article.article_description,
    COALESCE(article.article_preview_img_src, '/img/empty-image.png'::text) AS article_preview_img_src,
    COALESCE(article.article_header_img_src, '/img/empty-image-big.png'::text) AS article_header_img_src,
    article.article_source,
    article.article_views_number,
    article.article_status,
    ((article.article_slug || '-'::text) || article.article_id) AS article_url
   FROM brc_ekoset.article
  ORDER BY article.article_publish_date DESC;


--
-- Name: v_api_admin_article_list; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_admin_article_list AS
 SELECT artlist.article_id,
    artlist.site_section_id,
    artlist.article_publish_date,
    artlist.article_author,
    artlist.article_title,
    artlist.article_description,
    artlist.article_views_number,
    artlist.article_status,
    artlist.article_url,
    sect.site_section_name,
    ((sect.site_section_slug || '-'::text) || sect.site_section_id) AS site_section_url
   FROM (brc_ekoset.v_api_article_list artlist
     LEFT JOIN brc_ekoset.site_section sect ON ((sect.site_section_id = artlist.site_section_id)))
  ORDER BY artlist.article_publish_date DESC;


--
-- Name: v_api_admin_business_service; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_admin_business_service AS
 SELECT business_service.business_service_id,
    business_service.site_section_id,
    business_service.business_service_name,
    business_service.business_service_slug,
    business_service.business_service_unit,
    business_service.business_service_price,
    COALESCE(business_service.business_service_img_small, '/img/empty-image.png'::text) AS business_service_img_small,
    COALESCE(business_service.business_service_img_big, '/img/empty-image-big.png'::text) AS business_service_img_big,
    business_service.business_service_status,
    business_service.business_service_priority,
    business_service.business_service_parent_id,
    ((business_service.business_service_slug || '-'::text) || business_service.business_service_id) AS business_service_url,
    business_service.business_service_free_text1,
    business_service.business_service_free_text2,
    ((sect.site_section_slug || '-'::text) || sect.site_section_id) AS site_section_url,
    sect.site_section_name,
    business_service.business_service_h1,
    business_service.business_service_footer_content_right,
    business_service.business_service_footer_content_left
   FROM (brc_ekoset.business_service
     JOIN brc_ekoset.site_section sect ON ((sect.site_section_id = business_service.site_section_id)))
  ORDER BY business_service.business_service_priority DESC;


--
-- Name: v_api_site_section; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_site_section AS
 SELECT site_section.site_section_id,
    site_section.site_section_name,
    site_section.site_section_slug,
    site_section.site_section_img_big,
    COALESCE(site_section.site_section_img_small, '/img/empty-image.png'::text) AS site_section_img_small,
    site_section.site_section_priority,
    site_section.site_section_status,
    ((site_section.site_section_slug || '-'::text) || site_section.site_section_id) AS site_section_url,
    site_section.site_section_free_text1,
    site_section.site_section_free_text2,
    site_section.site_section_h1,
    site_section.site_section_footer_content_left,
    site_section.site_section_footer_content_right,
    site_section.site_section_logo,
    COALESCE(site_section.seo_title, site_section.site_section_name) AS seo_title,
    site_section.seo_description,
    site_section.seo_keywords,
    COALESCE(site_section.site_section_img_small, '/img/main/page_logo_1_ck71lvkv50000kciace7g1eik.svg'::text) AS seo_image,
    ((site_section.site_section_slug || '-'::text) || site_section.site_section_id) AS seo_url
   FROM brc_ekoset.site_section
  ORDER BY site_section.site_section_priority DESC;


--
-- Name: v_api_admin_individual_offer; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_admin_individual_offer AS
 SELECT offer.ind_offer_id,
    offer.cl_activity_id,
    offer.cl_client_id,
    offer.site_section_id,
    offer.ind_offer_name,
    offer.ind_offer_slug,
    offer.ind_offer_priority,
    offer.ind_offer_status,
    ((offer.ind_offer_slug || '-'::text) || offer.ind_offer_id) AS ind_offer_url,
    offer.ind_offer_h1,
    ( SELECT cl.cl_client_name
           FROM brc_ekoset.cl_client cl
          WHERE (cl.cl_client_id = offer.cl_client_id)) AS cl_client_name,
    ( SELECT act.cl_activity_name
           FROM brc_ekoset.cl_activity act
          WHERE (act.cl_activity_id = offer.cl_activity_id)) AS cl_activity_name,
    ( SELECT sect.site_section_name
           FROM brc_ekoset.v_api_site_section sect
          WHERE (sect.site_section_id = offer.site_section_id)) AS site_section_name,
    ( SELECT sect1.site_section_url
           FROM brc_ekoset.v_api_site_section sect1
          WHERE (sect1.site_section_id = offer.site_section_id)) AS site_section_url,
    offer.ind_offer_footer_content_right,
    offer.ind_offer_footer_content_left,
    COALESCE(offer.ind_offer_img_small, '/img/empty-image.png'::text) AS ind_offer_img_small,
    COALESCE(offer.ind_offer_img_big, '/img/empty-image-big.png'::text) AS ind_offer_img_big
   FROM brc_ekoset.individual_offer offer
  ORDER BY offer.ind_offer_priority DESC;


--
-- Name: v_api_admin_site_block_info; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_admin_site_block_info AS
 SELECT blo.site_block_id,
    blo.cl_site_block_d,
    blo.site_page_id,
    blo.site_section_id,
    blo.business_service_id,
    blo.ind_offer_id,
    blo.site_block_name,
    blo.site_block_header,
    blo.site_block_content,
    blo.site_block_visible_ind,
    blo.site_block_position,
    setblo.cl_site_block_name,
    setblo.cl_site_block_code,
    blo.site_block_content_right
   FROM (brc_ekoset.site_block blo
     JOIN brc_ekoset.cl_site_block setblo ON ((blo.cl_site_block_d = setblo.cl_site_block_id)))
  ORDER BY blo.site_block_position;


--
-- Name: v_api_all_clients; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_all_clients AS
SELECT
    NULL::text AS cl_activity_name,
    NULL::jsonb AS brands_list,
    NULL::text AS cl_activity_main_client_img,
    NULL::bigint AS allcount,
    NULL::integer AS cl_activity_id;


--
-- Name: v_api_app_user; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_app_user AS
 SELECT app_user.app_user_id,
    app_user.app_user_email,
    app_user.app_user_pwd_hash,
    app_user.app_user_reg_date,
    app_user.app_user_blocked_ind,
    app_user.app_user_reset_pwd,
    app_user.app_user_reset_exp_date,
    app_user.app_user_reset_pwd_date,
    app_user.app_user_reg_verified_ind,
    app_user.app_user_reg_token
   FROM brc_ekoset.app_user;


--
-- Name: v_api_app_user_session; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_app_user_session AS
 SELECT app_user_session.user_session_id,
    app_user_session.app_user_id,
    app_user_session.user_session_created_at,
    app_user_session.user_session_updated_at,
    app_user_session.user_session_expired_at,
    app_user_session.user_session_ip,
    app_user_session.user_session_os,
    app_user_session.user_session_browser,
    app_user_session.user_session_agent,
    app_user_session.user_session_token,
    app_user_session.user_session_block_ind,
    app_user.app_user_reg_date,
    app_user.app_user_reg_verified_ind
   FROM (brc_ekoset.app_user_session
     JOIN brc_ekoset.app_user ON ((app_user.app_user_id = app_user_session.app_user_id)));


--
-- Name: v_api_app_user_social_net_profile; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_app_user_social_net_profile AS
 SELECT app_user_social_net_profile.user_sn_profile_id,
    app_user_social_net_profile.app_user_id,
    app_user_social_net_profile.user_sn_profile_code,
    app_user_social_net_profile.user_sn_profile_type,
    app_user_social_net_profile.user_sn_profile_nick,
    app_user_social_net_profile.user_sn_profile_email,
    app_user_social_net_profile.user_sn_profile_link,
    app_user_social_net_profile.user_sn_profile_avatar,
    app_user.app_user_email,
    app_user.app_user_reg_date,
    app_user.app_user_blocked_ind,
    app_user.app_user_reset_pwd,
    app_user.app_user_reset_exp_date,
    app_user.app_user_reset_pwd_date,
    app_user.app_user_reg_verified_ind,
    app_user.app_user_reg_token
   FROM (brc_ekoset.app_user_social_net_profile
     JOIN brc_ekoset.app_user ON ((app_user.app_user_id = app_user_social_net_profile.app_user_id)));


--
-- Name: v_api_article; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_article AS
 SELECT article.article_id,
    article.site_section_id,
    article.article_publish_date,
    article.article_author,
    article.article_title,
    article.article_slug,
    article.article_description,
    article.article_body,
    COALESCE(article.article_preview_img_src, '/img/empty-image.png'::text) AS article_preview_img_src,
    article.article_header_img_src,
    article.article_source,
    article.article_views_number,
    article.article_status,
    ((article.article_slug || '-'::text) || article.article_id) AS article_url,
    article.article_h1,
    COALESCE(article.seo_title, article.article_title) AS seo_title,
    article.seo_description,
    article.seo_keywords,
    COALESCE(article.article_preview_img_src, '/img/main/page_logo_1_ck71lvkv50000kciace7g1eik.svg'::text) AS seo_image,
    ((article.article_slug || '-'::text) || article.article_id) AS seo_url
   FROM brc_ekoset.article
  ORDER BY article.article_publish_date DESC;


--
-- Name: v_api_article_tag; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_article_tag AS
 SELECT tags.cl_article_id,
    tags.cl_article_name,
    art_tags.article_id
   FROM (brc_ekoset.article_cl_article_tag art_tags
     JOIN brc_ekoset.cl_article_tag tags ON ((art_tags.cl_article_id = tags.cl_article_id)));


--
-- Name: v_api_banner_by_main; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_banner_by_main AS
 SELECT 0 AS business_service_id,
    site_page.site_page_h1 AS business_service_h1,
    1 AS bs_banner_in_main_ind,
    site_page.site_page_h1 AS banner_title,
    site_page.site_page_banner AS business_service_img_big,
    ''::text AS site_section_url,
    ''::text AS business_service_url
   FROM brc_ekoset.site_page
  WHERE (site_page.site_page_id = 1)
UNION
 SELECT v_api_business_service.business_service_id,
    v_api_business_service.business_service_h1,
    v_api_business_service.bs_banner_in_main_ind,
    COALESCE(NULLIF(v_api_business_service.bs_banner_in_main_title, ''::text), v_api_business_service.business_service_h1) AS banner_title,
    v_api_business_service.business_service_img_big,
    v_api_business_service.site_section_url,
    v_api_business_service.business_service_url
   FROM brc_ekoset.v_api_business_service
  WHERE (v_api_business_service.bs_banner_in_main_ind = 1)
  ORDER BY 1;


--
-- Name: v_api_banner_by_section; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_banner_by_section AS
 SELECT 0 AS business_service_id,
    site_section.site_section_h1 AS business_service_h1,
    1 AS bs_banner_in_section_ind,
    site_section.site_section_h1 AS banner_title,
    site_section.site_section_id,
    site_section.site_section_img_big AS business_service_img_big,
    ((site_section.site_section_slug || '-'::text) || site_section.site_section_id) AS site_section_url,
    ''::text AS business_service_url
   FROM brc_ekoset.site_section
UNION
 SELECT v_api_business_service.business_service_id,
    v_api_business_service.business_service_h1,
    v_api_business_service.bs_banner_in_section_ind,
    COALESCE(NULLIF(v_api_business_service.bs_banner_in_section_title, ''::text), v_api_business_service.business_service_h1) AS banner_title,
    v_api_business_service.site_section_id,
    v_api_business_service.business_service_img_big,
    v_api_business_service.site_section_url,
    v_api_business_service.business_service_url
   FROM brc_ekoset.v_api_business_service
  WHERE (v_api_business_service.bs_banner_in_section_ind = 1)
  ORDER BY 1;


--
-- Name: v_api_brand; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_brand AS
 SELECT brand.cl_brand_id,
    brand.cl_brand_name,
    COALESCE(brand.cl_brand_img_small, '/img/empty-image.png'::text) AS cl_brand_img_small,
    COALESCE(brand.cl_brand_img_big, '/img/empty-image.png'::text) AS cl_brand_img_big,
    brand.cl_brand_url,
    brand.cl_brand_main_page_visible,
    brand.cl_brand_status,
    brand.cl_brand_priority,
    brand.cl_activity_id
   FROM (brc_ekoset.cl_brand brand
     LEFT JOIN brc_ekoset.cl_activity activ ON ((activ.cl_activity_id = brand.cl_activity_id)))
  ORDER BY activ.cl_activity_name, brand.cl_brand_priority DESC;


--
-- Name: v_api_brand_site_section; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_brand_site_section AS
 SELECT brand.cl_brand_id,
    brand.cl_brand_name,
    COALESCE(brand.cl_brand_img_small, '/img/empty-image.png'::text) AS cl_brand_img_small,
    COALESCE(brand.cl_brand_img_big, '/img/empty-image.png'::text) AS cl_brand_img_big,
    brand.cl_brand_url,
    brand.cl_brand_main_page_visible,
    secbrand.site_section_id,
    brand.cl_brand_priority,
    brand.cl_brand_status
   FROM (brc_ekoset.cl_brand brand
     JOIN brc_ekoset.site_section_brand secbrand ON ((secbrand.cl_brand_id = brand.cl_brand_id)))
  ORDER BY brand.cl_brand_priority DESC;


--
-- Name: v_api_business_service_article; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_business_service_article AS
 SELECT art.article_id,
    art.site_section_id,
    art.article_publish_date,
    art.article_author,
    art.article_title,
    art.article_slug,
    art.article_description,
    art.article_preview_img_src,
    art.article_header_img_src,
    art.article_source,
    art.article_views_number,
    art.article_status,
    art.article_url,
    serv.business_service_id
   FROM (brc_ekoset.v_api_article_list art
     JOIN brc_ekoset.business_service_article serv ON ((serv.article_id = art.article_id)))
  ORDER BY art.article_publish_date DESC;


--
-- Name: v_api_business_service_brand; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_business_service_brand AS
 SELECT brand.cl_brand_id,
    brand.cl_brand_name,
    COALESCE(brand.cl_brand_img_small, '/img/empty-image.png'::text) AS cl_brand_img_small,
    COALESCE(brand.cl_brand_img_big, '/img/empty-image.png'::text) AS cl_brand_img_big,
    brand.cl_brand_url,
    brand.cl_brand_main_page_visible,
    secbrand.business_service_id,
    brand.cl_brand_priority,
    brand.cl_brand_status
   FROM (brc_ekoset.cl_brand brand
     JOIN brc_ekoset.cl_brand_business_service secbrand ON ((secbrand.cl_brand_id = brand.cl_brand_id)))
  ORDER BY brand.cl_brand_priority DESC;


--
-- Name: v_api_client_business_service; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_client_business_service AS
 SELECT bisserv.business_service_id,
    bisserv.site_section_id,
    bisserv.business_service_name,
    bisserv.business_service_slug,
    bisserv.business_service_unit,
    bisserv.business_service_price,
    bisserv.business_service_img_small,
    bisserv.business_service_img_big,
    bisserv.business_service_status,
    bisserv.business_service_priority,
    bisserv.business_service_parent_id,
    clien.cl_client_id,
    bisserv.business_service_url,
    bisserv.site_section_url,
    bisserv.site_section_name,
    clien.footer_include_ind
   FROM (brc_ekoset.v_api_business_service bisserv
     JOIN brc_ekoset.business_service_cl_client clien ON ((bisserv.business_service_id = clien.business_service_id)))
  WHERE (bisserv.business_service_status = (1)::numeric)
  ORDER BY bisserv.business_service_name;


--
-- Name: v_api_client_business_service_relation; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_client_business_service_relation AS
 SELECT bisserv.business_service_id,
    bisserv.site_section_id,
    bisserv.business_service_name,
    bisserv.business_service_slug,
    bisserv.business_service_unit,
    bisserv.business_service_price,
    bisserv.business_service_img_small,
    bisserv.business_service_img_big,
    bisserv.business_service_status,
    bisserv.business_service_priority,
    bisserv.business_service_parent_id,
    clien.cl_client_id,
    bisserv.business_service_url,
    bisserv.site_section_url,
    bisserv.site_section_name,
    clien.footer_include_ind AS has_relation
   FROM (brc_ekoset.v_api_business_service bisserv
     JOIN brc_ekoset.business_service_cl_client clien ON ((bisserv.business_service_id = clien.business_service_id)))
  WHERE (bisserv.business_service_parent_id IS NULL)
  ORDER BY bisserv.business_service_priority DESC;


--
-- Name: v_api_clients; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_clients AS
SELECT
    NULL::text AS cl_activity_name,
    NULL::jsonb AS brands_list,
    NULL::text AS cl_activity_main_client_img,
    NULL::bigint AS allcount,
    NULL::integer AS cl_activity_id;


--
-- Name: v_api_footer_service_business; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_footer_service_business AS
SELECT
    NULL::integer AS site_section_id,
    NULL::text AS site_section_name,
    NULL::jsonb AS services;


--
-- Name: v_api_footer_service_private; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_footer_service_private AS
SELECT
    NULL::integer AS site_section_id,
    NULL::text AS site_section_name,
    NULL::jsonb AS services;


--
-- Name: v_api_individual_offer; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_individual_offer AS
 SELECT individual_offer.ind_offer_id,
    individual_offer.cl_activity_id,
    individual_offer.cl_client_id,
    individual_offer.site_section_id,
    individual_offer.ind_offer_name,
    individual_offer.ind_offer_slug,
    COALESCE(individual_offer.ind_offer_img_small, '/img/empty-image.png'::text) AS ind_offer_img_small,
    individual_offer.ind_offer_img_big,
    individual_offer.ind_offer_priority,
    individual_offer.ind_offer_status,
    ((individual_offer.ind_offer_slug || '-'::text) || individual_offer.ind_offer_id) AS ind_offer_url,
    individual_offer.ind_offer_free_text1,
    individual_offer.ind_offer_free_text2,
    individual_offer.ind_offer_h1,
    individual_offer.ind_offer_footer_content_right,
    individual_offer.ind_offer_footer_content_left,
    COALESCE(individual_offer.seo_title, individual_offer.ind_offer_name) AS seo_title,
    individual_offer.seo_description,
    individual_offer.seo_keywords,
    COALESCE(individual_offer.ind_offer_img_small, '/img/main/page_logo_1_ck71lvkv50000kciace7g1eik.svg'::text) AS seo_image,
    ((individual_offer.ind_offer_slug || '-'::text) || individual_offer.ind_offer_id) AS seo_url
   FROM brc_ekoset.individual_offer
  ORDER BY individual_offer.ind_offer_priority DESC;


--
-- Name: v_api_partner; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_partner AS
 SELECT par.partner_id,
    par.partner_group_id,
    par.partner_name,
    par.partner_url,
    par.partner_priority,
    partgroup.partner_group_name,
    partgroup.partner_group_priority,
    par.partner_status
   FROM (brc_ekoset.partner par
     JOIN brc_ekoset.partner_group partgroup ON ((partgroup.partner_group_id = par.partner_group_id)))
  ORDER BY par.partner_status DESC;


--
-- Name: v_api_price_for_child_service; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_price_for_child_service AS
 SELECT business_service.business_service_id AS id,
    business_service.business_service_name AS name,
    business_service.site_section_id,
    business_service.business_service_unit AS businesserviceunit,
    business_service.business_service_price AS businesserviceprice,
    ((business_service.business_service_slug || '-'::text) || business_service.business_service_id) AS businesserviceurl,
    ((site_sec.site_section_slug || '-'::text) || site_sec.site_section_id) AS sitesectionurl,
    2 AS listmode
   FROM (brc_ekoset.business_service
     JOIN brc_ekoset.site_section site_sec ON ((business_service.site_section_id = site_sec.site_section_id)))
  WHERE ((site_sec.site_section_status = (1)::numeric) AND (business_service.business_service_status = (1)::numeric))
  ORDER BY business_service.business_service_name;


--
-- Name: v_api_price_list_by_root; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_price_list_by_root AS
SELECT
    NULL::integer AS id,
    NULL::text AS name,
    NULL::integer AS site_section_id,
    NULL::jsonb AS pricelist,
    NULL::text AS businesserviceunit,
    NULL::text AS businesserviceprice,
    NULL::text AS businesserviceurl,
    NULL::text AS sitesectionurl,
    NULL::integer AS listmode;


--
-- Name: v_api_price_for_client; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_price_for_client AS
 SELECT prices.id,
    prices.name,
    prices.site_section_id,
    prices.pricelist,
    prices.businesserviceunit,
    prices.businesserviceprice,
    prices.businesserviceurl,
    prices.sitesectionurl,
    prices.listmode,
    clien.cl_client_id,
    clien.business_service_id,
    clien.footer_include_ind
   FROM (brc_ekoset.v_api_price_list_by_root prices
     JOIN brc_ekoset.business_service_cl_client clien ON ((prices.id = clien.business_service_id)))
  ORDER BY prices.name;


--
-- Name: v_api_price_list; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_price_list AS
SELECT
    NULL::integer AS id,
    NULL::text AS name,
    NULL::jsonb AS pricelist,
    NULL::text AS sitesectionurl,
    NULL::integer AS listmode;


--
-- Name: v_api_price_list_for_activity; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_price_list_for_activity AS
 SELECT prices.id,
    prices.name,
    prices.site_section_id,
    prices.pricelist,
    prices.businesserviceunit,
    prices.businesserviceprice,
    prices.businesserviceurl,
    prices.sitesectionurl,
    prices.listmode,
    act.cl_activity_id,
    act.business_service_id
   FROM (brc_ekoset.v_api_price_list_by_root prices
     JOIN brc_ekoset.business_service_activity act ON ((prices.id = act.business_service_id)))
  ORDER BY prices.name;


--
-- Name: v_api_recommendation_letter; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_recommendation_letter AS
 SELECT recommendation.recomm_id,
    recommendation.cl_brand_id,
    br.cl_brand_name AS recomm_title,
    recommendation.recomm_date,
    recommendation.recomm_text,
    recommendation.recomm_brand_img,
    recommendation.recomm_brand_url,
    recommendation.recomm_slug,
    br.cl_brand_main_page_visible
   FROM (brc_ekoset.recommendation
     JOIN brc_ekoset.cl_brand br ON ((br.cl_brand_id = recommendation.cl_brand_id)))
  ORDER BY br.cl_brand_priority DESC;


--
-- Name: v_api_recommendation_letter_business_service; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_recommendation_letter_business_service AS
 SELECT recom.recomm_id,
    recom.cl_brand_id,
    brand.cl_brand_name AS recomm_title,
    recom.recomm_date,
    recom.recomm_text,
    recom.recomm_brand_img,
    recom.recomm_brand_url,
    recom.recomm_slug,
    secbrand.business_service_id
   FROM ((brc_ekoset.recommendation recom
     JOIN brc_ekoset.cl_brand_business_service secbrand ON ((secbrand.cl_brand_id = recom.cl_brand_id)))
     JOIN brc_ekoset.cl_brand brand ON ((recom.cl_brand_id = brand.cl_brand_id)))
  ORDER BY brand.cl_brand_priority DESC;


--
-- Name: v_api_recommendation_letter_site_section; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_recommendation_letter_site_section AS
 SELECT letters.recomm_id,
    letters.cl_brand_id,
    brand.cl_brand_name AS recomm_title,
    letters.recomm_date,
    letters.recomm_text,
    letters.recomm_brand_img,
    letters.recomm_brand_url,
    letters.recomm_slug,
    secbrand.site_section_id
   FROM ((brc_ekoset.recommendation letters
     JOIN brc_ekoset.site_section_brand secbrand ON ((secbrand.cl_brand_id = letters.cl_brand_id)))
     JOIN brc_ekoset.cl_brand brand ON ((letters.cl_brand_id = brand.cl_brand_id)))
  ORDER BY brand.cl_brand_priority DESC;


--
-- Name: v_api_related_article; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_related_article AS
 SELECT DISTINCT v_api_article_list.article_id,
    v_api_article_list.site_section_id,
    v_api_article_list.article_publish_date,
    v_api_article_list.article_author,
    v_api_article_list.article_title,
    v_api_article_list.article_slug,
    v_api_article_list.article_description,
    v_api_article_list.article_preview_img_src,
    v_api_article_list.article_header_img_src,
    v_api_article_list.article_source,
    v_api_article_list.article_views_number,
    v_api_article_list.article_status,
    v_api_article_list.article_url,
    main.article_id AS main_article_id
   FROM (brc_ekoset.article_cl_article_tag tag
     JOIN brc_ekoset.v_api_article_list ON ((v_api_article_list.article_id = tag.article_id))),
    brc_ekoset.article main
  WHERE ((tag.article_id <> main.article_id) AND (tag.cl_article_id IN ( SELECT article_cl_article_tag.cl_article_id
           FROM brc_ekoset.article_cl_article_tag
          WHERE (article_cl_article_tag.article_id = main.article_id))))
  ORDER BY v_api_article_list.article_publish_date DESC;


--
-- Name: v_api_root_service_list; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_root_service_list AS
SELECT
    NULL::integer AS id,
    NULL::text AS name,
    NULL::jsonb AS pricelist,
    NULL::text AS sitesectionurl,
    NULL::integer AS listmode;


--
-- Name: v_api_second_level_business_service; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_second_level_business_service AS
 SELECT bisserv.business_service_id,
    bisserv.site_section_id,
    bisserv.business_service_name,
    bisserv.business_service_slug,
    bisserv.business_service_unit,
    bisserv.business_service_price,
    bisserv.business_service_img_small,
    bisserv.business_service_img_big,
    bisserv.business_service_status,
    bisserv.business_service_priority,
    bisserv.business_service_parent_id,
    ((bisserv.business_service_slug || '-'::text) || bisserv.business_service_id) AS business_service_url,
    bisserv.site_section_url
   FROM (brc_ekoset.v_api_business_service bisserv
     JOIN brc_ekoset.business_service bisserv_child ON (((bisserv_child.business_service_id)::numeric = bisserv.business_service_parent_id)))
  ORDER BY bisserv.business_service_priority DESC, bisserv.business_service_id;


--
-- Name: v_api_seo_meta_tag; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_seo_meta_tag AS
 SELECT tag.cl_meta_tag_name AS name,
    tag.cl_meta_tag_hid AS hid,
    tag.cl_meta_tag_property AS property,
    tagcont.article_id,
    tagcont.business_service_id,
    tagcont.ind_offer_id,
    tagcont.site_section_id,
    tagcont.meta_tag_content_val AS content
   FROM (brc_ekoset.cl_meta_tag tag
     LEFT JOIN brc_ekoset.meta_tag_content tagcont ON ((tag.cl_meta_tag_id = tagcont.cl_meta_tag_id)));


--
-- Name: v_api_service_recurcive; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_service_recurcive AS
 WITH RECURSIVE recur AS (
        ( SELECT s1.business_service_id,
            s1.business_service_parent_id,
            s1.business_service_name,
            s1.business_service_slug,
            (s1.business_service_name || lpad((s1.business_service_id)::text, 10, '0'::text)) AS path,
            s1.site_section_id
           FROM brc_ekoset.business_service s1
          WHERE (s1.business_service_parent_id IS NULL)
          ORDER BY s1.business_service_name)
        UNION ALL
         SELECT s2.business_service_id,
            s2.business_service_parent_id,
            s2.business_service_name,
            s2.business_service_slug,
            (((recur_1.path || '/'::text) || s2.business_service_name) || lpad((s2.business_service_id)::text, 10, '0'::text)) AS path,
            s2.site_section_id
           FROM (brc_ekoset.business_service s2
             JOIN recur recur_1 ON (((recur_1.business_service_id)::numeric = s2.business_service_parent_id)))
        )
 SELECT recur.business_service_id,
    recur.business_service_parent_id,
    recur.business_service_name,
    recur.business_service_slug,
    recur.path,
    recur.site_section_id
   FROM recur
  ORDER BY recur.path;


--
-- Name: v_api_site_document; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_site_document AS
 SELECT site_document.site_document_id,
    site_document.site_document_file,
    site_document.site_document_status,
    site_document.site_document_name,
    site_document.site_section_id,
    site_document.site_document_url,
    ss.site_section_name
   FROM (brc_ekoset.site_document
     LEFT JOIN brc_ekoset.site_section ss ON ((ss.site_section_id = site_document.site_section_id)))
  ORDER BY site_document.site_document_name;


--
-- Name: v_api_site_page; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_site_page AS
 SELECT site_page.site_page_id,
    site_page.site_page_name,
    site_page.site_page_code,
    site_page.site_page_h1,
    site_page.site_page_menu_name,
    site_page.site_page_banner,
    site_page.site_page_menu_position,
    site_page.site_page_status,
    site_page.site_section_id,
    site_page.site_page_route_name,
    ((site_page.site_page_menu_name || '-'::text) || site_page.site_page_id) AS site_page_url,
    site_page.site_page_logo,
    COALESCE(site_page.seo_title, site_page.site_page_name) AS seo_title,
    site_page.seo_description,
    site_page.seo_keywords,
    COALESCE(site_page.site_page_banner, '/img/main/page_logo_1_ck71lvkv50000kciace7g1eik.svg'::text) AS seo_image,
    ((site_page.site_page_menu_name || '-'::text) || site_page.site_page_id) AS seo_url
   FROM brc_ekoset.site_page
  ORDER BY site_page.site_page_menu_position;


--
-- Name: v_api_site_section_article; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_site_section_article AS
 SELECT article.article_id,
    article.site_section_id,
    article.article_publish_date,
    article.article_author,
    article.article_title,
    article.article_slug,
    article.article_description,
    COALESCE(article.article_preview_img_src, '/img/empty-image.png'::text) AS article_preview_img_src,
    COALESCE(article.article_header_img_src, '/img/empty-image-big.png'::text) AS article_header_img_src,
    article.article_source,
    article.article_views_number,
    article.article_status,
    ((article.article_slug || '-'::text) || article.article_id) AS article_url
   FROM brc_ekoset.article
  WHERE ((NOT (EXISTS ( SELECT 1
           FROM brc_ekoset.business_service_article bservarticle
          WHERE (bservarticle.article_id = article.article_id)))) AND (article.site_section_id IS NOT NULL))
  ORDER BY article.article_publish_date DESC;


--
-- Name: v_api_user_request; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_api_user_request AS
 SELECT user_request.user_request_id,
    user_request.user_request_date,
    user_request.user_request_type,
    user_request.user_request_user,
    user_request.user_request_phone,
    user_request.user_request_mail,
    user_request.user_request_section,
    user_request.user_request_service,
    user_request.user_request_text,
    user_request.user_request_file_name
   FROM brc_ekoset.user_request;


--
-- Name: v_partner_group; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_partner_group AS
 SELECT partner_group.partner_group_id,
    partner_group.partner_group_name,
    partner_group.partner_group_priority
   FROM brc_ekoset.partner_group
  ORDER BY partner_group.partner_group_priority DESC;


--
-- Name: v_related_service; Type: VIEW; Schema: brc_ekoset; Owner: -
--

CREATE VIEW brc_ekoset.v_related_service AS
 SELECT bisserv.business_service_id,
    bisserv.site_section_id,
    bisserv.business_service_name,
    bisserv.business_service_slug,
    bisserv.business_service_unit,
    bisserv.business_service_price,
    bisserv.business_service_img_small,
    bisserv.business_service_img_big,
    bisserv.business_service_status,
    bisserv.business_service_priority,
    bisserv.business_service_parent_id,
    bisserv.business_service_url,
    bisserv.business_service_free_text1,
    bisserv.business_service_free_text2,
    bisserv.site_section_url,
    bisserv.site_section_name,
    bisserv.business_service_h1,
    bisserv.business_service_footer_content_right,
    bisserv.business_service_footer_content_left,
    relat.business_service_id AS business_service_id_for_rel,
    relat.business_service_related_priori
   FROM (brc_ekoset.v_api_business_service bisserv
     JOIN brc_ekoset.business_service_related relat ON ((bisserv.business_service_id = relat.bus_business_service_id)))
  WHERE (bisserv.business_service_status = (1)::numeric)
  ORDER BY relat.business_service_related_priori DESC;


--
-- Name: app_user app_user_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.app_user ALTER COLUMN app_user_id SET DEFAULT nextval('brc_ekoset.app_user_app_user_id_seq'::regclass);


--
-- Name: app_user_session user_session_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.app_user_session ALTER COLUMN user_session_id SET DEFAULT nextval('brc_ekoset.app_user_session_user_session_id_seq'::regclass);


--
-- Name: app_user_social_net_profile user_sn_profile_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.app_user_social_net_profile ALTER COLUMN user_sn_profile_id SET DEFAULT nextval('brc_ekoset.app_user_social_net_profile_user_sn_profile_id_seq'::regclass);


--
-- Name: article article_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.article ALTER COLUMN article_id SET DEFAULT nextval('brc_ekoset.article_article_id_seq'::regclass);


--
-- Name: business_service business_service_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service ALTER COLUMN business_service_id SET DEFAULT nextval('brc_ekoset.business_service_business_service_id_seq'::regclass);


--
-- Name: business_service_related business_service_related_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_related ALTER COLUMN business_service_related_id SET DEFAULT nextval('brc_ekoset.business_service_related_business_service_related_id_seq'::regclass);


--
-- Name: cl_activity cl_activity_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_activity ALTER COLUMN cl_activity_id SET DEFAULT nextval('brc_ekoset.cl_activity_cl_activity_id_seq'::regclass);


--
-- Name: cl_article_tag cl_article_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_article_tag ALTER COLUMN cl_article_id SET DEFAULT nextval('brc_ekoset.cl_article_tag_cl_article_id_seq'::regclass);


--
-- Name: cl_brand cl_brand_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_brand ALTER COLUMN cl_brand_id SET DEFAULT nextval('brc_ekoset.cl_brand_cl_brand_id_seq'::regclass);


--
-- Name: cl_client cl_client_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_client ALTER COLUMN cl_client_id SET DEFAULT nextval('brc_ekoset.cl_client_cl_client_id_seq'::regclass);


--
-- Name: cl_meta_tag cl_meta_tag_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_meta_tag ALTER COLUMN cl_meta_tag_id SET DEFAULT nextval('brc_ekoset.cl_meta_tag_cl_meta_tag_id_seq'::regclass);


--
-- Name: cl_site_block cl_site_block_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_site_block ALTER COLUMN cl_site_block_id SET DEFAULT nextval('brc_ekoset.cl_site_block_cl_site_block_d_seq'::regclass);


--
-- Name: cl_site_setting cl_site_setting_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_site_setting ALTER COLUMN cl_site_setting_id SET DEFAULT nextval('brc_ekoset.cl_site_setting_cl_site_setting_id_seq'::regclass);


--
-- Name: individual_offer ind_offer_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.individual_offer ALTER COLUMN ind_offer_id SET DEFAULT nextval('brc_ekoset.individual_offer_ind_offer_id_seq'::regclass);


--
-- Name: meta_tag_content meta_tag_content_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.meta_tag_content ALTER COLUMN meta_tag_content_id SET DEFAULT nextval('brc_ekoset.meta_tag_content_meta_tag_content_id_seq'::regclass);


--
-- Name: partner partner_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.partner ALTER COLUMN partner_id SET DEFAULT nextval('brc_ekoset.partner_partner_id_seq'::regclass);


--
-- Name: partner_group partner_group_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.partner_group ALTER COLUMN partner_group_id SET DEFAULT nextval('brc_ekoset.partner_group_partner_group_id_seq'::regclass);


--
-- Name: proxy_list proxy_list_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.proxy_list ALTER COLUMN proxy_list_id SET DEFAULT nextval('brc_ekoset.proxy_list_proxy_list_id_seq'::regclass);


--
-- Name: recommendation recomm_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.recommendation ALTER COLUMN recomm_id SET DEFAULT nextval('brc_ekoset.recommendation_recomm_id_seq'::regclass);


--
-- Name: site_block site_block_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_block ALTER COLUMN site_block_id SET DEFAULT nextval('brc_ekoset.site_block_site_block_id_seq'::regclass);


--
-- Name: site_document site_document_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_document ALTER COLUMN site_document_id SET DEFAULT nextval('brc_ekoset.site_document_site_document_id_seq'::regclass);


--
-- Name: site_page site_page_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_page ALTER COLUMN site_page_id SET DEFAULT nextval('brc_ekoset.site_page_site_page_id_seq'::regclass);


--
-- Name: site_section site_section_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_section ALTER COLUMN site_section_id SET DEFAULT nextval('brc_ekoset.site_section_site_section_id_seq'::regclass);


--
-- Name: site_settings site_settings_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_settings ALTER COLUMN site_settings_id SET DEFAULT nextval('brc_ekoset.site_settings_site_settings_id_seq'::regclass);


--
-- Name: site_social_network site_social_net_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_social_network ALTER COLUMN site_social_net_id SET DEFAULT nextval('brc_ekoset.site_social_network_site_social_net_id_seq'::regclass);


--
-- Name: user_request user_request_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.user_request ALTER COLUMN user_request_id SET DEFAULT nextval('brc_ekoset.user_request_user_request_id_seq'::regclass);


--
-- Name: user_request_file user_request_file_id; Type: DEFAULT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.user_request_file ALTER COLUMN user_request_file_id SET DEFAULT nextval('brc_ekoset.user_request_file_user_request_file_id_seq'::regclass);


--
-- Name: business_service_related business_service_related_idx; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_related
    ADD CONSTRAINT business_service_related_idx UNIQUE (business_service_id, bus_business_service_id);


--
-- Name: app_user pk_app_user; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.app_user
    ADD CONSTRAINT pk_app_user PRIMARY KEY (app_user_id);


--
-- Name: article pk_article; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.article
    ADD CONSTRAINT pk_article PRIMARY KEY (article_id);


--
-- Name: article_cl_article_tag pk_article_cl_article_tag; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.article_cl_article_tag
    ADD CONSTRAINT pk_article_cl_article_tag PRIMARY KEY (article_id, cl_article_id);


--
-- Name: business_service pk_business_service; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service
    ADD CONSTRAINT pk_business_service PRIMARY KEY (business_service_id);


--
-- Name: business_service_activity pk_business_service_activity; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_activity
    ADD CONSTRAINT pk_business_service_activity PRIMARY KEY (cl_activity_id, business_service_id);


--
-- Name: business_service_article pk_business_service_article; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_article
    ADD CONSTRAINT pk_business_service_article PRIMARY KEY (business_service_id, article_id);


--
-- Name: business_service_cl_client pk_business_service_cl_client; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_cl_client
    ADD CONSTRAINT pk_business_service_cl_client PRIMARY KEY (cl_client_id, business_service_id);


--
-- Name: business_service_related pk_business_service_related; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_related
    ADD CONSTRAINT pk_business_service_related PRIMARY KEY (business_service_related_id);


--
-- Name: cl_activity pk_cl_activity; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_activity
    ADD CONSTRAINT pk_cl_activity PRIMARY KEY (cl_activity_id);


--
-- Name: cl_article_tag pk_cl_article_tag; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_article_tag
    ADD CONSTRAINT pk_cl_article_tag PRIMARY KEY (cl_article_id);


--
-- Name: cl_brand pk_cl_brand; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_brand
    ADD CONSTRAINT pk_cl_brand PRIMARY KEY (cl_brand_id);


--
-- Name: cl_brand_business_service pk_cl_brand_business_service; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_brand_business_service
    ADD CONSTRAINT pk_cl_brand_business_service PRIMARY KEY (cl_brand_id, business_service_id);


--
-- Name: cl_client pk_cl_client; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_client
    ADD CONSTRAINT pk_cl_client PRIMARY KEY (cl_client_id);


--
-- Name: cl_meta_tag pk_cl_meta_tag; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_meta_tag
    ADD CONSTRAINT pk_cl_meta_tag PRIMARY KEY (cl_meta_tag_id);


--
-- Name: cl_site_block pk_cl_site_block; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_site_block
    ADD CONSTRAINT pk_cl_site_block PRIMARY KEY (cl_site_block_id);


--
-- Name: cl_site_setting pk_cl_site_setting; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_site_setting
    ADD CONSTRAINT pk_cl_site_setting PRIMARY KEY (cl_site_setting_id);


--
-- Name: individual_offer pk_individual_offer; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.individual_offer
    ADD CONSTRAINT pk_individual_offer PRIMARY KEY (ind_offer_id);


--
-- Name: meta_tag_content pk_meta_tag_content; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.meta_tag_content
    ADD CONSTRAINT pk_meta_tag_content PRIMARY KEY (meta_tag_content_id);


--
-- Name: partner pk_partner; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.partner
    ADD CONSTRAINT pk_partner PRIMARY KEY (partner_id);


--
-- Name: partner_group pk_partner_group; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.partner_group
    ADD CONSTRAINT pk_partner_group PRIMARY KEY (partner_group_id);


--
-- Name: proxy_list pk_proxy_list_id; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.proxy_list
    ADD CONSTRAINT pk_proxy_list_id PRIMARY KEY (proxy_list_id);


--
-- Name: recommendation pk_recommendation; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.recommendation
    ADD CONSTRAINT pk_recommendation PRIMARY KEY (recomm_id);


--
-- Name: site_block pk_site_block; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_block
    ADD CONSTRAINT pk_site_block PRIMARY KEY (site_block_id);


--
-- Name: site_page pk_site_page; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_page
    ADD CONSTRAINT pk_site_page PRIMARY KEY (site_page_id);


--
-- Name: site_section pk_site_section; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_section
    ADD CONSTRAINT pk_site_section PRIMARY KEY (site_section_id);


--
-- Name: site_section_brand pk_site_section_brand; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_section_brand
    ADD CONSTRAINT pk_site_section_brand PRIMARY KEY (site_section_id, cl_brand_id);


--
-- Name: site_social_network pk_site_social_network; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_social_network
    ADD CONSTRAINT pk_site_social_network PRIMARY KEY (site_social_net_id);


--
-- Name: app_user_session pk_user_activity; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.app_user_session
    ADD CONSTRAINT pk_user_activity PRIMARY KEY (user_session_id);


--
-- Name: user_request pk_user_request; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.user_request
    ADD CONSTRAINT pk_user_request PRIMARY KEY (user_request_id);


--
-- Name: user_request_file pk_user_request_file_id; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.user_request_file
    ADD CONSTRAINT pk_user_request_file_id PRIMARY KEY (user_request_file_id);


--
-- Name: app_user_social_net_profile pk_user_social_net_profile; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.app_user_social_net_profile
    ADD CONSTRAINT pk_user_social_net_profile PRIMARY KEY (user_sn_profile_id);


--
-- Name: site_settings site_settings_pkey; Type: CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_settings
    ADD CONSTRAINT site_settings_pkey PRIMARY KEY (site_settings_id);


--
-- Name: business_service_cl_client_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX business_service_cl_client_fk ON brc_ekoset.business_service_cl_client USING btree (cl_client_id);


--
-- Name: business_service_parent_idx; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX business_service_parent_idx ON brc_ekoset.business_service USING btree (business_service_parent_id);


--
-- Name: business_service_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX business_service_pk ON brc_ekoset.business_service USING btree (business_service_id);


--
-- Name: business_service_prior_idx; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX business_service_prior_idx ON brc_ekoset.business_service USING btree (business_service_priority);


--
-- Name: business_service_related_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX business_service_related_pk ON brc_ekoset.business_service_related USING btree (business_service_related_id);


--
-- Name: business_service_status_idx; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX business_service_status_idx ON brc_ekoset.business_service USING btree (business_service_status);


--
-- Name: cl_activity_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX cl_activity_pk ON brc_ekoset.cl_activity USING btree (cl_activity_id);


--
-- Name: cl_article_tag_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX cl_article_tag_pk ON brc_ekoset.cl_article_tag USING btree (cl_article_id);


--
-- Name: cl_brand_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX cl_brand_pk ON brc_ekoset.cl_brand USING btree (cl_brand_id);


--
-- Name: cl_brand_status_idx; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX cl_brand_status_idx ON brc_ekoset.cl_brand USING btree (cl_brand_status);


--
-- Name: cl_client_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX cl_client_pk ON brc_ekoset.cl_client USING btree (cl_client_id);


--
-- Name: cl_meta_tag_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX cl_meta_tag_pk ON brc_ekoset.cl_meta_tag USING btree (cl_meta_tag_id);


--
-- Name: cl_site_block_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX cl_site_block_pk ON brc_ekoset.cl_site_block USING btree (cl_site_block_id);


--
-- Name: cl_site_setting_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX cl_site_setting_pk ON brc_ekoset.cl_site_setting USING btree (cl_site_setting_id);


--
-- Name: ind_app_user_email; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX ind_app_user_email ON brc_ekoset.app_user USING btree (app_user_email);


--
-- Name: ind_app_user_reg_token; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX ind_app_user_reg_token ON brc_ekoset.app_user USING btree (app_user_reg_token);


--
-- Name: ind_app_user_reset_pwd_date; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX ind_app_user_reset_pwd_date ON brc_ekoset.app_user USING btree (app_user_reset_pwd_date);


--
-- Name: ind_bs_meta_tag; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX ind_bs_meta_tag ON brc_ekoset.meta_tag_content USING btree (business_service_id);


--
-- Name: ind_cl_activity_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX ind_cl_activity_fk ON brc_ekoset.cl_brand USING btree (cl_activity_id);


--
-- Name: ind_site_section_id; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX ind_site_section_id ON brc_ekoset.article USING btree (site_section_id);


--
-- Name: ind_sn_profile_code; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX ind_sn_profile_code ON brc_ekoset.app_user_social_net_profile USING btree (user_sn_profile_code);


--
-- Name: ind_sn_profile_type; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX ind_sn_profile_type ON brc_ekoset.app_user_social_net_profile USING btree (user_sn_profile_type);


--
-- Name: ind_user_session_token; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX ind_user_session_token ON brc_ekoset.app_user_session USING btree (user_session_token);


--
-- Name: individual_offer_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX individual_offer_pk ON brc_ekoset.individual_offer USING btree (ind_offer_id);


--
-- Name: meta_tag_content_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX meta_tag_content_pk ON brc_ekoset.meta_tag_content USING btree (meta_tag_content_id);


--
-- Name: news_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX news_pk ON brc_ekoset.article USING btree (article_id);


--
-- Name: partner_group_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX partner_group_pk ON brc_ekoset.partner_group USING btree (partner_group_id);


--
-- Name: partner_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX partner_pk ON brc_ekoset.partner USING btree (partner_id);


--
-- Name: pk_user_request_file_id_ind; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX pk_user_request_file_id_ind ON brc_ekoset.user_request_file USING btree (user_request_file_id);


--
-- Name: proxy_list_id_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX proxy_list_id_pk ON brc_ekoset.proxy_list USING btree (proxy_list_id);


--
-- Name: recommendation_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX recommendation_pk ON brc_ekoset.recommendation USING btree (recomm_id);


--
-- Name: relationship_10_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_10_fk ON brc_ekoset.business_service_activity USING btree (business_service_id);


--
-- Name: relationship_12_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_12_fk ON brc_ekoset.business_service_cl_client USING btree (business_service_id);


--
-- Name: relationship_13_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_13_fk ON brc_ekoset.business_service_article USING btree (business_service_id);


--
-- Name: relationship_14_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_14_fk ON brc_ekoset.business_service_article USING btree (article_id);


--
-- Name: relationship_15_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_15_fk ON brc_ekoset.article_cl_article_tag USING btree (article_id);


--
-- Name: relationship_15_fk2; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_15_fk2 ON brc_ekoset.partner USING btree (partner_group_id);


--
-- Name: relationship_16_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_16_fk ON brc_ekoset.article_cl_article_tag USING btree (cl_article_id);


--
-- Name: relationship_16_fk2; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_16_fk2 ON brc_ekoset.meta_tag_content USING btree (site_section_id);


--
-- Name: relationship_18_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_18_fk ON brc_ekoset.meta_tag_content USING btree (cl_meta_tag_id);


--
-- Name: relationship_18_fk2; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_18_fk2 ON brc_ekoset.meta_tag_content USING btree (ind_offer_id);


--
-- Name: relationship_19_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_19_fk ON brc_ekoset.meta_tag_content USING btree (article_id);


--
-- Name: relationship_1_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_1_fk ON brc_ekoset.app_user_session USING btree (app_user_id);


--
-- Name: relationship_20_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_20_fk ON brc_ekoset.cl_brand_business_service USING btree (cl_brand_id);


--
-- Name: relationship_20_fk2; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_20_fk2 ON brc_ekoset.recommendation USING btree (cl_brand_id);


--
-- Name: relationship_21_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_21_fk ON brc_ekoset.cl_brand_business_service USING btree (business_service_id);


--
-- Name: relationship_21_fk2; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_21_fk2 ON brc_ekoset.site_block USING btree (site_section_id);


--
-- Name: relationship_22_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_22_fk ON brc_ekoset.site_block USING btree (cl_site_block_d);


--
-- Name: relationship_23_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_23_fk ON brc_ekoset.site_block USING btree (ind_offer_id);


--
-- Name: relationship_24_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_24_fk ON brc_ekoset.site_block USING btree (business_service_id);


--
-- Name: relationship_25_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_25_fk ON brc_ekoset.site_block USING btree (site_page_id);


--
-- Name: relationship_26_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_26_fk ON brc_ekoset.business_service_related USING btree (business_service_id);


--
-- Name: relationship_27_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_27_fk ON brc_ekoset.business_service_related USING btree (bus_business_service_id);


--
-- Name: relationship_2_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_2_fk ON brc_ekoset.app_user_social_net_profile USING btree (app_user_id);


--
-- Name: relationship_5_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_5_fk ON brc_ekoset.individual_offer USING btree (cl_activity_id);


--
-- Name: relationship_6_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_6_fk ON brc_ekoset.individual_offer USING btree (site_section_id);


--
-- Name: relationship_7_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_7_fk ON brc_ekoset.individual_offer USING btree (cl_client_id);


--
-- Name: relationship_8_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_8_fk ON brc_ekoset.business_service USING btree (site_section_id);


--
-- Name: relationship_9_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_9_fk ON brc_ekoset.business_service_activity USING btree (cl_activity_id);


--
-- Name: relationship_dd8_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX relationship_dd8_fk ON brc_ekoset.user_request_file USING btree (user_request_id);


--
-- Name: rsselationship_20_fk2; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX rsselationship_20_fk2 ON brc_ekoset.site_page USING btree (site_section_id);


--
-- Name: site_block_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX site_block_pk ON brc_ekoset.site_block USING btree (site_block_id);


--
-- Name: site_block_position_idx; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX site_block_position_idx ON brc_ekoset.site_block USING btree (site_block_position);


--
-- Name: site_block_visible_idx; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX site_block_visible_idx ON brc_ekoset.site_block USING btree (site_block_visible_ind);


--
-- Name: site_page_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX site_page_pk ON brc_ekoset.site_page USING btree (site_page_id);


--
-- Name: site_section_brand2_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX site_section_brand2_fk ON brc_ekoset.site_section_brand USING btree (cl_brand_id);


--
-- Name: site_section_brand_fk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE INDEX site_section_brand_fk ON brc_ekoset.site_section_brand USING btree (site_section_id);


--
-- Name: site_section_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX site_section_pk ON brc_ekoset.site_section USING btree (site_section_id);


--
-- Name: site_social_network_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX site_social_network_pk ON brc_ekoset.site_social_network USING btree (site_social_net_id);


--
-- Name: user_request_pk; Type: INDEX; Schema: brc_ekoset; Owner: -
--

CREATE UNIQUE INDEX user_request_pk ON brc_ekoset.user_request USING btree (user_request_id);


--
-- Name: v_api_price_list_by_root _RETURN; Type: RULE; Schema: brc_ekoset; Owner: -
--

CREATE OR REPLACE VIEW brc_ekoset.v_api_price_list_by_root AS
 SELECT business_service.business_service_id AS id,
    business_service.business_service_name AS name,
    business_service.site_section_id,
    jsonb_agg(to_jsonb(serv.*)) AS pricelist,
    business_service.business_service_unit AS businesserviceunit,
    business_service.business_service_price AS businesserviceprice,
    ((business_service.business_service_slug || '-'::text) || business_service.business_service_id) AS businesserviceurl,
    max(((site_sec.site_section_slug || '-'::text) || site_sec.site_section_id)) AS sitesectionurl,
    1 AS listmode
   FROM ((brc_ekoset.business_service
     JOIN brc_ekoset.site_section site_sec ON ((business_service.site_section_id = site_sec.site_section_id)))
     LEFT JOIN ( SELECT business_service_1.business_service_id,
            business_service_1.site_section_id,
            business_service_1.business_service_name AS businesservicename,
            business_service_1.business_service_unit AS businesserviceunit,
            business_service_1.business_service_price AS businesserviceprice,
            business_service_1.business_service_status,
            business_service_1.business_service_priority,
            business_service_1.business_service_parent_id,
            ((business_service_1.business_service_slug || '-'::text) || business_service_1.business_service_id) AS businesserviceurl,
            ((ss.site_section_slug || '-'::text) || ss.site_section_id) AS sitesectionurl
           FROM (brc_ekoset.business_service business_service_1
             JOIN brc_ekoset.site_section ss ON ((business_service_1.site_section_id = ss.site_section_id)))
          WHERE ((ss.site_section_status = (1)::numeric) AND (business_service_1.business_service_parent_id IS NOT NULL) AND (business_service_1.business_service_status = (1)::numeric))
          ORDER BY business_service_1.business_service_name) serv ON ((serv.business_service_parent_id = (business_service.business_service_id)::numeric)))
  WHERE ((business_service.business_service_parent_id IS NULL) AND (business_service.business_service_status = (1)::numeric))
  GROUP BY business_service.business_service_id
  ORDER BY business_service.business_service_name;


--
-- Name: v_api_price_list _RETURN; Type: RULE; Schema: brc_ekoset; Owner: -
--

CREATE OR REPLACE VIEW brc_ekoset.v_api_price_list AS
 SELECT site_section.site_section_id AS id,
    site_section.site_section_name AS name,
    jsonb_agg(to_jsonb(serv.*)) AS pricelist,
    ((site_section.site_section_slug || '-'::text) || site_section.site_section_id) AS sitesectionurl,
    0 AS listmode
   FROM (brc_ekoset.site_section
     JOIN ( SELECT business_service.business_service_id,
            business_service.site_section_id,
            business_service.business_service_name AS businesservicename,
            business_service.business_service_unit AS businesserviceunit,
            business_service.business_service_price AS businesserviceprice,
            business_service.business_service_status,
            business_service.business_service_priority,
            business_service.business_service_parent_id,
            ((business_service.business_service_slug || '-'::text) || business_service.business_service_id) AS businesserviceurl,
            ((ss.site_section_slug || '-'::text) || ss.site_section_id) AS sitesectionurl
           FROM (brc_ekoset.business_service
             JOIN brc_ekoset.site_section ss ON ((business_service.site_section_id = ss.site_section_id)))
          WHERE ((business_service.business_service_parent_id IS NULL) AND (business_service.business_service_status = (1)::numeric))
          ORDER BY business_service.business_service_name) serv ON ((serv.site_section_id = site_section.site_section_id)))
  WHERE (site_section.site_section_status = (1)::numeric)
  GROUP BY site_section.site_section_id
  ORDER BY site_section.site_section_priority DESC;


--
-- Name: v_api_root_service_list _RETURN; Type: RULE; Schema: brc_ekoset; Owner: -
--

CREATE OR REPLACE VIEW brc_ekoset.v_api_root_service_list AS
 SELECT site_section.site_section_id AS id,
    site_section.site_section_name AS name,
    jsonb_agg(to_jsonb(serv.*)) AS pricelist,
    ((site_section.site_section_slug || '-'::text) || site_section.site_section_id) AS sitesectionurl,
    0 AS listmode
   FROM (brc_ekoset.site_section
     JOIN ( SELECT business_service.business_service_id,
            business_service.site_section_id,
            business_service.business_service_name AS businesservicename,
            business_service.business_service_unit AS businesserviceunit,
            business_service.business_service_price AS businesserviceprice,
            business_service.business_service_status,
            business_service.business_service_priority,
            business_service.business_service_parent_id,
            ((business_service.business_service_slug || '-'::text) || business_service.business_service_id) AS businesserviceurl,
            ((ss.site_section_slug || '-'::text) || ss.site_section_id) AS sitesectionurl
           FROM (brc_ekoset.business_service
             JOIN brc_ekoset.site_section ss ON ((business_service.site_section_id = ss.site_section_id)))
          WHERE ((business_service.business_service_parent_id IS NULL) AND (business_service.business_service_status = (1)::numeric))
          ORDER BY business_service.business_service_priority DESC) serv ON ((serv.site_section_id = site_section.site_section_id)))
  WHERE (site_section.site_section_status = (1)::numeric)
  GROUP BY site_section.site_section_id
  ORDER BY site_section.site_section_priority DESC;


--
-- Name: v_api_clients _RETURN; Type: RULE; Schema: brc_ekoset; Owner: -
--

CREATE OR REPLACE VIEW brc_ekoset.v_api_clients AS
 SELECT max(activity.cl_activity_name) AS cl_activity_name,
    jsonb_agg(to_jsonb(brands.*)) AS brands_list,
    max(COALESCE(activity.cl_activity_main_client_img, '/img/empty-image.png'::text)) AS cl_activity_main_client_img,
    count(1) AS allcount,
    activity.cl_activity_id
   FROM (brc_ekoset.cl_activity activity
     JOIN ( SELECT cl_brand.cl_brand_id AS id,
            cl_brand.cl_brand_name AS name,
            cl_brand.cl_activity_id
           FROM brc_ekoset.cl_brand
          WHERE (cl_brand.cl_brand_status = (1)::numeric)
          ORDER BY cl_brand.cl_brand_priority DESC) brands ON ((activity.cl_activity_id = brands.cl_activity_id)))
  GROUP BY activity.cl_activity_id
  ORDER BY activity.cl_activity_name;


--
-- Name: v_api_all_clients _RETURN; Type: RULE; Schema: brc_ekoset; Owner: -
--

CREATE OR REPLACE VIEW brc_ekoset.v_api_all_clients AS
 SELECT max(activity.cl_activity_name) AS cl_activity_name,
    jsonb_agg(to_jsonb(brands.*)) AS brands_list,
    max(COALESCE(activity.cl_activity_main_client_img, '/img/empty-image.png'::text)) AS cl_activity_main_client_img,
    count(1) AS allcount,
    activity.cl_activity_id
   FROM (brc_ekoset.cl_activity activity
     JOIN ( SELECT cl_brand.cl_brand_id AS id,
            cl_brand.cl_brand_name AS name,
            cl_brand.cl_activity_id,
            COALESCE(cl_brand.cl_brand_img_small, '/img/empty-image.png'::text) AS cl_brand_img_small
           FROM brc_ekoset.cl_brand
          WHERE (cl_brand.cl_brand_status = (1)::numeric)
          ORDER BY cl_brand.cl_brand_name) brands ON ((activity.cl_activity_id = brands.cl_activity_id)))
  GROUP BY activity.cl_activity_id
  ORDER BY activity.cl_activity_name;


--
-- Name: v_api_footer_service_private _RETURN; Type: RULE; Schema: brc_ekoset; Owner: -
--

CREATE OR REPLACE VIEW brc_ekoset.v_api_footer_service_private AS
 SELECT site_section.site_section_id,
    site_section.site_section_name,
    jsonb_agg((to_jsonb(serv.*) - 'site_section_id'::text)) AS services
   FROM (brc_ekoset.site_section
     JOIN ( SELECT bisserv.business_service_name AS "businessServiceName",
            bisserv.business_service_id AS "businessServiceId",
            clien.footer_include_ind AS "hasRelation",
            bisserv.site_section_id
           FROM (brc_ekoset.business_service bisserv
             JOIN brc_ekoset.business_service_cl_client clien ON ((bisserv.business_service_id = clien.business_service_id)))
          WHERE ((bisserv.business_service_status = (1)::numeric) AND (clien.cl_client_id = 3))
          ORDER BY bisserv.business_service_name) serv ON ((serv.site_section_id = site_section.site_section_id)))
  GROUP BY site_section.site_section_id
  ORDER BY site_section.site_section_name;


--
-- Name: v_api_footer_service_business _RETURN; Type: RULE; Schema: brc_ekoset; Owner: -
--

CREATE OR REPLACE VIEW brc_ekoset.v_api_footer_service_business AS
 SELECT site_section.site_section_id,
    site_section.site_section_name,
    jsonb_agg((to_jsonb(serv.*) - 'site_section_id'::text)) AS services
   FROM (brc_ekoset.site_section
     JOIN ( SELECT bisserv.business_service_name AS "businessServiceName",
            bisserv.business_service_id AS "businessServiceId",
            clien.footer_include_ind AS "hasRelation",
            bisserv.site_section_id
           FROM (brc_ekoset.business_service bisserv
             JOIN brc_ekoset.business_service_cl_client clien ON ((bisserv.business_service_id = clien.business_service_id)))
          WHERE ((bisserv.business_service_status = (1)::numeric) AND (clien.cl_client_id = 1))
          ORDER BY bisserv.business_service_name) serv ON ((serv.site_section_id = site_section.site_section_id)))
  GROUP BY site_section.site_section_id
  ORDER BY site_section.site_section_name;


--
-- Name: article_cl_article_tag fk_article__article_c_article; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.article_cl_article_tag
    ADD CONSTRAINT fk_article__article_c_article FOREIGN KEY (article_id) REFERENCES brc_ekoset.article(article_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: article_cl_article_tag fk_article__article_c_cl_artic; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.article_cl_article_tag
    ADD CONSTRAINT fk_article__article_c_cl_artic FOREIGN KEY (cl_article_id) REFERENCES brc_ekoset.cl_article_tag(cl_article_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: article fk_article_relations_site_sec; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.article
    ADD CONSTRAINT fk_article_relations_site_sec FOREIGN KEY (site_section_id) REFERENCES brc_ekoset.site_section(site_section_id) MATCH FULL ON UPDATE RESTRICT ON DELETE SET NULL;


--
-- Name: business_service_article fk_business_business__article; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_article
    ADD CONSTRAINT fk_business_business__article FOREIGN KEY (article_id) REFERENCES brc_ekoset.article(article_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: business_service_article fk_business_business__business; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_article
    ADD CONSTRAINT fk_business_business__business FOREIGN KEY (business_service_id) REFERENCES brc_ekoset.business_service(business_service_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: business_service_activity fk_business_business__business; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_activity
    ADD CONSTRAINT fk_business_business__business FOREIGN KEY (business_service_id) REFERENCES brc_ekoset.business_service(business_service_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: business_service_cl_client fk_business_business__business; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_cl_client
    ADD CONSTRAINT fk_business_business__business FOREIGN KEY (business_service_id) REFERENCES brc_ekoset.business_service(business_service_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: business_service_activity fk_business_business__cl_activ; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_activity
    ADD CONSTRAINT fk_business_business__cl_activ FOREIGN KEY (cl_activity_id) REFERENCES brc_ekoset.cl_activity(cl_activity_id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: business_service_cl_client fk_business_business__cl_clien; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_cl_client
    ADD CONSTRAINT fk_business_business__cl_clien FOREIGN KEY (cl_client_id) REFERENCES brc_ekoset.cl_client(cl_client_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: business_service_related fk_business_reddions_business; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_related
    ADD CONSTRAINT fk_business_reddions_business FOREIGN KEY (business_service_id) REFERENCES brc_ekoset.business_service(business_service_id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: business_service fk_business_relations_site_sec; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service
    ADD CONSTRAINT fk_business_relations_site_sec FOREIGN KEY (site_section_id) REFERENCES brc_ekoset.site_section(site_section_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: business_service_related fk_business_relddons_business; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.business_service_related
    ADD CONSTRAINT fk_business_relddons_business FOREIGN KEY (bus_business_service_id) REFERENCES brc_ekoset.business_service(business_service_id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: cl_brand fk_cl_activity; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_brand
    ADD CONSTRAINT fk_cl_activity FOREIGN KEY (cl_activity_id) REFERENCES brc_ekoset.cl_activity(cl_activity_id) MATCH FULL ON UPDATE RESTRICT ON DELETE SET NULL;


--
-- Name: cl_brand_business_service fk_cl_brand_business__business; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_brand_business_service
    ADD CONSTRAINT fk_cl_brand_business__business FOREIGN KEY (business_service_id) REFERENCES brc_ekoset.business_service(business_service_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: cl_brand_business_service fk_cl_brand_business__cl_brand; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.cl_brand_business_service
    ADD CONSTRAINT fk_cl_brand_business__cl_brand FOREIGN KEY (cl_brand_id) REFERENCES brc_ekoset.cl_brand(cl_brand_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: individual_offer fk_individu_relations_cl_activ; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.individual_offer
    ADD CONSTRAINT fk_individu_relations_cl_activ FOREIGN KEY (cl_activity_id) REFERENCES brc_ekoset.cl_activity(cl_activity_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: individual_offer fk_individu_relations_cl_clien; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.individual_offer
    ADD CONSTRAINT fk_individu_relations_cl_clien FOREIGN KEY (cl_client_id) REFERENCES brc_ekoset.cl_client(cl_client_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: individual_offer fk_individu_relations_site_sec; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.individual_offer
    ADD CONSTRAINT fk_individu_relations_site_sec FOREIGN KEY (site_section_id) REFERENCES brc_ekoset.site_section(site_section_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: meta_tag_content fk_meta_tag_relations_article; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.meta_tag_content
    ADD CONSTRAINT fk_meta_tag_relations_article FOREIGN KEY (article_id) REFERENCES brc_ekoset.article(article_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: meta_tag_content fk_meta_tag_relations_business; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.meta_tag_content
    ADD CONSTRAINT fk_meta_tag_relations_business FOREIGN KEY (business_service_id) REFERENCES brc_ekoset.business_service(business_service_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: meta_tag_content fk_meta_tag_relations_cl_meta_; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.meta_tag_content
    ADD CONSTRAINT fk_meta_tag_relations_cl_meta_ FOREIGN KEY (cl_meta_tag_id) REFERENCES brc_ekoset.cl_meta_tag(cl_meta_tag_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: meta_tag_content fk_meta_tag_relations_individu; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.meta_tag_content
    ADD CONSTRAINT fk_meta_tag_relations_individu FOREIGN KEY (ind_offer_id) REFERENCES brc_ekoset.individual_offer(ind_offer_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: meta_tag_content fk_meta_tag_relations_site_sec; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.meta_tag_content
    ADD CONSTRAINT fk_meta_tag_relations_site_sec FOREIGN KEY (site_section_id) REFERENCES brc_ekoset.site_section(site_section_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: partner fk_partner_relations_partner_; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.partner
    ADD CONSTRAINT fk_partner_relations_partner_ FOREIGN KEY (partner_group_id) REFERENCES brc_ekoset.partner_group(partner_group_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- Name: recommendation fk_recommen_relations_cl_brand; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.recommendation
    ADD CONSTRAINT fk_recommen_relations_cl_brand FOREIGN KEY (cl_brand_id) REFERENCES brc_ekoset.cl_brand(cl_brand_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: site_block fk_site_blo_relations_business; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_block
    ADD CONSTRAINT fk_site_blo_relations_business FOREIGN KEY (business_service_id) REFERENCES brc_ekoset.business_service(business_service_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: site_block fk_site_blo_relations_cl_site_; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_block
    ADD CONSTRAINT fk_site_blo_relations_cl_site_ FOREIGN KEY (cl_site_block_d) REFERENCES brc_ekoset.cl_site_block(cl_site_block_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: site_block fk_site_blo_relations_individu; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_block
    ADD CONSTRAINT fk_site_blo_relations_individu FOREIGN KEY (ind_offer_id) REFERENCES brc_ekoset.individual_offer(ind_offer_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: site_block fk_site_blo_relations_site_pag; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_block
    ADD CONSTRAINT fk_site_blo_relations_site_pag FOREIGN KEY (site_page_id) REFERENCES brc_ekoset.site_page(site_page_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: site_block fk_site_blo_relations_site_sec; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_block
    ADD CONSTRAINT fk_site_blo_relations_site_sec FOREIGN KEY (site_section_id) REFERENCES brc_ekoset.site_section(site_section_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: site_section_brand fk_site_sec_site_sect_cl_brand; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_section_brand
    ADD CONSTRAINT fk_site_sec_site_sect_cl_brand FOREIGN KEY (cl_brand_id) REFERENCES brc_ekoset.cl_brand(cl_brand_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: site_section_brand fk_site_sec_site_sect_site_sec; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_section_brand
    ADD CONSTRAINT fk_site_sec_site_sect_site_sec FOREIGN KEY (site_section_id) REFERENCES brc_ekoset.site_section(site_section_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: app_user_session fk_user_act_relations_app_user; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.app_user_session
    ADD CONSTRAINT fk_user_act_relations_app_user FOREIGN KEY (app_user_id) REFERENCES brc_ekoset.app_user(app_user_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: user_request_file fk_user_request; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.user_request_file
    ADD CONSTRAINT fk_user_request FOREIGN KEY (user_request_id) REFERENCES brc_ekoset.user_request(user_request_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: app_user_social_net_profile fk_user_soc_relations_app_user; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.app_user_social_net_profile
    ADD CONSTRAINT fk_user_soc_relations_app_user FOREIGN KEY (app_user_id) REFERENCES brc_ekoset.app_user(app_user_id) MATCH FULL ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: site_page site_page_site_section_fk; Type: FK CONSTRAINT; Schema: brc_ekoset; Owner: -
--

ALTER TABLE ONLY brc_ekoset.site_page
    ADD CONSTRAINT site_page_site_section_fk FOREIGN KEY (site_section_id) REFERENCES brc_ekoset.site_section(site_section_id);


--
-- PostgreSQL database dump complete
--

