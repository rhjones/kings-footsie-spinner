import React, {Component} from 'react';
import './App.css';

const bodyParts = ['right hand', 'right foot', 'left hand', 'left foot'];
const colors = ['red', 'green', 'yellow', 'blue'];

const twisterOptions = bodyParts.reduce(
  (options, part) => [...options, ...colors.map(color => ({
    color,
    part,
    audio: new SpeechSynthesisUtterance(`${part} ${color}`)
  }))],
  []
);

const optionCount = twisterOptions.length;

const getSpin = () => twisterOptions[Math.floor(Math.random() * optionCount)];

class App extends Component {
  state = {
    spin: getSpin(),
    isSpinning: false,
  };

  setIsSpinning = () => {
    this.setState(prevState => ({isSpinning: !prevState.isSpinning}), this.handleTimer);
  };

  executeSpin = () => {
    const spin = getSpin();
    this.setState({spin});
    window.speechSynthesis.speak(spin.audio);
  }

  timer;

  startSpinning = () => {
    this.timer = setInterval(() => {
      this.executeSpin();
    }, 6000);
  };

  stopSpinning = () => {
    clearInterval(this.timer);
    this.setState({spin: getSpin()})
  };

  handleTimer = () => {
    if (this.state.isSpinning) {
      this.executeSpin();
      this.startSpinning();
    } else {
      this.stopSpinning();
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.timer);
  };

  render() {
    return (
      <div className="App" >
        <header className={`App-header ${this.state.spin.color}`}>
          <p>{this.state.isSpinning ? `${this.state.spin.part} ${this.state.spin.color}`.toUpperCase() : 'CLICK TO START'}</p>
          <button
            className="Btn"
            onClick={this.setIsSpinning}
          >
            {this.state.isSpinning ? 'stop' : 'start'}
          </button>
        </header>
      </div>
    );
  }

}

export default App;
