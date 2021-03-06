import React,{useState} from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as yup from "yup";
import { Link, Redirect} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
function Login({loginStatus, updateLoginStatus}) {
  
  const validate = yup.object({
    username: yup
      .string()
      .min(6, "Username must be at least 6 characters")
      .max(20, "Must be 20 characters or less")
      .required("Username is Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Must be 20 characters or less")
      .required("Password is Required"),
  });
  return (
    <div className="forms">
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        let { username, password } = values;
        try {
          const response = await axios.post('/api/login', {
          username,
          password,
        })
          const { token } = response.data;
        
          if(token){
            localStorage.setItem('token', token)

            const authResponse = await axios.get('/api/isuserauth',{
              headers:{
                "x-access-token":localStorage.getItem("token")
              }
            })
            if(authResponse.data.auth){
              updateLoginStatus(true)
              toast.success('Successful Login')
            }
            localStorage.setItem('user', username)
          
          }
        } catch (error) {
          toast.error('incorrect login info')
        }   
      }}
    >
      {(formik) => (
        <div className="flex-center flex-column">
          <div className="form-header"><h1>Sign In</h1></div>
          <h4 className="form-msg">Sign in to create posts and contribute to the community :)</h4>
          <Form>
            <TextField label=""name="username" type="text" placeholder="Username"/>
            <TextField label=""placeholder="Password"name="password" type="password" />
            <button type="submit">Sign in</button>
          </Form>
          <h3>Need an Account?</h3>
          <Link to="/signup">Sign Up Here!</Link>
        </div>
        
      )}
    </Formik>
    {loginStatus && (
      <Redirect to="/" />
      // <button onClick={userAuthenticated}>check auth</button>
    )}
    </div>
  );
}

export default Login;
