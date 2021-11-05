import React,{useState} from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField } from './loginComponents/TextField';
function AddPost() {
  const validate = yup.object({
    title: yup
      .string()
      .max(25, "Must be 25 characters or less")
      .required("title is Required"),
    line_length: yup
    .number()
    .typeError('line length must be a number')
    .max(20000, "This Line Is too long")
    .required("line_length is Required"),
    description: yup
    .string()
    .max(250, "must be under 250 characters")
    .required("description is Required"),
    location: yup
    .string()
    .max(50, "must be under 250 characters")
    .required("location is Required"),
  
  });
  return (
    <div className="forms">
    <Formik
      initialValues={{
        title: "",
        line_length: "",
        description: "",
        location: "",
      }}
      validationSchema={validate}
      onSubmit={ async(values) => {
        console.log('hello please work')
        let { title,line_length,description,location } = values;
        try {
          const response = await axios.post('http://localhost:3001/api/newspot',{
          title,
          line_length,
          description,
          location
        })
        toast.success('new spot successfully created')
        } catch (error) {
          toast.info('this title is already taken')
          console.log(error)
        }
        }}
    >
      {(formik) => (
        <div className="flex-center flex-column">
          <div className="form-header"><h1>NEW SPOT</h1></div>
          <Form>
            <TextField label=""name="title" type="text" placeholder="title"/>
            <TextField label=""placeholder="line_length"name="line_length" type="text" />
            <TextField label=""placeholder="description"name="description" type="text" />
            <TextField label=""placeholder="City Name"name="location" type="text" />
            <button type="submit">submit</button>
          </Form>
        </div>
        
      )}
    </Formik>
    </div>
  );
}
export default AddPost
