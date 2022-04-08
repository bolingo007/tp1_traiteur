let db = require('../model/db.js');
let passport = require('passport');
let Plat = require('../model/Plat.js');
let CommandeT = require('../model/Commande.js');
let User = require('../model/User.js');

exports.getAcceuilpage = ( req,res,next) => {
  res.render("acceuil", {
      title: 'Administrateur ou client?', message: 'La meilleure bouffe!'
  });
} 

exports.getAcceuilpageConnexion = ( req,res,next) => {
  res.render("acceuil", {
      title: 'Administrateur ou client?', message: 'La meilleure bouffe!'
  });
} 

exports.getAdministration = ( req,res,next) => {
  res.render("index_admin", {
      title: 'Administration du Traiteur?', message: 'Le côté obscur de la bouffe!', username: process.env.username
  });
} 

exports.getHomepage = ( req,res,next) => {
  res.render("index", {
      title: 'Traiteur', message: 'La meilleure bouffe!', username: process.env.username ////me
      , panier:process.env.panier
  });
} 

exports.getLoginPage = ( req, res , next) => {
  process.env.section = req.query.section;

  res.render('login',  {
      title: 'Connexion Traiteur', message: 'Connexion au site!', section: req.query.section
      }
   );
};

exports.postLogin = (req, res, next) => {

  passport.authenticate('local', async function(err, user, info) {
      process.env.user_id = user.user_id;
      process.env.username = user.username;
      process.env.type_compte = user.type_compte;

      console.log(process.env.section);
      const CommandeCount = await CommandeT.findAndCountAll({
        where: {user_id: process.env.user_id, dans_panier:1}
      });
    
      process.env.panier = CommandeCount.count;
      console.log("nombre: "+CommandeCount.count);

      if (err) { return next(err); }
      if (!user) {
       return res.json({status: 'error', message: info.message});
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        
        if(process.env.section === "admin") {
          return res.render("index_admin", {
                title: 'Traiteur', message: 'Bienvenu chez votre traiteur!', username: process.env.username
              });
        } else if (process.env.section === "client") {
          return res.render("index", {
                title: 'Traiteur', message: 'Bienvenu chez votre traiteur!', username: process.env.username
                , panier: process.env.panier
              });
        } 

      });
  })(req, res, next);
};

////me
exports.getApropos =  (req, res, next) => {
  res.render('apropos',  {
     title: 'À propos de ce Traiteur', message: 'À propos', panier: process.env.panier,username: process.env.username
     }
  );
};

exports.getAproposAdmin =  (req, res, next) => {
  res.render('apropos_admin',  {
     title: 'À propos de ce Traiteur', message: 'À propos', username: process.env.username
     }
  );
};

exports.getSaisieplat =  (req, res, next) => {
  res.render('saisieplat',  {
     title: 'Veuillez saisir les plats SVP', message: 'Effectuer une saisie',username: process.env.username
     }
  );
};

/* exports.postAjoutPlat = (req, res, next) => {
let customTimeout = 10000;
    (async () => {
    Plat.create({nom : req.body.nom, description : req.body.description, options : req.body.options, prix : req.body.prix, 
        actif : req.body.actif, image : req.body.image});
    })();

 res.setTimeout(customTimeout, function(){
    console.log("TIMED!");
    res.render('ajout_plat', { nom : req.body.nom, description : req.body.description, options : req.body.options, prix : req.body.prix, 
        actif : req.body.actif, image : req.body.image} ); 
  });

   res.render('saisieplat',  {
    title: 'Veuillez saisir les plats SVP', message: 'Effectuer une saisie'
    }
  );  
    
}; */

exports.postAjoutPlat = (req, res, next) => {
  console.log("req.body");
  console.log(req.body);

  res.render('ajout_plat_admin', { message: "Ajoutd'un plat", nom : req.body.nom, description : req.body.description, options : req.body.options, prix : req.body.prix, 
        actif : req.body.actif, image : req.body.image, username: process.env.username} );
};

