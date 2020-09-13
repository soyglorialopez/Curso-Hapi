//Al hacer un query sobre los registros almacenados en Firebase, el resultado devuelto es un objeto JSON con los resultados, en los que
//las keys de cada elemento corresponden con los IDs de cada usuario. Aún cuando el resultado devuelto es sólo un registro, la
//estructura es la misma.

//Es importante tener en cuenta que al recuperar los datos desde Firebase, la contraseña viene cifrada, por lo que la validación debe
//hacerse comparando ambos datos con bcrypt.

'use strict'

const bcrypt = require('bcrypt'); // encripta las contraseñas que nos viene en data

//classe quee ns permite crear usuarios en la BD

class User {
    
    constructor(db){ //recibe la Bd ya inicializada
       this.db = db
       this.ref = this.db.ref('/') //vamos a refernciar donde va a trabajar esste mdelo
        this.collection = this.ref.child('users')
    };

    //creamos un metodo que guarda a los usuarios 

    async create (data) {
        //Destructuramos el objeto con el payload enviado. Ya  que Hapi lo decora con un 
       // prototipo null que no es compatible con firebase
        const User = {
            ...data
        };
                //encriptamos el password
        User.password = await this.constructor.encrypt(User.password)
        const newUser = this.collection.push(User)
        // User.set(data)

        return newUser.key //devolvemos la referencia del nuevo objeto creado
    };

    

    async validateUser (data) {
        //hacemos una consulta y ordenamos todos los hijos de la coleccion por email y lo que es igual al ]
        //data.email que nos devuelva un valor
        const  userQuery = await 
        this.collection.orderByChild('email').equalTo(data.email).once('value')   
        const userFound = userQuery.val() //lo transforma en un string
        
         
        if(userFound){ // verificamos si es un usuario
            const userId = Object.keys(userFound)[0] // extraemos el id del primer elemento del array que se produjo por la busqueda
            const passwordRight = await bcrypt.compare(data.password , userFound[userId].password);
            console.log(passwordRight)
            if(passwordRight){

           return userFound[userId]
        } else{
                return false
            }  

        }

        return false


    }

     static async encrypt(password){
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
     return hashedPassword
    }


}

module.exports = User