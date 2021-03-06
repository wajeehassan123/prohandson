import React, { Component } from 'react'
import {Dropdown, Form} from 'react-bootstrap';
import { TutorHeader } from './TutorHeader';
import { FooterAll } from './FooterAll';

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SimpleFileUpload from 'react-simple-file-upload';
export class EditCourse extends React.Component {

    constructor(props){
        super(props);
        if(!props.data){
            window.location.href="/logintutor";
        }
        if(this.props.studentLoginVal){
            window.location.href="/";
          }
        this.state = {name: '',description:'',price:'',
        selectValue:'',imageStr:'./uploads/',img:'',tutor_id:'',course_id:''
    };
        
        this.handleName = this.handleName.bind(this);
        this.handlePrice=this.handlePrice.bind(this);
        this.handleDescription=this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile=this.handleFile.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.getCourse=this.getCourse.bind(this);
        this.handleDelete=this.handleDelete.bind(this);
        
    }
    componentDidMount(){
        this.getCourse();
    }

    getCourse(){

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
        var tutor_id=localStorage.getItem("tutor_id");
        if(tutor_id){
        fetch(`/api/course/getCourse/${localStorage.course_id}`,{headers:myHeaders})
        .then(response => response.json())
        .then(data=>{
this.setState({course_id:data.data._id,selectValue:data.data.category,title:data.data.title,description:data.data.description,price:data.data.price,img:data.data.img,file:data.data.img})

        })
        


        }

        console.log(this.state.imageStr);
        console.log(this.state.img);
    }


      handleName(event) {
        this.setState({title: event.target.value});
      }
      handleDescription(event){
        this.setState({description:event.target.value});
      
      }
      handlePrice(event){
          
        this.setState({price: event.target.value});
      }

      handleSelect(event){
          this.setState({selectValue:event.target.value});
      }

      handleFile(url){
        console.log(url)
        this.setState({file:url});
    }

      handleSubmit(event) {
        event.preventDefault();    
       
    const loading = toast.loading("Please wait...");
        let data=JSON.stringify({
            title:this.state.title,
            description:this.state.description,
            price:this.state.price,
            img:this.state.file,
            category:this.state.selectValue
            
        });
            
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
        myHeaders.append("Content-Type","application/json")
        
      const requestOptions = {
          method: 'PUT',
          headers:myHeaders,
          body: data
      };
      fetch(`/api/EditCourse/${this.state.course_id}`, requestOptions)
          .then(response => response.json())
          .then(data => 
              {
                  if(data.success){
                    toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
               
                  window.location.href="/editcourse";
                  }
                  else{
                    toast.update(loading, { render: data.message, type: "error", isLoading: false,theme: "colored" });
           
                  }
              });



//alert(this.state.username+ "hello"+ this.state.first_name,this.state.last_name,this.state.email,this.state.password,this.state.password2);
            
    }
    handleDelete(){
       if(window.confirm("Are you sure you want to delete?")){
        const loading = toast.loading("Please wait...");
           
                
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
            myHeaders.append("Content-Type","application/json")
            
          const requestOptions = {
              method: 'DELETE',
              headers:myHeaders
          };
          fetch(`/api/deleteCourse/${this.state.course_id}`, requestOptions)
              .then(response => response.json())
              .then(data => 
                  {
                      if(data.success){
                        toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
                   
                      window.location.href="/tutorpanel";
                      }
                      else{
                        toast.update(loading, { render: data.message, type: "error", isLoading: false,theme: "colored" });
               
                      }
                  });
                }
    }

    
    render() {
        return (
            <div>
            <TutorHeader></TutorHeader>
            <div className="EditProfile_top d-flex mt-4">
                <div className="EditProfile_left">
                <h4>
                   <a href="/tutorPanel"> All Skills </a>
                </h4>
                <h4> &#62; </h4>
                <h4>Edit Skill</h4>
                </div>
            </div>




            <form id="main-form" className="editProfile_form">
            <div className="eachCouseBannerRight">
                    <img className="bannerTutorPic" src={this.state.img ? this.state.img : 'dp.jpg'} alt="coursepic" />
                </div>
            {/* <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Choose The Skill Picture</Form.Label>
                                <Form.Control onChange={this.handleFile} type="file" />
                        </Form.Group> */}
                        <div className="addCoursebtn">

                          <SimpleFileUpload
                            apiKey="56496b1e70884f791c7b2427cd9cf2eb"
                            onSuccess={this.handleFile}
                            />
                        </div>
                    <input className="formInput" value={this.state.title} onChange={this.handleName}  placeholder="Course Name"  id ="courseName" htmlFor="courseName" />
                    <input className="formInput" value={this.state.description} onChange={this.handleDescription} placeholder="Description" id ="description" htmlFor="lastName" />
                    <input className="formInput" value={this.state.price} onChange={this.handlePrice} placeholder="Price"  id ="price" htmlFor="price" />
                    <Form.Select value={this.state.selectValue} onChange={this.handleSelect}  aria-label="Default select example" className="my-2">
                        <option>Select Category</option>
                        <option value="IT">IT</option>
                        <option value="Music">Music</option>
                        <option value="Sports">Sports</option>
                        <option value="Dance">Dance</option>
                        <option value="Animal Care">Animal Care</option>
                    </Form.Select>
                    {/* <div className="btn-r text-center "> */}
                        <button onClick={this.handleSubmit} className="btn btn-info mb-2" >Update</button>
                    {/* </div> */}
                    {/* <div className=" text-center "> */}
                        <button onClick={this.handleDelete}  className="btn btn-danger mb-2">Delete</button>
                    {/* </div> */}
            </form>
            <FooterAll/>
        </div>
        )
        
    }
}

