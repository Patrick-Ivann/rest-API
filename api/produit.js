import mysql from 'mysql'
import { RECUPERE_TOUS_LES_PRODUITS } from "./requetesSql";

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