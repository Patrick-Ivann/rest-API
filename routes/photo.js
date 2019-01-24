import express from 'express';
import {
    recupererToutesLesPhotos,
    recupererPhotoParId,
    ajouterPhoto,
    televerserPhoto,
    recupererPhotoParIdEvenement
} from '../api/photo';
import {
    verificationEmetteur
} from '../functions/functionSheet';

const router = express.Router();


router.route("/recuperer")
    .get(recupererToutesLesPhotos)

router.route("/recuperer/:id([0-9]*)")
    .get(recupererPhotoParId)

router.route("/recuperer/evenement/:id([0-9]*)")
    .get(recupererPhotoParIdEvenement)

router.route("/ajouter")
    .post(verificationEmetteur, televerserPhoto)




export default router