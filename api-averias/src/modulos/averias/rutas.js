const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador =  require('./index');

const router = express.Router();

router.post('/',registrar)
router.get('/:id',listar)

async function registrar(req, res, next){
    console.log(req.body);
    try{
         const items =  await controlador.insertar(req.body);
         respuesta.success(req,res,items.insertId,200);  
    }catch(err){
        next(err);
    }      
}

async function listar(req, res, next){
    console.log(req.params);
    try{
         const items =  await controlador.listar(req.params.id);         
         respuesta.success(req,res,items,200);  
    }catch(err){
        next(err);
    }      
}



module.exports=router