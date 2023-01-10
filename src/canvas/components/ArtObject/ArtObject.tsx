import { ArtObjectType, ShapeType } from "../../../logics/types";
import styles from "./artObject.module.css";
import { MouseEvent } from "react";
import * as functions from "../../../logics/functions";
import { dispatch } from "../../../state/state";
import { useRef, useState } from "react";

type ArtObjectTypeProps = {
  artObject: ArtObjectType;
};

function ArtObject(props: ArtObjectTypeProps) {

  //const ref = useRef(null)
  const [pos, setPos] = useState({x: 0, y: 0})
  const [drag, setDrag] = useState({active: false, x: 0,  y: 0});

  const [dims, setDims] = useState({width: 100, height: 100});

  const startResize = (e: MouseEvent) => {
    setDrag({
      active: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  const resizeFrame = (e: MouseEvent) => {
    const { active, x, y } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      const yDiff = Math.abs(y - e.clientY);
      const newW = x > e.clientX ? dims.width - xDiff : dims.width + xDiff;
      const newH = y > e.clientY ? dims.height + yDiff : dims.height - yDiff;

      setDrag({ ...drag, x: e.clientX, y: e.clientY });
      setDims({ width: newW, height: newH });
      dispatch(functions.changeObjectDimensions, {id: props.artObject.id, size: {width: newW, height: newH}})
    }
  };

  const stopResize = (e: MouseEvent) => {
    setDrag({ ...drag, active: false });
  };
  
  //useDragAndDrop(ref, setPos)

  const clickHandler = (e: MouseEvent) => {    
    console.log(props.artObject);
    if (!props.artObject.isSelected) {
      dispatch(functions.selectObject, props.artObject)
    }
    else {
      dispatch(functions.unselectObject, {})
    }
    
  }

  const MouseDown = (e: MouseEvent) => {

    if (props.artObject.isSelected === false) {
      return
    }

    const startPos = {x: e.pageX , y: e.pageY}
    setPos(startPos)
    console.log(startPos);
  }

  const MouseMove = (e: MouseEvent) => {
    if (e.buttons === 0) return;

    if (props.artObject.isSelected === false) {
      return
    }

    const delta = {x: e.pageX - pos.x , y: e.pageY - pos.y}
    const newPos = {x: props.artObject.сoord.x + delta.x, y: props.artObject.сoord.y + delta.y, z: props.artObject.сoord.z}
    
    console.log(delta);
    console.log(newPos);

    setPos({x: e.pageX, y: e.pageY})
    //console.log(newPos);
    dispatch(functions.changeObjectPosition, {id: props.artObject.id, coord: newPos})
  }

  const style = {
    left: props.artObject.сoord.x,
    top: props.artObject.сoord.y,
    width: props.artObject.size.width,
    height: props.artObject.size.height,
    zIndex: props.artObject.сoord.z
  };

  const styleLT = {
    left: props.artObject.сoord.x - 5,
    top: props.artObject.сoord.y - 5,
    zIndex: props.artObject.сoord.z + 1
  };

  const styleRT = {
    left: props.artObject.сoord.x + props.artObject.size.width - 5,
    top: props.artObject.сoord.y - 5,
    zIndex: props.artObject.сoord.z + 1
  };

  const styleLB = {
    left: props.artObject.сoord.x - 5,
    top: props.artObject.сoord.y + props.artObject.size.height - 5,
    zIndex: props.artObject.сoord.z + 1
  };

  const styleRB = {
    left: props.artObject.сoord.x + props.artObject.size.width - 5,
    top: props.artObject.сoord.y + props.artObject.size.height - 5,
    zIndex: props.artObject.сoord.z + 1
  };

  if (props.artObject.shape === ShapeType.Rectangle) {
    return ( 
      <>
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleLT} onMouseDown={startResize} onMouseMove={resizeFrame} onMouseUp={stopResize}></div>
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleRT} onMouseDown={startResize} onMouseMove={resizeFrame} onMouseUp={stopResize}></div>
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleLB} onMouseDown={startResize} onMouseMove={resizeFrame} onMouseUp={stopResize}></div>
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleRB} onMouseDown={startResize} onMouseMove={resizeFrame} onMouseUp={stopResize}></div>

        <div
          className={styles.artObject}
          style={style}
          onClick={clickHandler}
          onMouseDown={MouseDown}
          onMouseMove={MouseMove}
          onMouseUp={
            () => 
            {
            setPos({x: 0, y: 0});
            //window.removeEventListener('mousemove', MouseMove)
            //dispatch(functions.changeObjectPosition, {id: props.artObject.id, coord: pos})
          }}
          //ref={ref}
        >
          
          <svg          
            width={props.artObject.size.width}
            height={props.artObject.size.height}  
            viewBox={`
              ${-props.artObject.borderSize} 
              ${-props.artObject.borderSize} 
              ${props.artObject.size.width + props.artObject.borderSize * 2} 
              ${props.artObject.size.height + props.artObject.borderSize * 2}
            `}        
          >
            <rect          
              width={props.artObject.size.width}
              height={props.artObject.size.height}
              fill={props.artObject.fill}
              stroke={props.artObject.borderColor}
              strokeWidth={props.artObject.borderSize}
            />
          </svg> 
          
        </div>
        </>   
    );
  }

  if (props.artObject.shape === ShapeType.Ellipse) {
    return (
      <div 
        className={styles.artObject} 
        style={style}      
        onClick={clickHandler}
        onMouseDown={MouseDown}
        onMouseMove={MouseMove}
        onMouseUp={
          () => 
          {
          setPos({x: 0, y: 0});
          //window.removeEventListener('mousemove', MouseMove)
          //dispatch(functions.changeObjectPosition, {id: props.artObject.id, coord: pos})
        }} 
      >
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleLT}></div>
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleRT}></div>
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleLB}></div>
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleRB}></div>

        <svg
          width={props.artObject.size.width}
          height={props.artObject.size.height}         
          viewBox={`
            ${-props.artObject.borderSize} 
            ${-props.artObject.borderSize} 
            ${props.artObject.size.width + props.artObject.borderSize * 2} 
            ${props.artObject.size.height + props.artObject.borderSize * 2}
          `}
        >
          <ellipse
            cx={props.artObject.size.width / 2}
            cy={props.artObject.size.height / 2}
            rx={props.artObject.size.width / 2}
            ry={props.artObject.size.height / 2}
            fill={props.artObject.fill}
            stroke={props.artObject.borderColor}
            strokeWidth={props.artObject.borderSize}
          />
        </svg>
      </div>
    );
  }

  if (props.artObject.shape === ShapeType.Triangle) {
    return (
      <div 
        className={styles.artObject} 
        style={style}   
        onClick={clickHandler}
        onMouseDown={MouseDown}
        onMouseMove={MouseMove}
        onMouseUp={
          () => 
          {
          setPos({x: 0, y: 0});
          //window.removeEventListener('mousemove', MouseMove)
          //dispatch(functions.changeObjectPosition, {id: props.artObject.id, coord: pos})
        }}     
      >
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleLT}></div>
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleRT}></div>
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleLB}></div>
        <div className={props.artObject.isSelected ? styles.selectSqures : styles.notSelectSqures} style={styleRB}></div>

        <svg
          width={props.artObject.size.width}
          height={props.artObject.size.height}         
          viewBox={`
            ${-props.artObject.borderSize} 
            ${-props.artObject.borderSize} 
            ${props.artObject.size.width + props.artObject.borderSize * 2} 
            ${props.artObject.size.height + props.artObject.borderSize * 2}
          `}
        >
          <polygon          
            points={`
              ${props.artObject.size.width / 2},
              0 ${props.artObject.size.width},
              ${props.artObject.size.height} 0,
              ${props.artObject.size.height}
            `}
            fill={props.artObject.fill}
            stroke={props.artObject.borderColor}
            strokeWidth={props.artObject.borderSize}
          />        
        </svg>
      </div>
      
    );
  }

  return null;
}

export default ArtObject;