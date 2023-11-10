import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const EditNode = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    const handleOnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div className="relative z-10">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-start justify-center p-4">
                    <form className="bg-white rounded-sm p-2 space-y-2 w-2/5">
                        <h2 className="text-2xl font-bold border-b-2 border-b-gray-200 flex items-center justify-between"><p>Edit Note</p> <i className="fa-solid fa-rectangle-xmark fa-lg cursor-pointer"></i></h2>
                        
                        <p>Title</p>
                        <input type="text" className="w-full border border-black px-2 py-1 rounded-sm" id="title" name="title" onChange={handleOnChange} />
                        <p>Description</p>
                        <input type="text" className="w-full border border-black px-2 py-1 rounded-sm" id="description" name="description" onChange={handleOnChange} />
                        <p>Tag</p>
                        <input type="text" className="w-full border border-black px-2 py-1 rounded-sm" id="tag" name="tag" onChange={handleOnChange} />
                        <div className="flex flex-row-reverse ">
                            <button type="submit" className="rounded-md m-2 px-2 py-1 bg-blue-400 hover:bg-blue-600  hover:text-white" >Close</button>
                            <button type="submit" className="rounded-md m-2 px-2 py-1 bg-blue-400 hover:bg-blue-600  hover:text-white" onClick={handleClick}>Edit Note</button>

                        </div>
                    </form>
                </div>
            </div>
        </div >

    )
}

export default EditNode