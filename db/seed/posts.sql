create table posts (
    id serial primary key,
    user_id integer references users(id),
    title varchar(200),
    name varchar(20),
    make varchar(20),
    model varchar(50),
    year int,
    profile_pic text,
    content text
)