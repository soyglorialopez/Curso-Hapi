'use strict'
const {join} = require('path');
const {questions} = require('../models/index');
const {writeFile} = require('fs');
const {promisify} = require('util');
const uuid = require('uuid/v1');

//hacer que podamos utilizar con async/await
const write = promisify(writeFile);

async function  createQuestion (req, h){
    let result, filename
    try{
        if(Buffer.isBuffer(req.payload.image)){
            filename = `${uuid()}.png`
            await write(join(__dirname, '..', 'public', 'uploads',filename), req.payload.image)
        }
        result = await questions.create(req.payload, req.state.user,filename)
    }catch(error){
       req.error('error', `Ocurrio un error : ${error}`);
        return h.view('ask', {
            title: 'Crear Pregunta',
            error: 'Probleas creando la Pregunta'
        }).code(500).takeover()
    };

    return h.redirect(`/question/${result}`)
}

async function answerQuestion(req, h){
    if(!req.state.user){
        return h.redirect('/login')
    }
    let result
    try{
        result = await questions.answer(req.payload, req.state.user)
        console.log(`Repuesta creada: ${result}`)
    }catch(error){
        console.error(error)
    }

    return h.redirect(`/question/${req.payload.id}`)
}

async function setAnswerRight(req, h){
    let result
    try {
        result = await req.server.methods.setAnswerRight(req.params.questionId, req.params.answerId, req.state.user)
       
    } catch (error) {
        console.error(error)
    }
    return h.redirect(`/question/${req.params.questionId}`)
}


module.exports ={
    createQuestion,
    answerQuestion,
    setAnswerRight

}
