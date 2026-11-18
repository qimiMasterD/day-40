let initialState = {
    counter: 0,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "inc":
            return {
                ...state,
                counter: state.counter + 1,
            };
        default:
            return state;
    }
}

export default reducer;
