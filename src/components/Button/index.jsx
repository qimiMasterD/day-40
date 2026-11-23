import styles from "./Button.module.scss";

function Button({ onClick, isDisabled, children, ...props }) {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            disabled={isDisabled}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
