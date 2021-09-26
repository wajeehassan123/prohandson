import React from 'react'

export class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state={data:''}
        this.handleSearch=this.handleSearch.bind(this);
    }
    handleSearch(event){
        alert(event.target.value);
        fetch(`/api/tutor/getCourseByTitle/${event.target.value}`)
        .then(response => response.json())
        .then(data=>{
            console.log(data);
            this.setState({data:data.data});
        })
    }

    render(){
    return (
        <>
        
        <nav id="nav_container">
            <div className="nav">
                <div className="nav_inner">
                    <div className="nav_logo fw-bolder">
                        ProHandson
                    </div>
                    <form action="" className="searchForm">
                        <input value={this.state.data} onChange={this.handleSearch} type="text" className="searchInput" placeholder="Search Skills"/>
                    </form>
                    <div className="nav_btns d-flex">
                        <button className="btn btn-warning px-4 mx-2">Login</button>
                        <button className="btn btn-danger px-4">Signup</button>
                    </div>  

                </div>  
            </div>
        </nav>
     </>
    )
            }
}



function logout(){
    localStorage.removeItem("token");
    window.location.href="/login";


}
