import express from 'express';
import {
    recupererToutesLesPhotos,
    recupererPhotoParId,
    ajouterPhoto
} from '../api/photo';

const router = express.Router();


router.route("/recuperer")
    .get(recupererToutesLesPhotos)

router.route("/recuperer/:id([0-9]*)")
    .get(recupererPhotoParId)

router.route("/ajouter")
    .post(ajouterPhoto)




export default router