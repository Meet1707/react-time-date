import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    arrTime: [],
    timeDiff: "",
  }


  pushTimeIntoArr = (currTime) => {
    currTime = new Date();
    let hours = currTime.getHours();
    let minutes = currTime.getMinutes();
    let time = this.getTimeIn12Hours(hours, minutes);
    this.setState({
      arrTime: [...this.state.arrTime, time]
    }, () => {
      this.findDifference()
    })
  }
  getTimeIn12Hours = (hours, minutes) => {
    let day = "";
    if (Number(hours) > 12) {
      day = "AM";
      hours = Number(hours) - 12;
    }
    else
      day = "PM";
    return (hours + ":" + + minutes + ":" + day);
  }
  findDifference = () => {
    let { arrTime } = this.state;
    if (arrTime.length % 2 === 0) {
      this.getTimeDifferenceBetween(arrTime[arrTime.length - 2], arrTime[arrTime.length - 1]);
    }
  }
  getTimeDifferenceBetween = (prev, next) => {
    let prevTime = prev.split(":");
    let nextTime = next.split(":");
    let prevHour = Number(prevTime[0]), prevMin = Number(prevTime[1]), prevDay = prevTime[2];
    let nextHour = Number(nextTime[0]), nextMin = Number(nextTime[1]), nextDay = nextTime[2];
    let add12Hr = false;
    let diff = "";
    let diffHr = 0, diffMin = 0;
    if (prevDay === "PM" && nextDay === "AM")
      add12Hr = true;
    else if (prevDay === "AM" && nextDay === "PM")
      add12Hr = true;
    diffHr = Number(nextHour) - Number(prevHour);
    if (add12Hr === true)
      diffHr = (Number(nextHour) - Number(prevHour)) + 12;
    diffMin = (Number(nextMin) - Number(prevMin));
    if (Number(diffMin) < 0) {
      diffHr -= 1;
      diffMin += 60;
    }
    diff = Math.abs(diffHr) + " HR " + Math.abs(diffMin) + " MIN";
    this.setState({
      timeDiff: diff
    })
  }

  render() {
    let { arrTime } = this.state;
    return (<>
      <button onClick={this.pushTimeIntoArr}>
        Click
      </button>
      <br />
      <>
        {JSON.stringify(arrTime)}
      </>
      <br />
      Difference: {this.state.timeDiff}
    </>);
  }
}

export default App;
