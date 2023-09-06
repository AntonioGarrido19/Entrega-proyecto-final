// import { Router } from "express"

// const router = Router()

// const publicAccess = (req,res,next) =>{
//     if(req.session.user) return res.redirect('/profile');
//     next();
// }

// const ptivateAccess = (req,res,next)=>{
//     if(!req.session.user) return res.redirect('/login');
//     next();
// }

// router.get('/register', publicAccess, (req,res)=>{
//     res.render('register')
// })

// router.get('/login', publicAccess, (req,res)=>{
//     res.render('login')
// })

// router.get('/profile', privateAccess, (req,res)=>{
//     res.render('profile', {
//         user: req.session.user
//     })
// })


// //TODO ESTO VA ACA?????
// router.post('/', (req,res)=>{
//     const {username, password} = req.body
//     req.session['username'] = username
//     req.session['password'] = password
//     console.log(req)
//     res.send ('probnado sessions')
// })

// router.get("/", (req,res)=>{


// })


// export default router