import React, { Component } from 'react'
import {Dropdown, Form} from 'react-bootstrap';
import { TutorHeader } from './TutorHeader'

export class EditCourse extends React.Component {

    constructor(props){
        super(props);
        if(!props.data){
            window.location.href="/logintutor";
        }
        this.state = {username: '',password:'',first_name:'',last_name:'',password2:'',
        email:'',country:'',city:'',
        selectValue:'',imageStr:'./uploads/profiles/',img:'',tutor_id:''
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

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
        var tutor_id=localStorage.getItem("tutor_id");
        if(tutor_id){
        fetch(`/api/tutor/${tutor_id}`,{headers:myHeaders})
        .then(response => response.json())
        .then(data=>{
this.setState({first_name:data.data.first_name,last_name:data.data.last_name,email:data.data.email,country:data.data.country,city:data.data.city,img:data.data.img})

        })
        


        }

        console.log(this.state.imageStr);
        console.log(this.state.img);
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
    handleFile(event){
        this.setState({file:event.target.files[0]});
    }

      handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
    const tutor_id=localStorage.getItem("tutor_id");
formData.append("file",this.state.file,this.state.file.name);
formData.append("first_name",this.state.first_name);
formData.append("last_name",this.state.last_name);
formData.append("email",this.state.email);
formData.append("city",this.state.city);
formData.append("country",this.state.country);
     
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
        
      const requestOptions = {
          method: 'PUT',
          headers:myHeaders,
          body: formData
      };
      fetch(`/api/tutorUpdate/${tutor_id}`, requestOptions)
          .then(response => response.json())
          .then(data => 
              {
                  if(data.success){
                alert(data.message);
                  window.location.href="/editprofile";
                  }
                  else{
                      alert(data.message);
                  }
              });



//alert(this.state.username+ "hello"+ this.state.first_name,this.state.last_name,this.state.email,this.state.password,this.state.password2);
            
    }

    
    render() {
        return (
            <div>
            <TutorHeader></TutorHeader>
            <div className="EditProfile_top d-flex mt-4">
                <div className="EditProfile_left">
                <h4>
                   <a href="/tutorPanel"> My Profile </a>
                </h4>
                <h4> &#62; </h4>
                <h4>Edit Course</h4>
                </div>
            </div>




            <form id="main-form" className="editProfile_form">
            <div className="eachCouseBannerRight">
                    <img className="bannerTutorPic" src={this.state.img ? this.state.imageStr+this.state.img : 'dp.jpg'} alt="coursepic" />
                </div>
            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Choose The Course Picture</Form.Label>
                                <Form.Control onChange={this.handleFile} type="file" />
                        </Form.Group>
                    <input className="formInput" value={this.state.first_name} onChange={this.handleFirstName}  placeholder="Course Name"  id ="courseName" htmlFor="courseName" />
                    <input className="formInput" value={this.state.last_name} onChange={this.handleLastName} placeholder="Description" id ="lastName" htmlFor="lastName" />
                    <input className="formInput" value={this.state.email} onChange={this.handleEmail} placeholder="Email"  id ="email" htmlFor="email" />
                    <Form.Select value={this.state.selectValue} onChange={this.handleSelect}  aria-label="Default select example" className="my-2">
                        <option>Select Category</option>
                        <option value="IT">IT</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                        <option value="Dance">Dance</option>
                        <option value="Animal Care">Animal Care</option>
                    </Form.Select>
                    <div className="btn-r text-center ">
                        <button onClick={this.handleSubmit} id="btn">Update</button>
                    </div>
            </form>
        </div>
        )
    }
}

