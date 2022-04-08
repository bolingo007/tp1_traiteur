let express = require('express');
let router = express.Router();
let pageBase = require('../controller/pageBaseControl.js');

router.get('/', pageBase.getAcceuilpage);
router.get('/acceuil', pageBase.getAcceuilpageConnexion);
router.get('/', pageBase.getLoginPage);
router.post('/login', pageBase.postLogin);
router.get('/', pageBase.getHomepage);
router.get('/login', pageBase.getLoginPage);
router.get('/index', pageBase.getHomepage);
//
router.get('/index_admin', pageBase.getAdministration);
router.get('/apropos_admin', pageBase.getAproposAdmin);
router.post('/modifieplat', pageBase.postModify);
router.post('/liste_commandes_admin', pageBase.postCommandeAdmin);
router.post('/liste_commandes', pageBase.postCommande);
router.get('/liste_commandes_admin', pageBase.getCommandeAdmin);
router.get('/liste_commandes', pageBase.getCommandeClient);
router.post('/modifiecommande_admin', pageBase.postModifyCommandeAdmin);
router.post('/modifiecommande', pageBase.postModifyCommande);
// me
router.get('/apropos', pageBase.getApropos);
router.get('/saisieplat', pageBase.getSaisieplat);
router.post('/ajout_plat_admin', pageBase.postAjoutPlat); 
//router.post('/saisieplat', pageBase.postConfirmationAjoutPlat); 
router.get('/historique', pageBase.getHistory);
router.post('/historique', pageBase.postHistory);
router.get('/plataffiche', pageBase.getPlataffiche);
router.get('/commande', pageBase.getCommande);
router.post('/ajout_commande', pageBase.postAjoutCommande);

module.exports = router;
