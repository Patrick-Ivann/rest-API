import express from 'express';
import {
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

module.exports = router;