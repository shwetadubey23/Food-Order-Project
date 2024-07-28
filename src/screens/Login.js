import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {

  const [loginUser, setLoginUser] = useState({ email: "", password: "" })
let navigate = useNavigate()

const handleLoginUser = async (eventCheck) => {
  eventCheck.preventDefault();
  const response = await fetch("/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ email: loginUser.email, password: loginUser.password })
  });
    const json = await response.json()
    // console.log(json);

    if (!json.success) {
      alert("Invailid email or password ")
    }

    if(json.success){
      localStorage.setItem("token", json.token);
      console.log(localStorage.getItem("token"));
      navigate('/')
    }
  };

  const changeData = (event) => {
    setLoginUser({ ...loginUser, [event.target.name]: event.target.value })
   
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleLoginUser}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail" name='email' value={loginUser.email} onChange={changeData} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={loginUser.password} onChange={changeData} />
          </div>

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/Signup" className='m-3 btn btn-danger'> New user</Link>
        </form>
      </div>

    </>
  )
}


