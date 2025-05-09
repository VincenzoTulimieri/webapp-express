
function notFound(req,res,next){
    res.status(404);
    res.json({
        error: 'Not Found',
        message: 'Film non trovato'
    })
}
module.exports = notFound