import React, {useState, useEffect} from 'react';

const Home = () => {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        (
        async () => {
        const response = await fetch("https://todoby.azurewebsites.net/api/User/user", {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', 
        })
            const content = await response.json();
            setName(content.name);
        }
        )();

    }, [])
  return (
    <div className="Home">
        hi {name}
    </div>
  );
}

export default Home;
