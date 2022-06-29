import React, { useState, useEffect } from 'react';

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
    <section className="Home--main">
      <button onClick={logout}>logout</button>
    </section>
  );
}

export default Logout;
 
