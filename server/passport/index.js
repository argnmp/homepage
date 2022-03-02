const LocalStrategy = require('passport-local').Strategy;
const user = {
    id: 'kimtahen',
    pw: '0347'
}
exports.config = (passport) => {
    passport.serializeUser((user,done)=>{
        console.log('serializeUser 호출');
        //로그인시 session에 user.id를 저장함.
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
        console.log('deserializeUser 호출');
        // 웹페이지에 요청시마다 req.session.passport.user 의 키값을 불러옴
        if(id==user.id)
            done(null, id);
    });
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw'
    },
    (id,pw,done)=>{
        console.log(id,pw);
        if(id!=user.id && pw!=user.pw)
            return done(null, false, {message: 'invaild id or pw'});
        return done(null, user);
    }))

}