use projet_web;



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
    mot_de_passe,
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
    mot_de_passe,
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
    `evenement`(
        `nom_event`,
        `type_event`,
        `prix`,
        `date_debut_event`,
        `date_fin_event`,
        `date_creation_event`,
        `id_lieu_Lieu`
    )
VALUES(
    nom_event,
   type_event,
        prix,
    
    date_debut_event,
    date_fin_event,
    date_creation_event,
    ( SELECT id_lieu_Lieu FROM lieu WHERE nom_lieu_Lieu = lieu)); 
ELSE
INSERT
INTO
    lieu(nom_lieu_lieu)
VALUES(lieu);
INSERT
    INTO
    evenement(
        `nom_event`,
        `type_event`,
        `prix`,
        `date_debut_event`,
        `date_fin_event`,
        `date_creation_event`,
        `id_lieu_Lieu`
    )
VALUES(
    nom_event,
    type_event,
        prix,
    date_debut_event,
    date_fin_event,
    date_creation_event,
    ( SELECT id_lieu_Lieu FROM lieu WHERE nom_lieu_Lieu = lieu));
END IF;
END



CREATE
PROCEDURE ajouterIdee(
    nom_idee VARCHAR(45),
     description_idee TEXT,
    date_creation_idee DATETIME,
    id_user Int(11), 
    lieu text
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
    `idee`(
        `nom_idee`,
     `description_idee`,
    `date_creation_idee` ,
    `id_user` , 
        `id_lieu_Lieu`
    )
VALUES(
  nom_idee ,
     description_idee ,
    date_creation_idee ,
    id_user , 
    ( SELECT id_lieu_Lieu FROM lieu WHERE nom_lieu_Lieu = lieu)); 
ELSE
INSERT
INTO
    lieu(nom_lieu_lieu)
VALUES(lieu);
INSERT
INTO
    `idee`(
        `nom_idee`,
     `description_idee`,
    `date_creation_idee` ,
    `id_user` , 
        `id_lieu_Lieu`
    )
VALUES(
  nom_idee ,
     description_idee ,
    date_creation_idee ,
    id_user ,
    ( SELECT id_lieu_Lieu FROM lieu WHERE nom_lieu_Lieu = lieu));
END IF;
END