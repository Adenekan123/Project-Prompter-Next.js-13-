import { combineReducers } from "@reduxjs/toolkit";

import { promptsReducer } from "./prompt/prompt.slice";

const rootReducer = combineReducers({
    prompts:promptsReducer
});

export default rootReducer;