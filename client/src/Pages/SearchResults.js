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

    }

   // getData(val){
        // do not forget to bind getData in constructor
     //   console.log(val);
    //}
    handleCallback = (childData) =>{
        this.setState({data: childData});
        fetch(`/api/tutor/getCourseByTitle/${childData}`)
        .then(response => response.json())
        .then(data=>{
            this.setState({courses:data.data});
            //window.location.href="/searchresults"

        //     this.state.data.map(searchData=>{
               
            
            console.log(this.state.courses);
        
        // })

        })



    }

    

    render() {
        const {data} = this.state.courses;
        return (
            <>
                <Header parentCallback = {this.handleCallback}/>
                {data}
                    <h2 className="my-4 fw-bolder ">Search Results</h2>
                    <h3 className="searchHeading">Searched Value</h3>
                <div className="searchresults_cards">
                    
                {
                    this.state.courses.map(eachSearch=>{
                        return(    
                        <Card key={eachSearch._id} {...eachSearch} />
                        )
                    })
                }
                    
                </div>
            </>
        )
    }
}