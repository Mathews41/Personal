insert into users
(email,password,username, profile_pic)
values
($1, $2, $3, $4)
returning id, email, username, profile_pic