--
-- PostgreSQL database dump
--

\restrict KJHR6qtXyClPiggHRLJOX1oYE5GKLIGciWGOtRReqQYvdwSspL1ckLfFz0ZUYVT

-- Dumped from database version 16.10 (Debian 16.10-1.pgdg12+1)
-- Dumped by pg_dump version 16.10 (Debian 16.10-1.pgdg12+1)

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
-- Name: enum_media_folder; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_media_folder AS ENUM (
    'logos',
    'team',
    'projects',
    'products',
    'blog',
    'misc'
);


--
-- Name: enum_tenants_email_domain_dns_records_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_tenants_email_domain_dns_records_status AS ENUM (
    'pending',
    'verified'
);


--
-- Name: enum_tenants_email_domain_dns_records_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_tenants_email_domain_dns_records_type AS ENUM (
    'TXT',
    'CNAME',
    'MX'
);


--
-- Name: enum_tenants_email_domain_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_tenants_email_domain_status AS ENUM (
    'not_configured',
    'provisioning',
    'pending_dns',
    'verifying',
    'verified',
    'failed'
);


--
-- Name: enum_tenants_industry; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_tenants_industry AS ENUM (
    'electrician',
    'plumber',
    'carpenter',
    'painter',
    'hvac',
    'roofer',
    'restaurant',
    'cafe',
    'bakery',
    'catering',
    'hair_salon',
    'beauty_salon',
    'nail_salon',
    'massage',
    'gym',
    'medical_practice',
    'dental_practice',
    'physiotherapy',
    'cleaning_service',
    'real_estate',
    'fashion_retail',
    'grocery'
);


--
-- Name: enum_tenants_phone_number_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_tenants_phone_number_status AS ENUM (
    'not_configured',
    'provisioning',
    'configuring',
    'active',
    'failed'
);


--
-- Name: enum_tenants_provisioning_logs_service; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_tenants_provisioning_logs_service AS ENUM (
    'resend',
    'twilio',
    'vercel',
    'whatsapp'
);


--
-- Name: enum_tenants_provisioning_logs_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_tenants_provisioning_logs_status AS ENUM (
    'started',
    'success',
    'failed'
);


--
-- Name: enum_tenants_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_tenants_status AS ENUM (
    'active',
    'trial',
    'paused',
    'cancelled'
);


--
-- Name: enum_tenants_subscription_tier; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_tenants_subscription_tier AS ENUM (
    'starter',
    'professional',
    'premium',
    'enterprise'
);


--
-- Name: enum_tenants_whatsapp_business_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_tenants_whatsapp_business_status AS ENUM (
    'not_configured',
    'registering',
    'pending_verification',
    'verified',
    'failed'
);


--
-- Name: enum_users_preferences_language; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_users_preferences_language AS ENUM (
    'de',
    'en'
);


--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_users_role AS ENUM (
    'super-admin',
    'admin',
    'manager',
    'user'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
    id integer NOT NULL,
    tenant_id integer,
    alt character varying NOT NULL,
    caption character varying,
    folder public.enum_media_folder,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric,
    sizes_thumbnail_url character varying,
    sizes_thumbnail_width numeric,
    sizes_thumbnail_height numeric,
    sizes_thumbnail_mime_type character varying,
    sizes_thumbnail_filesize numeric,
    sizes_thumbnail_filename character varying,
    sizes_card_url character varying,
    sizes_card_width numeric,
    sizes_card_height numeric,
    sizes_card_mime_type character varying,
    sizes_card_filesize numeric,
    sizes_card_filename character varying,
    sizes_tablet_url character varying,
    sizes_tablet_width numeric,
    sizes_tablet_height numeric,
    sizes_tablet_mime_type character varying,
    sizes_tablet_filesize numeric,
    sizes_tablet_filename character varying,
    sizes_desktop_url character varying,
    sizes_desktop_width numeric,
    sizes_desktop_height numeric,
    sizes_desktop_mime_type character varying,
    sizes_desktop_filesize numeric,
    sizes_desktop_filename character varying
);


