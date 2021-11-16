import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField } from "./loginComponents/TextField";
import AddSpotMap from "./mapComponents/AddSpotMap";
import Popup from "reactjs-popup";
import { GrMapLocation } from "react-icons/gr";
function AddPost() {
  const validate = yup.object({
    title: yup
      .string()
      .max(25, "Must be 25 characters or less")
      .required("title is Required"),
    line_length: yup
      .number()
      .typeError("line length must be a number")
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
    latitude: yup
      .number()
      .max(90, "cant be larger than 90")
      .min(-90, "cant be smaller than -90"),
    longitude: yup
      .number()
      .max(180, "cant be larger than 180")
      .min(-180, "cant be smaller than -180"),
  });
  const [spotLat, setSpotLat] = useState("");
  const [spotLng, setSpotLng] = useState("");
  return (
    <div className="forms">
      <Formik
        initialValues={{
          title: "",
          line_length: "",
          description: "",
          location: "",
          latitude: "",
          longitude: "",
          coords: "",
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          console.log("hello please work");
          let { title, line_length, description, location } = values;
          try {
            const response = await axios.post(
              "/api/newspot",
              {
                title,
                line_length,
                description,
                location,
                coords: {
                  lat: `${spotLat}`,
                  lng: `${spotLng}`,
                  label: title,
                },
              }
            );
            toast.success("new spot successfully created");
          } catch (error) {
            toast.info("this title is already taken");
            console.log(error);
          }
        }}
      >
        {(formik) => (
          <div className="flex-center flex-column">
            <div className="form-header">
              <h1>NEW SPOT</h1>
            </div>
            <Form>
              <TextField
                label=""
                name="title"
                type="text"
                placeholder="title"
              />
              <TextField
                label=""
                placeholder="line_length"
                name="line_length"
                type="text"
              />
              <TextField
                label=""
                placeholder="description"
                name="description"
                type="text"
              />
              <TextField
                label=""
                placeholder="City Name"
                name="location"
                type="text"
              />
              <Popup
                contentStyle={{background:'none',border:'none',width:'50vw',height: '50vh'}}
                trigger={
                  <span>
                    Use Map For Exact Coords
                    <div className="icon-div">
                      <GrMapLocation size={30} style={{ marginTop: "5px" }} />
                    </div>
                  </span>
                }
                modal
                position="top top"
              >
                <h3 style={{backgroundColor:'white',marginBottom:'5px'}}>Click a point on the map to place marker and get  exact coordinates </h3>
                <AddSpotMap setSpotLat={setSpotLat} setSpotLng={setSpotLng} />
              </Popup>
              <TextField
                label=""
                placeholder="Latitude"
                name="latitude"
                type="text"
                value={spotLat}
              />
              <TextField
                label=""
                placeholder="Longitude"
                name="longitude"
                type="text"
                value={spotLng}
              />
              <button type="submit">submit</button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
export default AddPost;
