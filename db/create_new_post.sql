insert into posts
(user_id, title, name, make, model, year, URL, content)
values
($1, $2, $3, $4, $5, $6, $7, $8)
returning user_id, title, name, make, model, year, URL, content