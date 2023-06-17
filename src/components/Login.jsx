import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

  const [values, setValues] = useState({
    username: "",
    password: "",
  })

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };

  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", values);
      if (response.data.Status === "Success") {
        alert("Success");
        navigate("/");
      } else {
        alert(response.data.Error);
      }
    console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };



  
  return (
    <div className="con d-flex align-items-center justify-content-center bg-white vh-100">
      <div className="w-25 py-5 px-4 rounded border">
        <form onSubmit={handleSubmit}>
          <h4 className="mb-4">Login Form</h4>
          <div className="mb-3">
            <label className="mb-2">Username</label>
            <input
              type="text"
              onChange={handleInput}
              className="form-control"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="mb-3">
            <label className="mb-2">Password</label>
            <input
              type="text"
              onChange={handleInput}
              className="form-control"
              name="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3 mt-2 w-100">
            Login
          </button>
          <Link to="/register" className="btn btn-default border w-100">
            Create new account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
