-- DROP TABLE IF EXISTS Evenement
-- ;
-- CREATE TABLE Evenement
-- (
--   id_event INT(11)
--   AUTO_INCREMENT NOT NULL, nom_event VARCHAR
--   (45), date_debut_event DATETIME, date_fin_event DATETIME, date_creation_event DATETIME, id_lieu_Lieu Int
--   (11), PRIMARY KEY
--   (id_event)) ENGINE=InnoDB;
--   DROP TABLE IF EXISTS Utilisateur
--   ;
--   CREATE TABLE Utilisateur
--   (
--     id_user INT(11)
--     AUTO_INCREMENT NOT NULL, prenom VARCHAR
--     (45), nom VARCHAR
--     (45), rang INT, 
-- adresse_mail TEXT,
--  mot_de_passe TEXT,
--  date_creation_user DATETIME, 
-- url_avatar TEXT, id_lieu_Lieu Int
--     (11), PRIMARY KEY
--     (id_user)) ENGINE=InnoDB;
--     DROP TABLE IF EXISTS Commentaire
--     ;
--     CREATE TABLE Commentaire
--     (
--       id_commentaire INT(11)
--       AUTO_INCREMENT NOT NULL, texte_commentaire TEXT, date_creation_commentaire DATETIME, id_user Int
--       (11), id_photo Int
--       (11), PRIMARY KEY
--       (id_commentaire)) ENGINE=InnoDB;
--       DROP TABLE IF EXISTS Produit
--       ;
--       CREATE TABLE Produit
--       (
--         id_produit INT(11)
--         AUTO_INCREMENT NOT NULL, nom_produit VARCHAR
--         (45), prix_produit INT
--         (112), url_image_produit VARCHAR
--         (75), date_creation_produit DATETIME, PRIMARY KEY
--         (id_produit)) ENGINE=InnoDB;
--         DROP TABLE IF EXISTS Photo
--         ;
--         CREATE TABLE Photo
--         (
--           id_photo INT(11)
--           AUTO_INCREMENT NOT NULL, legende_photo TEXT, url_photo VARCHAR
--           (75), date_creation_photo DATETIME, id_event Int
--           (11), id_user Int
--           (11), PRIMARY KEY
--           (id_photo)) ENGINE=InnoDB;
--           DROP TABLE IF EXISTS Idee
--           ;
--           CREATE TABLE Idee
--           (
--             id_event_idee INT(11)
--             AUTO_INCREMENT NOT NULL, nom_idee VARCHAR
--             (45), description_idee TEXT, 
--             date_creation_idee DATETIME,
--              id_user Int
--             (11), id_lieu_Lieu Int
--             (11), PRIMARY KEY
--             (id_event_idee)) ENGINE=InnoDB;

--             DROP TABLE IF EXISTS Lieu
--             ;
--             CREATE TABLE Lieu
--             (
--               id_lieu_Lieu INT(11)
--               AUTO_INCREMENT NOT NULL, 
--               nom_lieu_Lieu TEXT, PRIMARY KEY
--               (id_lieu_Lieu)) ENGINE=InnoDB;




--               DROP TABLE IF EXISTS Participer
--               ;
--               CREATE TABLE Participer
--               (
--                 id_user Int(11)
--                 AUTO_INCREMENT NOT NULL, id_event Int
--                 (11) NOT NULL, PRIMARY KEY
--                 (id_user,  id_event)) ENGINE=InnoDB;
--                 DROP TABLE IF EXISTS Achete
--                 ;
--                 CREATE TABLE Achete
--                 (
--                   id_user Int(11)
--                   AUTO_INCREMENT NOT NULL, id_produit Int
--                   (11) NOT NULL, PRIMARY KEY
--                   (id_user,  id_produit)) ENGINE=InnoDB;
--                   DROP TABLE IF EXISTS Notifie
--                   ;
--                   CREATE TABLE Notifie
--                   (
--                     id_event_idee Int(11)
--                     AUTO_INCREMENT NOT NULL, id_user Int
--                     (11) NOT NULL, PRIMARY KEY
--                     (id_event_idee,  id_user)) ENGINE=InnoDB;
--                     DROP TABLE IF EXISTS aime
--                     ;
--                     CREATE TABLE aime
--                     (
--                       id_user Int(11)
--                       AUTO_INCREMENT NOT NULL, id_photo Int
--                       (11) NOT NULL, PRIMARY KEY
--                       (id_user,  id_photo)) ENGINE=InnoDB;
--                       DROP TABLE IF EXISTS aime_idee
--                       ;
--                       CREATE TABLE aime_idee
--                       (
--                         id_user Int(11)
--                         AUTO_INCREMENT NOT NULL, id_event_idee Int
--                         (11) NOT NULL, PRIMARY KEY
--                         (id_user,  id_event_idee)) ENGINE=InnoDB;


