const express = require('express');
const passport = require('passport');
var localStrategy = require('passport-local').Strategy;


const app = express();
app.listen(4000, () => {
    console.log('serveris started');
})

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});


passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new strategy({
        clientID: '5085078451593129',
        clientSecret: 'ade81ec47c313baf62838027f618b03f',
        callbackURL: 'http://localhost:4000/fb/auth',
        profileFields: ['id', 'displayName']
},
function (accessToken, refreshToken, profile, cb){
    console.log(accessToken, refreshToken, profile);       //if user exist by id or else save a user
    const user = {};
    cb(null,user);
}
));


app.use('/login/fb',passport.authenticate('facebook'));

app.use('/failed/login', (req, res, next) => {
    res.send('login failed')
})


app.use('/fb/auth',passport.authenticate('facebook',{failureRedirect:'/failed/login'}), function (req, res, next){
    console.log(req.user,req.isAuthenticated());
    res.send('logged in to facebook'); 
});

app.use('/logout', (req,any, res, next) => {
    req.logout();
    console.log(req.isAuthenticated());
    res.send('user logged out');
});