import React, { Component } from 'react'
import Reviews from '../components/Reviews';
import { TutorHeader } from './TutorHeader'
import {AllReviews} from '../components/AllReviews';
import ReactModal from 'react-modal';
import { SetAvailability } from './SetAvailability';
import {SetAvail} from './SetAvail'

export class EachCourse extends React.Component {
    constructor(props){
        super(props);
        // if(!props.data){
        //     window.location.href="/logintutor";
        // }
        this.state = {
            showModal: false
          };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);


        this.state={course:{},reviews:[],isReviewed:false,imageStr:'./uploads/',profileImg:'./uploads/profiles/',isEnroll:false,completed:false};
        this.LoadCourse=this.LoadCourse.bind(this);
        this.handleEnroll=this.handleEnroll.bind(this);
        this.LoadCourse();
        
    }

    handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }
    
    LoadCourse(){
        var id=localStorage.getItem("course_id");
        
        fetch(`/api/course/getCourse/${id}`)
.then(response => response.json())
.then(data => {
    //console.log(data);
    this.setState({course:data.data});
    
if(this.props.data){
    
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    fetch(`/api/enroll/getStudentCourse/${localStorage.student_id}/${id}`,{headers:myHeaders})
    .then(response1=>response1.json())
    .then(allEnrolled=>{
        if(allEnrolled){
            this.setState({isEnroll:true});
            
            if(allEnrolled.is_active){
                
            this.setState({isEnroll:false});
            this.setState({completed:true});
                        }
        console.log(allEnrolled);
        console.log(data);
        }
    })

}
fetch(`/api/courses/getReviews/${id}`)
            .then(response2=>response2.json())
            .then(AllReviewed=>{
                if(AllReviewed){
                    if(this.props.data){
                    AllReviewed.map(eachRev=>{
                        if(eachRev.student_id._id==localStorage.student_id && eachRev.course_id==id){

                            this.setState({isReviewed:true});
                        }
                    })
                }
                    this.setState({reviews:AllReviewed});
                    
                }
            })


 
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
formData.append("is_active",false);

const requestOptions = {
  method: 'POST',
  contentType:'application/json',
  headers:myHeaders,
  body: JSON.stringify({course_id:id,student_id:localStorage.getItem("student_id"),tutor_id:this.state.course.tutor_id._id,is_active:false})
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
        alert("please login to continue");
        window.location.href="/loginstudent";
    }
}
    


MarkAsComplete(id){
    
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    fetch(`/api/enroll/markAsComplete/${localStorage.student_id}/${id}`,{headers:myHeaders,method:'PUT'})
    .then(response => response.json())
  .then(data => 
      {
          if(data.success)
          {
              alert(data.message);
          }
          else
          alert(data.message);

      })

}

render() {
        let allObjs=[]
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
                    {
                        this.state.isEnroll?(
                            <div>
<button disabled className="eachCourseEnroll mt-3">
                        Enrolled
                    </button>
                    <button onClick={()=>this.MarkAsComplete(this.state.course._id)} className="eachCourseEnroll mt-3">
                        Mark as Complete
                    </button>
                    </div>
                        ):(
<button onClick={this.handleOpenModal} className="eachCourseEnroll mt-3">
{/* <button onClick={()=>this.handleEnroll(this.state.course._id)} className="eachCourseEnroll mt-3"> */}
                        Enroll Now
                    </button>
                        )
                    }
                    <ReactModal 
                        isOpen={this.state.showModal}
                        contentLabel="Minimal Modal Example"
                        >
                        <button onClick={this.handleCloseModal} className="btn btn-danger">Close Modal</button>
                        <SetAvail/>
                    </ReactModal>
                </div>

                <div className="eachCouseBannerRightt">
                    <img className="bannerTutorPic" src={this.state.imageStr+this.state.course.img} alt="coursepic" />
                </div>
            </div>
{
    this.state.completed && !this.state.isReviewed?(
<Reviews/>
    ):(
<div></div>
    )
} 

{
    this.state.reviews.map(eachReview=>{
return(        
<AllReviews {...eachReview} key={eachReview._id} />
)
})
}
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