--                         ALTER TABLE Evenement ADD CONSTRAINT FK_Evenement_id_lieu_Lieu FOREIGN KEY (id_lieu_Lieu) REFERENCES Lieu (id_lieu_Lieu); ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Utilisateur ADD CONSTRAINT FK_Utilisateur_id_lieu_Lieu FOREIGN KEY (id_lieu_Lieu) REFERENCES Lieu (id_lieu_Lieu);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Commentaire ADD CONSTRAINT FK_Commentaire_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Commentaire ADD CONSTRAINT FK_Commentaire_id_photo FOREIGN KEY (id_photo) REFERENCES Photo (id_photo);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Photo ADD CONSTRAINT FK_Photo_id_event FOREIGN KEY (id_event) REFERENCES Evenement (id_event);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Photo ADD CONSTRAINT FK_Photo_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Idee ADD CONSTRAINT FK_Idee_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Idee ADD CONSTRAINT FK_Idee_id_lieu_Lieu FOREIGN KEY (id_lieu_Lieu) REFERENCES Lieu (id_lieu_Lieu);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Participer ADD CONSTRAINT FK_Participer_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Participer ADD CONSTRAINT FK_Participer_id_event FOREIGN KEY (id_event) REFERENCES Evenement (id_event);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Achete ADD CONSTRAINT FK_Achete_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Achete ADD CONSTRAINT FK_Achete_id_produit FOREIGN KEY (id_produit) REFERENCES Produit (id_produit);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Notifie ADD CONSTRAINT FK_Notifie_id_event_idee FOREIGN KEY (id_event_idee) REFERENCES Idee (id_event_idee);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE Notifie ADD CONSTRAINT FK_Notifie_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE aime ADD CONSTRAINT FK_aime_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE aime ADD CONSTRAINT FK_aime_id_photo FOREIGN KEY (id_photo) REFERENCES Photo (id_photo);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE aime_idee ADD CONSTRAINT FK_aime_idee_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);ON UPDATE CASCADE ON DELETE CASCADE;
--                         ALTER TABLE aime_idee ADD CONSTRAINT FK_aime_idee_id_event_idee FOREIGN KEY (id_event_idee) REFERENCES Idee (id_event_idee);ON UPDATE CASCADE ON DELETE CASCADE;

--                         ALTER TABLE Evenement ADD INDEX idx_nom_event(nom_event);
--                         ALTER TABLE Utilisateur ADD INDEX idx_nom(nom);
--                         ALTER TABLE Commentaire ADD INDEX idx_texte_commentaire(texte_commentaire);
--                         ALTER TABLE Produit ADD INDEX idx_nom_produit(nom_produit);
--                         ALTER TABLE Photo ADD INDEX idx_url_photo(url_photo);
--                         ALTER TABLE Idee ADD INDEX idx_nom_idee(nom_idee);
--                         ALTER TABLE Lieu ADD INDEX idx_nom_lieu_Lieu(nom_lieu_Lieu);


-- DELIMITER //

--  CREATE PROCEDURE `dedans` (IN nonn VARCHAR(45), IN prix VARCHAR(112), IN image VARCHAR(72) )
-- BEGIN
--    IF (SELECT COUNT(*) FROM Produit WHERE nom_produit=nom AND prix_produit=prix AND url_image_produit=image) = 0 THEN insert into utilisateur (nom_produit,prix_produit,url_image_produit )
-- END//
--  DELIMITER ;

-- DELIMITER $$
 
-- CREATE PROCEDURE `ajout`(IN nonn VARCHAR(45), IN prix VARCHAR(112), IN image VARCHAR(72))
-- BEGIN
--    IF (SELECT COUNT(*) FROM Produit WHERE nom_produit=nom AND prix_produit=prix AND url_image_produit=image) = 0 THEN insert into utilisateur (nom,prix,image )
-- END$$
 
