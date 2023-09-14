import passport from "passport";
import { usersModel } from "../db/models/users-model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { usersManager } from "../dao/managers/session/UsersMongo.js";
import { compareData } from "../utils.js";

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

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: "Iv1.8e91905a6a017ab4",
//       clientSecret: "45fadcd2c3ee3e4983760ac1aa5f1e45dc224879",
//       callbackURL: "http://localhost:8080/api/users/github",
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       try {
//         const userDB = await usersManager.findUser(profile.username);
//         if (userDB) {
//           return done(null, false);
//         }
//         const newUser = {
//           first_name: profile.displayName.split(" ")[0],
//           last_name: profile.displayName.split(" ")[1],
//           username: profile.username,
//           password: " "
//         };
//         const result = await usersManager.create(newUser);
//         return done(null, result);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );


passport.use(
  new GithubStrategy(
    {
      clientID: "Iv1.8e91905a6a017ab4",
      clientSecret: "45fadcd2c3ee3e4983760ac1aa5f1e45dc224879",
      callbackURL: "http://localhost:8080/api/users/github",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const userDB = await usersManager.findUser(profile.username);
        if(userDB){
          return done(null,false)
        }
        const newUser = {
          first_name: profile.displayName.split(" ")[0],
          last_name:  profile.displayName.split(" ")[1],
          username: profile.username,
          password: ' '
        }
        const result = await usersManager.create(newUser)
        return done(null,result)
      } catch (error) {
        done(error)
      }
   
    }
  )
);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: "Iv1.8e91905a6a017ab4",
//       clientSecret: "45fadcd2c3ee3e4983760ac1aa5f1e45dc224879",
//       callbackURL: "http://localhost:8080/api/users/github",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       console.log(profile);
//       done(null, false);
//     }
//   )
// );

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
