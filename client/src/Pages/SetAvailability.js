import React, { Component } from 'react';

import { AppointmentPicker } from 'react-appointment-picker';
import { TutorHeader } from './TutorHeader';

export class SetAvailability extends React.Component {

  constructor(props){
    super(props);
    if(!props.data){
      window.location.href="/logintutor";
  }
    this.state = {
      loading: false,
      continuousLoading: false,
      SelectedDates: [],
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

    this.state.SelectedDates.map(eachDateTime=>{

      const requestOptions = {
        method: 'POST',
        headers:myHeaders,
        body:JSON.stringify({date:eachDateTime.date,time:eachDateTime.time,tutor_id:localStorage.tutor_id,isReserved:true}) 
      };
      fetch('/api/tutor/appointment',requestOptions)
      .then(response=>response.json)
      .then(data=>{
        console.log(data);
        
      })
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
      //   let days1 = [][]
    //   for (let index = 0; index < 7; index++) {
    //       for (let j = 0; j < 48; j++) {
    //           days1[i][j]
              
    //       }
          
    //   }
   
    const days = [
      
      [
          { id: 11, number: 1,  },
          { id: 12, number: 2 },
          { id: 13, number: 3, },
          { id: 14, number: 4 },
          { id: 15, number: 5 },
          { id: 16, number: 6 },
          { id: 17, number: 7 },
          { id: 18, number: 8 },
          
      ],
      [
        { id: 21, number: 1, },
        { id: 22, number: 2,  },
        { id: 23, number: 3, },
        { id: 24, number: 4 },
        { id: 11, number: 5 },
        { id: 12, number: 6 }
      ],
      [
        { id: 13, number: 1 },
        { id: 14, number: 2 },
        { id: 15, number: 3,  },
        { id: 16, number: '4' },
        { id: 17, number: 5 },
        { id: 18, number: 6 }
      ],
      [
        { id: 19, number: 1 },
        { id: 20, number: 2 },
        { id: 21, number: 3 },
        { id: 22, number: '4' },
        { id: 23, number: 5 },
        { id: 24, number: 6 }
      ],
      [
        { id: 25, number: 1,  },
        { id: 26, number: 2 },
        { id: 27, number: '3',  },
        { id: 28, number: '4' },
        { id: 29, number: 5 },
        { id: 30, number: 6,  }
      ],
      [
        { id: 31, number: 1,  },
        // { id: 32, number: 2, },
        // { id: 33, number: '3',  },
        // { id: 34, number: '4',  },
        { id: 35, number: 5,  isReserved : true},
        { id: 36, number: 6, }
      ]
    ];
    days.map((ele, i) =>{
      ele.map((element, index) =>{
        element.id = index;
        console.log(element.id);
      })
    })
    const { loading, continuousLoading } = this.state;
    const date=new Date()
    date.setHours(8,0,0,0)
    // var date1 = new Date(dateTime.getTime());
    // date1.setHours(0, 0, 0, 0);
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