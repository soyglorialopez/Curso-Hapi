'use strict'

const firebase = require('firebase-admin');
const serviceAccount = require('../config/*archivo.json*'); //aqui ira el nombre del archivo json que se descargo una vez creado la llave en firebase

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: '*url*' //aqui ira la url de tu BD, esta en tu cuenta de firebase > RealTime DataBase > Data
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
