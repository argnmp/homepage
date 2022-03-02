const LocalStrategy = require('passport-local').Strategy;
const user = {
    id: 'kimtahen',
    pw: '0347',
    name: '김태현',
}
exports.config = (passport) => {
    passport.serializeUser((user,done)=>{
        //로그인시 session에 user.id를 저장함.
        done(null,{id: user.id, name: user.name});
    });

    passport.deserializeUser((user,done)=>{
        console.log(user);
        // 웹페이지에 요청시마다 req.session.passport.user 의 키값을 불러옴
        done(null, user);
    });
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw'
    },
    (id,pw,done)=>{
        console.log(id,pw);
        if(id!=user.id || pw!=user.pw)
            return done(null, false, {message: 'invaild id or pw'});
        console.log('correct');
        return done(null, user);
    }))

}
