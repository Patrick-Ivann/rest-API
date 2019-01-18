
DROP TABLE IF EXISTS Evenement ;
 CREATE TABLE Evenement (id_event INT(11) AUTO_INCREMENT NOT NULL, nom_event VARCHAR(45), date_debut_event DATETIME, date_fin_event DATETIME, date_creation_event DATETIME, id_lieu_Lieu Int(11), PRIMARY KEY (id_event)) ENGINE=InnoDB;
   DROP TABLE IF EXISTS Utilisateur ;
    CREATE TABLE Utilisateur (id_user INT(11) AUTO_INCREMENT NOT NULL, prenom VARCHAR(45), nom VARCHAR(45), rang INT, adresse_mail TEXT, mot_de_passe TEXT, date_creation_user DATETIME, url_avatar TEXT, id_lieu_Lieu Int(11), PRIMARY KEY (id_user)) ENGINE=InnoDB;
      DROP TABLE IF EXISTS Commentaire ;
       CREATE TABLE Commentaire (id_commentaire INT(11) AUTO_INCREMENT NOT NULL, texte_commentaire TEXT, date_creation_commentaire DATETIME, id_user Int(11), id_photo Int(11), PRIMARY KEY (id_commentaire)) ENGINE=InnoDB;
         DROP TABLE IF EXISTS Produit ; 
         CREATE TABLE Produit (id_produit INT(11) AUTO_INCREMENT NOT NULL, nom_produit VARCHAR(45), prix_produit INT(112), url_image_produit VARCHAR(75), date_creation_produit DATETIME, PRIMARY KEY (id_produit)) ENGINE=InnoDB;
           DROP TABLE IF EXISTS Photo ;
            CREATE TABLE Photo (id_photo INT(11) AUTO_INCREMENT NOT NULL, legende_photo TEXT, url_photo VARCHAR(75), date_creation_photo DATETIME, id_event Int(11), id_user Int(11), PRIMARY KEY (id_photo)) ENGINE=InnoDB;
              DROP TABLE IF EXISTS Idee ; CREATE TABLE Idee (id_event_idee INT(11) AUTO_INCREMENT NOT NULL, nom_idee VARCHAR(45), description_idee TEXT, date_creation_idee DATETIME, id_user Int(11), id_lieu_Lieu Int(11), PRIMARY KEY (id_event_idee)) ENGINE=InnoDB;
                DROP TABLE IF EXISTS Lieu ; CREATE TABLE Lieu (id_lieu_Lieu INT(11) AUTO_INCREMENT NOT NULL, nom_lieu_Lieu TEXT, PRIMARY KEY (id_lieu_Lieu)) ENGINE=InnoDB;
                  DROP TABLE IF EXISTS Participer ; CREATE TABLE Participer (id_user Int(11) AUTO_INCREMENT NOT NULL, id_event Int(11) NOT NULL, PRIMARY KEY (id_user,  id_event)) ENGINE=InnoDB;
                    DROP TABLE IF EXISTS Achete ; CREATE TABLE Achete (id_user Int(11) AUTO_INCREMENT NOT NULL, id_produit Int(11) NOT NULL, PRIMARY KEY (id_user,  id_produit)) ENGINE=InnoDB;
                      DROP TABLE IF EXISTS Notifie ; CREATE TABLE Notifie (id_event_idee Int(11) AUTO_INCREMENT NOT NULL, id_user Int(11) NOT NULL, PRIMARY KEY (id_event_idee,  id_user)) ENGINE=InnoDB;
                        DROP TABLE IF EXISTS aime ; CREATE TABLE aime (id_user Int(11) AUTO_INCREMENT NOT NULL, id_photo Int(11) NOT NULL, PRIMARY KEY (id_user,  id_photo)) ENGINE=InnoDB;
                          DROP TABLE IF EXISTS aime_idee ; CREATE TABLE aime_idee (id_user Int(11) AUTO_INCREMENT NOT NULL, id_event_idee Int(11) NOT NULL, PRIMARY KEY (id_user,  id_event_idee)) ENGINE=InnoDB;
                            ALTER TABLE Evenement ADD CONSTRAINT FK_Evenement_id_lieu_Lieu FOREIGN KEY (id_lieu_Lieu) REFERENCES Lieu (id_lieu_Lieu);
                             ALTER TABLE Utilisateur ADD CONSTRAINT FK_Utilisateur_id_lieu_Lieu FOREIGN KEY (id_lieu_Lieu) REFERENCES Lieu (id_lieu_Lieu);
                              ALTER TABLE Commentaire ADD CONSTRAINT FK_Commentaire_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);
                               ALTER TABLE Commentaire ADD CONSTRAINT FK_Commentaire_id_photo FOREIGN KEY (id_photo) REFERENCES Photo (id_photo);
                                ALTER TABLE Photo ADD CONSTRAINT FK_Photo_id_event FOREIGN KEY (id_event) REFERENCES Evenement (id_event);
                                 ALTER TABLE Photo ADD CONSTRAINT FK_Photo_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);
                                  ALTER TABLE Idee ADD CONSTRAINT FK_Idee_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);
                                   ALTER TABLE Idee ADD CONSTRAINT FK_Idee_id_lieu_Lieu FOREIGN KEY (id_lieu_Lieu) REFERENCES Lieu (id_lieu_Lieu);
                                    ALTER TABLE Participer ADD CONSTRAINT FK_Participer_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);
                                     ALTER TABLE Participer ADD CONSTRAINT FK_Participer_id_event FOREIGN KEY (id_event) REFERENCES Evenement (id_event);
                                      ALTER TABLE Achete ADD CONSTRAINT FK_Achete_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);
                                       ALTER TABLE Achete ADD CONSTRAINT FK_Achete_id_produit FOREIGN KEY (id_produit) REFERENCES Produit (id_produit);
                                        ALTER TABLE Notifie ADD CONSTRAINT FK_Notifie_id_event_idee FOREIGN KEY (id_event_idee) REFERENCES Idee (id_event_idee);
                                         ALTER TABLE Notifie ADD CONSTRAINT FK_Notifie_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);
                                          ALTER TABLE aime ADD CONSTRAINT FK_aime_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user);
                                           ALTER TABLE aime ADD CONSTRAINT FK_aime_id_photo FOREIGN KEY (id_photo) REFERENCES Photo (id_photo);
                                            ALTER TABLE aime_idee ADD CONSTRAINT FK_aime_idee_id_user FOREIGN KEY (id_user) REFERENCES Utilisateur (id_user); 
                                            ALTER TABLE aime_idee ADD CONSTRAINT FK_aime_idee_id_event_idee FOREIGN KEY (id_event_idee) REFERENCES Idee (id_event_idee); 