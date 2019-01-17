import mysql from 'mysql'
import { RECUPERE_TOUTES_LES_PHOTOS, RECUPERE_PHOTO_PAR_ID } from "./requetesSql";

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: "projet_web"
});

export const recupererToutesLesPhotos = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_TOUTES_LES_PHOTOS, (err, rows, fields) => {


        return res.json(rows);

    })


}

export const recupererPhotoParId = (req, res) => {

    const erreur = {}

    connexion.query(RECUPERE_PHOTO_PAR_ID, req.params.id, (err, rows, fields) => {


        return res.json(rows);

    })


}