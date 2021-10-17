module.exports = function (req, res, next){
    const accountAddress = req.header('x-auth-accountAddress')

    if(!accountAddress){
        return res.status(401).json({error: 'No account connected'})
    }
    req.accountAddress = accountAddress
    next()
}