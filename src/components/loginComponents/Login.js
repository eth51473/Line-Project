import React from 'react'
import {Formik,Form} from 'formik'
import {TextField} from './TextField'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Login() {
  const validate = yup.object({
    username: yup.string()
    .min(6,'Username must be at least 6 characters')
    .max(20, 'Must be 20 characters or less')
    .required("Username is Required"),
    password: yup.string()
    .min(6,'Password must be at least 6 characters')
    .max(20, 'Must be 20 characters or less')
    .required("Password is Required"),
  })
  return (
    <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    validationSchema={validate}
    onSubmit= {values =>{
      let {username,password} = values
      axios.post('http://localhost:3001/api/login',{
      username,
      password
    },{withCredentials: true}).then((res)=>console.log(res.data)) //redirect to main page somewhere here
    }}
    >
      {formik => (
        <div className="flex-center flex-column">
          <h1>Log In</h1>
          <Form>
            <TextField label="username: " name ="username" type="text"/>
            <TextField label="password: " name ="password" type="text"/>
            <button type="submit">Login</button>
          </Form>
          <Link to="/signup">need an account?</Link>
        </div>
      )}
    </Formik>
  )
}

export default Login
