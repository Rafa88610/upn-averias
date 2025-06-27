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

module.exports = {
   
    login,todos,
}