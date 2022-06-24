const taskListReducer = (state = {}, action) => {
    switch (action.type) {
        case "TASK_LIST":
            return action.payload;
        default:
            return state;
    }
};

export default taskListReducer;