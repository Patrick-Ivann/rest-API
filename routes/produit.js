import express from 'express';

import {
    recupererTousLesProduits,
    recupererProduitParId,
    ajouterProduit
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
    .post(verificationEmetteur, ajouterProduit)





export default router