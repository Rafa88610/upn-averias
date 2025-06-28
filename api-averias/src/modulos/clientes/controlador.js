const TABLA =  'cliente'

module.exports = function(dbInyectada) {

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql');
    }


    function buscar(numDoc){
        return db.buscarCliente(numDoc);
    }

    function insertar(cliente){
        return db.insertar(TABLA,cliente);
    }
    

    return {
        buscar,insertar
    }
}