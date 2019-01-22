import express from 'express'
import {recupererCommentaireParId, recupererTousLesCommentaire} from "../api/commentaire";


const router = express.Router();

router.route("/recuperer/")
    .get(recupererTousLesCommentaire);

router.route("/recuperer/:id([0-9]*)")
    .get(recupererCommentaireParId);


module.exports = router ;