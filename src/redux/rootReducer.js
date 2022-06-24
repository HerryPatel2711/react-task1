import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import taskListReducer from "./reducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["taskList"],
};

const allReducers = combineReducers({
    taskList: taskListReducer
});

export default persistReducer(persistConfig, allReducers);
