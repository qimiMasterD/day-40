import Button from "../Button";
import styles from "./TaskItem.module.scss";

function TaskItem({ task, onEdit, onDelete, isDeleting }) {
    const handleDelete = () => {
        if (window.confirm("Are you sure you wanna delete this task?"))
            onDelete(task.id);
    };
    return (
        <div className={styles.item}>
            <div className={styles.title}>{task.title}</div>
            <div className={styles.actions}>
                <Button onClick={onEdit} isDisabled={isDeleting}>
                    Edit
                </Button>
                <Button onClick={handleDelete} isDisabled={isDeleting}>
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default TaskItem;
