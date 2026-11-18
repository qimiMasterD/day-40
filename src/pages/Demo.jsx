import { useDispatch, useSelector } from "../libs/react-redux";

function Demo() {
    const counter = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    return (
        <>
            <h2>Counter here is {counter}</h2>
            <button
                onClick={() => {
                    dispatch({
                        type: "inc",
                    });
                }}
            >
                Increase
            </button>
        </>
    );
}

export default Demo;
