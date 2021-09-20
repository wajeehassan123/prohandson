import React, { Component } from 'react'
import { Card } from './../components/Card'
import { Header } from './Header'

export class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',courses:[]
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

    render() {
        return (
            <>
                <Header parentCallback = {this.handleCallback}/>
                
                    <h2 className="my-4 fw-bolder ">Search Results</h2>
                    <h3 className="searchHeading">Searched Value</h3>
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
                    
                </div>
            </>
        )
    }
}