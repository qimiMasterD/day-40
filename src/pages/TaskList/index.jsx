import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { taskApi } from "../../api/task";
import { useDispatch, useSelector } from "../../libs/react-redux";

import TaskItem from "../../components/TaskItem";
import Button from "../../components/Button";
import styles from "./TaskList.module.scss";

function TaskList() {
    const { tasks, loading, error } = useSelector((state) => state);
    const [deletingId, setDeletingId] = useState([]);
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "SET_LOADING",
        });
        async function getTasks() {
            try {
                const currentTasks = await taskApi.getAll();
                dispatch({
                    type: "SET_TASKS",
                    payload: currentTasks,
                });
            } catch (error) {
                dispatch({
                    type: "SET_ERROR",
                    payload: error,
                });
            }
        }
        getTasks();
    }, [dispatch]);

    async function handleDelete(id) {
        setDeletingId((prev) => [...id, prev]);
        try {
            await taskApi.delete(id);
            dispatch({
                type: "DELETE_TASK",
                payload: id,
            });
        } catch (error) {
            alert("Delete failed: " + error.message);
        } finally {
            setDeletingId((prev) => {
                const index = prev.indexOf(id);
                if (index !== -1) prev.slice(index, 1);
                return [...prev];
            });
        }
    }

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Tasklist</h1>
                <Button
                    onClick={() => {
                        Navigate("/new-task");
                    }}
                >
                    Create new task
                </Button>
            </div>

            {error && <div className={styles.error}>{error.message}</div>}

            {loading ? (
                <div className={styles.status}>Loading tasks...</div>
            ) : (
                <div className={styles.list}>
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onEdit={() => {
                                Navigate(`/${task.id}/edit`);
                            }}
                            onDelete={handleDelete}
                            isDeleting={deletingId.indexOf(+task.id) !== -1}
                        ></TaskItem>
                    ))}
                </div>
            )}
        </section>
    );
}

export default TaskList;
