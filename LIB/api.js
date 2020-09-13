const authBasic = require('hapi-auth-basic');
const joi = require('@hapi/joi');
const {questions} = require('../models/index');
const {users} = require('../models/index');
const Boom = require('Boom');
module.exports = {
    name: 'api-rest',
    version: '1.0.0',
    async register(server, options){
        const prefix = options.prefix || 'api'

        await server.register(authBasic)
        // registrar un modo de autenticación 
        server.auth.strategy('simple', 'basic', {validate: validateAuth})

        server.route({
            method: 'GET',
            path: `/${prefix}/question/{key}`,
            options: {
                auth: 'simple',
                // validate: {
                //     params: joi.object({
                //         key: joi.string().required()
                //     }),
                //     failAction: failValidation
                // }
                },
            
            handler: async (req, h) => {
                let result 
                try {
                    result = await questions.getOne(req.params.key)
                    if(!result){
                      return   Boom.notFound(`No se pudo encontrar la pregunta  ${req.params.key}`)
                    }
                } catch (error) {
                    Boom.badImplementation(`Hubo un error buscando la pregunta ${req.paramas.key}`)
                }
                return result
            }

        })

        server.route({
            method: 'GET',
            path: `/${prefix}/questions/{cant}`,
            options: {
                auth: 'simple'
                // validate: {
                //     params: joi.object({
                //       amount:  join.number().integer().min(1).max(20)
                //     }), 
                //     failAction: failValidation
                // }
            },
            handler: async (req, h) => {
                let result 
                try {
                  
                    result = await  questions.getLast(Number(req.params.cant))
                    if(!result){
                       return  Boom.notFound(`No se pudo encontrar las preguntas ` )
                    }
                } catch (error) {
                    // Boom.badImplementation(`Hubo un error buscando las preguntas - ${error}`)
                    console.log(error)
                }
                console.log(Number(req.params.cant))
                return result
            }
        })

        function failValidation(req, h, err){
            return Boom.badRequest('Por favor use los parametros correctos')
        }

       async function validateAuth(req, username, passwd, h){
           let user
           try {
               user = await users.validateUser({email: username, password: passwd})
           } catch (error) {
               server.log('error', error)
           }

           return {
               credentials: user || {},
               isValid: (user !== false)
           }
        }
    }
}