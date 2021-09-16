import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";

import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

class EachReview extends Component {
   

    render() {
        return (
            <div className="EachReview_container">
                <h5 className="fw-bold">Name</h5>
                <ReactStars
                    count={5}
                    value={4} //Ider ayen gy k kitny stars han
                    edit = {false}
                    size={30}
                    activeColor="#ffd700"
                    classNames="starsReview"
                />
                <p className="eachReviewPara fw-smaller">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim quidem officia sequi corporis? Voluptate cupiditate exercitationem, et autem, obcaecati rem perferendis, cumque natus consectetur quia quis! Dolor blanditiis debitis ullam/
                </p>
                <hr/>
                

              
            </div>
        );
    }
}

export default EachReview;
