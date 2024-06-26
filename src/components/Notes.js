import React, {useContext, useEffect, useRef, useState} from 'react';
import noteContext from "../context-notes/noteContext";
import NoteItem from "./noteItem";
import AddNote from "./addNote";
import {useNavigate} from "react-router-dom";
function Notes(props) {
    const context = useContext(noteContext);
    const { notes , getNote, editNote} = context;
    let navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            getNote();
        }
    },[]);
    const updateNote= (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag});
    }
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id: '', title: '', description: '', tag: ''});
    const handleClick = () =>{
        editNote(note.id, note.title, note.tag, note.description);
        props.showAlert('Updated Successfully', 'success');
        refClose.current.click();
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" className="btn btn-primary my-2 d-none" ref={ref} data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                Edit Note
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name={'title'}
                                           aria-describedby="emailHelp" onChange={onChange} value={note.title}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name={'tag'}
                                           aria-describedby="emailHelp" onChange={onChange} value={note.tag} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" name={'description'} rows="1"
                                              onChange={onChange} value={note.description} required></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    ref={refClose}>Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}
                                    disabled={note.title.length < 5 || note.description.length < 5}>Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-3">
                <h1>Your Notes</h1>
                <div className="container text-center my-5">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {Array.isArray(notes) && notes.map((note) => {
                    return <NoteItem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote}/>
                })}
            </div>
        </>
    );
}

export default Notes;