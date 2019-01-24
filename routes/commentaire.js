import express from 'express'
import {
    recupererCommentaireParId,
    recupererTousLesCommentaire,
    recupererCommentaireParIdPhoto,
    ajouterCommentaire
} from "../api/commentaire";


const router = express.Router();

router.route("/recuperer/")
    .get(recupererTousLesCommentaire);

router.route("/recuperer/:id([0-9]*)")
    .get(recupererCommentaireParId);

router.route("/recuperer/photo/:id([0-9]*)")
    .get(recupererCommentaireParIdPhoto)




router.route("/ajouter")
    .post(ajouterCommentaire)
module.exports = router;