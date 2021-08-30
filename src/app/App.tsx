import { useState, MouseEvent } from 'react';
import { draw } from '../art/draw';
import { useCanvas } from "../lib/canvas";
import './App.css';

const config = {
  width: 800,
  height: 800
}

function App() {
  const [stepSize, setStepSize] = useState(1);

  const canvasRef = useCanvas(draw, [stepSize])

  return (
    <div className="app">
      <section className="canvas-container">
        <canvas ref={canvasRef} width={config.width} height={config.height}></canvas>
      </section>
      <section className="menu">
        <h1>React Canvas App</h1>
        <p>Use these inputs to control the animation:</p>
        <label className="slider">Step Size
          <input type="range" name="step-size" id="step-size" min="0" max="20" value={stepSize}
            onChange={event => setStepSize(parseInt(event.target.value))} />
          {stepSize}
        </label>
      </section>
    </div>
  );
}

export default App;
