const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador =  require('./index');

const router = express.Router();

router.post('/',registrar)
router.post('/:id',eliminar)
router.get('/',listar)

async function registrar(req, res, next){
    console.log(req.body);
    try{
        var items;
        if(req.body.id == 0){
            items =  await controlador.insertar(req.body);
        }else{
            items =  await controlador.actualizar(req.body);
        }
         
         respuesta.success(req,res,items.insertId,200);  
    }catch(err){
        next(err);
    }      
}

async function eliminar(req, res, next){
    console.log(req.params);
    try{
         const items =  await controlador.eliminar(req.params.id);         
         respuesta.success(req,res,"Se eliminó correctamente",200);  
    }catch(err){
        next(err);
    }      
}


async function listar(req, res, next){
    
    try{
         const items =  await controlador.listar();         
         respuesta.success(req,res,items,200);  
    }catch(err){
        next(err);
    }      
}



module.exports=router