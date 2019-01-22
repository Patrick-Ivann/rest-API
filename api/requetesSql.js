/*export const RECUPERE_TOUS_LES_UTILISATEURS = "SELECT * FROM utilisateur"
export const RECUPERE_UTILISATEUR_PAR_ID = "SELECT * FROM utilisateur where id_user = ?"
export const RECUPERE_UTILISATEUR_PAR_MAIL = "SELECT * FROM utilisateur where adresse_mail = ?"

//export const AJOUTER_UTILISATEUR = "INSERT INTO utilisateur SET ?; SELECT * FROM utilisateur WHERE id_user = (SELECT MAX(id_user) FROM utilisateur )"
export const CONNEXION_UTILISATEUR = "SELECT * FROM utilisateur WHERE adresse_mail = ?"


export const RECUPERE_TOUS_LES_EVENEMENTS = "SELECT * FROM evenement"
export const RECUPERE_EVENEMENT_PAR_ID = "SELECT * FROM evenement where id_event = ?"
export const RECUPERE_EVENEMENT_PAR_LIEU = "SELECT * FROM evenement where lieu_event = ?"

export const AJOUTER_EVENEMENT = "INSERT INTO evenement SET ?;  SELECT * FROM evenement WHERE id_event = (SELECT MAX(id_event) FROM evenement )"

export const RECUPERE_TOUTES_LES_PHOTOS = "SELECT * FROM photo"
export const RECUPERE_PHOTO_PAR_ID = "SELECT * FROM photo where id_photo = ?"

export const AJOUTER_PHOTO = "INSERT INTO photo SET ?;  SELECT * FROM photo WHERE id_photo = (SELECT MAX(id_photo) FROM photo )"

export const RECUPERE_TOUS_LES_PRODUITS = "SELECT * FROM produit"
export const RECUPERE_PRODUIT_PAR_ID = "SELECT * FROM produit where id_produit = ?"

export const AJOUTER_PRODUIT = "INSERT INTO produit SET ?;  "

*/


export const RECUPERER_TOUS_LES_UTILISATEURS = "SELECT * FROM utilisateur";
export const RECUPERER_UTILISATEUR_PAR_ID = "SELECT * FROM utilisateur WHERE id_user = ?";
export const RECUPERER_UTILISATEUR_PAR_MAIL = "SELECT * FROM utilisateur WHERE adresse_mail = ?";
export const SUPPRIMER_UTILISATEUR_PAR_ID = `DELETE FROM utilisateur WHERE id_user = ?; ${RECUPERER_TOUS_LES_UTILISATEURS}`
export const CONNEXION_UTILISATEUR = "SELECT * FROM utilisateur WHERE adresse_mail = ?"



export const RECUPERER_TOUS_LES_EVENEMENTS = "SELECT * FROM evenement";
export const RECUPERER_EVENEMENT_PAR_ID = "SELECT * FROM evenement WHERE id_event = ?";
export const RECUPERER_EVENEMENT_PAR_LIEU = "SELECT * FROM evenement WHERE lieu_event = ?";
export const SUPPRIMER_EVENEMENT_PAR_ID = `DELETE FROM evenement WHERE id_event = ?;`

export const RECUPERER_TOUS_LES_COMMENTAIRES = "SELECT * FROM commentaire";
export const RECUPERER_COMMENTAIRE_PAR_ID = "SELECT * FROM commentaire WHERE id_commentaire = ?";
export const SUPPRIMER_COMMENTAIRE_PAR_ID = `DELETE FROM commentaire WHERE id_commentaire = ?; ${RECUPERER_TOUS_LES_COMMENTAIRES}`


export const RECUPERER_TOUTES_LES_IDEES = "SELECT * FROM idee";
export const RECUPERER_IDEE_PAR_ID = "SELECT * FROM idee WHERE id_event_idee = ?";
export const SUPPRIMER_IDEE_PAR_ID = `DELETE FROM idee WHERE id_idee = ?; ${RECUPERER_TOUTES_LES_IDEES}`


export const RECUPERER_TOUS_LES_LIEUX = "SELECT * FROM lieu";
export const RECUPERER_LIEU_PAR_ID = "SELECT * FROM lieu WHERE id_lieu_Lieu = ?";
export const SUPPRIMER_LIEU_PAR_ID = `DELETE FROM lieu WHERE id_lieu_lieu = ?; ${RECUPERER_TOUS_LES_LIEUX}`


export const RECUPERER_TOUS_LES_JAIMES = "SELECT * FROM aime";
export const RECUPERER_LES_PHOTO_AIMEE = "SELECT * FROM aime WHERE id_photo = ?";
export const RECUPERER_LES_UTILISATEURS_AIMANT = "SELECT * FROM aime WHERE id_user = ?";
export const PUBLIER_UN_LIKE_SUR_PHOTO = "INSERT INTO aime (id_user, id_photo) VALUES ('?', '?')";

export const RECUPERER_TOUTES_LES_PARTICIPATIONS = "SELECT * FROM participer";
export const RECUPERER_PARTICIPANT = "SELECT * FROM participer WHERE id_user = ?";
export const RECUPERER_EVENEMENT_PARTICIPE = "SELECT * FROM participer WHERE id_event = ?";


export const RECUPERER_TOUTES_LES_NOTIFS = "SELECT * FROM notifie";
export const RECUPERER_IDEE_NOTIF = "SELECT * FROM notifie WHERE id_event_idee = ?";
export const RECUPERER_UTILISATEUR_NOTIF = "SELECT * FROM notifie WHERE id_user = ?";




export const RECUPERER_TOUS_LES_ACHATS = "SELECT * FROM achete";
export const RECUPERER_ACHETEUR = "SELECT * FROM achete WHERE id_user = ?";
export const RECUPERER_PRODUIT = "SELECT * FROM achete WHERE id_produit = ?";

export const RECUPERER_TOUS_LES_EVENT_IDEE_AIMEE = "SELECT * FROM aime_idee";
export const RECUPERER_UTIILISATEUR_AIME_IDEE_EVENT = "SELECT * FROM aime_idee WHERE id_user = ?";
export const RECUPERER_EVENT_IDEE_AIME = "SELECT * FROM aime_idee WHERE id_event_idee = ?";


export const PUBLIER_UN_LIKE_SUR_IDEE = "INSERT INTO aime_idee (id_user, id_event_idee) VALUES ('?', '?')";

export const PUBLIER_UN_UTILISATEUR_A_NOTIFIE = "INSERT INTO notifie (id_event_idee, id_user) VALUES ('?', '?')";

export const PUBLIER_UN_ACHAT = "INSERT INTO achete (id_user, id_produit) VALUES ('?', '?')";