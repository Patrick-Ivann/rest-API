import express from 'express';
import {
    recupererEvenementParticipe,
    recupererToutesParticipation,
    recupererUilisateurParticipant
} from "../api/participer";

const router = express.Router();

router.route("/recuperer/")
    .get(recupererToutesParticipation);

router.route("/recuperer/event/:id([0-9]*)")
    .get(recupererEvenementParticipe);

router.route("/recuperer/utilisateur/:id([0-9]*)")
    .get(recupererUilisateurParticipant);

module.exports = router;