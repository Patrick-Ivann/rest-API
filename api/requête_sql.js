export const RECUPERER_TOUS_LES_UTILISATEURS = "SELECT * FROM utilisateur";
export const RECUPERER_UTILISATEURS_PAR_ID = "SELECT * FROM utilisateur WHERE id_user = ?";
export const RECUPERER_UTILISATEURS_PAR_MAIL = "SELECT * FROM utilisateur WHERE adresse_mail = ?";

export const RECUPERER_TOUT_LES_EVENEMENTS = "SELECT * FROM evenement";
export const RECUPERER_EVENEMENTS_PAR_ID = "SELECT * FROM evenement WHERE id_event = ?";
export const RECUPERER_EVENEMENTS_PAR_LIEU = "SELECT * FROM evenement WHERE lieu_event = ?";

export const RECUPERER_TOUT_LES_COMMENTAIRES = "SELECT * FROM commentaire";
export const RECUPERER_COMMENTAIRE_PAR_ID = "SELECT * FROM commentaire WHERE id_commentaire = ?";

export const RECUPERER_TOUTES_LES_IDEES = "SELECT * FROM idee";
export const RECUPERER_IDEE_PAR_ID= "SELECT * FROM idee WHERE id_event_idee = ?";

export const RECUPERER_TOUTES_LES_LIEU = "SELECT * FROM lieu";
export const RECUPERER_LIEU_PAR_ID = "SELECT * FROM lieu WHERE id_lieu_Lieu = ?";

export const RECUPERER_TOUT_LES_JAIME = "SELECT * FROM aime";
export const RECUPERER_LES_PHOTO_AIMEE = "SELECT * FROM aime WHERE id_photo = ?";
export const RECUPERER_LES_UTILISATEURS_AIMANT = "SELECT * FROM aime WHERE id_user = ?";

export const RECUPERER_TOUTES_PARTICIPATION = "SELECT * FROM participer";
export const RECUPERER_PARTICIPANT = "SELECT * FROM participer WHERE id_user = ?";
export const RECUPERER_EVENEMENT_PARTICIPE = "SELECT * FROM participer WHERE id_event = ?";

export const RECUPERER_TOUTES_LES_NOTIF = "SELECT * FROM notifie";
export const RECUPERER_IDEE_NOTIF = "SELECT * FROM notifie WHERE id_event_idee = ?";
export const RECUPERER_UTILISATEUR_NOTIF = "SELECT * FROM notifie WHERE id_user = ?";

export const RECUPERER_TOUT_ACHAT = "SELECT * FROM achete";
export const RECUPERER_ACHETEUR = "SELECT * FROM achete WHERE id_user = ?";
export const RECUPERER_PRODUIT = "SELECT * FROM achete WHERE id_produit = ?";

export const RECUPERER_TOUT_LES_EVENT_IDEE_AIMEE = "SELECT * FROM aime_idee";
export const RECUPERER_UTIILISATEUR_AIME_IDEE_EVENT = "SELECT * FROM aime_idee WHERE id_user = ?";
export const RECUPERER_EVENT_IDEE_AIME = "SELECT * FROM aime_idee WHERE id_event_idee = ?";