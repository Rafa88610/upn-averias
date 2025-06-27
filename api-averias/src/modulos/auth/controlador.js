module.exports = function(dbInyectada) {

    let db = dbInyectada;

    if(!db){
        db = require('../../DB/mysql');
    }


    function login (user,passw){
        return db.login(user,passw);
    }

    return {
        login
    }
}