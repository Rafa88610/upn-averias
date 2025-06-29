const TABLA =  'usuario'

module.exports = function(dbInyectada) {

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql');
    }

    function insertar(user){
        return db.insertar(TABLA,user);
    }

    function actualizar(user){
        return db.actualizar(TABLA,user);
    }

     function eliminar(id){
        return db.eliminar(TABLA,id);
    }

     function listar(){
        return db.todos(TABLA);
    }
    

    return {
        insertar,listar,actualizar,eliminar
    }
}