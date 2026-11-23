import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import styles from "./TaskForm.module.scss";
import Button from "../Button";

function TaskForm({
    initialData = { title: "" },
    onSubmit,
    submitText,
    isLoading,
} = {}) {
    const [title, setTitle] = useState(initialData.title || "");
    const [error, setError] = useState(null);
    const Navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedTitle = title.trim();

        if (trimmedTitle === "") {
            setError("Title should not be empty");
            return;
        }

        setError(null);
        onSubmit({ title: trimmedTitle });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="title">
                    Task Title
                </label>
                <input
                    className={`${styles.input} ${error ? styles.inputError : ""}`.trim()}
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    ref={inputRef}
                    disabled={isLoading}
                    placeholder="Enter task title..."
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                {error && <p className={styles.error}>{error}</p>}
            </div>
            <div className={styles.actions}>
                <Button type="submit" isDisabled={isLoading}>
                    {isLoading ? "Processing..." : submitText}
                </Button>
                <Button
                    variant="secondary"
                    isDisabled={isLoading}
                    onClick={() => {
                        Navigate("/");
                    }}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}

export default TaskForm;
