let initialState = {
    tasks: [],
    loading: false,
    error: null,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                error: null,
                loading: true,
            };
        case "SET_ERROR":
            // payload: error message
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case "SET_TASKS":
            // payload: task data
            return {
                tasks: action.payload,
                loading: false,
                error: null,
            };
        case "ADD_TASK":
            // payload: task data
            return {
                tasks: [action.payload, ...state.tasks],
                loading: false,
                error: null,
            };
        case "UPDATE_TASK": {
            // payload: { id: , data:  }
            const newTasks = [...state.tasks];
            const index = newTasks.findIndex(
                (task) => task.id === action.payload.id,
            );
            if (index !== -1) newTasks[index] = action.payload;

            return {
                tasks: newTasks,
                loading: false,
                error: null,
            };
        }
        case "DELETE_TASK": {
            // payload: id
            const newTasks = [...state.tasks];
            const index = newTasks.findIndex(
                (task) => task.id === action.payload,
            );
            if (index !== -1) newTasks.splice(index, 1);

            return {
                tasks: newTasks,
                loading: false,
                error: null,
            };
        }
        default:
            return state;
    }
}

export default reducer;
