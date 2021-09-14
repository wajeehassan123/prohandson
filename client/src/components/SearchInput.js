import React, { Component } from 'react';
import { Button,Navbar,Nav ,NavDropdown,Form, FormControl,Container } from 'react-bootstrap'

const MyContext=React.createContext();
class SearchInput extends Component {

    constructor(props){
        super(props);
        this.state={data:[],search:''}
        this.handleSearch=this.handleSearch.bind(this);
        this.SubmitSearch=this.SubmitSearch.bind(this);
    }


    handleSearch(event){
        this.setState({search:event.target.value});
    }

    SubmitSearch(){
        fetch(`/api/tutor/getCourseByTitle/${this.state.search}`)
        .then(response => response.json())
        .then(data=>{
            console.log(data);
            this.setState({data:data.data});
            window.location.href="/searchresults";

        })
    }


    render() {
        return (
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
            </Form>
        );
    }
}

export default SearchInput;
