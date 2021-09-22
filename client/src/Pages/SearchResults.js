import React, { Component } from 'react'
import { Card } from './../components/Card'
import { Header } from './Header'
import Pagination from "react-js-pagination";
import ReactPaginate from 'react-paginate';
import $ from 'jquery';

export class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',courses:[],
            activePage: 1,
        }
        this.handleCallback=this.handleCallback.bind(this);
        this.searchCourses=this.searchCourses.bind(this);
        this.fetchData=this.fetchData.bind(this);
        this.searchCourses();

    }

    searchCourses(){
        if(localStorage.search){
        this.setState({data:localStorage.search});
        this.fetchData(localStorage.search);
        }
    }


    fetchData(data){
        fetch(`/api/tutor/getCourseByTitle/${data}`)
        .then(response => response.json())
        .then(data=>{
            this.setState({courses:data.data});
            //window.location.href="/searchresults"

        //     this.state.data.map(searchData=>{
            console.log(this.state.courses);
        
        // })

        })
    }

   // getData(val){
        // do not forget to bind getData in constructor
     //   console.log(val);
    //}
    handleCallback = (childData) =>{
        //this.setState({data: childData});
        this.fetchData(childData);
       
    }

    EachCoursePage(id){
   
        localStorage.setItem("course_id",id);
        window.location.href="/eachcourse";
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
      }


    render() {
        return (
            <>
                <Header parentCallback = {this.handleCallback}/>
                
                    <h2 className="my-4 fw-bolder ">Search Results</h2>
                    {/* <h3 className="searchHeading">Searched Value</h3> */}
                <div className="searchresults_cards">
                    
                {
                    this.state.courses.map(eachSearch=>{
                        return(    
                            <div className="card_body  mrg"  onClick={()=>this.EachCoursePage(eachSearch._id)}>
                        <Card key={eachSearch._id} {...eachSearch} />
                        </div>
                        )
                    })
                }
                    
                {/* <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={2}
                    totalItemsCount={5}
                    pageRangeDisplayed={2}
                    onChange={this.handlePageChange.bind(this)}
                /> */}

                </div>

            </>
        )
    }
}