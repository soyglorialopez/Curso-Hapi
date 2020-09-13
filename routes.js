'use strict'
const site = require('./controller/site');
const user = require('./controller/user');
// joi no permite generar validacion de un esquema especifico
const joi = require('@hapi/joi');
const question = require('./controller/question')

const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
   image: joi.any().optional()
})
module.exports= [
    
     {
        method: 'GET',
        path: '/',
       options: {
           cache: {
               expiresIn: 1000  * 30,
               privacy: 'private'
           }
       },
        handler: site.home
    },

   {
        method: 'GET',
        path: '/registro',
        //h.view retorna una vista
        handler: site.register
   },

    

    {
        //validaremos la request con validate
        method: 'POST',
        path: '/create-user',
        // options: {
        //     validate:{
        //         payload: joi.object({

        //             username: joi.string().required().min(3),
        //             email: joi.string().email().required(),
        //             password: joi.string().required().min(6)
        //         })
            //   failAction: user.failValidation //si la validacion falla
                
    //    } 
            
    //     },
        
        //h.view retorna una vista
        handler: user.createUser
    },
    

    {
        method: 'GET',
        path: '/login',
        //h.view retorna una vista
        handler: site.login
    },
    {
        method: 'GET',
        path: '/question/{id}',
        handler: site.viewQuestion
    },
    {
        method: 'GET',
        path: '/ask',
        //h.view retorna una vista
        handler: site.ask
    },
    {
        method: 'POST',
        path: '/create-question',
        options: {
           
               payload:  schema.validate(),
             
        
        },
        //         //   failAction: user.failValidation, //si la validacion falla
        
            
        handler: (req, h) =>{
        //    let validate = schema.validate(req.payload)
        //     if(validate.error){
        //       let error =  validate.error
        //    return error.massage
           
        //     }
             
        return question.createQuestion(req, h)
        } 
    },
    {
        method: 'POST',
        path: '/answer-question',
        // options: {
            //     validate:{
            //         payload: joi.object({
    
            //             answer: joi.string().required(),
            //             id: joi.string().required(),
            //            
            //         })
                //   failAction: user.failValidation //si la validacion falla
                    
        //    } 
                
        //     },
            
        handler: question.answerQuestion
    },

    {
        method: 'GET',
        path: '/answer/{questionId}/{answerId}',
        handler: question.setAnswerRight
    },

    {
        method: 'GET',
        path: '/logout',
        //h.view retorna una vista
        handler: user.logout
    },

    {
      
        method: 'POST',
        path: '/validate-user',
    //     options: {
    //         validate:{
    //             payload: joi.object({

    //                 email: joi.string().email().required(),
    //                 password: joi.string().required().min(6)
    //             })
                
    // } 
            
        // },
       
        //h.view retorna una vista
        handler: user.validateUser
    },



    {
        method: 'GET',
        path: '/assets/{param*}',
        handler:{
        directory:{
            path: '.',
            index: ['index.html']
        }
        }
    },
    {
        method: ['GET', 'POST'],
        path:'/{any*}',
        handler: site.notFound
    }
]