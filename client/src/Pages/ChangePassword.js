import React, { Component } from 'react'
import {Dropdown, Form} from 'react-bootstrap';
import { TutorHeader } from './TutorHeader'

export class ChangePassword extends React.Component {

    constructor(props){
        super(props);
        if(!props.data){
            window.location.href="/logintutor";
        }
        this.state = {password:'',password2:'',oldpassword:'' };

        this.handlePassword = this.handlePassword.bind(this);
        this.handlePassword2=this.handlePassword2.bind(this);
this.handleOldPassword=this.handleOldPassword.bind(this);
    }   

    handlePassword(event){
        this.setState({password:event.target.value});
      
      }

      handlePassword2(event){
        this.setState({password2:event.target.value});
      
      }

      handleOldPassword(event){
        this.setState({oldpassword:event.target.value});
      }

      handleSubmit(){
        
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
const requestOptions = {
    method: 'POST',
    headers:myHeaders,
    body: JSON.stringify({oldpassword:this.state.oldpassword,password:this.state.password,password2:this.state.password2})
  };
          fetch(`/api//changePassword/${localStorage.getItem("tutor_id")}`,requestOptions)
          .then(response => response.json())
          .then(data => 
              {
                  if(data.success){
alert(data.message);
window.location.href="/tutorpanel"
                  }
                  alert(data.message);
              })
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
                <h4>Change Password</h4>
                </div>

                {/* <button  onClick={this.handleSubmit} className="editProfile_save bg-primary text-white">
                    Update Password
                </button> */}
            </div>




            <form id="main-form" className="editProfile_form">
            <div className="eachCouseBannerRight">
                    {/* <img className="bannerTutorPic" src={this.state.imageStr+this.state.img} alt="coursepic" /> */}
                    <h1 className="fw-bolder">Change Password</h1>
                </div>
            <Form.Group controlId="formFile" className="mb-3">
                                {/* <Form.Label>Choose The Profile Picture</Form.Label>
                                <Form.Control onChange={this.handleFile} type="file" /> */}
                        </Form.Group>
                    {/* <input className="formInput" value={this.state.first_name} onChange={this.handleFirstName}  placeholder="FirstName"  id ="firstName" htmlFor="firstName" />
                    <input className="formInput" value={this.state.last_name} onChange={this.handleLastName} placeholder="LastName" id ="lastName" htmlFor="lastName" />
                    <input className="formInput" value={this.state.email} onChange={this.handleEmail} placeholder="Email"  id ="email" htmlFor="email" /> */}
                    <input className="formInput" value={this.state.oldpassword} onChange={this.handleOldPassword} placeholder="Old Password" id ="opassword" type="password" htmlFor="opassword" />
                    
                    <input className="formInput" value={this.state.password} onChange={this.handlePassword} placeholder="Password" id ="password" type="password" htmlFor="password" />
                    <input className="formInput" value={this.state.password2} onChange={this.handlePassword2} placeholder="Confirm Password"  type="password" id ="confirmPassword" htmlFor="password" />
                    {/* <input className="formInput" value={this.state.country} onChange={this.handleCountry} placeholder="Country"  id ="country" htmlFor="country" />
                    <input className="formInput" placeholder="City" value={this.state.city} onChange={this.handleCity}  id ="city" htmlFor="city" />
                    <Form.Select value={this.state.selectValue} onChange={this.handleSelect}  aria-label="Default select example" className="my-2">
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
        </div>
        )
    }
}
