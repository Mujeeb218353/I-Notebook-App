import React from 'react';
import noteContext from "../context-notes/noteContext";
import {useContext} from "react";
function NoteItem(props) {
    const {note, updateNote, showAlert} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    return (
        <div className="w-100">
            <div className="card my-3" >
                <div className="card-body">
                    <div className={'d-flex justify-content-between'}>
                        <h3 className="card-title w-75">{note.title}</h3>
                        <div className="container d-flex justify-content-end w-25">
                            <i className="fa-solid fa-trash p-1 mx-1" onClick={() => {deleteNote(note._id); showAlert('Deleted Successfully', 'success');}}></i>
                            <i className="fa-regular fa-pen-to-square p-1 mx-1" onClick={() => {updateNote(note)}}></i>
                        </div>
                    </div>
                    <h5 className="card-subtitle mb-2 text-body-secondary">#{note.tag}</h5>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
}

export default NoteItem;