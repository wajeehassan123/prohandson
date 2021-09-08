
import React from 'react'
import { Card } from '../components/Card'
import { TutorHeader } from './TutorHeader'

export class TutorPanel extends React.Component {

    constructor(props){
        super(props);
        console.log(props);
      this.state={courses:[],img:'./uploads/'}
      this.getCourses=this.getCourses.bind(this);
      if(!props.data){
          window.location.href="/logintutor";
      }
      this.getCourses();
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
    var base64Flag = 'data:image/png/jpg;base64,';
    
    this.setState({courses:data.data});
    console.log(this.state);
}
    )
}
EachCoursePage(id){
    localStorage.setItem("course_id",id);
    window.location.href="/eachcourse";
}

AddCourse(){
    window.location.href="/addcourse";
}

    render(){
       // if(localStorage.getItem("token") && localStorage.getItem("tutor_id")){
        
        
    return (
        <div>
            <TutorHeader></TutorHeader>
            <div className="tutorHeading mt-3">
                <h1>Welcome Tutor</h1>
            </div>
            <div className="tutorMain">
                
            <h3 className="text-left float-left">All courses...</h3>
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
                <div className="tutorStudents">
                <h3 className="text-left float-left">All Students...</h3>
                </div>
            </div>
        </div>
    )
        // }
        // else{
        //     window.location.href="/";

        // }
    }
}
