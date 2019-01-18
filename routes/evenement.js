import express from 'express'
import { recupererTousLesEvenement, recupererEvenementParId, ajouterEvenement } from '../api/evenement';

const router = express.Router();


router.route("/recuperer")
.get(recupererTousLesEvenement)

router.route("/recuperer/:id([0-9]*)")
    .get(recupererEvenementParId)


router.route("/recuperer/:lieu([aA-zZ]*)")
    .get(recupererEvenementParId)


router.route("/ajouter")
    .post(ajouterEvenement)



export default router