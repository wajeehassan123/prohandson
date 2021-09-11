import React, { Component } from 'react'

export class MyCourseCard extends React.Component {
    render() {
        return (
            <div className="myCourseCard d-flex">
                <div className="myCourseCard_pic">
                    <img src={'card_pic.jpg'} alt="card_pic" />
                </div>
                <div className="myCourseCard_details">
                    <h3>Course Name</h3>
                    <h4>Teacher Name</h4>
                </div>
                <button className="myCourseCard_btn bg-primary fw-bolder text-white btn">
                    View Course
                </button>
            </div>
        )
    }
}