/* exports.postAjoutPlat = (req, res, next) => {
  let customTimeout = 10000;

  Plat.create({nom : req.body.nom, description : req.body.description, options : req.body.options, prix : req.body.prix, 
      actif : req.body.actif, image : req.body.image
  }).then(async() => {

    //return res.redirect('/historique');
    
     res.setTimeout(customTimeout, function(){
      console.log("TIMED!");
      res.render('ajout_plat', { nom : req.body.nom, description : req.body.description, options : req.body.options, prix : req.body.prix, 
          actif : req.body.actif, image : req.body.image, username: process.env.username} ); 
    }); 
  
     res.render('saisieplat',  {
      title: 'Veuillez saisir les plats SVP', message: 'Effectuer une saisie', username: process.env.username
      }
    );  
  }).catch(err => console.log('error: ' + err)); 

}; */

/* exports.postConfirmationAjoutPlat = (req, res, next) => {

  Plat.create({nom : req.body.nom, description : req.body.description, options : req.body.options, prix : req.body.prix, 
      actif : req.body.actif, image : req.body.image
  }).then(async() => {
    return res.redirect('/historique');
  }).catch(err => console.log('error: ' + err)); 

}; */

exports.getHistory = async (req, res, next) => {
  const Assiettes = await Plat.findAll();
  
  res.render('historique', {
      Plates: Assiettes, username: process.env.username
    });
}; 

exports.postModify = async (req, res, next) => {
  let modif_supprime = "";
  let modif_supprime_valeur;

  if(req.body.idParam){
    modif_supprime = req.body.idParam.substring(0,1);
    modif_supprime_valeur = parseInt(req.body.idParam.substring(1,req.body.idParam.length));
  }

  if(req.body.idParamModif){
    modif_supprime = req.body.idParamModif.substring(0,1);
    modif_supprime_valeur = parseInt(req.body.idParamModif.substring(1,req.body.idParamModif.length));
  }

  if(req.body.idModifOK){
    modif_supprime = req.body.idModifOK;
  }

  if(modif_supprime === 'S'){ /* pour gérer les suppressions*/
    const Assiettes = await Plat.findOne({
      where: {plat_id: modif_supprime_valeur}
    });
    
    res.render('modifieplat', {
      Plates: Assiettes, visibilite: "S", message: "Confirmer la suppression du plat", message2: "Veuillez suivre les instructions"
      , username: process.env.username
    });
  }

  if(modif_supprime === 'M'){ /* pour gérer les modifications*/
    const Assiettes = await Plat.findOne({
      where: {plat_id: modif_supprime_valeur}
    });
  
    process.env.modif_image = Assiettes.image;

    res.render('modifieplat', {
      Plates: Assiettes, visibilite: "M", message: "Modification du plat", message2: "Veuillez suivre les instructions de modification"
      , username: process.env.username
    });
  }

};

exports.postCommandeAdmin = async (req, res, next) => {
  let modif_supprime = "";
  let existCommand = 0;

  if(req.body.bsupp){
    modif_supprime = req.body.bsupp;
  }

  if(req.body.bmodif){
    modif_supprime = req.body.bmodif;
  }

  if(req.body.bannule){
    modif_supprime = req.body.bannule;
  }

  if(modif_supprime === 'Supprimer ce plat'){ /* pour gérer les suppressions*/
    await CommandeT.destroy({
      where: {id: req.body.commande_id}
    });

    const Commandes = await CommandeT.findAll({
      where: {dans_panier: 1},
      include: [ 
        {
          model: User,
          attributes:['firstname', 'lastname']
      },
      {
          model: Plat,
          attributes:['nom','description', 'image'],
      }]
    });

    //pour afficher les commandes lorsque elles existent
    if(Commandes.length > 0) {
      existCommand = 1;
    }
      
    res.render('liste_commandes_admin', {
        Plates: Commandes, existCommand: existCommand, username: process.env.username
    });
  }

  if(modif_supprime === 'Annuler'){ /* pour gérer les annulations*/
    const Commandes = await CommandeT.findAll({
      where: {dans_panier: 1},
      include: [ 
        {
          model: User,
          attributes:['firstname', 'lastname']
      },
      {
          model: Plat,
          attributes:['nom','description', 'image'],
      }]
    });
  
    res.render('liste_commandes_admin', {
      Plates: Commandes, existCommand: 1, username: process.env.username
    });
  }

  if(modif_supprime === 'Modifier ce plat'){ /* pour gérer les modifications*/

    CommandeT.update(
      { portion : req.body.portion, options : req.body.options, prix : req.body.prix, quantite : req.body.quantite},
      { where: {id: req.body.commande_id} }
    ).then(async() => {
      const Commandes = await CommandeT.findAll({
        where: {dans_panier: 1},
        include: [ 
          {
            model: User,
            attributes:['firstname', 'lastname']
        },
        {
            model: Plat,
            attributes:['nom','description', 'image'],
        }]
      });

      //pour afficher les commandes lorsque elles existent
      if(Commandes.length > 0) {
        existCommand = 1;
      }

      res.render('liste_commandes_admin', {
        Plates: Commandes, existCommand: existCommand, username: process.env.username
      });
    }).catch(err => console.log('error: ' + err)); 

  }

};

