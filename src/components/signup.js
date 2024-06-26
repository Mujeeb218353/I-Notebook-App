import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
function Signup(props) {
        const [credentials, setCredentials] = useState({name: '', email: '', password: '', confirmPassword: ''});
        let navigate = useNavigate();
        const {name, email, password} = credentials;
    const handleClick = async (e) => {
        e.preventDefault();
        if(credentials.password !== credentials.confirmPassword){
            props.showAlert('Passwords do not match', 'danger');
            return;
        }
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token', json.authToken);
            props.showAlert('Account Created Successfully', 'success');
            navigate('/');
        }else {
            props.showAlert('Invalid Credentials', 'danger');
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    return (
        <form onSubmit={handleClick}>
            <h1 className="my-3">Create an account to use iNotebook</h1>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       name="name" value={credentials.name} onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Username</label>
                <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"
                       name="email" value={credentials.email} onChange={onChange} required minLength={5}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                       value={credentials.password} onChange={onChange} required minLength={5}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" name="confirmPassword"
                       value={credentials.confirmPassword} onChange={onChange} required minLength={5}/>
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    );
}

export default Signup;
