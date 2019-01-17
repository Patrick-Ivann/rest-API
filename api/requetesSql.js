export const RECUPERE_TOUS_LES_UTILISATEURS = "SELECT * FROM utilisateur" 
export const RECUPERE_UTILISATEUR_PAR_ID = "SELECT * FROM utilisateur where id_user = ?"
export const RECUPERE_UTILISATEUR_PAR_MAIL = "SELECT * FROM utilisateur where adresse_mail = ?"

export const RECUPERE_TOUS_LES_EVENEMENTS = "SELECT * FROM evenement"
export const RECUPERE_EVENEMENT_PAR_ID = "SELECT * FROM evenement where id_event = ?"
export const RECUPERE_EVENEMENT_PAR_LIEU = "SELECT * FROM evenement where lieu_event = ?"

export const RECUPERE_TOUTES_LES_PHOTOS = "SELECT * FROM photo"
export const RECUPERE_PHOTO_PAR_ID = "SELECT * FROM photo where id_photo = ?"


export const RECUPERE_TOUS_LES_PRODUITS = "SELECT * FROM produit"
export const RECUPERE_PRODUIT_PAR_ID = "SELECT * FROM produit where id_produi = ?"