'use strict'

const {questions} = require('../models/index');

async function home(req, h){
     const data =  await req.server.methods.getLast(10)
   
    return h.views('index', {
        title: 'home',
        user: req.state.user,
        questions: data

    })
  }

function register(req, h){
  if(req.state.user){
      return h.redirect('/')
    }
    return h.view('register', {
        title: 'Registro',
        user: req.state.user

    })
  }

  function login(req, h){
    if(req.state.user){
      return h.redirect('/')
    }
    return h.view('login', {
        title: 'Login',
        user: req.state.user
    })
  }

  async function viewQuestion(req, h){
    let data
    try {
      //params un objet que me permite traer parametro de la ruta
      data = await questions.getOne(req.params.id);
      if(!data){
        return notFound(req, h);
      }
    } catch (error) {
      console.error(error);
    }
  req.log('respuesta', data)
    return h.view('question', {
      title: 'Detalles de la Pregunta',
      user: req.state.user,
      question: data,
      key: req.params.id
    })
 
  }

  function notFound(req, h){
    //el tercer parametro me permite cambiar propiedades de vision, el plugin que nos permite renderizar
   return h.view('404', {}, {layout: 'error-loyout'} ).code(404)
  };

  function fileNotFound(req, h){
    const response = req.response
    if(!req.path.startsWith('/api') && response.isBoom && response.output.statusCode === 404){
   return h.view('404', {}, {layout: 'error-loyout'} ).code(404)
    }
    
    return h.continue
    
  };

  function ask(req, h){
    if(!req.state.user){
      return h.redirect('/login')
    }

    return h.view('ask', {
      title: 'Crear pregunta',
      user: req.state.user
    })
  }



  module.exports = {
      register,
      home,
      notFound,
      fileNotFound,
      login,
      ask,
      viewQuestion
  }