'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  fs = require('fs'),
  jwt = require('jsonwebtoken'),
  multer = require('multer'),
  //sharp = require('sharp'),
  News = mongoose.model('News'),
  Member = mongoose.model('Member'),
  Evenement = mongoose.model('Evenement'),
  Defi = mongoose.model('Defi'),
  Message = mongoose.model('Message'),
  Profil = mongoose.model('Profil');
  //Image = mongoose.model('Image');

/*var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  } ,
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalName);
  }
});*/

//var upload = multer({storage: storage}).single('myFile');

  exports.add_news = function(req, res) {
    var new_news = new News(req.body);
    new_news.save(function(err, news) {
      if(err)
        res.send(err);
      res.json(news);
    });
  };

  exports.list_news = function(req, res) {
    News.find({}, function(err, news) {
      if (err)
        res.send(err);
      res.json(news);
    });
  };

  exports.sign_in = function(req, res) {
    Member.findOne({
      pseudo: req.body.pseudo
    }, function(err, user) {
      if(err) throw err;
      if(!user) {
        res.status(401).json({ message: 'Authentification échouée. Utilisateur'+ req.body.pseudo +' non trouvé.'});
      } else if (user) {
        if(user.comparePassword(req.body.password)) {
          res.status(401).json({ message: 'Authentification échouée. Mauvais mot de passe.'});
        } else {
          return res.json({ token: jwt.sign({ pseudo: user.pseudo }, 'RESTFULAPIs'), id: user._id});
        }
      }
    }); 
  };

  exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};


    exports.add_member = (req, res) =>{ 
      var new_members = new Member(req.body);
      new_members.password = bcrypt.hashSync(req.body.password, 10);
      new_members.save(function(err, member) {
        if(err) {
          return res.status(400).send({
            message: err
          });
        } else {
          member.password = undefined;
          return res.json(member);
        }
      });
    };

  exports.get_list_member = function(req, res) {
    Member.find({}, function(err, member) {
      if(err)
        res.send(err);
      res.json(member);
    });
  };

  exports.get_one_news = function(req, res) {
    News.findById(req.params.id, function(err, news) {
      if (err)
        res.send(err);
      res.json(news);
    });
  };

  exports.add_evenement = function(req, res) {
    var news_evenement = new Evenement(req.body);
    news_evenement.save(function(err, evenement) {
      if(err)
        res.send(err);
      res.json(evenement);
    });
  };

  exports.get_evenement = function(req, res) {
    Evenement.find({}, function(err, evenement) {
      if (err)
        res.send(err);
      res.json(evenement);
    });
  };

  exports.add_message = function(req, res) {
    var new_message = new Message(req.body);
    new_message.save(function(err, message) {
      if(err)
        res.send(err);
      res.json(message);
    });
  };

  exports.get_user_message = function(req, res) {
      Message.find({idReceiver: req.params.idReceiver}, function(err, message) {
        if(err)
          res.send(err);
        res.json(message);
      });
  };

  exports.get_one_message = function(req, res) {
      Message.findById({_id: req.params.idMessage}, function(err, message) {
        if(err)
          res.send(err);
        res.json(message);
      });
  };

  exports.get_list_defi = function(req, res) {
    Defi.find({}, function(err, defi) {
      if (err)
        res.send(err);
      res.json(defi);
    });
  };

  exports.add_defi = function(req, res) {
    var new_defi = new Defi(req.body);
    new_defi.save(function(err, defi) {
      if(err)
        res.send(err);
      res.json(defi);
    });
  };

  exports.add_profil = function(req, res) {
    var new_profil = new Profil(req.body);
    new_profil.save(function(err, profil) {
      if(err)
        res.send(err);

      res.json(profil);
    });
  };

  exports.get_profil = function(req, res) {
    Profil.find({"pseudo": req.params.pseudo}, function(err, profil) {
      if(err)
        res.send(err);
      res.json(profil);
    });
  };

  exports.add_image = function(req, res) {
    var image = new Image();
    image.img.data = fs.readFileSync(imgPath);
    img.img.contentType = 'image/png';
    img.save(function (err, a) {
      if (err) 
        throw err;
    });
  };