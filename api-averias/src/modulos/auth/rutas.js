
const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador =  require('./index');

const router = express.Router();

router.post('/', login);
router.post('/:username',actualizarPass);

async function login (req, res, next){
    console.log(req.body);

    let user = req.body.username;
    let passw= req.body.contrasenia;
    try{
         const rpta = await controlador.login(user,passw);        
         const usuario = rpta[0] == null ? null : rpta[0];
          console.log("user>>",usuario)
         if(usuario){
             respuesta.success(req,res,usuario,200);   
         }else{
            respuesta.success(req,res,'Credenciales inválidas',200);   
         }
        
    }catch(err){
        next(err);
    }   
}

async function actualizarPass(req, res, next){
    console.log(req.body);
    console.log(req.params);
    try{
         const items =  await controlador.actualizarContrasenia(req.params.username,req.body.contrasenia);         
         respuesta.success(req,res,"Se actualizó correctamente",200);  
    }catch(err){
        next(err);
    }      
}



module.exports=router