-- DELIMITER ;



--    IF (SELECT COUNT(*) FROM Produit 
--     WHERE nom_produit=nom 
--        AND prix_produit=prix 
--        AND url_image_produit=image) = 0 
--    THEN insert into utilisateur (nom,prix,image )
--    END IF

-- IF EXISTS(SELECT * FROM Produit 
--             WHERE nom_produit=nom 
--        AND prix_produit=prix 
--        AND url_image_produit=image )
--    BEGIN
--         UPDATE TableName 
--            SET nom_produit    = nom,prix_produit=prix, url_image_produit=image
           
           
--  WHERE nom_produit=nom 
--        AND prix_produit=prix 
--        AND url_image_produit=image;
       
--           END
-- ELSE
--    BEGIN
--        insert into utilisateur (nom,prix,image );
--    END

use projet_web;

DELIMITER $$
 create procedure select_or_insert(
  IN `nom` VARCHAR(45),
  IN `prix` INT(112),
  IN `image` TEXT,
  IN `date` DATETIME
) begin IF EXISTS (
  SELECT
    *
  FROM
    Produit
  WHERE
    nom_produit = nom
    AND prix_produit = prix
    AND url_image_produit = image
) THEN
update
  produit
set
  nom_produit = nom,
  prix_produit = prix,
  url_image_produit = image
WHERE
  nom_produit = nom
  AND prix_produit = prix
  AND url_image_produit = image;
  ELSE
insert into
  utilisateur (nom, prix, image);
  END IF;
  end $$ delimiter;







CREATE PROCEDURE ajout( IN `NOM` VARCHAR(45), IN `PRIX` INT(112), IN `IMAGE` TEXT, IN `DATE` DATETIME ) 
BEGIN IF EXISTS ( SELECT * FROM PRODUIT WHERE NOM_PRODUIT = NOM AND PRIX_PRODUIT = PRIX AND URL_IMAGE_PRODUIT = IMAGE ) 
THEN UPDATE PRODUIT 
SET NOM_PRODUIT = NOM, PRIX_PRODUIT = PRIX, URL_IMAGE_PRODUIT = IMAGE WHERE NOM_PRODUIT = NOM 
AND PRIX_PRODUIT = PRIX, date_creation_produit = DATE  ; 
ELSE INSERT INTO 
UTILISATEUR (nom_produit,prix_produit,url_image_produit, date_creation_produit) VALUES(NOM, PRIX, IMAGE,date); END IF; END



CREATE
PROCEDURE ajouterUtilisateur(
    IN prenom VARCHAR(45),
    IN nom VARCHAR(45),
    IN rang INT,
    IN adresse_mail TEXT,
    IN mot_de_passe TEXT,
    IN date_creation_user DATETIME,
    IN url_avatar TEXT,
    IN lieu TEXT
)
BEGIN
    IF EXISTS
        (
        SELECT
            nom_lieu_Lieu
        FROM
            lieu
        WHERE
            nom_lieu_Lieu = lieu
    ) THEN
INSERT
INTO
    `utilisateur`(
        `prenom`,
        `nom`,
        `rang`,
        `adresse_mail`,
        `mot_de_passe`,
        `date_creation_user`,
        `url_avatar`,
        `id_lieu_Lieu`
    )
VALUES(
    prenom,
    nom,
    rang,
    adresse_mail,
    SHA1(mot_de_passe),
    date_creation_user,
    url_avatar,
    ( SELECT id_lieu_Lieu FROM lieu WHERE nom_lieu_Lieu = lieu)); 
ELSE
INSERT
INTO
    lieu(nom_lieu_lieu)
VALUES(lieu);
INSERT
INTO
    `utilisateur`(
        `prenom`,
        `nom`,
        `rang`,
        `adresse_mail`,
        `mot_de_passe`,
        `date_creation_user`,
        `url_avatar`,
        `id_lieu_Lieu`
    )
VALUES(
    prenom,
    nom,
    rang,
    adresse_mail,
    SHA1(mot_de_passe),
    date_creation_user,
    url_avatar,
    (
    SELECT
        id_lieu_lieu
    FROM
        lieu
    WHERE
        nom_lieu_lieu = lieu
)
);
END IF;
END

