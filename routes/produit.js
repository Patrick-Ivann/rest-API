import express from 'express';

import {
    recupererTousLesProduits,
    recupererProduitParId,
    televerserProduit,
    supprimerProduitParId
} from "../api/produit";
import {
    verificationEmetteur
} from '../functions/functionSheet';

const router = express.Router();


router.route("/recuperer")
    .get(recupererTousLesProduits)

router.route("/recuperer/:id([0-9]*)")
    .get(recupererProduitParId)


router.route("/ajouter")
    .post(verificationEmetteur, televerserProduit)


router.route("/supprimer/:id([0-9]*)")
    .delete(supprimerProduitParId)


export default router