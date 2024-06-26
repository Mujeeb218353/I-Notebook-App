import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {useState} from 'react';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context-notes/noteState";
import Alert from "./components/alert";
import Login from "./components/login";
import Signup from "./components/signup";
function App() {
    const [alert, setAlert] = useState(null);
    const showAlert = (message,type) => {
        setAlert({
            msg: message,
            typ: type
        });
        setTimeout(()=>{
            setAlert(null)
        },3000);
    }
  return (
    <div>
     <NoteState>
        <Router>
           <Navbar/>
            <Alert alert={alert}/>
            <div className="container">
                <Routes>
                    <Route exact path={'/'} element={<Home showAlert={showAlert}/>}/>
                    <Route exact path={'/about'} element={<About showAlert={showAlert}/>}/>
                    <Route exact path={'/login'} element={<Login showAlert={showAlert}/>}/>
                    <Route exact path={'/signup'} element={<Signup showAlert={showAlert}/>}/>
                </Routes>
            </div>
        </Router>
     </NoteState>
    </div>
  );
}

export default App;
