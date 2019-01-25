import express from 'express'
import {
    signalerPhoto,
    supprimerPhotoParSignalement
} from '../api/signaler';
import {
    verificationEmetteur
} from '../functions/functionSheet';

const router = express.Router();




router.route("/ajouter")
    .post(verificationEmetteur, signalerPhoto)

router.route("/supprimer")
    .delete(verificationEmetteur, supprimerPhotoParSignalement)



module.exports = router