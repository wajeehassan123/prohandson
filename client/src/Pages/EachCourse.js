import React, { Component } from 'react'
import { TutorHeader } from './TutorHeader'

export class EachCourse extends React.Component {
    constructor(prop){
        super(prop);
        this.state={course:{},imageStr:'./uploads/'};
        this.LoadCourse=this.LoadCourse.bind(this);
        this.LoadCourse();
        
    }
    LoadCourse(){
        var id=localStorage.getItem("course_id");
        fetch(`/api/course/getCourse/${id}`)
.then(response => response.json())
.then(data => {
    console.log(data);
    this.setState({course:data.data});
 
    })
}

    

  

    render() {
        return (
           <>
           <TutorHeader></TutorHeader>
           <div className="container-fluid eachCourseBanner text-white d-flex ">
                <div className="eachCouseBannerLeft col-lg-6">
                    <h4 className="eachCourseCategory fw-bolder mb-3">
                        {this.state.course.title}
                    </h4>
                    <h3 className="eachCourseName  my-4">
                    {this.state.course.description}
                    </h3>
                    <p className="bannerTutorDetail my-3">
                        <span ><img src={'/card_pic.jpg'} alt="logo" /></span>
                        <span>{this.state.course.name}</span>
                    </p>
                    <button className="eachCourseEnroll mt-3">
                        Enroll Now
                    </button>
                </div>

                <div className="eachCouseBannerRight">
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
                    <img src={'peter.jpg'} alt="tutor pic" />
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