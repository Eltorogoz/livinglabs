CREATE DATABASE IF NOT EXISTS kbtest_db;
USE kbtest_db;

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    userID        INT AUTO_INCREMENT,
    email         VARCHAR(150) NOT NULL UNIQUE,
    display_name  VARCHAR(160) NOT NULL,
    password      VARCHAR(280) NOT NULL,
    role          ENUM('admin') NOT NULL DEFAULT 'admin',
    PRIMARY KEY (userID)
);

-- Project Table
CREATE TABLE IF NOT EXISTS Projects (
    projectID     INT AUTO_INCREMENT,
    group_name    VARCHAR(255) NOT NULL,
    description   VARCHAR(355),
    date_created  DATE,
    PRIMARY KEY (projectID)
);

-- Document Table
CREATE TABLE IF NOT EXISTS Documents (
    documentID    INT AUTO_INCREMENT,
    projectID     INT NOT NULL,
    title         VARCHAR(220) NOT NULL,
    file_path     VARCHAR(500) NOT NULL,
    date_uploaded  DATE,
    created_at    DATE NOT NULL,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (documentID),
    FOREIGN KEY (projectID) REFERENCES Projects(projectID) ON DELETE CASCADE
);

-- Form 
CREATE TABLE IF NOT EXISTS Form (
    formID INT AUTO_INCREMENT PRIMARY KEY,
    formName VARCHAR(220) NOT NULL,
    formEmail VARCHAR(200) NOT NULL,
    formPhone VARCHAR(20),
    formMessage TEXT,
    date_uploaded TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
