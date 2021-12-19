create user fjaka with password 'krXKK9DbD2P7HPFZvkaVXxYaLEuP7pcPj2bHjL5svBNXWV3bY579PpmkcQy9';

create table accounts
(
    pk serial primary key,
    username text not null,
    password text not null,
    verified boolean default false,
    last_login timestamptz,
    login_attempts smallint default 0,
    date_created timestamptz default now(),
    archived boolean default false,
    CONSTRAINT accounts_username_unique UNIQUE (username)
);
alter table accounts owner to fjaka;

create table sessions
(
    pk bigserial primary key,
    account_pk int references accounts(pk),
    token text not null,
    expiration timestamptz,
    date_created timestamptz default now()
);
alter table sessions owner to fjaka;

create table genders
(
    pk serial primary key,
    name text not null,
    description text,
    date_created timestamptz default now(),
    archived boolean default false,
    CONSTRAINT gender_name UNIQUE (name)
);
alter table genders owner to fjaka;

create table users
(
    pk serial primary key,
    account_pk int not null references accounts(pk),
    uuid text not null,
    ronin text not null,
    nickname text not null,
    last_name text not null,
    first_name text not null,
    middle_name text not null,
    birth_date timestamptz,
    gender_pk int references genders(pk),
    mobile_number text not null,
    email text not null,
    color text not null,
    role text default 'scholar',
    created_by int references accounts(pk),
    date_created timestamptz default now(),
    archived boolean default false,
    CONSTRAINT employee_number_unique UNIQUE (uuid)
);
alter table users owner to fjaka;

create table user_details
(
    pk serial primary key,
    user_pk int references users(pk),
    parent text not null,
    field text,
    value text,
    created_by int references users(pk),
    date_created timestamptz default now()
);
alter table user_details owner to fjaka;

create table games
(
    pk serial primary key,
    name text not null,
    created_by int references users(pk),
    date_created timestamptz default now(),
    archived boolean default false
);
alter table games owner to fjaka;

create table tier
(
    pk serial primary key,
    user_pk int references users(pk),
    name text not null,
    min numeric default 0,
    max numeric default 0,
    created_by int references users(pk),
    date_created timestamptz default now()
);
alter table tier owner to fjaka;

create table farm
(
    pk serial primary key,
    user_pk int references users(pk),
    manager_share numeric default 0,
    scholar_share numeric default 0,
    total numeric default 0,
    override_total numeric default 0,
    mmr int default 0,
    created_by int references users(pk),
    date_created timestamptz default now()
);
alter table farm owner to fjaka;

create table logs
(
    pk bigserial primary key,
    loggable_table text not null,
    loggable_pk bigint not null,
    description text not null,
    created_by int references users(pk),
    date_created timestamptz default now()
);
alter table logs owner to fjaka;
