export const RECUPERE_TOUS_LES_UTILISATEURS = "SELECT * FROM utilisateur"
export const RECUPERE_UTILISATEUR_PAR_ID = "SELECT * FROM utilisateur where id_user = ?"
export const RECUPERE_UTILISATEUR_PAR_MAIL = "SELECT * FROM utilisateur where adresse_mail = ?"

export const AJOUTER_UTILISATEUR = "INSERT INTO utilisateur SET ?; SELECT * FROM utilisateur WHERE id_user = (SELECT MAX(id_user) FROM utilisateur )"

export const RECUPERE_TOUS_LES_EVENEMENTS = "SELECT * FROM evenement"
export const RECUPERE_EVENEMENT_PAR_ID = "SELECT * FROM evenement where id_event = ?"
export const RECUPERE_EVENEMENT_PAR_LIEU = "SELECT * FROM evenement where lieu_event = ?"

export const AJOUTER_EVENEMENT = "INSERT INTO evenement SET ?;  SELECT * FROM evenement WHERE id_event = (SELECT MAX(id_event) FROM evenement )"

export const RECUPERE_TOUTES_LES_PHOTOS = "SELECT * FROM photo"
export const RECUPERE_PHOTO_PAR_ID = "SELECT * FROM photo where id_photo = ?"

export const AJOUTER_PHOTO = "INSERT INTO photo SET ?;  SELECT * FROM photo WHERE id_photo = (SELECT MAX(id_photo) FROM photo )"

export const RECUPERE_TOUS_LES_PRODUITS = "SELECT * FROM produit"
export const RECUPERE_PRODUIT_PAR_ID = "SELECT * FROM produit where id_produit = ?"

export const AJOUTER_PRODUIT = "INSERT INTO produit SET ?;  SELECT * FROM produit WHERE id_produit = (SELECT MAX(id_produit) FROM produit ) "