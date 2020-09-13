'use strict'

const { users } = require("../models/index");
const boom = require('boom');
async function createUser(req, h){
      
   let result 
   try {
       result = await users.create(req.payload)
   } catch (error) {
       console.log(error);
       return h.view('register', {
           title: 'Registro',
           error: 'Error creando el usuario'
       });
   };
     
    return h.view('login', {
        title: 'Registro',
        success: 'Usuario creado exitosamente'
    });
};

function logout(req, h){
    return h.redirect('/login').unstate('user') //sacamos la cookie
}

async function validateUser (req, h){
    let result
    try{
        result = await users.validateUser(req.payload);
    // console.log(result)
        if( result == false ){
           
           return h.view('login', {
                title: 'login',
                error: 'Email y/o contraseña incorrecta'
            })
        }
    }catch(error){
        console.error(error);
       h.view('login', {
        title: 'login',
        error: 'Problemas validando el usuario'
    })
}
    

    return h.redirect('/').state('user', {
        name: result.name,
        email: result.email
    })
    
}


function failValidation(req, h, error){
    const templates = {
        '/create-user':  'register',
        '/validate-user': 'login',
        '/create-user': 'ask'
    }
    return h.view(templates[req.path], {
        title: 'Error de validacion',
        error: 'Porfavor complete loss campos requeridos'
        //un takeover me permite finalizar el ciclo de vida de un rrequest y responder inmediatamente
    }).code(400).takeover()
   
}

module.exports ={
    createUser,
    logout,
    validateUser,
    failValidation
}