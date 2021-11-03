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
          <h1>Sign up</h1>
          <Form>
            <TextField label="username: " name ="username" type="text"/>
            <TextField label="password: " name ="password" type="text"/>
            <TextField label="Confirm Password: " name ="confirmPassword" type="text"/>
            <button type="submit">Register</button>
            <button type="reset">Reset</button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default SignUp
