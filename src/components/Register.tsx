import React, { SyntheticEvent, useState} from 'react';
import { Navigate } from 'react-router-dom';
import "../CSS/Login.css";

const Register = () => {
const [name, setName ] = useState<string>("");
const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [navigate, setNavigate] = useState<boolean>(false);

const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log({name, email, password})

    const user = {
        Name: name, 
        Email: email,
        Password: password
    }
    const response = await fetch("https://localhost:7039/api/Auth/register",
    // const response = await fetch("https://todoby.azurewebsites.net/api/User/register", 
        {
            method: 'POST', 
            headers: {'Content-Type': 'application/json', },
            body: JSON.stringify(user)
        }
    );

    setNavigate(true);
}
if(navigate){
 return <Navigate to="/Login"/>
}

  return (
    <section className="form-signin w-100 m-auto">
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Please register</h1>
      <div className="form-floating">
        <input className="form-control" placeholder="name" onChange={e => setName(e.target.value)}/>
      </div>
      <div className="form-floating">
        <input type="email" className="form-control" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
      </div>
      <div className="form-floating">
        <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
      </div>
      <button className="w-100 btn btn-lg btn-primary" type="submit">Register</button>
    </form>
</section>
  );
}

export default Register;
