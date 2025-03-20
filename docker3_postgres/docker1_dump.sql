--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: student_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_info (
    "studentID" character varying(255),
    "studentName" character varying(255),
    "course" character varying(255),
    "presentDate" character varying(255)
);

ALTER TABLE public.student_info OWNER TO postgres;
--
-- Data for Name: student_info; Type: TABLE DATA; Schema: public; Owner: postgres
--
COPY public.student_info ("studentID", "studentName", "course", "presentDate") FROM stdin;
\.
--
-- Name: student_info student_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--
ALTER TABLE ONLY public.student_info
    ADD CONSTRAINT student_info_pkey PRIMARY KEY ("studentID");
--
-- PostgreSQL database dump complete
--

