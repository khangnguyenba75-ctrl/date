CREATE DATABASE time_app;

USE time_app;

CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ampm_enabled BOOLEAN DEFAULT FALSE,
    localstorage_enabled BOOLEAN DEFAULT FALSE
);

INSERT INTO settings (ampm_enabled, localstorage_enabled)
VALUES (FALSE, FALSE);
