'use strict'
const Hapi = require('@hapi/hapi');
const crumb = require('crumb');
const blankie = require('blankie');
const scooter = require('@hapi/scooter');
//utilizamos el plugin; motor de plantillas  y en este caso es handle
const handlebars = require('./LIB/helpers');
const vision = require('vision');
//El plugin Inert extiende los métodos disponibles en el objeto h,
const inert = require('inert'); 
//Path nos permite definir una ubicación relativa para todos los routes de nuestro proyecto, entre otras cosas.
const good = require('good')
const path = require('path');
const routes = require('./routes');
const site = require('./controller/site');
const methods = require('./LIB/methods');
const hapiDevErrors = require('hapi-dev-errors')

const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
        files:{
            relativeTo: path.join(__dirname, 'public')
        }
    }
});

async function init () {
    
    try{
        //REGISTRA LOS PLUGISN QUE HAPI VA A NECESITAR
        await server.register(inert);
        await server.register(vision);
        await server.register({
            plugin: good,
            options: {
                //propiedad para definir los transportes de login
                reporters: {
                    console: [
                        {
                            module: 'good-console' //modulo que va  a usar
                        },
                         'stdout'
                    ]
                }
            }
        })

        await server.register({
            plugin: crumb,
            options: {
                cookieOptions: {
                    isSecure : process.env.NODE_ENV === 'prod'
                }
            }
        })
            //registramos dos plugins
        await server.register([scooter, {
            plugin: blankie,
            options: {
              defaultSrc: `'self' 'unsafe-inline'`,
              styleSrc: `'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com`,
              fontSrc: `'self' 'unsafe-inline' data:`,
              scriptSrc: `'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://maxcdn.bootstrapcdn.com/ https://code.jquery.com/`,
              generateNonces: false
            }
          }])

          //contrala errores del codigo
          await server.register({
              plugin: hapiDevErrors,
              options: {
                  showErrors: process.env.NODE_ENV !== 'prod'
              }
          })

        await server.register({
            plugin: require('./lib/api'),
            options: {
                prefix: 'api'
            }
        })
        
        server.method('setAnswerRight', methods.setAnswerRight)
        server.method('getLast', methods.getLast, {
            cache: {
                expiresIn: 1000 * 60,
                generateTimeout: 2000
            }
        })

        //envio de cookie
        //tiempo de vida dde la cookie
        //localhost no es seguro
        //codificacion de la cookie
        server.state('user', {
            ttl: 1000 * 60 * 60 * 24 * 7,
            isSecure: process.env.NODE_ENV === 'prod',
            encoding: 'base64json',
            path:  '/'
        })

        //en engines le decimos que motor de plantillas vamos a usar
        //vison buscara las plantillas en hbs y las v a renderizar con la plantilla que encontro
        server.views({
            engines: {
                hbs: handlebars
            },
            relativeTo: __dirname, // -- para ue las vistas busquen fuera de /public
            path: 'views', // --- directorio donde colocarems las vistas de nuestro proyect
            layout: true, // -- indicaremos que usaremos layout
            layoutPath: 'views'  // --ubicacion de loyout

        
        })


        //registrar la interseccion del ciclo del request
        //interceptar el response    
        server.ext('onPreResponse', site.fileNotFound)  
        
        server.route(routes);
      
            
            //ESPERA HASTA QQUE SE INICIA EL SERVIDOR 
        await server.start();
    } catch (error){
     console.error(error);
     process.exit(1);
    }
    //variable de hapi para saber donde se lanzo el servidor 
 
    server.log('info', `Servidor lanzado en: ${server.info.uri}` )
};

//controlar eceptciones general del proyecto

//errores de promesas que no estn siendo controlada
process.on('unhandledRejection' , error => {
    server.log('UnhandledRejection', error)
});

//error general del todo sistema, cuando hay una exepcion que no fue controlada
process.on('unhandledException' , error => {
    server.log('UnhandledException', error)
});

init()

