CREATE TABLE Resumes (
    id INT AUTO_INCREMENT,
    name VARCHAR(256) NOT NULL UNIQUE,
    job_title VARCHAR(256) NOT NULL,
    job_description VARCHAR(2048) NOT NULL,
    company VARCHAR(256) NOT NULL,
    PRIMARY KEY(id)
)