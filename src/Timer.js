import React, { Component } from "react";
import Audio from "./Audio";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.loop = undefined;
  }
  componentWillUnmount() {
    clearInterval(this.loop);
  }
  state = {
    breakCount: 5,
    sessionCount: 25,
    clockCount: 1500,
    currentSession: "session",
    isPlaying: "reset",
  };
  handlePlay = () => {
    this.setState({ isPlaying: "started" });
    this.loop = setInterval(() => {
      const {
        clockCount,
        currentSession,
        breakCount,
        sessionCount,
      } = this.state;
      if (clockCount === 0) {
        this.setState({
          currentSession: currentSession === "session" ? "break" : "session",
          clockCount:
            currentSession === "session" ? breakCount * 60 : sessionCount * 60,
        });
      } else {
        this.setState({ clockCount: clockCount - 1 });
      }
    }, 1000);
  };
  handlePause = () => {
    clearInterval(this.loop);
    this.setState({ isPlaying: "paused" });
  };
  handleReset = () => {
    const { isPlaying } = this.state;
    if (isPlaying !== "started") {
      this.setState({
        breakCount: 5,
        sessionCount: 25,
        clockCount: 1500,
        currentSession: "session",
        isPlaying: "reset",
      });
      clearInterval(this.loop);
    }
  };
  handleSessionIncrease = () => {
    const { sessionCount, isPlaying, currentSession } = this.state;
    if (sessionCount < 60 && isPlaying !== "started") {
      this.setState({ sessionCount: sessionCount + 1 });
      if (currentSession === "session") {
        this.setState({ clockCount: sessionCount * 60 + 60 });
      }
    }
  };
  handleSessionDecrease = () => {
    const { sessionCount, isPlaying, currentSession } = this.state;
    if (sessionCount > 1 && isPlaying !== "started") {
      this.setState({ sessionCount: sessionCount - 1 });
      if (currentSession === "session") {
        this.setState({ clockCount: sessionCount * 60 - 60 });
      }
    }
  };
  handleBreakIncrease = () => {
    const { breakCount, isPlaying, currentSession } = this.state;
    if (breakCount < 60 && isPlaying !== "started") {
      this.setState({ breakCount: breakCount + 1 });
      if (currentSession === "break") {
        this.setState({ clockCount: breakCount * 60 + 60 });
      }
    }
  };
  handleBreakDecrease = () => {
    const { breakCount, isPlaying, currentSession } = this.state;
    if (breakCount > 1 && isPlaying !== "started") {
      this.setState({ breakCount: breakCount - 1 });
      if (currentSession === "break") {
        this.setState({ clockCount: breakCount * 60 - 60 });
      }
    }
  };
  convertTime(count) {
    let minutes = Math.floor(count / 60);
    let seconds = count - minutes * 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return `${minutes}:${seconds}`;
  }
  render() {
    const { isPlaying, sessionCount, breakCount, currentSession } = this.state;
    return (
      <>
        <div id="pomodoro">
          <div id="clock">
            <div id="timer">
              <div id="title">
                {currentSession === "session" ? "Session" : "Break"}
              </div>
              <div id="countdown">
                <span className="time-left">
                  {this.convertTime(this.state.clockCount)}
                </span>
              </div>
              <div
                id="controls"
                className={
                  isPlaying === "paused"
                    ? "paused"
                    : isPlaying === "started"
                    ? "started"
                    : "reset"
                }
              >
                <div id="start" onClick={this.handlePlay}>
                  <i className="fas fa-play"></i> Start
                </div>
                <div id="pause" onClick={this.handlePause}>
                  <i className="fas fa-pause"></i> Pause
                </div>
                <div
                  id="reset"
                  onClick={this.handleReset}
                  style={
                    isPlaying === "started"
                      ? { cursor: "default" }
                      : { cursor: "pointer" }
                  }
                >
                  <i className="fas fa-sync-alt"></i> Reset
                </div>
              </div>
            </div>
          </div>
          <div
            id="options"
            style={isPlaying === "started" ? { display: "none" } : null}
          >
            <div id="session">
              <i
                id="incrSession"
                className="fas fa-angle-double-up"
                onClick={this.handleSessionIncrease}
              ></i>
              <span className="option-title">Session</span>
              <div className="inputs">{sessionCount}</div>
              <i
                id="decrSession"
                className="fas fa-angle-double-down"
                onClick={this.handleSessionDecrease}
              ></i>
            </div>
            <div id="break">
              <i
                id="incrBreak"
                className="fas fa-angle-double-up"
                onClick={this.handleBreakIncrease}
              ></i>
              <span className="option-title">Break</span>
              <div className="inputs">{breakCount}</div>
              <i
                id="decrBreak"
                className="fas fa-angle-double-down"
                onClick={this.handleBreakDecrease}
              ></i>
            </div>
          </div>
        </div>
        <Audio currentSession={currentSession} isPlaying={isPlaying} />
      </>
    );
  }
}
export default Timer;
