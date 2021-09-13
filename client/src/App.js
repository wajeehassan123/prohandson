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
import { ChangePassword } from "./Pages/ChangePassword";

import {SearchResults} from "./Pages/SearchResults";

function App() {
  var isloggedin=false;
  var studentLogin=false;
  let mycourses=[];
  var isEnrolled=false;
    if(localStorage.token){
  
  jwt.verify(localStorage.token,'longer-secret-is-better',(err,res)=>{
    if(err){
      isloggedin=false;
      localStorage.clear();
    }
    else{
      if(localStorage.student_id){
        getStudentCourse()
        studentLogin=true;

      }
      isloggedin=true;
    }
  })
  
    }

    function getStudentCourse(){
      const id=localStorage.getItem("student_id");
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
      fetch(`/api/course/getEnrolled/${id}`,{headers:myHeaders})
      .then(response => response.json())
      .then(data => {
          //console.log(data);
          data.map(eachData=>{
            if(eachData.student_id && eachData.course_id)
            {
              isEnrolled=true;
            }
          })
          mycourses=data; 
          console.log(mycourses);
          
         
      }
          )
  
  }

  return (

   <>
    <Switch>
      <Route exact path="/">
        <HomePage studentLoginVal={studentLogin} data={isloggedin} studentCourses={mycourses}/>
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
      <Route path="/searchresults">
        <SearchResults data={isloggedin}/>
      </Route>
      <Route path="/addcourse">
        <AddCourse data={isloggedin}/>
      </Route>
      <Route path="/eachcourse">
        <EachCourse data={isloggedin}/>
      </Route>
      <Route path="/editprofile">
        <EditProfile data={isloggedin}/>
      </Route>
      <Route path="/changepassword">
        <ChangePassword data={isloggedin}/>
      </Route>


      
    </Switch>
   </>
  );
}

export default App;