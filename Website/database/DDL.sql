SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
START TRANSACTION;

DROP TABLE IF EXISTS
    Destinations,
    myDestinations;

CREATE TABLE Destinations (
    destination_id INT NOT NULL AUTO_INCREMENT,
    destination_name varchar(255) NOT NULL,
    destination_image MEDIUMBLOB,
    myDestination_id INT,
    PRIMARY KEY (destination_id),
    FOREIGN KEY(myDestination_id) REFERENCES MyDestinations(myDestination_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE MyDestinations (
    myDestination_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (myDestination_id)
);

INSERT INTO Destinations (destination_name, destination_image)
VALUES
    ('Canada', LOAD_FILE('/nfs/stak/users/millegeo/CS361/Term Project/Website/Images/canadaFlag.png'));