module.exports = function (dbInyectada) {

    let db = dbInyectada;

    if (!db) {
        db = require('../../DB/mysql');
    }


    function login(user, passw) {
        return db.login(user, passw);
    }

    function actualizarContrasenia(id, pwd) {
        return db.actualizarContrasenia(id, pwd);
    }

    return {
        login,actualizarContrasenia
    }
}