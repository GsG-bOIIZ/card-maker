import { ImageType } from "../../../logics/types";
import styles from "./image.module.css";
import { Buffer } from 'buffer';

type ImageProps = {
  imageObject: ImageType;
};

// function toDataURL(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function() {
//     var reader = new FileReader();
//     reader.onloadend = function() {
//       callback(reader.result);
//     }
//     reader.readAsDataURL(xhr.response);
//   };
//   xhr.open('GET', url);
//   xhr.responseType = 'blob';
//   xhr.send();
// }

// toDataURL('https://mdn.mozillademos.org/files/5397/rhino.jpg', function(dataUrl) {
//   console.log('RESULT:', dataUrl)
// })

function decodeBase64Image(dataString: string) {
  

}

function Image(props: ImageProps) {
  const positionStyle = {
    left: props.imageObject.сoord.x,
    top: props.imageObject.сoord.y,
    zIndex: props.imageObject.сoord.z
  };
  const style = {
    width: props.imageObject.size.width + 'px',
    height: props.imageObject.size.height + 'px'
  };

  return (
    <div style={positionStyle} className={styles.image}>
      <img
        style={style}        
        src={props.imageObject.source}
      />
    </div>
  );
}

export default Image;