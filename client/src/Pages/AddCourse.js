import React from 'react'

import { Form} from 'react-bootstrap';
import SimpleFileUpload from 'react-simple-file-upload'
import { FooterAll } from './FooterAll';
import { TutorHeader } from './TutorHeader'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {title:'',price:'',paymentId:'',description:'',category:'',file:null,img:'',paymentVerified:false, errorTitle : '', errorPrice : '', errorDescription : ''};
export class AddCourse extends React.Component {

    constructor(props){
        super(props);
        this.state={initialState}

        if(!props.data){
            window.location.href="/logintutor";
        }
        if(this.props.studentLoginVal){
            window.location.href="/";
          }

        this.handleTitle=this.handleTitle.bind(this);
        this.handlePrice=this.handlePrice.bind(this);
        this.handleDescp=this.handleDescp.bind(this);
        this.handleCategory=this.handleCategory.bind(this);
        this.handleFile=this.handleFile.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleStripe=this.handleStripe.bind(this);
    }
    componentDidMount(){
        this.StripeAccountVerified();
    }

    StripeAccountVerified(){
        
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);


       
        fetch(`/api/tutor/${localStorage.tutor_id}`,{headers:myHeaders})
        .then(response => response.json())
  .then(data => 
      {
          console.log(data);
          if(data.success){
            
            this.setState({paymentId:data.data.stripe_id})
            console.log(this.state.paymentVerified)
              fetch(`/api/stripeRetriveAccount/${data.data.stripe_id}`)
              .then(response1=>response1.json())
              .then(data1=>{
                  if(data1.details_submitted && data1.payouts_enabled){

                    this.setState({paymentVerified:true})
                  }
              })

          }

          
      })
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
    handleFile(url){
        console.log(url)
        this.setState({file:url});
    }


    handleStripe(){
        fetch(`/api/stripeAccountVerified/${this.state.paymentId}`)
        .then(response => response.json())
  .then(data => 
      {
          console.log(data);
          window.location.href=data.url;
      })
    }

    
    validate = () => {
        let errorTitle= "";
        let errorDescription = "";
        let errorPrice = "";
        
    
        if (!this.state.title) {
          errorTitle = "title cannot be blank";
        }
        if (!this.state.description) {
          errorDescription = "descriptionn cannot be blank";
        }
        if (!this.state.price) {
          errorPrice = "price cannot be blank";
        }
      
        if (errorTitle || errorDescription || errorPrice) {
          this.setState({ errorTitle, errorDescription, errorPrice});
          // toast.update(loading, { render: data.message, type: "danger", isLoading: false,theme: "colored" });
          return false;
        }
    
        return true;
      };

    handleSubmit(event){
event.preventDefault();

const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            // clear form
            this.setState(initialState);
const formData = new FormData();
    const tutor_id=localStorage.getItem("tutor_id");
// formData.append("img",this.state.file);
// formData.append("title",this.state.title);
// formData.append("price",this.state.price);
// formData.append("description",this.state.description);
// formData.append("category",this.state.category);
// formData.append("tutor_id",tutor_id);
// formData.append("name",localStorage.getItem("tutor_name"));
let data=JSON.stringify({
    title:this.state.title,
    price:this.state.price,
    description:this.state.description,
    category:this.state.category,
    tutor_id:tutor_id,
    name:localStorage.tutor_name,
    img:this.state.file
    
});

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
myHeaders.append("Content-Type","application/json")

const requestOptions = {
  method: 'POST',
  headers:myHeaders,
  body: data
};

const loading = toast.loading("Please wait...");
toast.update(loading,{render: "Loading...", type: "info", isLoading: true,theme: "colored"})
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
            // toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
            window.location.href="/tutorpanel";

            //   console.log(data)
          }
          else{
            //   alert(data.message);
              toast.update(loading, { render: data.message, type: "success", isLoading: false,theme: "colored" });
              window.location.href="/tutorpanel";

          }
      });

console.log(this.state);

}

else{
const loading = toast.loading("Please wait...");
// toast.update(loading,{render: "Loading...", type: "info", isLoading: true,theme: "colored"})
toast.update(loading, { render: "please fill all inputs", type: "error", isLoading: false,theme: "colored" });
}
    }
    
    render(){
    return (

        <div>
            
<TutorHeader></TutorHeader>
{
    !this.state.paymentVerified?(
<div>
    <h1>Account not verified</h1>
    <button className="btn btn-primary" onClick={this.handleStripe}>Click here to verify your account to receive payments</button>
</div>
    ):(
        <div>
<h1>Add Skill</h1>
            <form className="add-form">
                        {/* <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Choose The Skill Banner</Form.Label>
                                <Form.Control  onChange={this.handleFile} type="file" />
                        </Form.Group> */}
                        <SimpleFileUpload
    apiKey="56496b1e70884f791c7b2427cd9cf2eb"
    onSuccess={this.handleFile}
  />
                        <input className="formInput" value={this.state.title} onChange={this.handleTitle} placeholder="skill Name"  id ="courseName" for="courseName" />
                        <input className="formInput" value={this.state.price} onChange={this.handlePrice} placeholder="Price $" id ="Price" for="Price" />
                        <textarea name="description" value={this.state.description} onChange={this.handleDescp} id="description" for ="description" placeholder="description" cols="30" rows="10"></textarea>
                        <Form.Select value={this.state.category} onChange={this.handleCategory} aria-label="Default select example" className="my-2">
                            <option>Select Category</option>
                            <option value="IT">IT</option>
                            <option value="Music">Music</option>
                            <option value="Sports">Sports</option>
                            <option value="Dance">Dance</option>
                            <option value="Animal Care">Animal Care</option>
                        </Form.Select>
                        
            <div className="btn-r text-center ">
            <button onClick={this.handleSubmit}  id="btn">Add skill</button>
                
            </div>

                </form>
                </div>
    )
}
<FooterAll/>
        </div>
    
    
    )

    }
}
