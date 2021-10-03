import React from 'react'
import { Card } from './../components/Card'
import { Header } from './Header'
import {HeaderLogginIn} from './HeaderLoggedIn'
// import Pagination from "react-js-pagination";
import  Pagination  from './../components/Pagination'

export class SearchResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: '',courses:[],
            currentPage: 1,
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

    // handlePageChange(pageNumber) {
    //     console.log(`active page is ${pageNumber}`);
    //     this.setState({activePage: pageNumber});
    //   }


    render() {
        const indexOfLastPost = this.state.currentPage * 12;
        const indexOfFirstPost = indexOfLastPost - 12;
        const currentPosts = this.state.courses.slice(indexOfFirstPost,indexOfLastPost)

        const paginate = pageNumber =>{
            return this.setState(
                {currentPage:pageNumber}
            )
            // setCurrentPage(pageNumber)
        };
        return (
            <>
                {
                    this.props.studentLoginVal&&this.props.data?(
                        <HeaderLogginIn parentCallback = {this.handleCallback}/>
                    ): (
                        <Header parentCallback = {this.handleCallback}></Header>
                    )
                }
                
                    <h2 className="my-4 fw-bolder ">Search Results</h2>
                    {/* <h3 className="searchHeading">Searched Value</h3> */}
                <div className="searchresults_cards">
                    
                {
                    // this.state.courses.map(eachSearch=>{
                    currentPosts.map(eachSearch=>{
                        return(    
                            <div className="card_body  mrg"  onClick={()=>this.EachCoursePage(eachSearch._id)}>
                        <Card key={eachSearch._id} {...eachSearch} />
                        </div>
                        )
                    })
                }

                </div>  
                <Pagination
                        className="Pagination_component"
                        postsPerPage={12}
                        totalPosts={this.state.courses.length}
                        paginate={paginate}
                    />
                    
                {/* <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.activePage}
                    itemsCountPerPage={2}
                    totalItemsCount={5}
                    pageRangeDisplayed={2}
                    onChange={this.handlePageChange.bind(this)}
                /> */}


            </>
        )
    }
}