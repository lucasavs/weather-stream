CREATE TABLE IF NOT EXISTS city_status (
  id SERIAL PRIMARY KEY,
  time TIMESTAMP DEFAULT NULL,
  city varchar(255) DEFAULT NULL,
  open_value real DEFAULT NULL,
  close_value real DEFAULT NULL,
  max_temperature real DEFAULT NULL,
  min_temperature real DEFAULT NULL,
  UNIQUE(city, time)
);

-- Insert mock data
INSERT INTO city_status
(time, city, open_value, close_value, max_temperature, min_temperature)
VALUES
 (
	'2020-06-29 10:00:00',
	'rio de janeiro',
	36.1,
	34.3,
	41.2,
	32.3
 )