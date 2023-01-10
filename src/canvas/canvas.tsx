import styles from "./canvas.module.css";
import * as types from "../logics/types";
import TextBox from "../canvas/components/TextBox/TextBox";
import Image from "../canvas/components/Image/Image";
import ArtObject from "../canvas/components/ArtObject/ArtObject";
import * as functions from "../logics/functions";
import { MouseEvent } from "react";
import { dispatch } from "../state/state";

type CanvasProps = {
    canvasObject: types.CanvasType
}

function Canvas(props: CanvasProps) {

    // const clickHandler = (e: MouseEvent) => {
    //   //e.preventDefault();
    //   //functions.unSelectAllObjects(props.canvasObject);
    //   dispatch(functions.unSelectAllObjects, {})
    //   console.log(props.canvasObject.listObjects[0].isSelected);
    // }

    const style = {
        width: props.canvasObject.size.width + 'px',
        height: props.canvasObject.size.height + 'px',
        backgroundColor: props.canvasObject.bgColor
      };

    return (
        <div className={styles.Canvas} style={style} >
            {props.canvasObject.listObjects.map(item => {
                if (item.type === "text") {
                    return <TextBox textObject={item} />
                } else if (item.type === "image") {
                    return <Image imageObject={item} />
                } else if (item.type === "artObject") {
                    return <ArtObject artObject={item} />
                }
            })}
        </div>
    );
}
  
export default Canvas;