import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import noteContext from "../context/notes/noteContext";
const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const Navbar = () => {
    let location = useLocation();
    const nav = useNavigate();
    const context = useContext(noteContext);
    let { getUser } = context;
    let [user, setUser] = useState({});
    useEffect(() => {
        getUser()
            .then((data) => {
                setUser(data);
            })
    }, []);
    const handleLogOut = async (e) => {
        e.preventDefault();
        const response = await fetch(backendURL + "/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        const jsonData = await response.json();
        if (response.status === 200) {
            localStorage.setItem("isAuthenticated", "false");
            nav("/login")
            window.location.reload();
        }
        else {
            console.log(jsonData.message);
        }
        document.title = "iNote - Your Notes on the Web";
    }
    return (
        <nav className="sticky top-0 z-10 p-1 bg-gray-800 text-gray-400">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center">
                    <li className="list-none m-2 cursor-pointer text-xl">
                        <Link to={"/"}>iNote</Link>
                    </li>
                    <li className="list-none m-2 cursor-pointer">
                        <Link to={"/"} className={`${location.pathname === "/" ? "text-white" : ""}`}>Home</Link>
                    </li>
                    {localStorage.getItem("isAuthenticated")==="true" ? <>
                        <li className="list-none m-2 cursor-pointer">
                            <Link to={"/about"} className={`${location.pathname === "/about" ? "text-white" : ""}`}>About</Link>
                        </li>
                    </> : <></>}
                </div>
                <div>
                    {(localStorage.getItem("isAuthenticated")==="false" || !localStorage.getItem("isAuthenticated"))? <>
                        <Link to="/login" className="rounded-sm mx-2 px-2 py-1 cursor-pointer bg-blue-600 text-white hover:bg-blue-500">Login</Link>
                        <Link to="/signup" className="rounded-sm mx-2 px-2 py-1 cursor-pointer bg-blue-600 text-white hover:bg-blue-500">Signup</Link></> :
                        <>
                            <Link className="border-2 border-white rounded-2xl px-2 py-1" to="/about" >
                                <i className="fa-regular fa-user fa-lg cursor-pointer text-white"></i>
                            </Link>
                            <span className="text-white mx-2">{user.name}</span>
                            <button className="rounded-sm mx-2 px-2 py-1 cursor-pointer bg-blue-600 text-white hover:bg-blue-500" onClick={handleLogOut}>Logout</button>
                        </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar