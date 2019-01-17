import express from 'express'
import {
    recupererTousLesUtilisateur, recupererUtilisateurParId, recupererUtilisateurParMail
} from '../api/utilisateur';



const router = express.Router();


router.route("/recuperer")
    .get(recupererTousLesUtilisateur)

router.route("/recuperer/:id([0-9]*)")
.get(recupererUtilisateurParId)

//[a-z0-9]*@viacesi.fr
//
router.route("/recuperer/:mail([a-z0-9]*@[a-z0-9]*)")
    .get(recupererUtilisateurParMail)


export default router