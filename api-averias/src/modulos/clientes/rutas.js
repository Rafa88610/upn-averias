const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador =  require('./index');

const router = express.Router();

router.get('/',listar );

async function listar(req, res, next){
    try{
         const items =  await controlador.todos();
         respuesta.success(req,res,items,200);  
    }catch(err){
        next(err);
    }
      
}


module.exports=router