exports.postHistory = async (req, res, next) => {
    let modif_supprime = "";

    if(req.body.bsupp){
      modif_supprime = req.body.bsupp;
    }

    if(req.body.bmodif){
      modif_supprime = req.body.bmodif;
    }

    if(req.body.bannule){
      modif_supprime = req.body.bannule;
    }

    if(modif_supprime === 'Supprimer ce plat'){ /* pour gérer les suppressions*/
      await Plat.destroy({
          where: {plat_id: req.body.plat_id}
      });

      const Assiettes = await Plat.findAll();
      res.render('historique', {
        Plates: Assiettes, username: process.env.username
      });
    }

    if(modif_supprime === "Confirmer ce plat"){ /* pour confirmer l'ajout d'un plat*/
      console.log("req.bodyconf");
      console.log(req.body);

      await Plat.create({nom : req.body.nom, description : req.body.description, options : req.body.options, prix : req.body.prix, 
        actif : req.body.actif, image : req.body.image
      }).then(async() => {
        const AssiettesM = await Plat.findAll();
        res.render('historique', {
          Plates: AssiettesM, username: process.env.username
        });
      }).catch(err => console.log('error: ' + err)); 
    }

    if(modif_supprime === 'Annuler'){ /* pour gérer les annulations*/
      const Assiettes = await Plat.findAll();
    
      res.render('historique', {
        Plates: Assiettes, username: process.env.username
      });
    }

    if(modif_supprime === 'Modifier ce plat'){ /* modifications effectives*/

      if(req.body.image){
        process.env.modif_image = req.body.image;
      }
        Plat.update(
        { nom : req.body.nom, description : req.body.description, options : req.body.options, prix : req.body.prix, 
          actif : req.body.actif, image : process.env.modif_image},
        { where: {plat_id: req.body.plat_id} }
      ).then(async() => {
        console.log(Plat);
        const AssiettesM = await Plat.findAll();
        res.render('historique', {
          Plates: AssiettesM, username: process.env.username
        });
      }).catch(err => console.log('error: ' + err)); 
    }

}; 

exports.getPlataffiche = async (req, res, next) => {
  const Assiettes = await Plat.findAll({
    where: {actif: 1}
  });
  
  res.render('plataffiche', {
      Plates: Assiettes, title: 'Veuillez Commander, SVP', message: 'Commande de plats actifs',
      username: process.env.username, panier: process.env.panier
    });
}; 

exports.getCommande = async (req, res, next) => {
  const Assiettes = await Plat.findOne({
      where: {plat_id: req.query.plat_id}
    });

  res.render('commande', {
      Plates: Assiettes, username: process.env.username, panier: process.env.panier
    });
}; 

exports.getCommandeAdmin = async (req, res, next) => {
  const Commandes = await CommandeT.findAll({
      where: {dans_panier: 1},
      include: [ 
        {
          model: User,
          attributes:['firstname', 'lastname']
       },
       {
          model: Plat,
          attributes:['nom','description', 'image'],
      }]
    });
  //pour afficher les commandes lorsque elles existent
  let existCommand = 0;
  
  if(Commandes.length > 0) {
    existCommand = 1;
  }
 
  res.render('liste_commandes_admin', {
    Plates: Commandes, existCommand: existCommand, username: process.env.username
    });
}; 

exports.postAjoutCommande = async (req, res, next) => {

  CommandeT.create({user_id : process.env.user_id, plat_id : req.body.plat_id, portion: req.body.portion, options : req.body.options, prix : req.body.prix, 
    quantite : req.body.quantite, dans_panier : req.body.dans_panier}
  ).then(async() => {
    const CommandeCount = await CommandeT.findAndCountAll({
      where: {user_id: process.env.user_id, dans_panier:1}
    }); 
    
    process.env.panier = CommandeCount.count;

    res.render('ajout_commande', { nom : req.body.nom, user_id : process.env.user_id, plat_id : req.body.plat_id, portion: req.body.portion, options : req.body.options, prix : req.body.prix, 
        quantite : req.body.quantite, dans_panier : req.body.dans_panier, image : req.body.image,
        username: process.env.username, panier:process.env.panier
      } );
  }).catch(err => console.log('error: ' + err)); 

};

