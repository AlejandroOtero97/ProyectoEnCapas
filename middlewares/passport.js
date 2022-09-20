import passport from 'passport';
import { Strategy } from 'passport-local';
import daoUsers from '../daos/daoUsers.js';
import bCrypt from 'bcrypt';
import { usersCollection } from '../connections/mongoose.js';

const users = new daoUsers(usersCollection)

passport.use('register', new Strategy({
    passReqToCallback: true
}, 
    async function(req, username, password, done) {
        try{
            const user = await users.saveIfDontExists({ username, password: createHash(password) });
            if(user){
                done(null, user);
            }else{
                done(null, false);
            }
        } catch (error) {
            done(error);
        }
    }
));

passport.use('login', new Strategy(
    async function(username, password, done) {
        try{
            const user = await users.findByUsername(username);
            if(user && bCrypt.compareSync(password, user.password)){
                done(null, user);
            }else{
                done(null, false);
            }
        } catch (error) {
            done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    try{
        const user = users.getById(id)
        done(null, user)
    } catch(error) {
        done(error)
    }
});

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

function createHash (password ) {
    return bCrypt.hashSync ( password , bCrypt.genSaltSync (10), null);
}