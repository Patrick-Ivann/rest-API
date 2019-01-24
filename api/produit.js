import {
    RECUPERER_TOUS_LES_PRODUITS,

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



export const recupererTousLesProduits = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERER_TOUS_LES_PRODUITS, (err, rows, fields) => {

        if (err) {
            erreur.sql = "erreur au niveau de la BDD sql" + err
            res.status(404).json(erreur);
        }

        if (rows === []) {

            erreur.bddVide = "La BDD ne contient pas de produit."
            res.status(404).json(erreur);
        }

        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }


    })


}

export const recupererProduitParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERER_PRODUIT_PAR_ID, req.params.id, (err, rows, fields) => {

        if (err) {
            erreur.sql = "erreur au niveau de la BDD sql" + err
            res.status(404).json(erreur);
        }

        if (rows === []) {

            erreur.bddVide = "La BDD ne contient pas de produit."
            res.status(404).json(erreur);
        }

        if (rows.length === 1) {
            return res.json(rows[0]);
        } else {


            return res.json(rows);
        }


    })




}


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
            fichier.url_image_produit = file.path
            //file.name =


        })
        .on('error', function (err) {
            console.log(err);
        })
        .on('end', function () {

            console.log(formulaire);
            console.log(fichier)

            res.send(ajouterProduit(formulaire, fichier))


            //res.end();
        });

};


export const ajouterProduit = (formulaire, fichier) => {



    const produit = {}



    produit["date_creation_produit"] = moment().format('YYYY/MM/D hh:mm:ss SSS')


    connexion.query(AJOUTER_PRODUIT, [formulaire.nom_produit, formulaire.prix_produit, fichier.url_image_produit, produit.date_creation_produit], (err, rows, fields) => {

        if (err) {
            return err;
        }



        return rows;
    })





}