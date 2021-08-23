import { useState } from 'react';
import './App.css';
import { useCanvas, AnimationSetup } from "./lib/canvas";

const draw: AnimationSetup<[number, number]> = (canvas, context, [frequency, width]) => {
  const iIncrement = frequency / 200;
  const maxRadius = canvas.width * width / 100 / 2;
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  let i = 0;

  return frameCount => {
    context.fillStyle = '#333';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(x, y, maxRadius * Math.abs(Math.cos(i)), 0, 2 * Math.PI);
    context.fillStyle = 'tomato';
    context.fill();
    i += iIncrement;
  }
}

function App() {
  console.log('App')
  const [frequency, setFrequency] = useState(5);
  const [width, setWidth] = useState(80);
  const [unneeded, setUnneeded] = useState(80);

  const canvasRef = useCanvas(draw, [frequency, width])

  return (
    <div className="App">
      <label>Frequency
        <input type="range" name="frequency" id="frequency" min="1" max="10" value={frequency} onChange={event => setFrequency(parseInt(event.target.value))} />
      </label>
      <label>Max Width
        <input type="range" name="width" id="width" min="1" max="100" value={width} onChange={event => setWidth(parseInt(event.target.value))} />
      </label>
      <label>Unneeded Value
        <input type="range" name="unneeded" id="unneeded" min="1" max="100" value={unneeded} onChange={event => setUnneeded(parseInt(event.target.value))} />
      </label>
      <canvas ref={canvasRef} width="600" height="600"></canvas>
    </div>
  );
}

export default App;
