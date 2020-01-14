const passport=require('../passport.js');

class Login{
    login(req,res,next){
        passport.authenticate('local',(err,user,info)=>{
            if(err){
                next(err);
            }

            if(!user){
                next()
            }
            req.logIn(user,err=>{
                if(err){
                    next(err);
                }
                res.send("autorized");
            })
        })
        (req,res,next);
    }

    logout(req,res,next){

            req.logout();
        res.send("logOut sucsess;");
    }
}

moduele.exports=Login();