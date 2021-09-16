import React, { Component } from 'react';
import EachReview from './EachReview';
import Pagination from "react-js-pagination";

class AllReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 3,
            allObjs : [],
        };

       this.fun1=this.fun1.bind(this)
      }
     
      handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});


        fetch('https://jsonplaceholder.typicode.com/todos')
          .then(response => response.json())
          .then((json) => {
              let aray;
             aray =  json.slice((this.state.activePage*10)-10,this.state.activePage*10)
             console.log(aray);
             aray.map((rev)=>{
                //  this.setState({ allObjs: this.state.allObjs.push(rev) })
                 this.setState({ allObjs: [...this.state.allObjs, rev] })
                 
             })
             console.log(this.allObjs);
            }
              )
      }
      
    fun1(){
          fetch('https://jsonplaceholder.typicode.com/todos')
          .then(response => response.json())
          .then((json) => {
              
              console.log(json)
              
              let aray;
             json.map((a)=>{
              //    console.log(a);
             })
             aray =  json.slice((this.state.activePage*10)-10,this.state.activePage*10)
             console.log(aray);}
              
              )
      }
    render() {

        let allObjs =[]

        
        return (

            <>
            <button onClick={this.fun1}>aa</button>
            <h2 className="mt-3">Reviews</h2>
            
            {/* 1-10   1
            11-20    2
            21-30   3
            arr.slice((activepage*10)-9,activepage*10) */}
abc
            {this.state.allObjs.map((obj)=>{
                <div>{obj.id}a</div>
                console.log({obj.id} + 'hello');
            })}
anc
            <div className="AllReviews">
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
                </div>
            </>
        );
    }
}

export default AllReviews;
