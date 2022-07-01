import React, { useEffect } from 'react';
import "../CSS/Home.css";

const Home = () => {

    useEffect(() => {
      
    }, [])

  return (
    <section className="Home--main">
        <text className="Home--text">Welcome to this todo app, get lost in all the tasks, omg, no its supposed to help you get some order in your life!</text>
        {/* <img className="Home--img" src="https://essential.blue/wp-content/uploads/2021/07/IMG_6432-scaled-e1632669305502.jpg"alt=""></img> */}
        <img className="Home--img" src="https://routescoffee.co.uk/wp-content/uploads/2020/01/IMG_3498.jpg"alt=""></img>

    </section>
  );
}

export default Home;


