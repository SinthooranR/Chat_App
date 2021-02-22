import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";

interface AppState {
  convoId: string | null;
  convoName: string | null;
}

const initialState: AppState = {
  convoId: null,
  convoName: null,
};

export const convoSlice = createSlice({
  name: "convo",
  initialState,
  reducers: {
    setConvoInfo: (state, { payload }: PayloadAction<any>) => {
      state.convoId = payload.convoId;
      state.convoName = payload.convoName;
    },
  },
});

export const { setConvoInfo } = convoSlice.actions;

// store state > app layer > channel ID
export const setConvoId = (state: RootState) => state.convo.convoId;
export const setConvoName = (state: RootState) => state.convo.convoName;

export default convoSlice.reducer;
