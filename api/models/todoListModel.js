'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var NewsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  urlImage: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }

});

var MemberSchema = new Schema({
  pseudo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

MemberSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var MessageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: 'Contenu nécessaire'
  },
  date: {
    type: Date,
    default: Date.now
  },
  idReceiver: {
    type: String,
    required: 'Id du receveur nécessaire'
  },
  idSender: {
    type: String,
    required: 'Id de l\'expéditeur nécessaire'
  },
  pseudoSender: {
    type: String,
    required: true
  }
});


var EvenementSchema = new Schema({
  title: {
    type: String,
    required: 'No idea'
  },
  content: {
    type: String,
    required: 'Contenu nécessaire'
  },
  dateDebut: {
    type: Date,
    default: Date.now
  }
});

var DefiSchema = new Schema({
  name: {
    type: String,
    required: 'No idea'
  },
  description: {
    type: String,
    required: 'Contenu nécessaire'
  },
  nbPoint: {
    type: Number,
    required: true
  }
});

var ProfilSchema = new Schema({
  pseudo: {
    type: String,
    required: true
  },
  urlProfil: {
    type: String,
    default: ''
  },
  prenom: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  surnom: {
    type: String,
  },
  sexe: {
    type: Boolean,
    required: true
  }
});

var Image = new Schema({
  img: { data: Buffer, contentType: String}
});

module.exports = mongoose.model('News', NewsSchema);
module.exports = mongoose.model('Member', MemberSchema);
module.exports = mongoose.model('Evenement', EvenementSchema);
module.exports = mongoose.model('Message', MessageSchema);
module.exports = mongoose.model('Defi', DefiSchema);
module.exports = mongoose.model('Profil', ProfilSchema);
//module.exports = mongoose.model('Image', ImageSchema);