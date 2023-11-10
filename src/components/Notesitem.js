import React from "react"
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Notesitem = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;
    const handleDelClick = ()=>{
        deleteNote(note._id);
    }
    const handleEditClick = ()=>{
        editNote(note._id, note.title, note.description, note.tag);
    }
    return (
        <div className="border border-slate-400 w-60 rounded-lg bg-white hover:bg-slate-200">
            <div className="p-3">
                <div className="flex items-center space-x-2">
                    <h5 className="text-lg text-neutral-800 font-medium">{note.title}</h5>
                    <i className="cursor-pointer fa-regular fa-pen-to-square" onClick={handleEditClick}></i>
                    <i className="cursor-pointer fa-solid fa-trash" onClick={handleDelClick}></i>
                </div>
                <p className="text-neutral-600 my-2">
                    {note.description}
                </p>
            </div>
        </div>
    )
}

export default Notesitem