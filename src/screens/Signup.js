import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {

const [checkUser, setCheckUser] = useState({name: "", email: "", password: "", geolocation: ""})

const handelUser = async (eventCheck) => {
eventCheck.preventDefault();
const response = await fetch("http://localhost:5000/user", {
  method: 'POST',
  headers: {
'content-type': 'application/json; charset=utf-8'
  },
body: JSON.stringify({name: checkUser.name, email: checkUser.email, password: checkUser.password, location: checkUser.geolocation})
  
});
const json = await response.json()
console.log(json);

if(!json.success) {
  alert("Enter Vailid Data")
}

};

const changeData = (event) => {
  setCheckUser({...checkUser, [event.target.name]: event.target.value})
  // alert("")
}

  return (
    <>
      <div className='container'>
        <form onSubmit={handelUser}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control"  name='name'  value={checkUser.name} onChange={changeData}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail"  name='email' value={checkUser.email } onChange={changeData} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"  name='password' value={checkUser.password} onChange={changeData} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" className="form-control" id="exampleInputAddress1"  name='geolocation' value={checkUser.geolocation} onChange={changeData} />
          </div>

          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/login" className='m-3 btn btn-danger'> Already a user</Link>
        </form>
      </div>

    </>
  )
}
