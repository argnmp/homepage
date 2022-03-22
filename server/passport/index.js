import User from '../models/userModel';

const LocalStrategy = require('passport-local').Strategy;
const user = {
    id: 'kimtahen',
    pw: '0347',
    name: '김태현',
}
exports.config = (passport) => {
    passport.serializeUser((user,done)=>{
        //로그인시 session에 user.id를 저장함.
        done(null,user);
    });

    passport.deserializeUser((user,done)=>{
        // 웹페이지에 요청시마다 req.session.passport.user 의 키값을 불러옴
        done(null, user);
    });
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email,password,done)=>{
        try {
            const account = await User.findByEmail(email);
            if (!account) {
                return done(null, false, { message: 'invalid email or password' });
            }
            else {
                if (account.validatePassword(password)) {
                    return done(null, { _id: account._id, email: account.email, name: account.name, level: account.level});
                }
                else {
                    return done(null, false, { message: 'invalid email or password' });
                }
            }

        } catch(err){
            done(err);
        }
        
    }))

}
