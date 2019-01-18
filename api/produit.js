import mysql from 'mysql'
import {
    RECUPERE_TOUS_LES_PRODUITS,
    AJOUTER_PRODUIT
} from "./requetesSql";
import {
    valideProduitInput
} from '../validation/validationInput';


import moment from 'moment';

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "projet_web"
});

export const recupererTousLesProduits = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_TOUS_LES_PRODUITS, (err, rows, fields) => {


        return res.json(rows);

    })


}

export const recupererProduitParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_PRODUIT_PAR_ID, req.params.id, (err, rows, fields) => {


        return res.json(rows);

    })




}


export const ajouterProduit = (req, res) => {




    const {
        erreurs,
        estValide
    } = valideProduitInput(req.body);



    if (!estValide) {



        return res.status(400).json(erreurs);

    } else {

        const produit = {}

        for (var key in req.body) {

            if (JSON.parse(JSON.stringify(req.body)).hasOwnProperty(key)) {

                produit[key] = req.body[key]
            }

        }


        produit["date_creation_produit"] = moment().format('YYYY/MM/D hh:mm:ss SSS')

        console.log(produit)
        connexion.query(AJOUTER_PRODUIT, produit, (err, rows, fields) => {


            if (err) {
                return res.value(500).json(err);
            }

            return res.json(rows);
        })


    }




}