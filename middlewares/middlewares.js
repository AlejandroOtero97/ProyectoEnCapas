const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

const debug = (req, res, next) => {
    req.debug = true;
    next();
}

export { auth, debug };