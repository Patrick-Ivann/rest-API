import connexion from "../functions/connexion";
import {
    RECUPERER_TOUS_LES_EVENT_IDEE_AIMEE,
    RECUPERER_UTIILISATEUR_AIME_IDEE_EVENT,
    RECUPERER_EVENT_IDEE_AIME,
    PUBLIER_UN_LIKE_SUR_IDEE
} from "./requetesSql";
import {
    logToTxt
} from "../functions/functionSheet";


export const recupererTousLesEvenementsAimee = (req, res) => {

    let erreurs = {}

    connexion.query(RECUPERER_TOUS_LES_EVENT_IDEE_AIMEE, (err, rows, fields) => {

        if (err) {

            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "récupération")
            return res.status(404).json("Vous avez déjà acheté Ce produit.");
        }

        return res.json(rows);
    });
};

export const recupererUtilisateurAimeIdeeEvent = (req, res) => {

    let erreurs = {}
    connexion.query(RECUPERER_UTIILISATEUR_AIME_IDEE_EVENT, req.params.id, (err, rows, fields) => {
        if (err) {

            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "récupération")
            return res.status(404).json("Vous avez déjà acheté Ce produit.");
        }

        return res.json(rows);
    });
};

export const recupererEvenementIdeeAime = (req, res) => {


    let erreurs = {}
    connexion.query(RECUPERER_EVENT_IDEE_AIME, req.params.id, (err, rows, fields) => {

        if (err) {

            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "récupération")
            return res.status(404).json(erreurs);
        }

        return res.json(rows);
    });
};

export const publierUnLikeSurEvenementIdee = (req, res) => {

    const obj = Object.keys(req.body)[0]

    let erreurs = {}

    const aimer = {}

    for (var key in JSON.parse(obj)) {

        if (JSON.parse(obj).hasOwnProperty(key)) {

            aimer[key] = JSON.parse(obj)[key]

            console.log(aimer);
        }

    }
    connexion.query(PUBLIER_UN_LIKE_SUR_IDEE, [aimer.id_user, aimer.id_event_idee], (err, rows, fields) => {

        if (err) {

            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "ajout")
            return res.status(404).json("Vous avez déjà aimé.");
        }

        return res.json(rows);
    });
};