import React, {useContext, useState} from 'react';
import noteContext from "../context-notes/noteContext";

function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title: '', description: '', tag: ''});
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: '', description: '', tag: ''});
        props.showAlert('Note Added Successfully', 'success');
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <div className="mt-5">
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name={'title'} aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag"  name={'tag'} aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.tag}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description"  name={'description'} rows="3" onChange={onChange}  minLength={5} required value={note.description}></textarea>
                </div>
                <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    );
}

export default AddNote;