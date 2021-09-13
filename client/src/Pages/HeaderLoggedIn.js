import React from 'react'
import { Button,Navbar,Nav , Dropdown,Form, FormControl} from 'react-bootstrap'

export const HeaderLogginIn = () => {

    function logout(){
       localStorage.clear();
       window.location.href="/loginTutor";
    }
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
                // onChange={this.handleSearch}
                    type="search"
                    placeholder="Search Courses"
                    className="mr-2 search_inputfield"
                    aria-label="Search"
                />
                <div id="search-result" className="search_results_con">
                 {/* {this.createSearchDiv()} */}
                </div>
            </div>
            
            <Button className="mx-1" variant="outline-primary">Search</Button>
            {/* <Button className="">Start Coaching</Button> */}
            </Form>

            <div className="nav_btns mt-lg-0 d-flex justify-content-center mx-5">
            <Dropdown >
                <Dropdown.Toggle variant="primary" id="dropdown-basic" className="px-4 ">
                   Profile
                </Dropdown.Toggle>

                <Dropdown.Menu> 
                    <Dropdown.Item href="/">Home</Dropdown.Item>
                    <Dropdown.Item href="/editprofile">Edit Profile</Dropdown.Item>
                    <Dropdown.Item href="/changepassword">Change Password</Dropdown.Item>
                    <Dropdown.Item onClick={logout} >Log Out</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </div> 
        </Navbar.Collapse>
    </Navbar>
    )
}