import React from "react"
import { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
// import EditNode from "./EditNode";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }
    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <form className="space-y-2">
                <div>
                    <h2 className="text-2xl font-bold">Add a Note</h2>
                    <p>Title</p>
                    <input type="text" className="w-full border border-black p-1 rounded-sm" id="title" value={note.title} name="title" onChange={handleOnChange} />
                    <p className={note.title.length < 5 && note.title.length > 0 ? "block text-gray-600" : "invisible"}>Enter a Valid Title</p>
                </div>
                <div>
                    <p>Description</p>
                    <input type="text" className="w-full border border-black p-1 rounded-sm" id="description" value={note.description} name="description" onChange={handleOnChange} />
                    <p className={note.description.length < 10 && note.description.length > 0 ? "block text-gray-600" : "invisible"}>Enter a Valid Description</p>
                </div>
                <div>
                    <p>Tag</p>
                    <input type="text" className="w-full border border-black p-1 rounded-sm" id="tag" value={note.tag} name="tag" onChange={handleOnChange} />
                    <button type="submit" disabled={note.title.length < 5 || note.description.length < 10} className="rounded-md my-2 px-2 py-1 bg-blue-400 hover:bg-blue-600 hover:text-white disabled:bg-blue-400 disabled:cursor-not-allowed disabled:hover:text-black" onClick={handleClick}>Add Note</button>
                </div>
            </form>
            {/* <EditNode /> */}
        </>
    )
}

export default AddNote