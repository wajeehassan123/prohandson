import React, { Component } from 'react'
import {Dropdown, Form} from 'react-bootstrap';
import { TutorHeader } from './TutorHeader'

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
        selectValue:'',imageStr:'./uploads/',img:'',tutor_id:''
    };
        
        this.handleName = this.handleName.bind(this);
        this.handlePrice=this.handlePrice.bind(this);
        this.handleDescription=this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile=this.handleFile.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.getCourse=this.getCourse.bind(this);
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
this.setState({name:data.data.name,description:data.data.description,price:data.data.price,img:data.data.img})

        })
        


        }

        console.log(this.state.imageStr);
        console.log(this.state.img);
    }


      handleName(event) {
        this.setState({name: event.target.value});
      }
      handleDescription(event){
        this.setState({name:event.target.value});
      
      }
      handlePrice(event){
          
        this.setState({name: event.target.value});
      }

      handleSelect(event){
          this.setState({selectValue:event.target.value});
      }

    handleFile(event){
        this.setState({file:event.target.files[0]});
    }

      handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
      const tutor_id=localStorage.getItem("tutor_id");    
        formData.append("file",this.state.file,this.state.file.name);
        formData.append("name",this.state.name);
        formData.append("description",this.state.description);
        formData.append("price",this.state.price);
            
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
                   <a href="/tutorPanel"> All Courses </a>
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
                    <input className="formInput" value={this.state.name} onChange={this.handleName}  placeholder="Course Name"  id ="courseName" htmlFor="courseName" />
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
                    <div className="btn-r text-center ">
                        <button onClick={this.handleSubmit} id="btn">Update</button>
                    </div>
            </form>
        </div>
        )
    }
}

