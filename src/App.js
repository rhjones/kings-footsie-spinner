import React, {Component} from 'react';
import './App.css';

const appendages = ['right hand', 'right foot', 'left hand', 'left foot'];
const colors = ['red', 'green', 'yellow', 'blue'];

export const possibleSpins = appendages.reduce(
  (options, part) => [...options, ...colors.map(color => ({
    color,
    part,
    audio: 'speechSynthesis' in window ? new SpeechSynthesisUtterance(`${part} ${color}`) : null,
  }))],
  []
);

const optionCount = possibleSpins.length;

const getSpin = () => possibleSpins[Math.floor(Math.random() * optionCount)];

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
    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(spin.audio);
    }
  }

  timer;

  startSpinning = () => {
    this.timer = setInterval(this.executeSpin, 6000);
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
