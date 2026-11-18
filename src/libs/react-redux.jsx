import { createContext, useEffect, useState } from "react";
import store from "../store";

const reduxContext = createContext();
function Provider({ store, children }) {
    return (
        <reduxContext.Provider value={store}>{children}</reduxContext.Provider>
    );
}

function useStore() {
    return store;
}

function useDispatch() {
    return store.dispatch;
}

function useSelector(selector) {
    const [state, setState] = useState(() => {
        return selector(store.getState());
    });

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(selector(store.getState()));
        });
        return unsubscribe;
    }, [selector]);

    return state;
}

/* eslint-disable react-refresh/only-export-components */
export { Provider, useStore, useDispatch, useSelector };
