--
-- PostgreSQL database dump
--

-- Dumped from database version 13.8
-- Dumped by pg_dump version 13.8

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
-- Name: masapudelka(character); Type: FUNCTION; Schema: public; Owner: s400513
--

CREATE FUNCTION public.masapudelka(idx character) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE 
wynik INT;
BEGIN
SELECT SUM(c.masa*z.sztuk) INTO wynik
FROM pudelka p
JOIN zawartosc z USING(idpudelka)
JOIN czekoladki cz USING(idczekoladki)
WHERE p.idpudelka = idx;
RETURN wynik;
END;
$$;


ALTER FUNCTION public.masapudelka(idx character) OWNER TO s400513;

--
-- Name: zysk(character); Type: FUNCTION; Schema: public; Owner: s400513
--

CREATE FUNCTION public.zysk(idx character) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE 
wynik numeric(7,2);
BEGIN
SELECT p.koszt-SUM(z.sztuk*cz.koszt) INTO wynik
FROM pudelka p
JOIN zawartosc z USING(idpudelka)
JOIN czekoladki cz USING(idczekoladki)
WHERE p.idpudelka = idx;

RETURN wynik;
END;
$$;


ALTER FUNCTION public.zysk(idx character) OWNER TO s400513;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: roomsdb; Type: TABLE; Schema: public; Owner: s408427
--

CREATE TABLE public.roomsdb (
    roomid integer NOT NULL,
    id character varying(50),
    name character varying(50),
    password character varying(50),
    currentpeople integer,
    maxpeople integer
);


ALTER TABLE public.roomsdb OWNER TO s408427;

--
-- Name: roomsdb_roomid_seq; Type: SEQUENCE; Schema: public; Owner: s408427
--

CREATE SEQUENCE public.roomsdb_roomid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roomsdb_roomid_seq OWNER TO s408427;

--
-- Name: roomsdb_roomid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: s408427
--

ALTER SEQUENCE public.roomsdb_roomid_seq OWNED BY public.roomsdb.roomid;


--
-- Name: usersdb; Type: TABLE; Schema: public; Owner: s408427
--

CREATE TABLE public.usersdb (
    id integer NOT NULL,
    login character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(50) NOT NULL
);


ALTER TABLE public.usersdb OWNER TO s408427;

--
-- Name: roomsdb roomid; Type: DEFAULT; Schema: public; Owner: s408427
--

ALTER TABLE ONLY public.roomsdb ALTER COLUMN roomid SET DEFAULT nextval('public.roomsdb_roomid_seq'::regclass);


--
-- Data for Name: roomsdb; Type: TABLE DATA; Schema: public; Owner: s408427
--

COPY public.roomsdb (roomid, id, name, password, currentpeople, maxpeople) FROM stdin;
0	1	teleplaża	loudwin	0	255
\.


--
-- Data for Name: usersdb; Type: TABLE DATA; Schema: public; Owner: s408427
--

COPY public.usersdb (id, login, email, password) FROM stdin;
0	Krisplis	anon333@gmail.com	admin
1	Trollge	Trollarz2137@gmail.com	trollarz
2	Ananiasz	john.kowalski@domain.com	Ananiasz2!37
3	AnonimAnonimowy	john.loudwin@domain.com	Loudwiiiiin2!37
4	ewfewfewf	fwef@ffff	Ni3!wiem
5	Odleżynator	fwef@ffff	Ni3!wiem
6	anevjvbjvnsvrwhjvewjvruvbwvwrvb	fwef@ffff	Ni3!wiem
7	Ablesh1!	michal.ablewski19@gmail.com	Ablesh1!
\.


--
-- Name: roomsdb_roomid_seq; Type: SEQUENCE SET; Schema: public; Owner: s408427
--

SELECT pg_catalog.setval('public.roomsdb_roomid_seq', 1, false);


--
-- Name: roomsdb roomsdb_pkey; Type: CONSTRAINT; Schema: public; Owner: s408427
--

ALTER TABLE ONLY public.roomsdb
    ADD CONSTRAINT roomsdb_pkey PRIMARY KEY (roomid);


--
-- PostgreSQL database dump complete
--

