select p.user_id, p.id, p.title, p.name, p.make, p.model, p.year, p.URL, p.content
from posts p
-- join users u on u.id = p.user_id
where p.id = $1