import React, { Component } from 'react';

import { AppointmentPicker } from 'react-appointment-picker';
import { TutorHeader } from './TutorHeader';

export class SetAvailability extends React.Component {

  constructor(props){
    super(props);
    if(!props.data){
      window.location.href="/logintutor";
    }
    if(this.props.studentLoginVal){
      window.location.href="/logintutor";
    }
    this.state = {
      loading: false,
      continuousLoading: false,
      SelectedDates: [],
      ids:[],
      dateTime:{}
    };
    this.addAppointmentCallback=this.addAppointmentCallback.bind(this);
    this.addAppointmentCallbackContinuousCase=this.addAppointmentCallbackContinuousCase.bind(this);
    this.removeAppointmentCallback=this.removeAppointmentCallback.bind(this);
    this.removeAppointmentCallbackContinuousCase=this.removeAppointmentCallbackContinuousCase.bind(this);
    this.HandleSubmit=this.HandleSubmit.bind(this);
  }
  

  

  addAppointmentCallback = ({
    addedAppointment: { day, number, time, id },
    addCb
  }) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
        console.log(
          `Added appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        addCb(day, number, time, id);
        this.setState({ loading: false });
      }
    );
    console.log(time);
    this.state.ids.push(id)
this.state.dateTime={date:day,time:time,tutor_id:localStorage.tutor_id,isReserved:true}
    this.state.SelectedDates.push(this.state.dateTime)
    this.state.SelectedDates.forEach(element => {
        console.log(element);
        
        })
  };

  removeAppointmentCallback = ({ day, number, time, id }, removeCb) => {
    this.setState(
      {
        loading: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 200));
        console.log(
          `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        removeCb(day, number);
        this.setState({ loading: false });
      }
    );
  };


  HandleSubmit(){
    
var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);

myHeaders.append("Content-Type", "application/json");


      const requestOptions = {
        method: 'POST',
        headers:myHeaders,
        body:JSON.stringify({id:this.state.ids,tutor_id:localStorage.tutor_id}) 
      };
      fetch('/api/setAppointment',requestOptions)
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        alert(data.message);
        window.location.href="/set";
        
      })
    
  }

  addAppointmentCallbackContinuousCase = ({
    addedAppointment: { day, number, time, id },
    addCb,
    removedAppointment: params,
    removeCb
  }) => {
    this.setState(
      {
        continuousLoading: true
      },
      async () => {
        if (removeCb) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          console.log(
            `Removed appointment ${params.number}, day ${params.day}, time ${params.time}, id ${params.id}`
          );
          removeCb(params.day, params.number);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(
          `Added appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        addCb(day, number, time, id);
        this.setState({ continuousLoading: false });
      }
    );
  };

  removeAppointmentCallbackContinuousCase = (
    { day, number, time, id },
    removeCb
  ) => {
    this.setState(
      {
        continuousLoading: true
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(
          `Removed appointment ${number}, day ${day}, time ${time}, id ${id}`
        );
        removeCb(day, number);
        this.setState({ continuousLoading: false });
      }
    );
  };

  
  
  render() {

    // days.map((ele, i) =>{
    //   ele.map((element, index) =>{
    //     element.id = index;
    //     console.log(element.id);
    //   })
    // })
    const { loading, continuousLoading } = this.state;
    const date=new Date()
    date.setHours(8,0,0,0)
    
    let dayArr = []
    
    let inc = 1;
    for (let index = 0; index < 7; index++) {
      dayArr.push([])
    }
    dayArr.map((e)=>{
     for (let j = 0; j < 48; j++) {
       e.push( {
         id: inc,
         number : j,
         isReserved : true,
         
       })
       inc++;
     }
    })
    console.log(dayArr);
    // let sArr = [3,4,5]  
    
    dayArr.map(ele =>{
      ele.map(element =>{
        // console.log(element.id);
       element.isReserved = false;
          
        })
      })


    
    return (

      
      <div>
        <TutorHeader/>
        {/* <h1 className="my-4">Choose your availability </h1> */}
      <div className=" set_container">
        <h3 className="fw-bolder my-3">Select your Available Time</h3>
        <h5 className="fw-lighter mb-3">All times listed are in your local timezone</h5>
      <AppointmentPicker
          addAppointmentCallback={this.addAppointmentCallback}
          removeAppointmentCallback={this.removeAppointmentCallback}
          initialDay={date}
          days={dayArr}
          maxReservableAppointments={99}
          alpha = {true}
          alpha = {false}
          visible = {true}
          selectedByDefault
          loading={loading}
          unitTime ={18000_00}
        />
        
      <button className="btn btn-primary my-3" onClick={this.HandleSubmit}> Set Times </button>
      </div>
      </div>
    );
  }
}