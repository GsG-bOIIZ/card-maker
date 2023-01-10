import styles from "./button.module.css";

export default function Button (props: {additionalClass: string, onClick: Function})
{
    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.onClick();
    };

    return (
        <button className={styles.button + " " + props.additionalClass} onClick={buttonHandler}>
        </button>
    );
}
