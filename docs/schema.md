## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## jobseekers
column name        | data type | details
-------------------|-----------|-----------------------
id                 | integer   | not null, primary key
username           | string    | not null, indexed, unique
password_digest    | string    | not null
session_token      | string    | not null, indexed, unique

##


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
