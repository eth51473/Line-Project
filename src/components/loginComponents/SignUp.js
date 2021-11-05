import React,{useState} from 'react'
import {Formik,Form} from 'formik'
import {TextField} from './TextField'
import * as yup from 'yup'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
function SignUp({signUpStatus}) {
  
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
    onSubmit= {async(values) =>{
      let {username,password} = values
      try {
        const response = await axios.post('http://localhost:3001/api/newuser',{
        username,
        password
    })
      toast.success("Registration Successful, Please Log In")
      signUpStatus(true)
      } catch (error) {
        toast.error('Seems like you already have an account')
        console.log(error.message)
      }
      
    }}
    >
      {formik => (
        <div className="flex-center flex-column">
          <div className="form-header"><h1>Register</h1></div>
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
