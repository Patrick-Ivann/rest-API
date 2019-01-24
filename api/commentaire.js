import connexion from '../functions/connexion';
import moment from 'moment'
import {
    RECUPERER_COMMENTAIRE_PAR_ID,
    SUPPRIMER_COMMENTAIRE_PAR_ID,
    RECUPERER_TOUS_LES_COMMENTAIRES,
    RECUPERER_COMMENTAIRE_PAR_ID_PHOTO,
    AJOUTER_COMMENTAIRE
} from './requetesSql';
import {
    valideCommentaireInput
} from '../validation/validationInput';


/**
 * @access
 * @alias /api/commentaire/recuperer
 * @param {*} req 
 * @param {*} res 
 */
export const recupererTousLesCommentaire = (req, res) => {

    connexion.query(RECUPERER_TOUS_LES_COMMENTAIRES, (err, rows, fields) => {
        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }
    });
};

/**
 * @access
 * @alias /api/commentaire/recuperer/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const recupererCommentaireParId = (req, res) => {

    connexion.query(RECUPERER_COMMENTAIRE_PAR_ID, req.params.id, (err, rows, fields) => {
        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }
    });
};


export const recupererCommentaireParIdPhoto = (req, res) => {


    const erreurs = {}

    connexion.query(RECUPERER_COMMENTAIRE_PAR_ID_PHOTO, req.params.id, (err, rows, fields) => {

        if (err) {
            erreurs.sql = err
            return res.status(400).json(erreurs);
        } else {

            if (rows.length === 1) {
                return res.json(rows[0]);
            } else {


                return res.json(rows);
            }
        }




    })



}



/**
 * @param on attend un texte_commentaire un id_user et un id_photo
 * @param {*} req 
 * @param {*} res 
 */
export const ajouterCommentaire = (req, res) => {


    const obj = Object.keys(req.body)[0]

    const {
        erreurs,
        estValide
    } = valideCommentaireInput(JSON.parse(obj));

    if (!estValide) {
        return res.json(erreurs);
    }

    const commentaire = {}

    for (var key in JSON.parse(obj)) {

        if (JSON.parse(obj).hasOwnProperty(key)) {

            commentaire[key] = JSON.parse(obj)[key]

            console.log(commentaire);
        }

    }

    commentaire["date_creation_commentaire"] = moment().format('YYYY/MM/D hh:mm:ss SSS')

    //* ce if est vraiment bidon car si on passe des valeurs booléenes ça pete 



    connexion.query(AJOUTER_COMMENTAIRE, [commentaire.texte_commentaire, commentaire.date_creation_commentaire, commentaire.id_user, commentaire.id_photo], (err, rows, field) => {

        if (err) {
            erreurs.sql = err
            console.log(err);
            return res.status(404).json(erreurs);
        }
        return res.json(rows);
    })




}


/**
 * @access
 * @alias /api/commentaire/supprimer/:id([0-9]*)
 * @param {*} req 
 * @param {*} res 
 */
export const supprimerCommentaireParID = (req, res) => {


    const erreurs = {}


    connexion.query(RECUPERER_COMMENTAIRE_PAR_ID, req.params.id, (err, rows, fields) => {

        if (err) {
            erreurs.sql = err
            return res.status(400).json(erreurs);
        }

        if (rows) {


            connexion.query(SUPPRIMER_COMMENTAIRE_PAR_ID, req.params.id, (err, rows, fields) => {

                if (err) {
                    erreurs.sql = err
                    return res.status(400).json(erreurs);
                }
                if (rows.affectedRows === 0) {

                    erreurs.sql = "L'commentaire est déja supprimé"

                }

                return res.json(rows)
            })
        }

    })
};