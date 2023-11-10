import React, { useState } from "react"
import Notesitem from "./Notesitem";
import AddNote from "./AddNote";
import { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Notes = () => {
    const nav = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, getUser } = context;
    let [user, setUser] = useState({})
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
            getUser()
            .then((data) => {
                setUser(data);
            })
        }
        else {
            nav("/login");
        }
    }, [])
    if (localStorage.getItem("token")){
        document.title = user.name + "'s Notes"
    }

    return (
        <div className="my-4">
            <AddNote />
            <h2 className="text-2xl my-2">Your Notes</h2>
            <div className="flex flex-wrap gap-3">
                {notes.length === 0 && "No notes to display"}
                {notes.map((note) => {
                    return <Notesitem note={note} key={note._id} />
                })}
            </div>
        </div>
    )
}

export default Notes