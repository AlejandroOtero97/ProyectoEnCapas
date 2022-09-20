import passport from 'passport';

const authenticationController = {
    loginController: passport.authenticate('login', {
        successRedirect: '/api/successLogin',
        failureRedirect: '/api/failureLogin'
    }),
    succesLogin: (req, res) => {
        res.redirect('/');
    },
    failureLogin: (req, res) => {
        res.redirect('/error');
    },
    registerController: passport.authenticate('register', {
        successRedirect: '/api/successSignup',
        failureRedirect: '/api/failureSignup'
    }),
    successSignup: (req, res) => {
        res.redirect('/');
    },
    failureSignup: (req, res) => {
        res.redirect('/error');
    },
    logout: (req, res) => {
        if(req.isAuthenticated()){
            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('/login');
            });
        }
    }
}

export default authenticationController;