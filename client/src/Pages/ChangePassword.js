import React from 'react'
import {Form} from 'react-bootstrap';
import { TutorHeader } from './TutorHeader'
import { FooterAll } from './FooterAll';
export class ChangePassword extends React.Component {

    constructor(props){
        super(props);
        if(!props.data){
            window.location.href="/logintutor";
        }
        if(this.props.studentLoginVal){
            window.location.href="/";
          }
        this.state = {password:'',password2:'',oldpassword:'' };

        this.handlePassword = this.handlePassword.bind(this);
        this.handlePassword2=this.handlePassword2.bind(this);
this.handleOldPassword=this.handleOldPassword.bind(this);
this.handleSubmit=this.handleSubmit.bind(this);
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

      handleSubmit(event){
          event.preventDefault();
        
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
myHeaders.append("Content-Type", "application/json");
const requestOptions = {
    method: 'PUT',
    headers:myHeaders,
    body: JSON.stringify({oldpassword:this.state.oldpassword,password:this.state.password,password2:this.state.password2})
  };
  if(localStorage.tutor_id){
          fetch(`/api/changePassword/${localStorage.getItem("tutor_id")}`,requestOptions)
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
            else if(localStorage.student_id){
                fetch(`/api/changeStudentPassword/${localStorage.getItem("student_id")}`,requestOptions)
          .then(response => response.json())
          .then(data => 
              {
                  if(data.success){
alert(data.message);
window.location.href="/changepassword"
                  }
                  alert(data.message);
              })
            }
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
            </div>




            <form id="main-form" className="editProfile_form">
            <div className="eachCouseBannerRight">
                    <h1 className="fw-bolder">Change Password</h1>
                </div>
            <Form.Group controlId="formFile" className="mb-3">
                             
                        </Form.Group>
                    <input className="formInput" value={this.state.oldpassword} onChange={this.handleOldPassword} placeholder="Old Password" id ="opassword" type="password" htmlFor="opassword" />
                    
                    <input className="formInput" value={this.state.password} onChange={this.handlePassword} placeholder="Password" id ="password" type="password" htmlFor="password" />
                    <input className="formInput" value={this.state.password2} onChange={this.handlePassword2} placeholder="Confirm Password"  type="password" id ="confirmPassword" htmlFor="password" />
                    <div className="btn-r text-center ">
                        <button onClick={this.handleSubmit} id="btn">Update</button>
                    </div>
            </form>
            <FooterAll/>
        </div>
        )
        
    }
}
