import React from "react";
// import bootstrap from 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.scss'
import { LoginPage } from "./Pages/LoginPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { SignupPage } from "./Pages/SignupPage";
import { SignupTutor } from "./Pages/SignupTutor";
import { TutorPanel } from "./Pages/TutorPanel";
import { AddCourse } from "./Pages/AddCourse";

import { EachCourse } from "./Pages/EachCourse";
import { LoginContainer } from "./Pages/LoginContainer";
import { LoginTutor } from "./Pages/LoginTutor";
import { EditProfile } from "./Pages/EditProfile"; 
import jwt from 'jsonwebtoken';
import { ChangePassword } from "./Pages/ChangePassword";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {SearchResults} from "./Pages/SearchResults";
import { SetAvailability } from "./Pages/SetAvailability";
import {FooterAll} from "./Pages/FooterAll";
import {EditCourse} from "./Pages/EditCourse";

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
   <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme= "colored"
    />
{/* Same as */}
<ToastContainer />
    <Switch>
      <Route exact path="/">
        <HomePage studentLoginVal={studentLogin} data={isloggedin} studentCourses={mycourses}/>
      </Route>
      <Route path="/loginStudent">
        <LoginPage data={isloggedin}/>
      </Route>
      <Route path="/loginTutor">
        <LoginTutor data={isloggedin}/>
      </Route>
      <Route path="/loginContainer">
        <LoginContainer  data={isloggedin}/>
      </Route>
      <Route path="/Signup">
        <SignupPage data={isloggedin}/>
      </Route>
      <Route path="/Signuptutor">
        <SignupTutor data={isloggedin}/>
      </Route>
      <Route path="/tutorPanel">
        <TutorPanel studentLoginVal={studentLogin} data={isloggedin}/>
      </Route>
      <Route path="/searchresults">
        <SearchResults studentLoginVal={studentLogin} data={isloggedin}/>
      </Route>
      <Route path="/addcourse">
        <AddCourse studentLoginVal={studentLogin}  data={isloggedin}/>
      </Route>
      <Route path="/eachcourse">
        <EachCourse data={isloggedin}/>
      </Route>
      <Route path="/editprofile">
        <EditProfile studentLoginVal={studentLogin} data={isloggedin}/>
      </Route>
      <Route path="/editcourse">
        <EditCourse studentLoginVal={studentLogin} data={isloggedin}/>
      </Route>
      <Route path="/changepassword">
        <ChangePassword studentLoginVal={studentLogin} data={isloggedin}/>
      </Route>
      <Route path="/set">
        <SetAvailability studentLoginVal={studentLogin}  data={isloggedin}/>
      </Route>


      
    </Switch>

    {/* <FooterAll/> */}
   </>
  );
}

export default App;