import React, { useEffect } from 'react';
import "../CSS/Login.css";

const Logout = () => {

  const logout = async () => {
    const response = await fetch("https://todoby.azurewebsites.net/api/Auth/logout",
        {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        }
    );
    console.log(response.json())
  }

    useEffect(() => {
   
    }, [])

  return (
    <section className="Logout--main">
      <button className="w-100 btn btn-lg" onClick={logout}>Logout</button>
    </section>
  );
}

export default Logout;
 
