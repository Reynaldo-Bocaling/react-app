import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [values, setValues] = useState({
    name: "",
    age: "",
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        values
      );
      if (response.data.Status == "Success") {
        alert("Success");
        navigate("/login");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="w-25 py-5 px-4 rounded border">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-4">Registration Form</h4>
          <div className="mb-3">
            <label className="mb-2">Username</label>
            <input
              type="text"
              className="form-control"
              onChange={handleInput}
              name="name"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">Age</label>
            <input
              type="text"
              className="form-control"
              onChange={handleInput}
              name="age"
              placeholder="Age"
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">Username</label>
            <input
              type="text"
              className="form-control"
              onChange={handleInput}
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">Username</label>
            <input
              type="text"
              className="form-control"
              onChange={handleInput}
              name="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3 mt-2 w-100">
            Register
          </button>
          <Link to="/login" className="btn btn-default border w-100">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
