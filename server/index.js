const express = require('express')
const cors = require('cors')
const sequelize = require('./database/seq')
const app = express()
const uCtrl = require("./controllers/usersCtrl")
const spotCtrl = require("./controllers/spotsCtrl")
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
app.use(cors())
app.use(express.json())

//middleware
const verifyJWT = (req,res,next) =>{
  const token = req.headers["x-access-token"]
  
  if(!token){
    res.send(req.data)
  }else{
    jwt.verify(token, "jwtSecret", (err,decoded) =>{
      if(err){
        res.json({auth: false, message: "U failed to authenticate"})
      }else{
        req.userId = decoded.id
        next()
      }
    })
  }
}

app.get('/api/isuserauth',verifyJWT,(req,res)=>{
  res.json({auth: true, message: "Authenticated"})
})
app.post('/api/newuser',uCtrl.newUser)
app.post('/api/login',  uCtrl.login)
app.post('/api/newspot',spotCtrl.newSpot)
app.get('/api/findspots',spotCtrl.getSpots)


app.listen(3001,()=>{
  console.log('up and running on 3001')
})