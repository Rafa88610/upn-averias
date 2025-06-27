exports.success = function(req,res, mensaje, status){
    const statusCode = status || 200;
    const mensajeOk = mensaje || '';    

    res.status(status).send({
        error:false,
        status:statusCode,
        body:mensaje
    })
}

exports.error = function(req,res, mensaje, status){
    const statusCode = status || 500;
    const mensajeError = mensaje || 'Error Interno';  

    res.status(status).send({
        error:true,
        status:statusCode,
        body:mensajeError
    })
}