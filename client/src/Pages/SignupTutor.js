import React from 'react'

// import { Dropdown } from 'bootstrap'
import { Form} from 'react-bootstrap';
import { Header } from './Header';
import { FooterAll } from './FooterAll';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {username: '',password:'',first_name:'',last_name:'',password2:'',
email:'',country:'',city:'',
errorFName:'',errorLName:'',errorPass:'',errorPass2:'',errorEmail:'',errorCountry:'',errorCity:'',
selectValue:''
};

export class SignupTutor extends React.Component {


    constructor(props){
        super(props);
        if(props.data){
            window.location.href="/";
          }
        this.state = {initialState}
        
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleFirstName=this.handleFirstName.bind(this);
        this.handleLastName=this.handleLastName.bind(this);
        this.handleUsername=this.handleUsername.bind(this);
        this.handlePassword2=this.handlePassword2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCity=this.handleCity.bind(this);
        this.handleCountry=this.handleCountry.bind(this);
        this.GotoLogin=this.GotoLogin.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
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

    validate = () => {
        let errorFname = "";
        let errorLname = "";
        let errorPass = "";
        let errorPass2 = "";
        let errorEmail = "";
        let errorCountry = "";
        let errorCity = "";
        let emailError
    
        if (!this.state.first_name) {
          errorFname = "name cannot be blank";
        }
        if (!this.state.last_name) {
          errorLname = "name cannot be blank";
        }
        if (!this.state.password) {
          errorPass = "password cannot be blank";
        }
        if (!this.state.password2) {
          errorPass2 = "password cannot be blank";
        }
        if (!this.state.email) {
          errorEmail = "email cannot be blank";
        }
        if (!this.state.country) {
          errorCountry = "country cannot be blank";
        }
        if (!this.state.city) {
          errorCity = "city cannot be blank";
        }
    
        // if (!this.state.email.includes("@")) {
        //   errorEmail = "invalid email";
        // }
    
        if (errorFname || errorLname || errorPass || errorPass2 || errorEmail || errorCountry || errorCity) {
          this.setState({ errorFname, errorLname, errorPass, errorPass2 ,errorCity , errorCountry, errorEmail });
          // toast.update(loading, { render: data.message, type: "danger", isLoading: false,theme: "colored" });
          return false;
        }
    
        return true;
      };

      handleSubmit(event) {
        event.preventDefault();

        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            // clear form
            this.setState(initialState);
        let data={
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            city:this.state.city,
            country:this.state.country,
            type:this.state.selectValue,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2,
        };
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      };

      const loading = toast.loading("Please wait...");
      toast.update(loading,{render: "Loading...", type: "info", isLoading: true,theme: "colored"})

      fetch('/api/tutor/signup', requestOptions)
          .then(response => response.json())
          .then(data => 
              {
                  if(data.success){
                    toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
                  //localStorage.setItem("token",data.token);
                  window.location.href="/logintutor";
                  }
                  else{
                    toast.update(loading, { render: data.message, type: "error", isLoading: false,theme: "colored" });                  }
              });


console.log(data);
                }

                else{
                const loading = toast.loading("Please wait...");
                // toast.update(loading,{render: "Loading...", type: "info", isLoading: true,theme: "colored"})
                toast.update(loading, { render: "please fill all inputs", type: "error", isLoading: false,theme: "colored" });
                }
//alert(this.state.username+ "hello"+ this.state.first_name,this.state.last_name,this.state.email,this.state.password,this.state.password2);
    }

    GotoLogin(event){
        event.preventDefault();
        window.location.href="/login";
    }



    render(){
        // if(localStorage.getItem("token")){
        //     window.location.href="/";
        // }
    return (
//         <div id="main-login">
//             <h3 id="form-heading">Sign Up</h3>
//                 <form id="main-form">
//                         <label className="formLabel">First Name</label>
//                         <input className="formInput" value={this.state.first_name} onChange={this.handleFirstName} id ="firstName" htmlFor="firstName" />

//                         <label className="formLabel">Last Name</label>
//                         <input className="formInput" value={this.state.last_name} onChange={this.handleLastName} id ="lastName" htmlFor="lastName" />

//                         <label className="formLabel">Username</label>
//                         <input className="formInput" value={this.state.username} onChange={this.handleUsername}  id ="username" htmlFor="username" />

                    
//                         <label className="formLabel">Email</label>
//                         <input className="formInput" value={this.state.email} onChange={this.handleEmail} id ="email" htmlFor="email" />

                    
//                        <label className="formLabel">Password</label>
//                         <input className="formInput" value={this.state.password} onChange={this.handlePassword} id ="password" type="password" htmlFor="password" />

//                         <label className="formLabel">Confirm Password</label>
//                         <input className="formInput" value={this.state.password2} onChange={this.handlePassword2} type="password" id ="confirmPassword" htmlFor="password" />
// <div className="btn-r">
// <button onClick={this.handleSubmit} id="btn">Sign up</button>

//     <button onClick={this.GotoLogin} className="btn-l" id="btn">Login</button>
                   
// </div>

//                 </form>
            
//         </div>

        <>
            <Header></Header>
            <div id="main-login">
            <h3 id="form-heading">Sign Up as a Mentor</h3>
                <form id="main-form">
                        {/* <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Choose The Profile Picture</Form.Label>
                                <Form.Control type="file" />
                        </Form.Group> */}
                        <input className="formInput" value={this.state.first_name} onChange={this.handleFirstName}  placeholder="FirstName"  id ="firstName" htmlFor="firstName" />
                        <input className="formInput" value={this.state.last_name} onChange={this.handleLastName} placeholder="LastName" id ="lastName" htmlFor="lastName" />
                        <input className="formInput" value={this.state.email} onChange={this.handleEmail} placeholder="Email"  id ="email" htmlFor="email" />
                        <input className="formInput" value={this.state.password} onChange={this.handlePassword} placeholder="Password" id ="password" type="password" htmlFor="password" />
                        <input className="formInput" value={this.state.password2} onChange={this.handlePassword2} placeholder="Confirm Password"  type="password" id ="confirmPassword" htmlFor="password" />
                        <input className="formInput" value={this.state.country} onChange={this.handleCountry} placeholder="Country"  id ="country" htmlFor="country" />
                        <input className="formInput" placeholder="City" value={this.state.city} onChange={this.handleCity}  id ="city" htmlFor="city" />
                        <Form.Select value={this.state.selectValue} onChange={this.handleSelect}  aria-label="Default select example" className="my-2">
                            <option>Select Category</option>
                            <option value="IT">IT</option>
                            <option value="Music">Music</option>
                            <option value="Sports">Sports</option>
                            <option value="Dance">Dance</option>
                            <option value="Animal Care">Animal Care</option>
                        </Form.Select>
                        <div className="btn-r text-center ">
                            <button onClick={this.handleSubmit} id="btn">Sign up</button>
                            <p className="my-2">Already have an account? <span><a href="/Logintutor">Log In</a></span></p>              
                        </div>
                </form>

            </div>
            <FooterAll/>
        </>
    )
    }
}
