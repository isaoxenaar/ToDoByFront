import React, {useState, useEffect } from "react";

const AuthUser = () => {
    const [name, setName] = useState("")
    useEffect(() => {

        (
            async () => {
                const request = await fetch("https://todoby.azurewebsites.net/api/Auth", 
                    {
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                    }
                )
                const response = await request.json();
                console.log(request)
                setName(response.name);

            }
            )()
    }, [])

    return ( <div className="Auth--main">
                hej name {name}
            </div>
    )
}

export default AuthUser;