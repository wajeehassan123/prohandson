import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";

import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

class EachReview extends Component {
   

    render() {
        return (
            <div className="EachReview_container">
                <h5 className="fw-bold">{this.props.reviews.student_id.first_name+this.props.reviews.student_id.last_name}</h5>
                <ReactStars
                    count={5}
                    value={this.props.reviews.rate} //Ider ayen gy k kitny stars han
                    edit = {false}
                    size={30}
                    activeColor="#ffd700"
                    classNames="starsReview"
                />
                <p className="eachReviewPara fw-smaller">
            {this.props.reviews.message}
                </p>
                <hr/>
                

              
            </div>
        );
    }
}

export default EachReview;
