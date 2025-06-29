const mysql = require('mysql2');
const config =  require('../config');

const dbconfig = {
    host : config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err)=>{
        if(err){
            console.log('[db error]',err);
            setTimeout(conMysql,200);
        }else{
            console.log('DB conectada!!');
        }
    });

    conexion.on('error',err => {
        console.log('[db error]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    })
}

conMysql();

function login(username,contrasenia){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM usuario WHERE username='${username}' and contrasenia='${contrasenia}' and estado='A' `,
            (error,result)=>{
                      
                return error ? reject(error): resolve(result);
        });
    });
   
}

function todos(tabla){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            return error ? reject(error): resolve(result);
        })
    });   
}

function insertar(tabla,data){   
    console.log("ingresa >>",data);
    return new Promise((resolve,reject)=>{
        conexion.query(`INSERT INTO ${tabla} set ?`,data, (error,result)=>{
            console.log(result);
            return error ? reject(error): resolve(result);
        })
    });
}

function actualizar(tabla,data){
    return new Promise((resolve,reject)=>{
        conexion.query(`update ${tabla} set ? where id= ?`,[data,data.id], (error,result)=>{
            return error ? reject(error): resolve(result);
        })
    });
}

function eliminar(tabla,id){
    return new Promise((resolve,reject)=>{
        conexion.query(`delete from ${tabla} where id= ?`,id, (error,result)=>{
            return error ? reject(error): resolve(result);
        })
    });
}


function buscarCliente(numDoc){
    return new Promise((resolve,reject)=>{        
        conexion.query(`SELECT * FROM cliente where numDoc='${numDoc}'`, (error,result)=>{
            return error ? reject(error): resolve(result);
        })
    });
}


function averiasPorAsesor(idAsesor){
    return new Promise((resolve,reject)=>{        
        conexion.query(`SELECT idAveria, motivo, a.descripcion,a.idCliente,a.idProducto,
                                nombContacto,telefContacto,esDerivado,tipoDoc,numDoc,nombres,
                                apellPaterno,apellMaterno,telefono,direccion,correo,nombre as producto 
                        FROM averia a inner join cliente b on a.idCliente=b.idCliente 
                        inner join producto c on a.idProducto=c.idProducto 
                        where idAsesor=${idAsesor}`, (error,result)=>{
            return error ? reject(error): resolve(result);
        })
    });
}


module.exports = {   
    login,todos,insertar,actualizar,eliminar,averiasPorAsesor,buscarCliente
}