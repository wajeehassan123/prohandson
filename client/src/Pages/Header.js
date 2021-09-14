import React from 'react'
import { Button,Navbar,Nav ,NavDropdown,Form, FormControl,Container } from 'react-bootstrap'
import $ from 'jquery';


export class Header extends React.Component {

    constructor(props){
        super(props);
        this.state={data:[],search:''}
        this.handleSearch=this.handleSearch.bind(this);
        
        this.SubmitSearch=this.SubmitSearch.bind(this);
        this.createSearchDiv=this.createSearchDiv.bind(this);
        this.eachCourse=this.eachCourse.bind(this);
    }


    handleSearch(event){
this.setState({search:event.target.value});
    }

    SubmitSearch(event){

        this.props.parentCallback(this.state.search);
        event.preventDefault();
        
        
        // fetch(`/api/tutor/getCourseByTitle/${this.state.search}`)
        // .then(response => response.json())
        // .then(data=>{
        //     console.log(data);
        //     this.setState({data:data.data});
        //     window.location.href="/searchresults"

        //     this.state.data.map(searchData=>{
               
            
        
        // })

        // })
    }

    eachCourse(id){
        alert(id);
    }

    createSearchDiv(){
       return this.state.data.map(searchData=>{
           
       <div className="search_results d-flex">
<div>
             <h4>
                 {searchData.title}
             </h4>
             <h5>
                 {searchData.name}
             </h5>
         </div>
         </div>
        })

    }

    render(){

       
    return (
        <Navbar bg="light" expand="lg" className="container-fluid px-lg-4">
        <Navbar.Brand className="nav_logo fw-bolder" href="#">ProHandson</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="lg-d-flex justify-content-between">
            <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
            >
           
            </Nav>
            <Form className="d-flex mb">
            <div>
                <FormControl
                onChange={this.handleSearch}

                value={this.state.search}
                    type="search"
                    placeholder="Search Courses"
                    className="mr-2 search_inputfield"
                    aria-label="Search"
                />
                <div id="search-result" className="search_results_con">
                 
                </div>
            </div>
            
            <Button className="mx-1" variant="outline-primary" onClick={this.SubmitSearch}>Search</Button>
            {/* <Button className="">Start Coaching</Button> */}
            </Form>
            <div className="nav_btns mt-lg-0 d-flex float-right justify-content-center">
                
                                <a href="/Signuptutor" className="btn btn-primary px-4">Start Coaching</a>
                                <a href="/loginContainer" className="btn btn-warning px-4 mx-2">Login</a>
                                <a href="/signup" className="btn btn-danger px-4">Signup</a>
            </div> 
        </Navbar.Collapse>
       
    </Navbar>
    )
                }
}