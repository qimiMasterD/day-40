import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import { taskApi } from "../../api/task";

import TaskForm from "../../components/TaskForm";
import { useDispatch } from "../../libs/react-redux";
import styles from "./EditTask.module.scss";

function EditTask() {
    const [isLoading, setIsLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            setFetching(true);
            try {
                const data = await taskApi.getById(id);
                setTitle(data.title);
            } catch (err) {
                if (err.status === 404) {
                    Navigate("/");
                    return;
                }
                setError(err.message);
            } finally {
                setFetching(false);
            }
        }
        getData();
    }, [id, Navigate]);

    const onSubmit = (data) => {
        setIsLoading(true);
        setError(null);
        async function postData() {
            try {
                const updatedData = await taskApi.update(id, {
                    ...data,
                });
                dispatch({
                    type: "UPDATE_TASK",
                    payload: updatedData,
                });
                Navigate("/");
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        }
        postData();
    };

    if (fetching) return <p>Loading your task...</p>;
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Edit this task</h1>
                {error && <p className={styles.error}>{error}</p>}
            </div>
            <TaskForm
                initialData={{ title }}
                onSubmit={onSubmit}
                submitText="Edit"
                isLoading={isLoading}
            ></TaskForm>
        </div>
    );
}

export default EditTask;
