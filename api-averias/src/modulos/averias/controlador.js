const TABLA =  'averia'

module.exports = function(dbInyectada) {

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql');
    }

    function insertar(averia){
        return db.insertar(TABLA,averia);
    }

     function listar(idAsesor){
        return db.averiasPorAsesor(idAsesor);
    }
    

    return {
        insertar,listar
    }
}