
import React from 'react'
import { Card } from '../components/Card'
import { TutorHeader } from './TutorHeader'
import { FooterAll } from './FooterAll';

export class TutorPanel extends React.Component {

    constructor(props){
        super(props);
        console.log(props);
      this.state={courses:[],students:[],img:'./uploads/'}
      this.getCourses=this.getCourses.bind(this);
      
      this.getStudentCourse=this.getStudentCourse.bind(this);
      if(!props.data){
          window.location.href="/logintutor";
      }
      if(this.props.studentLoginVal){
        window.location.href="/";
      }
      this.getCourses();
      this.getStudentCourse();
}



getCourses(){
    const id=localStorage.getItem("tutor_id");
    
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
fetch(`/api/tutor/getCourse/${id}`,{headers:myHeaders})
.then(response => response.json())
.then(data => {
    console.log(data);
    this.setState({ courses:data.data});
    
    console.log(this.state);
}
    )
}

getStudentCourse(){
    const id=localStorage.getItem("tutor_id");
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    fetch(`/api/tutor/getEnrolled/${id}`,{headers:myHeaders})
    .then(response => response.json())
    .then(data => {
        console.log(data);
       this.setState({ students:data});
        
       
        console.log(this.state);
    }
        )

}

EachCoursePage(id){
    localStorage.setItem("course_id",id);
    window.location.href="/editcourse";
}

AddCourse(){
    window.location.href="/addcourse";
}

    render(){
       // if(localStorage.getItem("token") && localStorage.getItem("tutor_id")){
        
        
    return (
        <div>
            
            <TutorHeader/>
            <div className="tutorHeading mt-3">
                <h1>Welcome Mentor</h1>
            </div>
            <div className="tutorMain">
                
            <h3 className="text-left float-left">All skills...</h3>
                <div className="tutorCourses">
               
            {this.state.courses.map(eachCourse=>{
                return (
                    <div className="card_body col-lg-2 col-md-4 col-sm-12"  onClick={()=>this.EachCoursePage(eachCourse._id)}>   
                    <Card key={eachCourse._id} {...eachCourse} />
                </div>
                )
            })}
        <button onClick={this.AddCourse} className="addCourseBtn text-white">
                                +
                                <h4>Add Course</h4>
                        </button>
                <hr></hr>
                </div>
                <hr/>
                {/* <div className="tutorStudents">
                <h3 className="text-left float-left">All Students...</h3>
                </div> */}
            </div>
            <FooterAll/>
        </div>
    )
     
    }
}
