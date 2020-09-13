'use strict'

const firebase = require('firebase-admin');
const serviceAccount = require('../config/platzioverflow-ebf8e-firebase-adminsdk-tsfcq-488bd508c7.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://platzioverflow-ebf8e.firebaseio.com/'
});


//crea una coneccion con la base de datos
const db = firebase.database();

const Users = require('./users');
const Questions = require('./questions');

//importamos sola una instacia de la classe para que no hay duplicados
module.exports = {
    users: new Users(db),
    questions: new Questions(db)

};