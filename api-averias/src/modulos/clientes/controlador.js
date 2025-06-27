const TABLA =  'cliente'

module.exports = function(dbInyectada) {

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql');
    }


    function todos (){
        return db.todos(TABLA);
    }

    return {
        todos
    }
}