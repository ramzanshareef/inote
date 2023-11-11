import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const Signup = () => {
    const nav = useNavigate();
    const [credentials, setCredentials] = useState({ "name": "", "email": "", "password": "" });
    const context = useContext(noteContext);
    let [user, setUser] = useState({});
    let { getUser } = context;
    useEffect(() => {
        getUser()
            .then((data) => {
                setUser(data);
            })
    }, []);
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch(backendURL + "/api/auth/signup", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const jsonData = await response.json();
        if (response.status === 200) {
            localStorage.setItem("isAuthenticated", "true");
            nav("/");
            window.location.reload();
        }
        else {
            if (jsonData.errors) {
                jsonData.errors.forEach(error => {
                    console.log(error.msg);
                });
            }
            else{
                console.log(jsonData.message);
            }
        }
    }
    return (
        <>
            {(localStorage.getItem("isAuthenticated")==="false" || !localStorage.getItem("isAuthenticated"))? <>
                <form className="w-2/5 mx-auto my-5 text-lg flex flex-col items-center space-y-3" onSubmit={handleSignup}>
                    <p>Name</p>
                    <input className="border border-black px-2 py-1" type="text" name="name" value={credentials.name} onChange={handleOnChange} />
                    <p>Email</p>
                    <input className="border border-black px-2 py-1" type="email" name="email" value={credentials.email} onChange={handleOnChange} />
                    <p>Password</p>
                    <input className="border border-black px-2 py-1" type="password" name="password" value={credentials.password} onChange={handleOnChange} />
                    <button to="/login" className="rounded-md mx-2 px-2 py-1 w-fit cursor-pointer bg-blue-600 text-white hover:bg-blue-500">Signup</button>
                </form>
            </> : <>
                <div className="flex items-center justify-center my-5">Thanks for Signing Up 
                {user.name}
                !</div>
            </>}
        </>
    )
}

export default Signup