exports.getCommandeClient = async (req, res, next) => {
  let existCommand = 0;

  const Commandes = await CommandeT.findAll({
    where: {user_id: process.env.user_id, dans_panier: 1},
    attributes : [
      'id','portion','options','prix','quantite','dans_panier',	
      [db.sequelize.fn('date_format', db.sequelize.col('commande.createdAt'), '%Y-%m-%d %H:%m:%S'), 'createdAt']],
    order: [[ db.Sequelize.col('commande.createdAt'), 'DESC'] ],
    include: {
      model: Plat,
      attributes:['nom','description', 'image'],
    }
  });

  const CommandesAggregat = await CommandeT.findAll({
    where: {user_id: process.env.user_id, dans_panier: 1},
    attributes: [[db.sequelize.fn('sum', db.sequelize.literal('prix * quantite')), 'montantFacture']],
    group : ['user_id']
  });

  const Total = CommandesAggregat.map((item) => {
    return item.dataValues.montantFacture.toFixed(2);
  });
  //pour afficher les commandes lorsque elles existent
  
  if(Commandes.length > 0) {
    existCommand = 1;
  }

  res.render('liste_commandes', {
    Plates: Commandes, username: process.env.username, panier:process.env.panier, Total: Total, existCommand: existCommand
  });
};

exports.postModifyCommandeAdmin = async (req, res, next) => {
  let modif_supprime = "";
  let modif_supprime_valeur;

  if(req.body.idParam){
    modif_supprime = req.body.idParam.substring(0,1);
    modif_supprime_valeur = parseInt(req.body.idParam.substring(1,req.body.idParam.length));
  }

  if(req.body.idParamModif){
    modif_supprime = req.body.idParamModif.substring(0,1);
    modif_supprime_valeur = parseInt(req.body.idParamModif.substring(1,req.body.idParamModif.length));
  }

  /* if(req.body.idParamValid){
    modif_supprime = req.body.idParamValid.substring(0,1);
    modif_supprime_valeur = parseInt(req.body.idParamValid.substring(1,req.body.idParamValid.length));
  } */
///--
  if(req.body.idParamValid){
    let existCommand = 0;
    let Validation = [];

    if(isNaN(req.body.idParamValid[1])){
      Validation = req.body.idParamValid;
    } else{
      Validation.push(req.body.idParamValid);
    }

    Validation.map((item, index) => {
      modif_supprime = item.substring(0,1);
      modif_supprime_valeur = parseInt(item.substring(1,item.length));

      if(modif_supprime === 'V'){ /* pour retirer les commandes du panier*/  	
        CommandeT.update(
          { dans_panier : 0, updatedAt : db.sequelize.literal('CURRENT_TIMESTAMP')},
          { where: {id: modif_supprime_valeur} }
        ).then(async() => {
          if(index + 1 === Validation.length){
            const Commandes = await CommandeT.findAll({
              where: {dans_panier: 1},
              include: [ 
              {
                  model: User,
                  attributes:['firstname', 'lastname']
              },
              {
                  model: Plat,
                  attributes:['nom','description', 'image'],
              }]
            });

            //pour afficher les commandes lorsque elles existent
            if(Commandes.length > 0) {
              existCommand = 1;
            }

            res.render('liste_commandes_admin', {
              Plates: Commandes, existCommand: existCommand, username: process.env.username
            });
        }
        }).catch(err => console.log('error: ' + err)); 
    //---
      }
    });
  }
  /* if(req.body.idModifOK){
    modif_supprime = req.body.idModifOK;
  } */

  if(modif_supprime === 'S'){ /* pour gérer les suppressions*/
    const Commandes = await CommandeT.findOne({
      where: {id: modif_supprime_valeur},
      include: {
        model: Plat,
        attributes:['nom','description', 'image'],
      }
    });
    
    res.render('modifiecommande_admin', {
      Plates: Commandes, visibilite: "S", message: "Confirmer la suppression de la commande", message2: "Veuillez suivre les instructions"
      , username: process.env.username
    });
  }

  if(modif_supprime === 'M'){ /* pour gérer les modifications*/
    const Commandes = await CommandeT.findOne({
      where: {id: modif_supprime_valeur},
      include: {
        model: Plat,
        attributes:['nom','description', 'image'],
      }
    });

    res.render('modifiecommande_admin', {
      Plates: Commandes, visibilite: "M", message: "Modification de la commande", message2: "Veuillez suivre les instructions de modification"
      , username: process.env.username
    });
  }
 
};

