import React, { useContext } from "react"
import noteContext from "../context/notes/noteContext";
import { useState, useEffect } from "react";

const About = () => {
    const context = useContext(noteContext);
    let { getUser, notes, getNotes } = context;
    let [user, setUser] = useState({});
    useEffect(() => {
        getUser()
            .then((data) => {
                getNotes();
                setUser(data);
            })
    }, []);
    document.title = user.name + " | iNote";
    return (
        <div>
            <div>
                This is the notes of <i><b>{user.name}</b></i> with email <i><b>{user.email}</b></i> has <i><b>{notes.length}</b></i> notes
            </div>
        </div>
    )
}

export default About