import { useState } from 'react';
import { OverlayMenu } from './components/OverlayMenu/OverlayMenu';
import { draw } from './draw';
import { useCanvas } from "./lib/canvas";
import styles from './App.module.css';

function App() {
  const [frequency, setFrequency] = useState(5);
  const [width, setWidth] = useState(80);

  const canvasRef = useCanvas(draw, [frequency, width])

  return (
    <div className="App">
      <OverlayMenu>
        <label className={styles.slider}>Frequency
        <input type="range" name="frequency" id="frequency" min="1" max="10" value={frequency} onChange={event => setFrequency(parseInt(event.target.value))} />
        </label>
        <label className={styles.slider}>Max Width
        <input type="range" name="width" id="width" min="1" max="100" value={width} onChange={event => setWidth(parseInt(event.target.value))} />
        </label>
      </OverlayMenu>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>
  );
}

export default App;
