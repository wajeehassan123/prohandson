import React from 'react'
import {Row, Form} from 'react-bootstrap';
// import './../css/HomePage.css'

import { Navbar } from './Navbar'
import { Card } from '../components/Card'
import { Cards } from '../components/Cards'
import { Header } from './Header';
import { TutorHeader } from './TutorHeader';
import { MyCourseCard } from '../components/MyCourseCard';
import { HeaderLogginIn } from './HeaderLoggedIn';


const MyContext=React.createContext();

export class HomePage extends React.Component {

    constructor(props){
        super(props);
      this.state={courses:[],img:'',isLoggedIn:false,mycourses:[]}
      this.getCourses=this.getCourses.bind(this);
      this.getCourses();
      this.HandleCategories=this.HandleCategories.bind(this);
      //this.getStudentCourse=this.getStudentCourse.bind(this);
      if(props.studentLoginVal && props.data){
          this.getStudentCourse()
      }
      
      console.log(props)
    //   this.fun();
}

componentWillMount() {
    // this.fun=this.fun.bind(this);
}

arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

getCourses(){
fetch(`/api/courses/getAll`)
.then(response => response.json())
.then(data => {
    this.setState({ courses:data});
    
    
}
    )
}


HandleCategories(event){
    //this.setState({courses:undefined})
    
    fetch(`/api/tutor/getCourseByCategory/${event.target.innerText}`)
    .then(response => response.json())
    .then(data=>{
        console.log(data);
        this.setState({courses:data.data});
    })
}

// fun(){
    
//     if(localStorage.getItem("token") && localStorage.getItem("tutor_id")){
//         this.setState({isLoggedIn:true});
//         return true;
//     }
// }

EachCoursePage(id){
   
    localStorage.setItem("course_id",id);
    window.location.href="/eachcourse";
}


getStudentCourse(){
    const id=localStorage.getItem("student_id");
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    fetch(`/api/course/getEnrolled/${id}`,{headers:myHeaders})
    .then(response => response.json())
    .then(data => {
       this.setState({ mycourses:data});
        
       
        console.log(this.state);
    }
        )

}
handleCallback = (childData) =>{
    localStorage.setItem("search",childData);
    window.location.href="/searchresults";

    



}


    // if(localStorage.getItem("token")){
        render(){
            // const isLogin = this.state.isLoggedIn;
            // const IsLogged=()=>{
            //     if(localStorage.getItem("token") && localStorage.getItem("tutor_id")){
            //        return <HeaderLogginIn/>
            //     }
            //     else{
            //        return <Header></Header>
            //     }
            // }
            let HeaderToShow;
            if(this.props.studentLoginVal&&this.props.data)
                HeaderToShow = <HeaderLogginIn parentCallback = {this.handleCallback}/>
            else if(!this.props.studentLoginVal&&this.props.data)
                HeaderToShow = <TutorHeader/>
            else
                HeaderToShow =  <Header parentCallback = {this.handleCallback}></Header>
    return (
       
        <>
          
{HeaderToShow}

    {
        // this.props.studentLoginVal&&this.props.data?(
            
        //     <HeaderLogginIn parentCallback = {this.handleCallback}/>
        // ): (
        //     <Header parentCallback = {this.handleCallback}></Header>
        // )

        
    }



           {/* HEADER1 */}
           <div className="HomeHeader1">
                <div className="innerHomeHeader1 ">
                    {/* <div className="innerHomeHeader1Left col-lg-8 col-sm-12 fw-bolder">
                        <div className="innerHomeHeader1Top m-2 p-2 bg-light">Professional Hands On</div>
                        <div className="text-white">Your Best Guided Learning Experience</div>
                    </div> */}
                    <div className="innerHomeHeader1Right ">
                        <img src={'/homepage_banner.jpg'} alt="pic" />
                    </div>
                </div>
            </div>

            {/* HEADER2 */}
          <div className="HomeHeader2 py-3 bg-light">
                <div className="HomeHeader2Text ">
                    Build Professional Relationship while guiding practical Hand-son skills live
                </div>
            </div>

            
            {console.log(this.props.studentLoginVal)}
            {console.log(this.props.data)}
            {this.props.studentLoginVal&&this.props.data?(
            
            <div className="Home_MyCourses">
                        <h2 className="your_courses">Your Courses</h2>
                        
                        {this.state.mycourses.map(eachCourse=>{
                return (

                    <MyCourseCard key={eachCourse._id} {...eachCourse}></MyCourseCard>
                )})}
                    </div>
            ):(
                <div></div>
            )}

            {/* CATEGORY BUTTONS */}
            <h2 className="fw-left">Choose Courses</h2>
            <div className="CategoryBtns ">
                
            <button onClick={this.getCourses} className="btn text-white ">Popular</button>
                <button onClick={this.HandleCategories} className="btn text-white">Music</button>
                <button onClick={this.HandleCategories} className="btn text-white">IT</button>
                <button onClick={this.HandleCategories} className="btn text-white">Sports</button>
                <button onClick={this.HandleCategories} className="btn text-white">Dance</button>
                <button onClick={this.HandleCategories} className="btn text-white">Animal Care</button>
            </div>
            <div className="homePageCards" >
            {this.state.courses.map(eachCourse=>{
                return (
                 <div className="card_body  mrg"  onClick={()=>this.EachCoursePage(eachCourse._id)}>   
                <Card key={eachCourse._id} {...eachCourse} />
                </div>
                )
            })}

{/* col-lg-2 col-md-4 col-sm-12 */}
            </div>
            <div className="HomeHeader3 bg-light my-3">
                <div className="fw-bolder">Why Use ProHandson</div>
                <div className="">
                    Industry Leading experts guideance will take you from zero skills to excellence.
                    <br/>
                    Step by Step Guidance tailored to your calendar and other requirements.
                    <br/>
                    Our premier Screen Sharing application faciliate Monitoring your progress as you are practicing Hands-on.
                    <br/>
                    Whether you are comfortable with third party sharing device or in-built screen sharing tools.
                </div>
            </div>
        </>
    )
    // }
    // else{
    //     window.location.href="/login";
    // }
        }
}
