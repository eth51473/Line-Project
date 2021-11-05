const users = require("../models/users");
const sequelize = require('../database/seq')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = {
  newUser: async (req, res) => {
    const { username, password } = req.body;
       const usernames = await sequelize.query(`SELECT * From users WHERE username = '${username}'`)
      let numRows = usernames[1].rowCount 
      console.log(numRows)
       if(numRows > 0){
         res.status(401).send("username taken")
       }else{
          const salt = await bcrypt.genSalt(10)
          const hashedPass = await bcrypt.hash(password,salt)
          
        console.log(hashedPass.length)
          const newUser = await users.create({
          username,
          password: hashedPass, //hashed
        });
        res.status(200).send('good Job')
       }
       
      // if (usernames[1].rowCount > 0) {
      //   return res.status(401).send.json("user already exists");
      // }
      
    },
  login: async(req,res) =>{
    const {username,password} = req.body
    const usernameCheck = await sequelize.query(`SELECT * From users WHERE username = '${username}'`)
    if(usernameCheck[1].rowCount >0){
      let userId = usernameCheck[1].rows[0].id
      
      const passwordCheck = await sequelize.query(`SELECT password From users WHERE id = '${userId}'`)
      const bcryptPass = passwordCheck[1].rows[0].password
      
      const validPass = await bcrypt.compare(password,bcryptPass)
      if(validPass){
        const token = jwt.sign({userId},"jwtSecret",{
          expiresIn: '1h',
        })
        res.status(200).json({auth: true, token, usernameCheck: usernameCheck[1] })
      }
    }else{
      res.status(401).send({auth: false, message: "user not found" })
    }
    
  }
     
};
