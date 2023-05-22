import { createSlice } from "@reduxjs/toolkit";

const removePrompt = (prompts,prompt) =>{
    return prompts.filter(p => p._id != prompt._id);
}


const initialState = {
    prompts:[],
    isLoading:false,
    error:null,
    creating:false
}

const promptSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    prompt_creating:(state,action) =>{
        state.creating = action.payload;
    },
    prompts_fetch_pending: (state) =>{
        state.isLoading = true
    },
    prompts_fetch_success(state, action) {
        state.prompts = action.payload;
        state.isLoading =false;
    },
    prompts_fetch_failure(state) {
        state.isLoading =false;
    },
    prompt_delete(state, action) {
        state.prompts = removePrompt(state.prompts,action.payload)
    },
  },
});

export const {prompt_creating,prompts_fetch_pending,prompts_fetch_success,prompts_fetch_failure,prompt_delete} = promptSlice.actions;

export const promptsReducer = promptSlice.reducer;

