import { Router} from 'express'
import passport from 'passport'
import { authenticationController } from '../controllers/authentication.controller.js'

//ESTO DEBERIA TENER UN SERVICE Y UN CONTROLLER?

const router = Router()

router.post('/signup', authenticationController.signUpUser)

//passport github

router.get('/githubSignup', passport.authenticate('github', { scope: [ 'user:email' ] }));


router.get('/github', passport.authenticate('github',{failureRedirect: '/api/views/login'}), async (req, res)=>
{
    const username = req.user.username
    //req.session.user = req.user
    //req.session['username'] = req.user.username
    res.redirect('/api/views/products')
})

// router.get(
//     '/jwtAuth',
//     passport.authenticate('jwt', { session: false }),
//     async (req, res) => {
//       // Access user information from Passport user object
//       const username = req.user.username;
  
//       // Your JWT authentication logic here...
  
//       res.redirect('/api/views/products');
//     }
//   );

export default router