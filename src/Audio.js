import React, { Component } from "react";
import Sound from "react-sound";
import rain from "./assets/rain.mp3";
import cafe from "./assets/cafe.mp3";
import forest from "./assets/forest.mp3";
import ocean from "./assets/ocean.mp3";
import peace from "./assets/peace.mp3";

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: rain,
      playing: "stopped",
    };
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.isPlaying === "started" &&
      nextProps.currentSession === "session"
    ) {
      this.setState({ playing: "started" });
    } else {
      this.setState({ playing: "stopped" });
    }
  }

  handleClick = (e) => {
    let target = e.target.id;
    this.setState({ playing: "stopped" });
    const { isPlaying, currentSession } = this.props;
    if (isPlaying === "started" && currentSession === "session") {
      if (target === "forest") {
        this.setState({ theme: forest });
      } else if (target === "ocean") {
        this.setState({ theme: ocean });
      } else if (target === "peace") {
        this.setState({ theme: peace });
      } else if (target === "cafe") {
        this.setState({ theme: cafe });
      } else {
        this.setState({ theme: rain });
      }
      this.setState({ playing: "started" });
    } else {
      this.setState({ playing: "stopped" });
      if (target === "forest") {
        this.setState({ theme: forest });
      } else if (target === "ocean") {
        this.setState({ theme: ocean });
      } else if (target === "peace") {
        this.setState({ theme: peace });
      } else if (target === "cafe") {
        this.setState({ theme: cafe });
      } else {
        this.setState({ theme: rain });
      }
    }
  };
  render() {
    const { theme, playing } = this.state;
    let status;
    if (playing === "started") {
      status = Sound.status.PLAYING;
    } else if (playing === "stopped") {
      status = Sound.status.STOPPED;
    } else {
      status = Sound.status.PAUSED;
    }
    return (
      <>
        <div id="audio-selector">
          <div
            id="forest"
            className={theme === forest ? "selected theme" : "theme"}
            onClick={this.handleClick}
          >
            Forest
          </div>
          <div
            id="ocean"
            className={theme === ocean ? "selected theme" : "theme"}
            onClick={this.handleClick}
          >
            Ocean
          </div>
          <div
            id="rainy"
            className={theme === rain ? "selected theme" : "theme"}
            onClick={this.handleClick}
          >
            Rainy
          </div>
          <div
            id="peace"
            className={theme === peace ? "selected theme" : "theme"}
            onClick={this.handleClick}
          >
            Peace
          </div>
          <div
            id="cafe"
            className={theme === cafe ? "selected theme" : "theme"}
            onClick={this.handleClick}
          >
            Caf&eacute;
          </div>
        </div>
        <Sound url={this.state.theme} playStatus={status} loop />
      </>
    );
  }
}
export default Audio;
