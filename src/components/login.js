import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    let navigate = useNavigate();
    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token', json.authToken);
            props.showAlert('Logged in Successfully', 'success');
            navigate('/');
        }else {
            // navigate('/login');
            props.showAlert('Invalid Credentials', 'danger');
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <form onSubmit={handleClick}>
            <h1>Login</h1>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       name="email" onChange={onChange} value={credentials.email}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password"
                       onChange={onChange} value={credentials.password}/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
}

export default Login;