--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: payload_kv; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_kv (
    id integer NOT NULL,
    key character varying NOT NULL,
    data jsonb NOT NULL
);


--
-- Name: payload_kv_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_kv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_kv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_kv_id_seq OWNED BY public.payload_kv.id;


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    tenants_id integer,
    users_id integer,
    media_id integer
);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: tenants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenants (
    id integer NOT NULL,
    company_name character varying NOT NULL,
    industry public.enum_tenants_industry NOT NULL,
    slug character varying NOT NULL,
    contact_info_email character varying NOT NULL,
    contact_info_phone character varying NOT NULL,
    contact_info_domain character varying,
    address_street character varying NOT NULL,
    address_postal_code character varying NOT NULL,
    address_city character varying NOT NULL,
    address_country character varying DEFAULT 'Deutschland'::character varying,
    subscription_tier public.enum_tenants_subscription_tier DEFAULT 'starter'::public.enum_tenants_subscription_tier NOT NULL,
    status public.enum_tenants_status DEFAULT 'active'::public.enum_tenants_status NOT NULL,
    trial_ends_at timestamp(3) with time zone,
    stripe_customer_id character varying,
    features_whatsapp_enabled boolean DEFAULT false,
    features_whatsapp_a_i_enabled boolean DEFAULT false,
    features_sms_enabled boolean DEFAULT false,
    features_custom_domain_enabled boolean DEFAULT false,
    custom_domain character varying,
    email_domain_sending_domain character varying,
    email_domain_resend_domain_id character varying,
    email_domain_status public.enum_tenants_email_domain_status DEFAULT 'not_configured'::public.enum_tenants_email_domain_status,
    email_domain_verified_at timestamp(3) with time zone,
    email_domain_last_checked_at timestamp(3) with time zone,
    email_domain_error_message character varying,
    phone_number_twilio_phone_number character varying,
    phone_number_twilio_phone_sid character varying,
    phone_number_capabilities_sms boolean DEFAULT false,
    phone_number_capabilities_voice boolean DEFAULT false,
    phone_number_capabilities_mms boolean DEFAULT false,
    phone_number_status public.enum_tenants_phone_number_status DEFAULT 'not_configured'::public.enum_tenants_phone_number_status,
    phone_number_provisioned_at timestamp(3) with time zone,
    phone_number_error_message character varying,
    whatsapp_business_phone_number_id character varying,
    whatsapp_business_business_account_id character varying,
    whatsapp_business_display_name character varying,
    whatsapp_business_status public.enum_tenants_whatsapp_business_status DEFAULT 'not_configured'::public.enum_tenants_whatsapp_business_status,
    whatsapp_business_verified_at timestamp(3) with time zone,
    metadata_onboarded_at timestamp(3) with time zone,
    metadata_notes character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: tenants_email_domain_dns_records; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenants_email_domain_dns_records (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    type public.enum_tenants_email_domain_dns_records_type,
    name character varying,
    value character varying,
    priority numeric,
    status public.enum_tenants_email_domain_dns_records_status DEFAULT 'pending'::public.enum_tenants_email_domain_dns_records_status
);


--
-- Name: tenants_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tenants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tenants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tenants_id_seq OWNED BY public.tenants.id;


--
-- Name: tenants_provisioning_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenants_provisioning_logs (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    "timestamp" timestamp(3) with time zone,
    service public.enum_tenants_provisioning_logs_service,
    action character varying,
    status public.enum_tenants_provisioning_logs_status,
    message character varying,
    metadata jsonb
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    tenant_id integer NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    phone character varying,
    avatar_id integer,
    role public.enum_users_role DEFAULT 'user'::public.enum_users_role NOT NULL,
    preferences_language public.enum_users_preferences_language DEFAULT 'de'::public.enum_users_preferences_language,
    preferences_email_notifications boolean DEFAULT true,
    preferences_sms_notifications boolean DEFAULT false,
    last_login_at timestamp(3) with time zone,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    _verified boolean,
    _verificationtoken character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: payload_kv id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv ALTER COLUMN id SET DEFAULT nextval('public.payload_kv_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: tenants id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenants ALTER COLUMN id SET DEFAULT nextval('public.tenants_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: payload_kv payload_kv_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_kv
    ADD CONSTRAINT payload_kv_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: tenants_email_domain_dns_records tenants_email_domain_dns_records_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenants_email_domain_dns_records
    ADD CONSTRAINT tenants_email_domain_dns_records_pkey PRIMARY KEY (id);


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (id);


--
-- Name: tenants_provisioning_logs tenants_provisioning_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenants_provisioning_logs
    ADD CONSTRAINT tenants_provisioning_logs_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_sizes_card_sizes_card_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_card_sizes_card_filename_idx ON public.media USING btree (sizes_card_filename);


--
-- Name: media_sizes_desktop_sizes_desktop_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_desktop_sizes_desktop_filename_idx ON public.media USING btree (sizes_desktop_filename);


--
-- Name: media_sizes_tablet_sizes_tablet_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_tablet_sizes_tablet_filename_idx ON public.media USING btree (sizes_tablet_filename);


--
-- Name: media_sizes_thumbnail_sizes_thumbnail_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.media USING btree (sizes_thumbnail_filename);


--
-- Name: media_tenant_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_tenant_idx ON public.media USING btree (tenant_id);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: payload_kv_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX payload_kv_key_idx ON public.payload_kv USING btree (key);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_tenants_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_tenants_id_idx ON public.payload_locked_documents_rels USING btree (tenants_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: tenants_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenants_created_at_idx ON public.tenants USING btree (created_at);


--
-- Name: tenants_email_domain_dns_records_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenants_email_domain_dns_records_order_idx ON public.tenants_email_domain_dns_records USING btree (_order);


--
-- Name: tenants_email_domain_dns_records_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenants_email_domain_dns_records_parent_id_idx ON public.tenants_email_domain_dns_records USING btree (_parent_id);


--
-- Name: tenants_provisioning_logs_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenants_provisioning_logs_order_idx ON public.tenants_provisioning_logs USING btree (_order);


--
-- Name: tenants_provisioning_logs_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenants_provisioning_logs_parent_id_idx ON public.tenants_provisioning_logs USING btree (_parent_id);


--
-- Name: tenants_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX tenants_slug_idx ON public.tenants USING btree (slug);


--
-- Name: tenants_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenants_updated_at_idx ON public.tenants USING btree (updated_at);


--
-- Name: users_avatar_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_avatar_idx ON public.users USING btree (avatar_id);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- Name: users_tenant_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_tenant_idx ON public.users USING btree (tenant_id);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: media media_tenant_id_tenants_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_tenant_id_tenants_id_fk FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE SET NULL;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_tenants_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_tenants_fk FOREIGN KEY (tenants_id) REFERENCES public.tenants(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_fk FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: tenants_email_domain_dns_records tenants_email_domain_dns_records_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenants_email_domain_dns_records
    ADD CONSTRAINT tenants_email_domain_dns_records_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.tenants(id) ON DELETE CASCADE;


--
-- Name: tenants_provisioning_logs tenants_provisioning_logs_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenants_provisioning_logs
    ADD CONSTRAINT tenants_provisioning_logs_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.tenants(id) ON DELETE CASCADE;


--
-- Name: users users_avatar_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_avatar_id_media_id_fk FOREIGN KEY (avatar_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users users_tenant_id_tenants_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_tenant_id_tenants_id_fk FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict KJHR6qtXyClPiggHRLJOX1oYE5GKLIGciWGOtRReqQYvdwSspL1ckLfFz0ZUYVT

