import React from "react";
// import bootstrap from 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.scss'
// import Button from 'react-bootstrap/Button';

// import { Navbar } from './Pages/Navbar'
// import { HomePage } from "./Pages/HomePage";
import { Navbar } from "./Pages/Navbar";
import { Footer } from "./Pages/Footer";
import { LoginPage } from "./Pages/LoginPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { SignupPage } from "./Pages/SignupPage";
import { Header } from "./Pages/Header";
import { SignupTutor } from "./Pages/SignupTutor";
import { TutorPanel } from "./Pages/TutorPanel";
import { AddCourse } from "./Pages/AddCourse";

import { EachCourse } from "./Pages/EachCourse";
import { LoginContainer } from "./Pages/LoginContainer";
import { LoginTutor } from "./Pages/LoginTutor";
// import { EditProfile } from "./Pages/EditProfile";
import { EditProfile } from "./Pages/EditProfile"; 
import jwt from 'jsonwebtoken';

function App() {
var isloggedin=false;
  if(localStorage.token){

jwt.verify(localStorage.token,'longer-secret-is-better',(err,res)=>{
  if(err){
    isloggedin=false;
    localStorage.clear();
  }
  else{
    isloggedin=true;
  }
})

  }

  return (

   <>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/loginStudent">
        <LoginPage />
      </Route>
      <Route path="/loginTutor">
        <LoginTutor />
      </Route>
      <Route path="/loginContainer">
        <LoginContainer />
      </Route>
      <Route path="/Signup">
        <SignupPage />
      </Route>
      <Route path="/Signuptutor">
        <SignupTutor></SignupTutor>
      </Route>
      <Route path="/tutorPanel">
        <TutorPanel data={isloggedin}/>
      </Route>
      <Route path="/addcourse">
        <AddCourse data={isloggedin}/>
      </Route>
      <Route path="/eachcourse">
        <EachCourse />
      </Route>
      <Route path="/editprofile">
        <EditProfile data={isloggedin}/>
      </Route>

      
    </Switch>
   </>
  );
}

export default App;