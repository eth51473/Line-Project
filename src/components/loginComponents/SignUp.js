import React from 'react'
import {Formik,Form} from 'formik'
import {TextField} from './TextField'
import * as yup from 'yup'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
function SignUp() {
  const validate = yup.object({
    username: yup.string()
    .min(6,'Username must be at least 6 characters')
    .max(20, 'Must be 20 characters or less')
    .required("Username is Required"),
    password: yup.string()
    .min(6,'Password must be at least 6 characters')
    .max(20, 'Must be 20 characters or less')
    .required("Password is Required"),
    confirmPassword: yup.string()
    .oneOf([yup.ref('password'),null], 'Password must match')
    .required('Confirm Password is required')
  })
  return (
    <div className="forms">
    <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    validationSchema={validate}
    onSubmit= {values =>{
      let {username,password} = values
      axios.post('http://localhost:3001/api/newuser',{
      username,
      password
    }).then((res)=>console.log(res)) //redirect to login somehwere from here
    }}
    >
      {formik => (
        <div className="flex-center flex-column">
          <div className="form-header"><h1>Sign up</h1></div>
          <Form>
            <TextField label="" name ="username" type="text" placeholder="username"/>
            <TextField label="" name ="password" type="text" placeholder="password"/>
            <TextField label="Confirm Password: " name ="confirmPassword" type="text"placeholder="Password Again" />
            <button type="submit">Register</button>
            
          </Form>
        </div>
      )}
    </Formik>
    </div>
  )
}

export default SignUp
