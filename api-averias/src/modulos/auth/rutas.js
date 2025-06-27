const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador =  require('./index');

const router = express.Router();

router.post('/', login);

async function login (req, res, next){
    console.log(req.body);

    let user = req.body.username;
    let passw= req.body.contrasenia;
    try{
         const rpta = await controlador.login(user,passw);        
         const usuario = rpta[0] == null ? null : rpta[0];
          console.log("user>>",usuario)
         if(usuario){
             respuesta.success(req,res,'Login exitoso',200);   
         }else{
            respuesta.success(req,res,'Credenciales inválidas',200);   
         }
        
    }catch(err){
        next(err);
    }   
}



module.exports=router