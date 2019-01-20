import express from 'express';
import {
    publierUnLikeSurEventIdee,
    recupererEventIdeeAime,
    recupererToutesLesEventAimee,
    recupererUtilisateurAimeIdeeEvent
} from "../api/aime_idee";

const router = express.Router();

router.route("/recuperer")
    .get(recupererToutesLesEventAimee);

router.route("/recuperer/utilisateur/:id([0-9]*)")
    .get(recupererUtilisateurAimeIdeeEvent);

router.route("/recuperer/event/:id([0-9]*)")
    .get(recupererEventIdeeAime);

router.route("/ajouter/")
    .post(publierUnLikeSurEventIdee);

module.exports = router;