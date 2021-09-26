import React from 'react'
import { Header } from './Header';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class LoginTutor extends React.Component{
    constructor(props) {
        super(props);
        if(props.data){
          window.location.href="/";
        }
        this.state = {username: '',password:'',tutorName:''};
    
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
      //   const response = await toast.promise(
      //     fetch('/api/tutor/login', requestOptions),
      //     {
      //       pending: 'Promise is pending',
      //       success: 'Promise resolved 👌',
      //       error: 'Promise rejected 🤯'
      //     }
      // );
      // console.log(response)
      
      const loading = toast.loading("Please wait...");
      toast.update(loading,{render: "Loading...", type: "info", isLoading: true,theme: "colored"})
        fetch('/api/tutor/login', requestOptions)
            .then(response => response.json())
            .then(data => 
                {
                    if(data.success){
                      toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("tutor_id",data.msg._id);
                    var name=data.msg.first_name+" "+data.msg.last_name;
                    localStorage.setItem("tutor_name",name);
                    this.setState({tutorName:name});
                    window.location.href="/tutorpanel";

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
      // if(localStorage.getItem("token")){
      //     window.location.href="/";
      // }
      return(
          // <div id="main-login">
          //     <h3 id="form-heading">Login</h3>
          //         <form id="main-form">
          //                 <label className="formLabel">Email</label>
          //                 <input className="formInput" type="text" value={this.state.username} onChange={this.handleEmail} id ="email" htmlFor="email" />

          //                 <label className="formLabel">Password</label>
          //                 <input className="formInput" type="password" value={this.state.password} onChange={this.handlePassword} id ="password" htmlFor="password" />
          // <div className="btn-r">
          // <button type="submit" onClick={this.handleSubmit} id="btn">login</button>
          // <button type="submit" onClick={this.GotoSignup} id="btn" className="btn-l">Signup</button>
                            
          // </div>
                                
          //           </form>
                      
          //         </div>
        
        <>
        <Header></Header>
        
        <div id="main-login">
          <h2 id="form-heading">Log In as Tutor</h2>
          <form id="main-form">
          <input className="formInput" type="text" value={this.state.username} onChange={this.handleEmail} placeholder="Email" id ="email" htmlFor="email" />
          <input className="formInput" type="password" value={this.state.password} onChange={this.handlePassword}  placeholder="Password" id ="password" htmlFor="password" />
          <div className="btn-r text-center">
            <button type="submit" onClick={this.handleSubmit}  id="btn" >Log In</button>
            {/* <p>or <span><a href="#">Forgot Password</a></span></p>               */}
            <p>Don't have an account? <span><a href="/Signuptutor">Sign up</a></span></p>              
          </div>
              
          </form>
            
        </div>
        </>






        
      );
  }
}

