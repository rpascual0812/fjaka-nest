-
-- CREATE FUNCTION string_generator(int DEFAULT 20,int DEFAULT 10) RETURNS text AS $FUNCTION$
--     SELECT array_to_string( array_agg(
--         substring(md5(random()::text),1,$1)||chr( 9824 + (random()*10)::int )
--     ), ' ' ) as s
--     FROM generate_series(1, $2) i(x);
-- $FUNCTION$ LANGUAGE SQL IMMUTABLE;

/*
	Insert
*/
insert into accounts(username, password, verified) values('admin', '$2b$10$czFGPBlp8zQ0uPOn7xWhtOxOHIkQN1.OmQ2yY7z4bSowSE2SjmzrK', true);

insert into genders(name, description) values
    ('Male', ''),
    ('Female', ''),
    ('Prefer not to say', '')
    ;

insert into users (account_pk,uuid,ronin,nickname,last_name,first_name,middle_name,birth_date,gender_pk,color) values
    (2, '8b5605c2-2e49-442a-8e48-769bd43cecdd', 'ronin:', 'Raffy', 'Super', 'Admin', '', '1986-08-12', 1, '#009dff');
