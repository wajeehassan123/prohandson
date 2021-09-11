import React, { Component } from 'react'
import { TutorHeader } from './TutorHeader'

export class EachCourse extends React.Component {
    constructor(props){
        super(props);
        // if(!props.data){
        //     window.location.href="/logintutor";
        // }
        this.state={course:{},imageStr:'./uploads/',profileImg:'./uploads/profiles/'};
        this.LoadCourse=this.LoadCourse.bind(this);
        this.handleEnroll=this.handleEnroll.bind(this);
        this.LoadCourse();
        
    }
    LoadCourse(){
        var id=localStorage.getItem("course_id");
        
        fetch(`/api/course/getCourse/${id}`)
.then(response => response.json())
.then(data => {
    console.log(data);
    this.setState({course:data.data});
    console.log(this.state.course);
    console.log(this.state.course.tutor_id);
 
    })
}

handleEnroll(id){
    if(this.props.data){

    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
myHeaders.append("Content-Type", "application/json");
const formData=new FormData();
formData.append("course_id",id);
formData.append("student_id",localStorage.getItem("student_id"));

const requestOptions = {
  method: 'POST',
  contentType:'application/json',
  headers:myHeaders,
  body: JSON.stringify({course_id:id,student_id:localStorage.getItem("student_id"),tutor_id:this.state.course.tutor_id._id})
};
    fetch('/api/student/enroll',requestOptions)
    .then(response => response.json())
  .then(data => 
      {
          if(data.succes)
          {
              alert(data.message);
              window.location.href="/";
          }
          else
          alert(data.message);

      })
    }
    else{
        alert("please login to continue")
    }
}
    

  

    render() {
        return (
           <>
           <TutorHeader></TutorHeader>
           <div className="container-fluid eachCourseBanner text-white d-flex ">
                <div className="eachCouseBannerLeft col-lg-6">
                    <h3 className="eachCourseCategory fw-bolder mb-3">
                        {this.state.course.title}
                    </h3>
                    <h5 className="eachCourseName  my-4">
                    {this.state.course.description}
                    </h5>
                    <p className="bannerTutorDetail my-3">
                        <span >
                        {
                        this.state.course.tutor_id?(
                            <img src={this.state.profileImg+this.state.course.tutor_id.img} alt="tutor pic" />
                   
        ): (
            <img src={this.state.profileImg+this.state.course.img} alt="tutor pic" />
                   
        )
                    }</span>
                        <span>{this.state.course.name}</span>
                    </p>
                    <button onClick={()=>this.handleEnroll(this.state.course._id)} className="eachCourseEnroll mt-3">
                        Enroll Now
                    </button>
                </div>

                <div className="eachCouseBannerRightt">
                    <img className="bannerTutorPic" src={this.state.imageStr+this.state.course.img} alt="coursepic" />
                </div>
            </div>

            <div className="eachCourseDetails">
                <h4 className="eachCourseDetailsHeading">
                    What you'll learn
                </h4>
                <p className="eachCourseDetailsPara">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis veniam minima aperiam alias vel, fugit laboriosam vitae consequuntur. Minima praesentium voluptatum vitae fuga quos totam, animi minus expedita aliquid facere.
                </p>
            </div>

            <div className="eachCourseTutor">
                <h3 className="mb-3">Tutor</h3>
                <div className="eachCourseTutorInner d-flex">
                    {
                        this.state.course.tutor_id?(
                            <img src={this.state.profileImg+this.state.course.tutor_id.img} alt="tutor pic" />
                   
        ): (
            <img src={this.state.profileImg+this.state.course.img} alt="tutor pic" />
                   
        )
                    }
                    <div>
                        <h3>{this.state.course.name}</h3>
                        <h5>{this.state.course.category}</h5>
                    </div>
                </div>
            </div>
           </>
        )
    }
}