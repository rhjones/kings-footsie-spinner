import React, {useState, useEffect} from 'react';
import './App.css';

const bodyParts = ['right hand', 'right foot', 'left hand', 'left foot'];
const colors = ['red', 'green', 'yellow', 'blue'];

const hexColors = {
  red: '#ca303d',
  green: '#a0a433',
  yellow: '#eec634',
  blue: '#436b6f',
};

const twisterOptions = bodyParts.reduce(
  (options, part) => [...options, ...colors.map(color => ({
    hex: hexColors[color],
    words: `${part} ${color}`,
    audio: new SpeechSynthesisUtterance(`${part} ${color}`)
  }))],
  []
);

const optionCount = twisterOptions.length;

const makeSpin = () => twisterOptions[Math.floor(Math.random() * optionCount)];

function App() {
  const [spin, setSpin] = useState(makeSpin());
  const [isGoing, setIsGoing] = useState(false);

  useEffect(() => {
    let timer;
    if (isGoing) {
      timer = setInterval(() => {
        const currentSpin = makeSpin();
        setSpin(currentSpin);
        window.speechSynthesis.speak(currentSpin.audio);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGoing]);

  return (
    <div className="App" >
      <header className="App-header" style={{backgroundColor: spin.hex}}>
        <p>{spin.words.toUpperCase()}</p>
        <button
          className="Btn"
          onClick={() => setIsGoing(!isGoing)}
        >
          {isGoing ? 'stop' : 'start'}
        </button>
      </header>
    </div>
  );
}

export default App;
