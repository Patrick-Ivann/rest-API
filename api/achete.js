import connexion from '../functions/connexion'
import {
    RECUPERER_TOUS_LES_ACHATS,
    RECUPERER_ACHETEUR,
    RECUPERER_PRODUIT,
    PUBLIER_UN_ACHAT,
    RECUPERER_ACHAT_PAR_ID_UTILISATEUR,
    RECUPERER_PRODUIT_PAR_ID,
    RECUPERER_PLUS_ACHETES
} from './requetesSql';
import {
    logToTxt
} from '../functions/functionSheet';



/**
 * @VERB GET
 * @description recover all purchases
 * @access public
 * @alias /api/achete/recuperer/
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererAchats = (req, res) => {

    connexion.query(RECUPERER_TOUS_LES_ACHATS, (err, rows, fields) => {


        if (err) {

            erreur.sql = "une erreur coté SQL vient d'arriver"

            return res.status(404).json(erreur);
        }


        return res.json(rows);
    });
};

export const recupererProduitPlusAchete = (req, res) => {

    let erreurs = {}
    connexion.query(RECUPERER_PLUS_ACHETES, (err, rows, fields) => {

        if (err) {

            erreurs.sql = "une erreur coté SQL vient d'arriver" + err
            console.log(erreurs);
            return res.status(404).json(erreurs);
        }

        console.log(rows);
        return res.json(rows);
    });


};




/**
 * @VERB GET
 * @description retrieves the id of the customer who buys
 * @access public
 * @alias /api/achete/recuperer/:id([0-9]*)
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererAcheteur = (req, res) => {

    connexion.query(RECUPERER_ACHETEUR, req.params.id, (err, rows, fields) => {

        if (err) {

            erreur.sql = "une erreur coté SQL vient d'arriver"

            return res.status(404).json(erreur);
        }


        return res.json(rows);
    });
};


/**
 * @VERB GET
 * @description recover an id product
 * @access public
 * @alias /api/achete/recuperer/:id([0-9])
 * @param {Object} req request
 * @param {Object} res response
 */
export const recupererProduit = (req, res) => {

    connexion.query(RECUPERER_PRODUIT, req.params.id, (err, rows, fields) => {

        if (err) {

            erreur.sql = "une erreur coté SQL vient d'arriver"

            return res.status(404).json(erreur);
        }


        return res.json(rows);
    });
};


/**
 * @VERB POST
 * @description 
 * @access protected
 * @alias /api/achete/ajouter/
 * @param {Object} req resquest
 * @param {Object} res response
 *
 */
export const publierUnAchat = (req, res) => {


    const obj = Object.keys(req.body)[0]

    let erreurs = {}

    const achat = {}

    for (var key in JSON.parse(obj)) {

        if (JSON.parse(obj).hasOwnProperty(key)) {

            achat[key] = JSON.parse(obj)[key]

            console.log(achat);

        }

    }


    connexion.query(PUBLIER_UN_ACHAT, [achat.id_user, achat.id_produit], (err, rows, fields) => {

        if (err) {

            erreurs.sql = "ERREUR SQL" + err
            logToTxt(erreurs, "ajout")
            console.log(erreurs)
            return res.status(404).json("Vous avez déjà acheté Ce produit.");
        } else {

            console.log(achat);
            connexion.query(RECUPERER_PRODUIT_PAR_ID, achat.id_produit, (err, rows, fields) => {

                if (err) {

                    erreurs.sql = "ERREUR SQL" + err
                    console.log(erreurs)
                    logToTxt(erreurs, "récupération")
                    return res.status(404).json("Vous avez déjà acheté Ce produit.");
                } else {

                    console.log(rows);
                    console.log(rows[0]);
                    if (rows.length === 1) {
                        return res.json(rows[0]);
                    } else {


                        return res.json(rows);
                    }



                }

            })
        }


    });
};