import { combineReducers } from "redux";
import projectsReducer from "./projects";
import tasksReducer from "./tasks";
import userReducer from "./users";

const entitiesReducer= combineReducers({
    tasks: tasksReducer,
    projecst:projectsReducer,
    users: userReducer
})
export default entitiesReducer