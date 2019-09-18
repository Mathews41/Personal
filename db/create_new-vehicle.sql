insert into myVehicle
(name, make, model, year, auth_id)
values
($1,$2,$3,$4)
returning name make model year