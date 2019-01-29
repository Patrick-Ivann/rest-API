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
import {
    logToTxt
} from '../functions/functionSheet';


/**
 * @VERB GET
 * @description recover all the comments
 * @access public 
 * @alias /api/commentaire/recuperer/
 * @param {Object} req 
 * @param {Object} res 
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
 * @VERB GET
 * @description recover all the comments by ID
 * @access public
 * @alias /api/commentaire/recuperer/:id([0-9]*)
 * @param {String} req.params.id id_photo sent through the URL
 * @param {*} req object represents the HTTP request and has properties for the request query string, parameters, body,headers 
 * @param {*} res object used to answer the query
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

/**
 * @VERB GET
 * @description retrive every comments for a picture
 * @alias /api/commentaire/recuperer/photo/:id([0-9]*)
 * @access public
 * @param {Object} req object represents the HTTP request and has properties for the request query string, parameters, body,headers 
 * @param {String} req.params.id id_photo sent through the URL
 * @param {Object} res object used to answer the query
 */
export const recupererCommentaireParIdPhoto = (req, res) => {


    const erreurs = {}

    connexion.query(RECUPERER_COMMENTAIRE_PAR_ID_PHOTO, req.params.id, (err, rows, fields) => {

        if (err) {
            erreurs.sql = err
            return res.status(400).json(erreurs);
        } else {

            console.log(rows);
            if (rows.length === 1) {
                return res.json(rows[0]);
            } else {


                return res.json(rows);
            }
        }




    })



}



/**
 * @VERB POST 
 * @description to add a comment
 * @alias /api/commentaire/ajouter
 * @access public
 * @param {Object} req object represents the HTTP request and has properties for the request query string, parameters, body,headers
 * @param {Object} req.body expecting texte_commentaire, id_user, id_photo
 * @param {Object} res object used to answer the query
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




    connexion.query(AJOUTER_COMMENTAIRE, [commentaire.texte_commentaire, commentaire.date_creation_commentaire, commentaire.id_user, commentaire.id_photo], (err, rows, field) => {

        if (err) {
            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "ajout")
            console.log(err);
            return res.status(404).json(erreurs);
        }
        return res.json(rows);
    })




}


/**
 * @VERB DELETE
 * @description delete a comment by ID
 * @access protected 
 * @alias /api/commentaire/supprimer/:id([0-9]*)
 * @param {Object} req 
 * @param {String} req.params.id id_photo sent through the URL
 * @param {Object} res 
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