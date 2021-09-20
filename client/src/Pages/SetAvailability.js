import React, { Component } from 'react';

import { AppointmentPicker } from 'react-appointment-picker';

export class SetAvailability extends React.Component {
  state = {
    loading: false,
    continuousLoading: false
  };

  SelectedDates = []

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
    this.SelectedDates.push(day)
    this.SelectedDates.forEach(element => {
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
      //   let days1 = [][]
    //   for (let index = 0; index < 7; index++) {
    //       for (let j = 0; j < 48; j++) {
    //           days1[i][j]
              
    //       }
          
    //   }
    const days = [
      [
          { id: 1, number: 1,  },
          { id: 2, number: 2 },
          { id: 3, number: '3', },
          { id: 4, number: '4' },
          { id: 5, number: 5 },
          { id: 6, number: 6 }
      ],
      [
        { id: 7, number: 1, },
        { id: 8, number: 2,  },
        { id: 9, number: '3', },
        { id: 10, number: '4' },
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
        { id: 32, number: 2, },
        { id: 33, number: '3',  },
        { id: 34, number: '4',  },
        { id: 35, number: 5,  },
        { id: 36, number: 6, }
      ]
    ];
    const { loading, continuousLoading } = this.state;
    // var date1 = new Date(dateTime.getTime());
    // date1.setHours(0, 0, 0, 0);
    
    return (
      <div>
        <h1>Appointment Picker</h1>
        <AppointmentPicker
          addAppointmentCallback={this.addAppointmentCallback}
          removeAppointmentCallback={this.removeAppointmentCallback}
          initialDay={new Date(2018, 11, 24, 8, 0, 0, 0)}
        //   initialDay={new Date(2018, 11, 24, 8, 0, 0, 0)}
        //   initialDay={date1}
          days={days}
          maxReservableAppointments={99}
          alpha = {true}
          alpha = {false}
          visible = {true}
          selectedByDefault
          loading={loading}
          unitTime ={18000_00}
        />
        {/* <h1>Appointment Picker Continuous Case</h1>
        <AppointmentPicker
          addAppointmentCallback={this.addAppointmentCallbackContinuousCase}
          removeAppointmentCallback={
            this.removeAppointmentCallbackContinuousCase
          }
          initialDay={new Date(2018, 11, 24, 10, 33, 30, 0)}
          days={days}
          maxReservableAppointments={2}
          alpha
          visible
          selectedByDefault
          loading={continuousLoading}
          continuous
          
        /> */}
      </div>
    );
  }
}
