import React from 'react'
import { Form} from 'react-bootstrap';
import { TutorHeader } from './TutorHeader'

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FooterAll } from './FooterAll';
import { HeaderSearchless } from './HeaderSeachless';
import { HeaderLogginInSearchless } from './HeaderLogginInSearchless';

import SimpleFileUpload from 'react-simple-file-upload'
export class EditProfile extends React.Component {

    constructor(props){
        super(props);
        if(!props.data){
            window.location.href="/logintutor";
        }
        
        this.state = {username: '',password:'',first_name:'',last_name:'',password2:'',
        email:'',country:'',city:'',
        selectValue:'',imageStr:'./uploads/profiles/',img:'',file:null
    };
        
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleFirstName=this.handleFirstName.bind(this);
        this.handleLastName=this.handleLastName.bind(this);
        this.handleUsername=this.handleUsername.bind(this);
        this.handlePassword2=this.handlePassword2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCity=this.handleCity.bind(this);
        this.handleCountry=this.handleCountry.bind(this);
        this.handleFile=this.handleFile.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.getUser=this.getUser.bind(this);
        this.getUser();
    }
    getUser(){
        if(localStorage.tutor_id){

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
        var tutor_id=localStorage.getItem("tutor_id");
        if(tutor_id){
        fetch(`/api/tutor/${tutor_id}`,{headers:myHeaders})
        .then(response => response.json())
        .then(data=>{
this.setState({first_name:data.data.first_name,last_name:data.data.last_name,email:data.data.email,country:data.data.country,city:data.data.city,img:data.data.img,file:data.data.img})

        })
        


        }

        console.log(this.state.imageStr);
        console.log(this.state.img);
    }
    else if(localStorage.student_id){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
        myHeaders.append("Content-Type", "application/json");
        
        fetch(`/api/student/${localStorage.student_id}`,{headers:myHeaders})
        .then(response => response.json())
        .then(data=>{
this.setState({first_name:data.data.first_name,last_name:data.data.last_name,email:data.data.email,country:data.data.country,city:data.data.city,img:data.data.img})
console.log(data);
        })
        



    }
    }

    handleEmail(event) {
        this.setState({email: event.target.value});
      }
      handlePassword(event){
        this.setState({password:event.target.value});
      
      }
      handleUsername(event) {
        this.setState({username: event.target.value});
      }
      handlePassword2(event){
        this.setState({password2:event.target.value});
      
      }
      handleFirstName(event){
          
        this.setState({first_name: event.target.value});
      }

      handleLastName(event){
          
        this.setState({last_name: event.target.value});
      }
      handleSelect(event){
          this.setState({selectValue:event.target.value});
      }

