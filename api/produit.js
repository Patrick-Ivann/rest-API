import {
    RECUPERER_TOUS_LES_PRODUITS,
    SUPPRIMER_PRODUIT_PAR_ID,
    RECUPERER_PRODUIT_PAR_ID,

} from "./requetesSql";
import {
    valideProduitInput
} from '../validation/validationInput';


import moment from 'moment';
import formidable from 'formidable'
import connexion from '../functions/connexion';
import {
    AJOUTER_PRODUIT
} from "./procedures_sql";
import {
    logToTxt
} from "../functions/functionSheet";


/**
 * @VERB GET
 * @description recover all the products
 * @access public
 * @alias /api/produit/recuperer
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererTousLesProduits = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERER_TOUS_LES_PRODUITS, (err, rows, fields) => {

        if (err) {
            erreur.sql = "erreur au niveau de la BDD sql" + err
            logToTxt(erreur, "récupération")
            res.status(404).json(erreur);
        }

        if (rows === []) {

            erreur.bddVide = "La BDD ne contient pas de produit."
            logToTxt(erreur, "récupération")
            res.status(404).json(erreur);
        }

        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }


    })


}


/**
 * @VERB GET
 * @description recover products by ID
 * @alias /api/produit/recuperer/:id([0-9]*)
 * @access public
 * @param {Object} req 
 * @param {Object} res 
 */
export const recupererProduitParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERER_PRODUIT_PAR_ID, req.params.id, (err, rows, fields) => {

        if (err) {
            erreur.sql = "erreur au niveau de la BDD sql" + err
            logToTxt(erreur, "récupération")
            res.status(404).json(erreur);
        }

        if (rows === []) {

            erreur.bddVide = "La BDD ne contient pas de produit."
            logToTxt(erreur, "récupération")
            res.status(404).json(erreur);
        }

        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }


    })




}

/**
 * @VERB POST
 * @description add a products in the shop
 * @access protected
 * @alias /api/produit/ajouter
 * @param {Object} req 
 * @param {Object} res 
 */
export const televerserProduit = (req, res) => {


    var path = require("path")
    const erreurs = {}


    console.log("dedans")


    /**
         * TODO faire passer l'id_event,l'id_user, la legende à la bdd
         


        // rajouterFicherAprosit(file, res)
        //return res.send();

    });*/

    var formulaire = {}
    var fichier = {}


    new formidable.IncomingForm().parse(req)


        .on('field', function (name, field) {
            console.log('valeur dans field ', field);
            console.log("cle dans field " + name);

            if (name === 'formulaire') {
                JSON.parse(field)

                for (var key in JSON.parse(field)) {

                    if (JSON.parse(field).hasOwnProperty(key)) {

                        formulaire[key] = JSON.parse(field)[key]

                    }

                }

                const {
                    erreurs,
                    estValide
                } = valideProduitInput(JSON.parse(field));



                if (!estValide) {



                    return res.status(400).json(erreurs);

                }
            }


        })
        .on('fileBegin', function (name, file) {

            console.log("ligne 158" + name);
            let extension = file.name.split(".")
            console.log(extension[1]);

            file.name = file['name'].replace(/\s+/g, "-");


            fichier.name = `Produit_${file.name}`
            file.name = fichier.name
            //file.name = extension[0] + "." + name
            //file.name = "user_id-date-jsp" + "." + name
            file.path = path.join(__dirname, '../photos/') + file.name;
            fichier.url_image_produit = file.name
            //file.name =


        })
        .on('error', function (err) {
            console.log(err);
            logToTxt(erreur, "televersement")
        })
        .on('end', function () {

            console.log(formulaire);
            console.log(fichier)

            res.send(ajouterProduit(formulaire, fichier))


            //res.end();
        });

};

/**
 * @VERB 
 * @access
 * @alias
 * @description
 * @param {Object} formulaire 
 * @param {Object} fichier 
 */
export const ajouterProduit = (formulaire, fichier) => {



    const produit = {}



    produit["date_creation_produit"] = moment().format('YYYY/MM/D hh:mm:ss SSS')


    connexion.query(AJOUTER_PRODUIT, [formulaire.nom_produit, formulaire.prix_produit, fichier.url_image_produit, produit.date_creation_produit], (err, rows, fields) => {




    })

}

/**
 * @VERB DELETE
 * @description delete products by ID
 * @alias /api/produit/supprimer
 * @access protected
 * @param {Object} req 
 * @param {Object} res 
 */
export const supprimerProduitParId = (req, res) => {

    let erreurs = {}




    connexion.query(SUPPRIMER_PRODUIT_PAR_ID, req.params.id, (err, rows, fields) => {

        if (err) {
            erreurs.sql = "ERREUR SQL " + err
            logToTxt(erreurs, "suppression")
            return res.status(400).json(erreurs);
        }
        if (rows.affectedRows === 0) {

            erreurs.sql = "L'evenement est déja supprimé"
            console.log(erreurs)
            logToTxt(erreurs, "suppression")
            return res.status(403).json(erreurs);
        }

        return res.json(rows)
    })






}