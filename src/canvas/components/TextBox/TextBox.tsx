import { TextType } from "../../../logics/types";
import styles from "./textbox.module.css";

type TextProps = {
  textObject: TextType;
};

function Text(props: TextProps) {
  const positionStyle = {
    left: props.textObject.сoord.x,
    top: props.textObject.сoord.y,
    zIndex: props.textObject.сoord.z
  };

  const style = {
    fontSize: props.textObject.fontSize + 'pt',
    color: props.textObject.color,
    fontFamily: props.textObject.font,
    width: props.textObject.size.width,
    height: props.textObject.size.height
  };

  return (
    <div style={positionStyle} className={styles.position}>
      <input
        style={style}
        className={styles.textbox}
        type="text"
        value={props.textObject.content}
      />
    </div>
  );
}

export default Text;