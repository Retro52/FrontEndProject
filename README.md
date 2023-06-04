# FrontEndProject
## Client
Client side is built using React. The basic app structure is as follows:
* Home page
* Game view
* Games list page
* Guest profile page
* Login page
* Register page
* Upload game - only logged in users
* Profile page - only logged in users

## Server side relies on Note.js
PostgreSQL was chosen as a database. For app correctly to work 3 tables are required: users, games and users_games. Users table contains info about all registered users. Games table contains info about all the games. users_games table links users and games, where several users can be devs of the single game, and vice versa. Settings for the DB are stored in .env file and are not included into the project for obvious reasons.

## pgSQL
Command to create users table:
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    age integer,
    name character varying(255),
    last_name character varying(255),
    about_me text
);
```
Games table:
```
CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    title character varying(255),
    release_year integer,
    team character varying(255),
    description text,
    price numeric(10,2),
    poster_link character varying(255) NOT NULL,
    download_link character varying(255)
);
```
users_games table:
```
CREATE TABLE users_games (
    game_id integer NOT NULL,
    user_id integer NOT NULL
);

ALTER TABLE ONLY users_games
    ADD CONSTRAINT users_games_pkey PRIMARY KEY (game_id, user_id);
```

I also added a backup.sql file in case you don`t want to mess with all that commands