import React from 'react'
import Reviews from '../components/Reviews';
import { TutorHeader } from './TutorHeader'
import {AllReviews} from '../components/AllReviews';
import ReactModal from 'react-modal';
import {SetAvail} from './SetAvail'
import {CardElement,Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './../components/CheckoutForm';

export class EachCourse extends React.Component {
    constructor(props){
        super(props);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.state={course:{},reviews:[],isReviewed:false,
        imageStr:'./uploads/',profileImg:'./uploads/profiles/',
        isEnroll:false,completed:false,
        showModal: false,
        showPaymentPage:false,
        cust_id:'',
    tutor_id:'',
    stripePromise:loadStripe("pk_test_51JfrS5JYZfgfoVPyWJrvgJsQtYCWNKx3c41UFQVNbJdqVuUpsf5n2hyZ9RW4ynUyHfXFcQNQomyPiBwFrhnjTaKM00PSiZS6Mk")
};
        this.LoadCourse=this.LoadCourse.bind(this);
        this.handleEnroll=this.handleEnroll.bind(this);
        this.handlePayment=this.handlePayment.bind(this);
        this.getStudentData=this.getStudentData.bind(this);
        
        
    }
    componentDidMount(){
        this.LoadCourse();
        this.getStudentData();
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
    this.setState({course:data.data});
    
    this.setState({tutor_id:data.data.tutor_id._id})
    
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

getStudentData(){
    if(localStorage.student_id){
               
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
        fetch(`/api/student/${localStorage.student_id}`,{headers:myHeaders})
        .then(response => response.json())
  .then(data => 
      {
          console.log(data);
          if(data.success){
              
            this.setState({cust_id:data.data.cust_id})
 
              

          }
      })
 
    }
}

handlePayment=async(id)=>{
    this.setState({showPaymentPage:true})
    
    // const stripe = await this.state.stripePromise;
    // const response = await fetch(
    //     "/create-checkout-session",
    //     {
    //       method: "POST",
    //       body:JSON.stringify({price:this.state.course.price,title:this.state.course.title,cust_id:this.state.cust_id}),
    //       headers:{"Content-Type":"application/json"}
    //     }
    //   );
    //   const session = await response.json();
    //   // When the customer clicks on the button, redirect them to Checkout.
    //   const result = await stripe.redirectToCheckout({
    //     sessionId: session.id,
    //   })
    //   console.log(result);
    //   if (result.error) {
    //       alert("error occured")
    //     // If `redirectToCheckout` fails due to a browser or network
    //     // error, display the localized error message to your customer
    //     // using `result.error.message`.
    //   }
    //   else{
    //       this.handleEnroll(this.state.course._id)
    //   }

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
        return (
           <>
           <TutorHeader></TutorHeader>
           <div className="container-fluid eachCourseBanner text-white d-flex ">
                <div className="eachCouseBannerLeft col-lg-6">
                    <h3 className="eachCourseCategory fw-bolder mb-3">
                        {this.state.course.title}
                    </h3>
                    <h5 className="eachCourseName  my-4">
                    {/* {this.state.course.description} */}
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
                        <button onClick={this.handleCloseModal} className="btn btn-danger">Close</button>
                        
                        {
                            this.state.showPaymentPage?(
                                <div>
                                    <h1>Card</h1>
                                    {/* <form id="payment-form"> */}
                                        <label htmlFor="card-element">Card</label>
{/*                                       
                                        <CardElement id="card-element" /> */}
                                        <Elements stripe={this.state.stripePromise}>
                                        <CheckoutForm />
                                        </Elements>
                                        
                                        
                                       
                                    {/* </form> */}

                                </div>
                            ):(
                                <div>
 <div>
                        {/* <button onClick={()=>this.handleEnroll(this.state.course._id)} className="btn btn-success" >Enroll</button> */}
                        <button onClick={()=>this.handlePayment(this.state.course._id)} className="btn btn-success" >Enroll</button>
                   
                        </div>
                        <SetAvail tutor_id={this.state.tutor_id}/>
                                </div>
                            )
                        }
                       
                        
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
                {this.state.course.description}
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