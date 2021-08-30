import { useState } from 'react';
import { draw } from '../art/draw';
import { useCanvas } from "../lib/canvas";
import './App.css';

const config = {
  width: 800,
  height: 800
}

function App() {
  const [frequency, setFrequency] = useState(25);
  const [width, setWidth] = useState(50);

  const canvasRef = useCanvas(draw, [frequency, width])

  return (
    <div className="app">
      <section className="canvas-container">
        <canvas ref={canvasRef} width={config.width} height={config.height}></canvas>
      </section>
      <section className="menu">
        <h1>React Canvas App</h1>
        <p>Use these inputs to control the animation</p>
        <label className="slider">Frequency
          <input type="range" name="frequency" id="frequency" min="0" max="100" value={frequency} onChange={event => setFrequency(parseInt(event.target.value))} />
          {frequency}
        </label>
        <label className="slider">Max Width
          <input type="range" name="width" id="width" min="1" max="100" value={width} onChange={event => setWidth(parseInt(event.target.value))} />
          {width}
        </label>
      </section>
    </div>
  );
}

export default App;
