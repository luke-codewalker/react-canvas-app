import { useState } from 'react';
import './App.css';
import { OverlayMenu } from './components/OverlayMenu/OverlayMenu';
import { draw } from './draw';
import { useCanvas } from "./lib/canvas";


function App() {
  const [frequency, setFrequency] = useState(5);
  const [width, setWidth] = useState(80);
  const [unneeded, setUnneeded] = useState(80);

  const canvasRef = useCanvas(draw, [frequency, width])

  return (
    <div className="App">
      <OverlayMenu>
        <label>Frequency
        <input type="range" name="frequency" id="frequency" min="1" max="10" value={frequency} onChange={event => setFrequency(parseInt(event.target.value))} />
        </label>
        <label>Max Width
        <input type="range" name="width" id="width" min="1" max="100" value={width} onChange={event => setWidth(parseInt(event.target.value))} />
        </label>
        <label>Unneeded Value
        <input type="range" name="unneeded" id="unneeded" min="1" max="100" value={unneeded} onChange={event => setUnneeded(parseInt(event.target.value))} />
        </label>
      </OverlayMenu>
      <canvas ref={canvasRef} width="600" height="600"></canvas>
    </div>
  );
}

export default App;