      handleCountry(event){
          this.setState({country:event.target.value});
      }
      handleCity(event){
        this.setState({city:event.target.value});
    }
    handleFile(url){
        console.log(url)
        this.setState({file:url});
    }
      handleSubmit(event) {
          
    const loading = toast.loading("Please wait...");
        event.preventDefault();
        
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
myHeaders.append("Content-Type","application/json")

if(localStorage.tutor_id){
    const tutor_id=localStorage.getItem("tutor_id");
//     if(this.state.file)
// formData.append("file",this.state.file,this.state.file.name);
// formData.append("first_name",this.state.first_name);
// formData.append("last_name",this.state.last_name);
// formData.append("email",this.state.email);
// formData.append("city",this.state.city);
// formData.append("country",this.state.country);
let data=JSON.stringify({
    first_name:this.state.first_name,
    last_name:this.state.last_name,
    email:this.state.email,
    city:this.state.city,
    country:this.state.country,
    img:this.state.file,
    
});

     
        
      const requestOptions = {
          method: 'PUT',
          headers:myHeaders,
          body: data
      };
      fetch(`/api/tutorUpdate/${tutor_id}`, requestOptions)
          .then(response => response.json())
          .then(data => 
              {
                  if(data.success){
                    toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
               
                  window.location.href="/editprofile";
                  }
                  else{
                    toast.update(loading, { render: data.message, type: "error", isLoading: false,theme: "colored" });
           
                  }
              });

            }
            else if(localStorage.student_id){
                const student_id=localStorage.getItem("student_id");
               
                let data=JSON.stringify({
                    first_name:this.state.first_name,
                    last_name:this.state.last_name,
                    email:this.state.email,
                    city:this.state.city,
                    country:this.state.country,
                    img:this.state.file,
                    
                });
        
      const requestOptions = {
          method: 'PUT',
          headers:myHeaders,
          body: data
      };
      fetch(`/api/StudentUpdate/${student_id}`, requestOptions)
          .then(response => response.json())
          .then(data => 
              {
                  if(data.success){
                    toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
               
                  window.location.href="/editprofile";
                  }
                  else{
                    toast.update(loading, { render: data.message, type: "error", isLoading: false,theme: "colored" });
           
                  }
              });
            }

//alert(this.state.username+ "hello"+ this.state.first_name,this.state.last_name,this.state.email,this.state.password,this.state.password2);
            
    }

    
    render() {
        let HeaderToShow;
        if(this.props.studentLoginVal&&this.props.data)
            HeaderToShow = <HeaderLogginInSearchless parentCallback = {this.handleCallback}/>
        else if(!this.props.studentLoginVal&&this.props.data)
            HeaderToShow = <TutorHeader/>
        else
            HeaderToShow =  <HeaderSearchless parentCallback = {this.handleCallback}></HeaderSearchless>
        return (
            <div className="mb-4">
            {HeaderToShow}
            <div className="EditProfile_top d-flex mt-4">
                <div className="EditProfile_left">
                <h4>
                   <a href="/tutorPanel"> My Profile </a>
                </h4>
                <h4> &#62; </h4>
                <h4>Edit Profile</h4>
                </div>

                {/* <button  onClick={this.handleSubmit} className="editProfile_save bg-primary text-white">
                    Update
                </button> */}
            </div>




            <form id="main-form" className="editProfile_form">
            <div className="eachCouseBannerRight">
                    <img className="bannerTutorPic" src={this.state.img ? this.state.img : 'dp.jpg'} alt="coursepic" />
                </div>
            {/* <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Choose The Profile Picture</Form.Label>
                                <Form.Control onChange={this.handleFile} type="file" />
                        </Form.Group> */}
                         <div className="addCoursebtn">
                        <SimpleFileUpload
    apiKey="56496b1e70884f791c7b2427cd9cf2eb"
    onSuccess={this.handleFile}
  />
  </div>
                    <input className="formInput" value={this.state.first_name} onChange={this.handleFirstName}  placeholder="FirstName"  id ="firstName" htmlFor="firstName" />
                    <input className="formInput" value={this.state.last_name} onChange={this.handleLastName} placeholder="LastName" id ="lastName" htmlFor="lastName" />
                    <input className="formInput" value={this.state.email} onChange={this.handleEmail} placeholder="Email"  id ="email" htmlFor="email" />
                    {/* <input className="formInput" value={this.state.password} onChange={this.handlePassword} placeholder="Password" id ="password" type="password" htmlFor="password" />
                    <input className="formInput" value={this.state.password2} onChange={this.handlePassword2} placeholder="Confirm Password"  type="password" id ="confirmPassword" htmlFor="password" /> */}
                    <input className="formInput" value={this.state.country} onChange={this.handleCountry} placeholder="Country"  id ="country" htmlFor="country" />
                    <input className="formInput" placeholder="City" value={this.state.city} onChange={this.handleCity}  id ="city" htmlFor="city" />
                    {/* <Form.Select value={this.state.selectValue} onChange={this.handleSelect}  aria-label="Default select example" className="my-2">
                        <option>Select Category</option>
                        <option value="IT">IT</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                        <option value="Dance">Dance</option>
                        <option value="Animal Care">Animal Care</option>
                    </Form.Select> */}
                    <div className="btn-r text-center ">
                        <button onClick={this.handleSubmit} id="btn">Update</button>
                    </div>
            </form>
            
        <FooterAll/>
        </div>
        )
        
    }
}

