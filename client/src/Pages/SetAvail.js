import React, { Component } from 'react';

import { AppointmentPicker } from 'react-appointment-picker';
import { TutorHeader } from './TutorHeader';

export class SetAvail extends React.Component {

  constructor(props){
    super(props);
//     if(!props.data){
//       window.location.href="/logintutor";
//   }
    this.state = {
      loading: false,
      continuousLoading: false,
      SelectedDates: [],
      dateIDS:[],
      dateTime:{}
    };
    this.addAppointmentCallback=this.addAppointmentCallback.bind(this);
    this.addAppointmentCallbackContinuousCase=this.addAppointmentCallbackContinuousCase.bind(this);
    this.removeAppointmentCallback=this.removeAppointmentCallback.bind(this);
    this.removeAppointmentCallbackContinuousCase=this.removeAppointmentCallbackContinuousCase.bind(this);
    this.getAppointmentDates=this.getAppointmentDates.bind(this);
    this.getAppointmentDates();
  }


  getAppointmentDates(){

    fetch(`/api/getAppointment/${this.props.tutor_id}`)
    .then(response=>response.json())
    .then(data=>{
      console.log(data);
      this.setState({dateIDS:data.data.id});
    })
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
    let sArr = [3,4,5]
    console.log(this.state.dateIDS);
    this.state.dateIDS.forEach(e=>{
      console.log(e + 'you');
    })
    
    dayArr.map(ele =>{
      ele.map(element =>{
        // console.log(element.id);
        this.state.dateIDS.forEach(e=>{
          if(e == element.id){
            console.log(e + 'we won mr stark');
            element.isReserved = false;
          }
          else{
            // element.isReserved = true;
          }
          
        })
      })
    })
   
    const { loading, continuousLoading } = this.state;
    const date=new Date()
    date.setHours(8,0,0,0)
    // var date1 = new Date(dateTime.getTime());
    // date1.setHours(0, 0, 0, 0);
    
    return (
      <div>
        <h1 className="my-4">Choose your 30 Minutes Trial </h1>
      <div className=" set_container">
        <h5 className="fw-lighter mb-3">All times listed are in your local timezone</h5>
      <AppointmentPicker
          addAppointmentCallback={this.addAppointmentCallback}
          removeAppointmentCallback={this.removeAppointmentCallback}
          initialDay={date}
          unitTime={15_60_1000}
        //   initialDay={new Date(2018, 11, 24, 8, 0, 0, 0)}
        //   initialDay={date1}
          days={dayArr}
          maxReservableAppointments={1}
          alpha = {true}
          alpha = {false}
          visible = {true}
          selectedByDefault
          loading={loading}
          unitTime ={18000_00}
        />
      </div>
      
      </div>
    );
  }
}