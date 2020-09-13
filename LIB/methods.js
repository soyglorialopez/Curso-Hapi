'use strict'

const {questions} = require('../models/index');

async function setAnswerRight(questionId, answerId, user){
    let result
    try {
        result = await questions.setAnswerRight(questionId, answerId, user)
    } catch (error) {
        console.error(error)
        return false 
    }
    console.log(result)

    return result
}

async function getLast(amout){
    let data
  try {
    data = await questions.getLast(amout)
  } catch (error) {
    console.error(error)
  }
  console.log('muestra de metodo')
  return data
}

module.exports ={
    setAnswerRight,
    getLast

}