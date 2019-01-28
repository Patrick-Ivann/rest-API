import express from 'express'
import {
    recupererTousLesUtilisateur,
    recupererUtilisateurParId,
    recupererUtilisateurParMail,
    ajouterUtilisateur,
    connexionUtilisateur,
    ajouterAvatar
} from '../api/utilisateur';
import {
    verificationEmetteur
} from '../functions/functionSheet';

const router = express.Router();

router.route("/recuperer")
    .get(verificationEmetteur, recupererTousLesUtilisateur);

router.route("/recuperer/:id([0-9]*)")
    .get(recupererUtilisateurParId)

router.route("/recuperer/:mail([a-z0-9]*@[a-z0-9]*)")
    .get(verificationEmetteur, recupererUtilisateurParMail);


router.route("/ajouter")
    .post(verificationEmetteur, ajouterUtilisateur)
    .put(verificationEmetteur, ajouterAvatar)

router.route("/connexion")
    .post(connexionUtilisateur)


export default router