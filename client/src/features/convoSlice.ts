import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface AppState {
  convoId: number | null;
  convoName: string | null;
  convoDesc: string | null;
}

// takes in a conversation ID, and name starting as null
const initialState: AppState = {
  convoId: null,
  convoName: null,
  convoDesc: null,
};

export const convoSlice = createSlice({
  name: "convo",
  initialState,
  reducers: {
    // this action sets the ID, and name according to the payload values
    setConvoInfo: (state, { payload }: PayloadAction<any>) => {
      state.convoId = payload.convoId;
      state.convoName = payload.convoName;
      state.convoDesc = payload.convoDesc;
    },
  },
});

// exports the main action used for getting conversation information used with useDispatch hook from react-redux
export const { setConvoInfo } = convoSlice.actions;

// exports constants containing the ID and the name, which is used by the useSelector hook from react-redux
// eg. store state > app layer > convoID
export const setConvoId = (state: RootState) => state.convo.convoId;
export const setConvoName = (state: RootState) => state.convo.convoName;
export const setConvoDesc = (state: RootState) => state.convo.convoDesc;
// exports the conversation slice as a reducer
export default convoSlice.reducer;
