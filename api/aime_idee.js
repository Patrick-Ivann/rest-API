import connexion from "../functions/connexion";
import {
    RECUPERER_TOUS_LES_EVENT_IDEE_AIMEE,
    RECUPERER_UTIILISATEUR_AIME_IDEE_EVENT,
    RECUPERER_EVENT_IDEE_AIME,
    PUBLIER_UN_LIKE_SUR_IDEE
} from "./requetesSql";


export const recupererTousLesEvenementsAimee = (req, res) => {

    connexion.query(RECUPERER_TOUS_LES_EVENT_IDEE_AIMEE, (err, rows, fields) => {
        return res.json(rows);
    });
};

export const recupererUtilisateurAimeIdeeEvent = (req, res) => {

    connexion.query(RECUPERER_UTIILISATEUR_AIME_IDEE_EVENT, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};

export const recupererEvenementIdeeAime = (req, res) => {

    connexion.query(RECUPERER_EVENT_IDEE_AIME, req.params.id, (err, rows, fields) => {
        return res.json(rows);
    });
};

export const publierUnLikeSurEvenementIdee = (req, res) => {

    var values = Object.values(req.body);

    connexion.query(PUBLIER_UN_LIKE_SUR_IDEE, values, (err, rows, fields) => {
        return res.json(rows);
    });
};