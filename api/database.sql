create table list(
  id serial primary key,
  name varchar(255) not null,
  amount integer,
  distance integer,
  date timestamp DEFAULT CURRENT_TIMESTAMP
);