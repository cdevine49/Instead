## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique


## firm_profiles

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
name            | string    | not null
industry        | string    |
about           | text      |
industry        | string    |
user_id         | integer   | not null, indexed


## user_profiles

column name          | data type | details
-------------------- |-----------|-----------------------
id                   | integer   | not null, primary key
first_name           | string    |
last_name            | string    |
last_name            | string    |
birthday             | date      |
about                | text      |
avatar_file_name     | string    |
avatar_content_type  | string    |
avatar_file_size     | integer   |
avatar_updated_at    | datetime  |
user_id              | integer   | not null, indexed, unique


## addressings

column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
type             | string    | not null
address_id      | integer   | not null
addressable_id   | integer   | not null, indexed
addressable_type | string    | not null, indexed


## addresses

column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
street           | string    |
type             | string    |
town             | string    |
state            | string    |
zip_code         | integer   |
country          | string    |


<!-- ## countries

column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
name          | string    | not null -->


## posts

column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
title            | string    |
body             | text      |
user_id          | integer   | not null, indexed
profile_id       | integer   | not null, indexed


## networks


## resumes
column name         | data type | details
--------------------|-----------|-----------------------
resume_file_name    | string    |
resume_content_type | string    |
resume_file_size    | integer   |
resume_updated_at   | datetime  |

## cover_letters
column name               | data type | details
--------------------------|-----------|-----------------------
cover_letter_file_name    | string    |
cover_letter_content_type | string    |
cover_letter_file_size    | integer   |
cover_letter_updated_at   | datetime  |
