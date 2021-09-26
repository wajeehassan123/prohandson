import React from 'react'
import { Navbar,Nav , Dropdown} from 'react-bootstrap'
import SearchInput from '../components/SearchInput';

export class HeaderLogginIn extends React.Component {
    constructor(props){
        super(props);
        this.SubmitSearch=this.SubmitSearch.bind(this);
        this.logout=this.logout.bind(this);
    }

    SubmitSearch(childData){

        this.props.parentCallback(childData);
        }

    logout(){
       localStorage.clear();
       window.location.href="/loginTutor";
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
            
            {/* Search Component */}
            <SearchInput Searchtext={this.SubmitSearch}/>

            <div className="nav_btns mt-lg-0 d-flex justify-content-center mx-5">
            <Dropdown >
                <Dropdown.Toggle variant="primary" id="dropdown-basic" className="px-4 ">
                   Profile
                </Dropdown.Toggle>

                <Dropdown.Menu> 
                    <Dropdown.Item href="/">Home</Dropdown.Item>
                    {/* <Dropdown.Item href="/editprofile">Edit Profile</Dropdown.Item>
                    <Dropdown.Item href="/changepassword">Change Password</Dropdown.Item> */}
                    <Dropdown.Item onClick={this.logout} >Log Out</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </div> 
        </Navbar.Collapse>
    </Navbar>
    )
}
}