import express from 'express';
import {
    recupererEvenementParticipe,
    recupererToutesParticipation,
    recupererUilisateurParticipant,
    ajouterParticiper
} from "../api/participer";
import {
    PARTICIPER_EVENEMENT
} from '../api/requetesSql';

const router = express.Router();

router.route("/recuperer/")
    .get(recupererToutesParticipation);

router.route("/recuperer/event/:id([0-9]*)")
    .get(recupererEvenementParticipe);

router.route("/recuperer/utilisateur/:id([0-9]*)")
    .get(recupererUilisateurParticipant);

router.route("/ajouter")
    .post(ajouterParticiper)


module.exports = router;