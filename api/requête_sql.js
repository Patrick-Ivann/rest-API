export const RECUPERER_TOUS_LES_UTILISATEURS = "SELECT * FROM utilisateur";
export const RECUPERER_UTILISATEURS_PAR_ID = "SELECT * FROM utilisateur WHERE id_user = ?";
export const RECUPERER_UTILISATEURS_PAR_MAIL = "SELECT * FROM utilisateur WHERE adresse_mail = ?";

export const RECUPERER_TOUT_LES_EVENEMENTS = "SELECT * FROM evenement"
export const RECUPERER_EVENEMENTS_PAR_ID = "SELECT * FROM evenement WHERE id_event = ?"
export const RECUPERER_EVENEMENTS_PAR_LIEU = "SELECT * FROM evenement WHERE lieu_event = ?"

export const RECUPERER_TOUT_LES_COMMENTAIRES = "SELECT * FROM commentaire"
export const RECUPERER_COMMENTAIRE_PAR_ID = "SELECT * FROM commentaire WHERE id_commentaire = ?"

export const RECUPERER_TOUTES_LES_IDEES = "SELECT * FROM idee"
export const RECUPERER_IDEE_PAR_ID= "SELECT * FROM idee WHERE id_event_idee = ?"