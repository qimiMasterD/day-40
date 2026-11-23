import { useNavigate } from "react-router";
import { useState } from "react";

import { taskApi } from "../../api/task";

import TaskForm from "../../components/TaskForm";
import { useDispatch } from "../../libs/react-redux";
import styles from "./NewTask.module.scss";

function NewTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const onSubmit = (data) => {
        setIsLoading(true);
        setError(null);
        async function postData() {
            try {
                const receivedData = await taskApi.create(data.title);
                dispatch({
                    type: "ADD_TASK",
                    payload: receivedData,
                });
                Navigate("/");
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        }
        postData();
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Create new task</h1>
                {error && <p className={styles.error}>{error}</p>}
            </div>
            <TaskForm
                onSubmit={onSubmit}
                submitText="Create"
                isLoading={isLoading}
            ></TaskForm>
        </div>
    );
}

export default NewTask;
