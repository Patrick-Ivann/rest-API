import connexion from "../functions/connexion";
import {
    SIGNALER_PHOTO_PAR_ID_PHOTO,
    RECUPERER_PHOTO_PAR_ID,
    SUPPRIMER_PHOTO_PAR_ID
} from "./requetesSql";
import {
    logToTxt
} from "../functions/functionSheet";

/**
 * @VERB POST
 * @alias /api/signaler/ajouter
 * @access protected
 * @description post a photo for later deletion
 * @param {Object} req 
 * @param {Object} res 
 */
export const signalerPhoto = (req, res) => {



    let erreurs = {}

    const obj = Object.keys(req.body)[0]

    const signalement = {}

    for (var key in JSON.parse(obj)) {

        if (JSON.parse(obj).hasOwnProperty(key)) {

            signalement[key] = JSON.parse(obj)[key]

            console.log(signalement);
        }

    }



    connexion.query(SIGNALER_PHOTO_PAR_ID_PHOTO, [signalement.id_user, signalement.id_photo], (err, rows, fields) => {

        if (err) {
            erreurs.sql = err
            return res.status(400).json(erreurs);
        } else {

            res.end()
        }
    })
};


/**
 * @VERB DELETE
 * @description delete a pics that has been reported
 * @alias /api/signaler/supprimer
 * @access protected
 * @param {Object} req 
 * @param {Object} res 
 */
export const supprimerPhotoParSignalement = (req, res) => {




    const erreurs = {}



    connexion.query(RECUPERER_PHOTO_PAR_ID, req.params.id, (err, rows, fields) => {

        if (err) {
            erreurs.sql = err
            return res.status(400).json(erreurs);
        }

        if (rows) {


            connexion.query(SUPPRIMER_PHOTO_PAR_ID, req.params.id, (err, rows, fields) => {

                if (err) {

                    erreurs.sql = "ERREUR SQL" + err
                    logToTxt(erreurs, "ajout")
                    return res.status(404).json("Vous avez déjà déréféréncé Cette image.");

                }
                if (rows.affectedRows === 0) {

                    erreurs.sql = "La photo est déja supprimé"

                }

                return res.json(rows)
            })
        }

    })

};