import noteContext from "./noteContext";
import {useState} from "react";
const NoteState = (props) => {
    let host = process.env.REACT_APP_BACKEND_URI || "http://localhost:8080";
    const [notes, setNotes] = useState([]);
    const getNote = async () => {
        let url = `${host}/api/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        
        setNotes(json);
    }
    // Add Note
    const addNote = async (title, description, tag) => {
        let url = `${host}/api/notes/addnotes`;
        // eslint-disable-next-line
        const response = await fetch(url, {
            method: 'POST',  // Change the method to POST
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        console.log(localStorage.getItem('token'));
        const note = await response.json();
        setNotes(notes.concat(note));
    };
    // Delete Note
    const deleteNote = async (id) => {
        let url = `${host}/api/notes/deletenote/${id}`;
        // eslint-disable-next-line
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')            },
        })
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    // Edit Note
    const editNote = async (id, title, tag, description) => {
        let url = `${host}/api/notes/updatenote/${id}`;
        // eslint-disable-next-line
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, tag, description})
        })
        const newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].tag = tag;
                newNotes[index].description = description;
            break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <noteContext.Provider value={ {notes, getNote, deleteNote, editNote, addNote} }>
            {props.children}
        </noteContext.Provider>
    );
};
export default NoteState;