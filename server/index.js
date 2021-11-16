const express = require('express')
const cors = require('cors')
const sequelize = require('./database/seq')
const path = require('path')
const app = express()
const uCtrl = require("./controllers/usersCtrl")
const spotCtrl = require("./controllers/spotsCtrl")
const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
require("dotenv").config();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "../build")))
//middleware
const {JWTSECRET} = process.env
const verifyJWT = (req,res,next) =>{
  const token = req.headers["x-access-token"]
  
  if(!token){
    res.send(req.data)
  }else{
    jwt.verify(token, JWTSECRET, (err,decoded) =>{
      if(err){
        res.json({auth: false, message: "U failed to authenticate"})
      }else{
        console.log(req.userId)
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
app.get('/api/getcoords',spotCtrl.allCoords)
app.get('/api/bookmarks', spotCtrl.bookmarks)
app.get('/api/newbookmark',spotCtrl.newBookmark)
app.get('/api/savedspots',spotCtrl.savedSpots)
app.delete('/api/deletebookmark',spotCtrl.delete)


app.get('/*', function (req,res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
});


const {PORT} = process.env
app.listen(PORT, ()=>{
  console.log(`up and running on${PORT}`)
})