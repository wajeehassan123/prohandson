import React, { Component } from 'react';
import EachReview from './EachReview';
import Pagination from "react-js-pagination";

class AllReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            allObjs : [],
            reviews:[]
        };
        this.handlePageChange()

      }
     
      handlePageChange() {
        fetch(`/api/courses/getReviews/${localStorage.course_id}`)
        .then(response=>response.json())
        .then(AllReviewed=>{
            if(AllReviewed){
               this.setState({reviews:AllReviewed})
                
                // console.log(this.state);
            }
        })

        // fetch('')
        //   .then(response => response.json())
        //   .then((json) => {
        //       let aray;
        //      aray =  json.slice((this.state.activePage*10)-10,this.state.activePage*10)
        //      console.log(aray);
        //      aray.map((rev)=>{
        //         //  this.setState({ allObjs: this.state.allObjs.push(rev) })
        //          this.setState({ allObjs: [...this.state.allObjs, rev] })
                 
        //      })
        //      console.log(this.allObjs);
        //     }
        //       )
      }
      
    // fun1(){
    //       fetch('https://jsonplaceholder.typicode.com/todos')
    //       .then(response => response.json())
    //       .then((json) => {
              
    //           console.log(json)
              
    //           let aray;
    //          json.map((a)=>{
    //           //    console.log(a);
    //          })
    //          aray =  json.slice((this.state.activePage*10)-10,this.state.activePage*10)
    //          console.log(aray);}
              
    //           )
    //   }
    render() {
        let res

       
        return (

            <>
            <h2 className="mt-3">Reviews</h2>
            {JSON.stringify( this.state.reviews[0])}
            {console.log(JSON.stringify( this.state.reviews[0]))}
            {/* <div className="AllReviews">
                <EachReview></EachReview>
                <EachReview></EachReview>
                <EachReview></EachReview>
                <EachReview></EachReview>
                <EachReview></EachReview>
                <EachReview></EachReview>
                <EachReview></EachReview>
                <EachReview></EachReview>
                <EachReview></EachReview>
                <EachReview></EachReview>
                    <Pagination
                className="pagination"
                activePage={this.state.activePage}
                hideFirstLastPages={true}
                itemClass="page-item"
                linkClass="page-link"  
                itemsCountPerPage={5}
                totalItemsCount={50}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
                />
                </div> */}
            </>
        );
    }
}

export default AllReviews;