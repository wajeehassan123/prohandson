import React from 'react'

import {Dropdown, Form} from 'react-bootstrap';

import { TutorHeader } from './TutorHeader'

export class AddCourse extends React.Component {

    constructor(props){
        super(props);
        this.state={title:'',price:'',description:'',category:'',file:null,img:''};

        if(!props.data){
            window.location.href="/logintutor";
        }

        this.handleTitle=this.handleTitle.bind(this);
        this.handlePrice=this.handlePrice.bind(this);
        this.handleDescp=this.handleDescp.bind(this);
        this.handleCategory=this.handleCategory.bind(this);
        this.handleFile=this.handleFile.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    handleTitle(event){
        this.setState({title:event.target.value});
    }
    handlePrice(event){
        this.setState({price:event.target.value});
    }
    handleDescp(event){
        this.setState({description:event.target.value});
    }
    handleCategory(event){
        this.setState({category:event.target.value});
    }
    handleFile(event){
        this.setState({file:event.target.files[0]});
    }

    handleSubmit(event){
event.preventDefault();
const formData = new FormData();
    const tutor_id=localStorage.getItem("tutor_id");
formData.append("file",this.state.file,this.state.file.name);
formData.append("title",this.state.title);
formData.append("price",this.state.price);
formData.append("description",this.state.description);
formData.append("category",this.state.category);
formData.append("tutor_id",tutor_id);
formData.append("name",localStorage.getItem("tutor_name"));
// let data=JSON.stringify({
//     title:this.state.title,
//     price:this.state.price,
//     description:this.state.description,
//     category:this.state.category,
    
// });

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

const requestOptions = {
  method: 'POST',
  headers:myHeaders,
  body: formData
};
fetch('/api/tutor/addCourse',requestOptions)
  .then(response => response.json())
  .then(data => 
      {
        //   console.log(data[0].img);
        // var base64Flag = 'data:image/png;base64,';
        // var imageStr = this.arrayBufferToBase64(data[0].img.data.data);
        // this.setState({
        //     img: base64Flag + imageStr
        // })
          if(data.success){
              console.log(data)
          }
          else{
              alert(data.message);
          }
      });

console.log(this.state);
    }
    
    render(){
    return (
        <div>

<TutorHeader></TutorHeader>
            <h1>Add Course</h1>
            <form className="add-form">
                        <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Choose The Course Banner</Form.Label>
                                <Form.Control  onChange={this.handleFile} type="file" />
                        </Form.Group>
                        <input className="formInput" value={this.state.title} onChange={this.handleTitle} placeholder="Course Name"  id ="courseName" for="courseName" />
                        <input className="formInput" value={this.state.price} onChange={this.handlePrice} placeholder="Price $" id ="Price" for="Price" />
                        <textarea name="description" value={this.state.description} onChange={this.handleDescp} id="description" for ="description" placeholder="description" cols="30" rows="10"></textarea>
                        <Form.Select value={this.state.category} onChange={this.handleCategory} aria-label="Default select example" className="my-2">
                            <option>Select Category</option>
                            <option value="1">IT</option>
                            <option value="2">Music</option>
                            <option value="2">Sports</option>
                            <option value="2">Dance</option>
                            <option value="2">Animal Care</option>
                        </Form.Select>
                        
            <div className="btn-r text-center ">
            <button onClick={this.handleSubmit}  id="btn">Add Course</button>
                
            </div>

                </form>
        </div>
    )
    }
}
