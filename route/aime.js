import express from 'express';
import {recupererToutesLesJaime, recupererPhotoAimee, recupererUtilisateurAimant} from "../api/aime";

const router = express.Router();

router.route("/recuperer/")
    .get(recupererToutesLesJaime);

router.route("/recuperer/utilisateur/:id([0-9]*)")
    .get(recupererUtilisateurAimant);

router.route("/recuperer/photo/:id([0-9]*)")
    .get(recupererPhotoAimee);

router.route("/ajouter/")
module.exports = router;