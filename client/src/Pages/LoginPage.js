
import React from 'react'
import { Header } from './Header';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FooterAll } from './FooterAll';
import { HeaderSearchless } from './HeaderSeachless';

export class LoginPage extends React.Component{
  constructor(props) {
    super(props);

    if(props.data){
      window.location.href="/";
    }
    this.state = {username: '',password:'',tutorName:'', nameError: "",
    emailError: "",
    passwordError: ""};

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.GotoSignup=this.GotoSignup.bind(this);
  }

  handleEmail(event) {
    this.setState({username: event.target.value});
  }
  handlePassword(event){
    this.setState({password:event.target.value});
  
  }

  handleSubmit(event) {
      event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email:this.state.username,password:this.state.password })
    };

    const loading = toast.loading("Please wait...");
      toast.update(loading,{render: "Loading...", type: "info", isLoading: true,theme: "colored"})
    fetch('/api/student/login', requestOptions)
        .then(response => response.json())
        .then(data => 
            {
                if(data.success){
                  toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
                localStorage.setItem("token",data.token);
                localStorage.setItem("student_id",data.msg._id);
                var name=data.msg.first_name+" "+data.msg.last_name;
                localStorage.setItem("student_name",name);
                this.setState({tutorName:name});
                window.location.href="/";

                }
                else{
                  toast.update(loading, { render: data.message, type: "error", isLoading: false,theme: "colored" });
                }
            });
  }

  

  GotoSignup(event){
    event.preventDefault();
    window.location.href="/signup";
}


  render(){
     
      return(
   
        <>
        <HeaderSearchless/>

        <div id="main-login">
          <h2 id="form-heading">Login to your Account</h2>
          <form id="main-form">
          <input className="formInput" value={this.state.username} onChange={this.handleEmail} type="text"  placeholder="Email" id ="email" htmlFor="email" />
          <input className="formInput" value={this.state.password} onChange={this.handlePassword} type="password"  placeholder="Password" id ="password" htmlFor="password" />
          <div className="btn-r text-center">
            <button type="submit" onClick={this.handleSubmit}  id="btn" >Log In</button>
            {/* <p>or <span><a href="#">Forgot Password</a></span></p>               */}
            <p>Don't have an account? <span><a href="/Signup">Sign up</a></span></p>              
          </div>
              
          </form>
            
        </div>
        <FooterAll/>
        </>
        
      );
  }
}
