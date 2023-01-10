import React from 'react';
import './app.module.css';
import Toolbar from "../toolbar/toolbar";
import Canvas from "../canvas/canvas";
import styles from "./app.module.css"
import * as types from "../logics/types"

type AppProps = {
  canvas: types.CanvasType;
}

function App(props: AppProps) {
  return (
    <div className={styles.App}>
      <Toolbar statisticObject={props.canvas.name}/>
      <Canvas canvasObject={props.canvas}/>
    </div>
  );
}
export default App;