exports.postModifyCommande = async (req, res, next) => {
  let modif_supprime = "";
  let modif_supprime_valeur;

  if(req.body.idParam){
    modif_supprime = req.body.idParam.substring(0,1);
    modif_supprime_valeur = parseInt(req.body.idParam.substring(1,req.body.idParam.length));
  }

  if(req.body.idParamModif){
    modif_supprime = req.body.idParamModif.substring(0,1);
    modif_supprime_valeur = parseInt(req.body.idParamModif.substring(1,req.body.idParamModif.length));
  }

  if(req.body.idParamValid){
    let existCommand = 0;
    let Validation = [];

    if(isNaN(req.body.idParamValid[1])){
      Validation = req.body.idParamValid;
    } else{
      Validation.push(req.body.idParamValid);
    }

    Validation.map((item, index) => {
      modif_supprime = item.substring(0,1);
      modif_supprime_valeur = parseInt(item.substring(1,item.length));

      if(modif_supprime === 'V'){ /* pour retirer les commandes du panier*/  	
        CommandeT.update(
          { dans_panier : 0, updatedAt : db.sequelize.literal('CURRENT_TIMESTAMP')},
          { where: {id: modif_supprime_valeur} }
        ).then(async() => {
          if(index + 1 === Validation.length){
            const Commandes = await CommandeT.findAll({
              where: {dans_panier: 1},
              attributes : [
                'id','portion','options','prix','quantite','dans_panier',	
                [db.sequelize.fn('date_format', db.sequelize.col('commande.createdAt'), '%Y-%m-%d %H:%m:%S'), 'createdAt']],
              order: [[ db.Sequelize.col('commande.createdAt'), 'DESC'] ],
              include: [ 
              {
                  model: User,
                  attributes:['firstname', 'lastname']
              },
              {
                  model: Plat,
                  attributes:['nom','description', 'image'],
              }]
            });

            //pour afficher les commandes lorsque elles existent
            if(Commandes.length > 0) {
              existCommand = 1;
            }

            const CommandesAggregat = await CommandeT.findAll({
              where: {user_id: process.env.user_id, dans_panier: 1},
              attributes: [[db.sequelize.fn('sum', db.sequelize.literal('prix * quantite')), 'montantFacture']],
              group : ['user_id']
            });
          
            const Total = CommandesAggregat.map((item) => {
              return item.dataValues.montantFacture.toFixed(2);
            });

            res.render('liste_commandes', {
              Plates: Commandes, existCommand: existCommand, username: process.env.username, panier:process.env.panier, Total: Total
            });
        }
        }).catch(err => console.log('error: ' + err)); 
    //---
      }
    });
  }

  if(modif_supprime === 'S'){ /* pour gérer les suppressions*/
    const Commandes = await CommandeT.findOne({
      where: {id: modif_supprime_valeur},
      include: {
        model: Plat,
        attributes:['nom','description', 'image'],
      }
    });
    
    res.render('modifiecommande', {
      Plates: Commandes, visibilite: "S", message: "Confirmer la suppression de la commande", message2: "Veuillez suivre les instructions",
      username: process.env.username, panier:process.env.panier
    });
  }

  if(modif_supprime === 'M'){ /* pour gérer les modifications*/
    const Commandes = await CommandeT.findOne({
      where: {id: modif_supprime_valeur},
      include: {
        model: Plat,
        attributes:['nom','description', 'image'],
      }
    });

    res.render('modifiecommande', {
      Plates: Commandes, visibilite: "M", message: "Modification de la commande", message2: "Veuillez suivre les instructions de modification",
      username: process.env.username, panier:process.env.panier
    });
  }
 
};

