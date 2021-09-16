import React, { Component } from 'react';
import EachReview from './EachReview';
import Pagination from "react-js-pagination";

export const AllReviews = (props) => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         activePage: 1,
    //         allObjs : [],
    //         reviews:[]
    //     };
    //     this.handlePageChange=this.handlePageChange.bind(this);
    //     this.handlePageChange()

    //   }
     
    //   handlePageChange() {
    //     fetch(`/api/courses/getReviews/${localStorage.course_id}`)
    //     .then(response=>response.json())
    //     .then(AllReviewed=>{
    //         if(AllReviewed){
    //            this.setState({reviews:AllReviewed})
                
    //             console.log(this.state);
    //         }
    //     })

    //     // fetch('')
    //     //   .then(response => response.json())
    //     //   .then((json) => {
    //     //       let aray;
    //     //      aray =  json.slice((this.state.activePage*10)-10,this.state.activePage*10)
    //     //      console.log(aray);
    //     //      aray.map((rev)=>{
    //     //         //  this.setState({ allObjs: this.state.allObjs.push(rev) })
    //     //          this.setState({ allObjs: [...this.state.allObjs, rev] })
                 
    //     //      })
    //     //      console.log(this.allObjs);
    //     //     }
    //     //       )
    //   }
      
    // // fun1(){
    // //       fetch('https://jsonplaceholder.typicode.com/todos')
    // //       .then(response => response.json())
    // //       .then((json) => {
              
    // //           console.log(json)
              
    // //           let aray;
    // //          json.map((a)=>{
    // //           //    console.log(a);
    // //          })
    // //          aray =  json.slice((this.state.activePage*10)-10,this.state.activePage*10)
    // //          console.log(aray);}
              
    // //           )
    // //   }
    // render() {


        
        return (
            
            <div className="AllReviews">
            <EachReview reviews={props} ></EachReview>
            </div>
            
        );
    //}
}

