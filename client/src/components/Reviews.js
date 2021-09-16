import ReactStars from "react-rating-stars-component";
import React, { Component } from 'react';

class Reviews extends Component {
    constructor(props){
        super(props);
        this.state={message:'',rating:''}
        this.handleText=this.handleText.bind(this);
        this.submitReview=this.submitReview.bind(this);
    }
    handleText(event){
        this.setState({message:event.target.value});
    }
    submitReview(){
        
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    myHeaders.append("Content-Type","application/json")

        fetch(`/api/course/rating`,{headers:myHeaders,body:JSON.stringify({
            message:this.state.message,
            rate:this.state.rating,
            date:new Date(),
            student_id:localStorage.student_id,
            course_id:localStorage.course_id
        }),method:'POST'}).then(response=>response.json())
        .then(data=>{
            console.log(data);
            alert(data.message)
        })
    }
    render() {

        const ratingChanged = (newRating) => {
            console.log(newRating);
this.setState({rating:newRating});


          };
        return (
            <div className="Reviews_container">
                <h4 className="fw-bolder">Leave a review</h4>
                <div className="stars_container">
                    <p>Give the stars</p>
                <ReactStars
                    count={5}
                    
                    onChange={ratingChanged}
                    size={36}
                    activeColor="#ffd700"
                    classNames="stars"
                />
                </div>
                <div className="d-flex review_input">
                    <label htmlFor="Review">Write Your Review</label>
                    <textarea value={this.state.message} onChange={this.handleText} name="Review_area" id="Review_area" placeholder="Write your Review here here" cols="30" rows="10">{this.state.message}</textarea>
                </div>
                <button onClick={this.submitReview} className="btn-primary mt-3 border-none review_submit">Submit</button>
            </div>
        );
    }
}

export default Reviews;