exports.postCommande = async (req, res, next) => {
  let modif_supprime = "";
  let existCommand = 0;

  if(req.body.bsupp){
    modif_supprime = req.body.bsupp;
  }

  if(req.body.bmodif){
    modif_supprime = req.body.bmodif;
  }

  if(req.body.bannule){
    modif_supprime = req.body.bannule;
  }

  if(modif_supprime === 'Supprimer ce plat'){ /* pour gérer les suppressions*/
    await CommandeT.destroy({
      where: {id: req.body.commande_id}
    });

    const Commandes = await CommandeT.findAll({
      where: {dans_panier: 1},
      attributes : [
        'id','portion','options','prix','quantite','dans_panier',	
        [db.sequelize.fn('date_format', db.sequelize.col('commande.createdAt'), '%Y-%m-%d %H:%m:%S'), 'createdAt']],
      order: [[ db.Sequelize.col('commande.createdAt'), 'DESC'] ],
      include: [ 
        {
          model: User,
          attributes:['firstname', 'lastname']
      },
      {
          model: Plat,
          attributes:['nom','description', 'image'],
      }]
    });
   
    //pour afficher les commandes lorsque elles existent
    if(Commandes.length > 0) {
      existCommand = 1;
    }

    const CommandesAggregat = await CommandeT.findAll({
      where: {user_id: process.env.user_id, dans_panier: 1},
      attributes: [[db.sequelize.fn('sum', db.sequelize.literal('prix * quantite')), 'montantFacture']],
      group : ['user_id']
    });
  
    const Total = CommandesAggregat.map((item) => {
      return item.dataValues.montantFacture.toFixed(2);
    });
      
    res.render('liste_commandes', {
        Plates: Commandes, existCommand: existCommand, username: process.env.username, panier:process.env.panier, Total: Total
    });
  }

  if(modif_supprime === 'Annuler'){ /* pour gérer les annulations*/
    const Commandes = await CommandeT.findAll({
      where: {dans_panier: 1},
      attributes : [
        'id','portion','options','prix','quantite','dans_panier',	
        [db.sequelize.fn('date_format', db.sequelize.col('commande.createdAt'), '%Y-%m-%d %H:%m:%S'), 'createdAt']],
      order: [[ db.Sequelize.col('commande.createdAt'), 'DESC'] ],
      include: [ 
        {
          model: User,
          attributes:['firstname', 'lastname']
      },
      {
          model: Plat,
          attributes:['nom','description', 'image'],
      }]
    });
  
    const CommandesAggregat = await CommandeT.findAll({
      where: {user_id: process.env.user_id, dans_panier: 1},
      attributes: [[db.sequelize.fn('sum', db.sequelize.literal('prix * quantite')), 'montantFacture']],
      group : ['user_id']
    });
  
    const Total = CommandesAggregat.map((item) => {
      return item.dataValues.montantFacture.toFixed(2);
    });

    res.render('liste_commandes', {
      Plates: Commandes, existCommand: 1, username: process.env.username, panier:process.env.panier, Total: Total
    });
  }

  if(modif_supprime === 'Modifier ce plat'){ /* pour gérer les modifications*/

    CommandeT.update(
      { portion : req.body.portion, options : req.body.options, prix : req.body.prix, quantite : req.body.quantite},
      { where: {id: req.body.commande_id} }
    ).then(async() => {
      const Commandes = await CommandeT.findAll({
        where: {dans_panier: 1},
        attributes : [
          'id','portion','options','prix','quantite','dans_panier',	
          [db.sequelize.fn('date_format', db.sequelize.col('commande.createdAt'), '%Y-%m-%d %H:%m:%S'), 'createdAt']],
        order: [[ db.Sequelize.col('commande.createdAt'), 'DESC'] ],
        include: [ 
          {
            model: User,
            attributes:['firstname', 'lastname']
        },
        {
            model: Plat,
            attributes:['nom','description', 'image'],
        }]
      });

      //pour afficher les commandes lorsque elles existent
      if(Commandes.length > 0) {
        existCommand = 1;
      }

      const CommandesAggregat = await CommandeT.findAll({
        where: {user_id: process.env.user_id, dans_panier: 1},
        attributes: [[db.sequelize.fn('sum', db.sequelize.literal('prix * quantite')), 'montantFacture']],
        group : ['user_id']
      });
    
      const Total = CommandesAggregat.map((item) => {
        return item.dataValues.montantFacture.toFixed(2);
      });

      res.render('liste_commandes', {
        Plates: Commandes, existCommand: existCommand, username: process.env.username, panier:process.env.panier, Total:Total
      });
    }).catch(err => console.log('error: ' + err)); 

  }

};