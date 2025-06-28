const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador =  require('./index');

const router = express.Router();

router.post('/',registrar)
router.get('/:numdoc',buscar)

async function registrar(req, res, next){
    console.log(req.body);
    try{
         const item =  await controlador.insertar(req.body);
         respuesta.success(req,res,item.insertId,200);  
    }catch(err){
        next(err);
    }
      
}

async function buscar(req, res, next){
    console.log(req.params);
    try{
         const item =  await controlador.buscar(req.params.numdoc); 
         const cliente = item[0]  == null ? null :  item[0];
         console.log("cliente>>",cliente)     
         respuesta.success(req,res,cliente,200);  
    }catch(err){
        next(err);
    }
      
}


module.exports=router