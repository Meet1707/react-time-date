import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    arrTime: [],
    timeDiff: "",
    currentTime: ""
  }
  componentWillMount() {
    let currTime = new Date();
    let hours = currTime.getHours();
    let minutes = currTime.getMinutes();
    let time = this.getTimeIn12Hours(hours, minutes);
    this.setState({
      currentTime: time
    });
  }
  componentDidUpdate() {
    let time1, time2 = this.state.currentTime;
    let { arrTime } = this.state;

    if (arrTime.length % 2 === 0) {
      time1 = arrTime[arrTime.length - 1];
      this.getTimeDifferenceBetween();
    }
    else
      time2 = arrTime[arrTime.length - 1]
  }
  pushTimeIntoArr = (currTime) => {
    currTime = new Date();
    let hours = currTime.getHours();
    let minutes = currTime.getMinutes();
    let time = this.getTimeIn12Hours(hours, minutes);
    this.setState({
      arrTime: [...this.state.arrTime, time]
    })
  }
  getTimeIn12Hours = (hours, minutes) => {
    let day = "";
    if (Number(hours) > 12) {
      day = "PM";
      hours = Number(hours) - 12;
    }
    else
      day = "AM";
    return (hours + ":" + + minutes + ":" + day);
  }
  getTimeDifferenceBetween = (prev="3:30:AM", next="3:5:PM") => {
    let prevTime = prev.split(":");
    let nextTime = next.split(":");
    let prevHour = Number(prevTime[0]), prevMin = Number(prevTime[1]), prevDay = prevTime[2];
    let nextHour = Number(nextTime[0]), nextMin = Number(nextTime[1]), nextDay = nextTime[2];
    let add12Hr = false;
    let diff = "";
    let diffHr, diffMin;
    if (prevDay === "PM" && nextDay === "AM")
      add12Hr = true;
    else if (prevDay === "AM" && nextDay === "PM")
      add12Hr = true;



    diffHr = Number(nextHour) - Number(prevHour);
    if (add12Hr === true)
    diffHr = (Number(nextHour) - Number(prevHour)) + 12;
    diffMin = (Number(nextMin) - Number(prevMin));
    diff = diffHr + " HR " + Math.abs(diffMin) + " MIN";
  
      setTimeout(()=>{
        this.setDiffTime(diff);
      },5)
    }
  setDiffTime = (difference) => {
    this.setState({
      timeDiff: difference
    })
  }

  render() {
    let {arrTime} = this.state;
    return (<>
      <button onClick={this.pushTimeIntoArr}>
        Click
      </button>
      <br />
          <>
              {JSON.stringify(arrTime)}
          </>
      <br />
         {this.state.timeDiff}
    </>);
  }
}

export default App;
