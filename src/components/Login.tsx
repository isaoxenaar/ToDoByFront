import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import "../CSS/Login.css";

const Login = () => {

const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [navigate, setNavigate] = useState<boolean>(false);

const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log({ email, password})

    const user = {
        Email: email,
        Password: password
    }
    const response = await fetch("https://localhost:7039/api/Auth/login",
    // const response = await fetch("https://todoby.azurewebsites.net/api/User/login", 
        {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(user)
        }
    );
    setNavigate(true);
}
if(navigate){
    return <Navigate to="/"/>
   }

  return (
    <main className="form-signin w-100 m-auto">
  <form onSubmit={submit}>
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
    <div className="form-floating">
      <input type="email" className="form-control" placeholder="name@example.com"  onChange={e => setEmail(e.target.value)} />
    </div>
    <div className="form-floating">
      <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</main>
  );
}

export default Login;
