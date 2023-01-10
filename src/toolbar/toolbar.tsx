import styles from "./toolbar.module.css";
import {dispatch} from "../state/state";
import * as types from "../logics/types";
import * as functions from "../logics/functions";
import {useState} from "react";

type ToolBarProps = {
  statisticObject: string;
}

function Toolbar(props: ToolBarProps) {
  const [state, setState] = useState(props.statisticObject)

  return (
    <div className={styles.Toolbar}>
      <div className={styles.info}>
        <p className={styles.Title}>Название открытки:</p>
        <input 
          type="text" 
          className={styles.Input}
          value={state} 
          onChange={(e) => {
            dispatch(functions.changeNamePage, state)
            setState(e.target.value)
          }}
        />
      </div>

      <div>
        <button className={styles.button} onClick={() => {
          dispatch(functions.createReсtangle, state)
          // setState('')
        }}>
          <img src="https://img.icons8.com/ios/30/000000/square.png" alt="" />
        </button>
        <button className={styles.button} onClick={() => {
          dispatch(functions.createCircle, state)
        }} value="circle">
          {/* <img src="https://img.icons8.com/ios/30/000000/circle.png" alt="" /> */}
          circle
        </button>
        <button className={styles.button} onClick={() => {
          dispatch(functions.createTriangle, state)
        }} value="triangle">
          {/* <img src="https://img.icons8.com/ios/30/000000/circle.png" alt="" /> */}
          triangle
        </button>

      </div>  
    </div>
  );
}

export default Toolbar;