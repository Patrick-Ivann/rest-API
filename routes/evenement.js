import express from 'express'
import { recupererTousLesEvenement, recupererEvenementParId } from '../api/evenement';

const router = express.Router();


router.route("/recuperer")
.get(recupererTousLesEvenement)

router.route("/recuperer/:id([0-9]*)")
    .get(recupererEvenementParId)


router.route("/recuperer/:lieu([aA-zZ]*)")
    .get(recupererEvenementParId)


export default router