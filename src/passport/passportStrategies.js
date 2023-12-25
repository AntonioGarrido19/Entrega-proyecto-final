import passport from "passport";
import { usersModel } from "../DAL/mongoDB/models/users-model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { usersManager } from "../DAL/managers/session/UsersMongo.js";
import { usersService } from "../services/users.service.js";
import { usersController } from "../controllers/users.controller.js";
import { compareData } from "../utils.js";


const secretKey = "KEYJWT"

// user => id
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// id => user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});



passport.use(
  "login",
  new LocalStrategy(async function (username, password, done) {
    try {
      const userDB = await usersManager.findUser(username);
      if (!userDB) {
        return done(null, false);
      }
      const isPasswordValid = await compareData(password, userDB.password);
      if (!isPasswordValid) {
        return done(null, false);
      }
      return done(null, userDB);
    } catch (error) {
      done(error);
    }
  })
);


passport.use(
  new GithubStrategy(
    {
      clientID: "Iv1.8e91905a6a017ab4",
      clientSecret: "45fadcd2c3ee3e4983760ac1aa5f1e45dc224879",
      callbackURL: "http://localhost:8080/api/authentication/github",
    },
    async function (accessToken, refreshToken, profile, done) {
    
     try {
        const userExists = await usersManager.findUser(profile.username)
        if(userExists){
          if(userExists.fromGithub){
            return done(null,userExists)
          }
          return done(null,false)
        }
        const newUser = {
          first_name: profile.displayName.split(" ")[0],
          last_name:  profile.displayName.split(" ")[1],
          username: profile.username,
          email: profile.email,
          password: ' ',
          fromGithub: true
        }
        const result = await usersManager.create(newUser)
        return done(null,result)
      } catch (error) {
        done(error)
      }
   
    }
  )
);





// passport.use('jwt',new JWTStrategy({

//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: secretKey

// },async (jwt_payload, done)=>{
//   console.log('jwt_payload', jwt_payload);

//   done(null,jwt_payload.user)
//   req.user = jwt_payload.user
// }))


//cookies

// const cookieExtractor= (req)=>{
//   return req.cookies.token
// }

// passport.use('jwt',new JWTStrategy({

//   jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
//   secretOrKey: secretKey

// },async (jwt_payload, done)=>{
//   console.log('jwt_payload', jwt_payload);
//   done(null,jwt_payload.user)
// }))




