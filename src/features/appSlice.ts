import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";

interface AppState {
  channelId: any;
  channelName: string | null;
}

const initialState: AppState = {
  channelId: null,
  channelName: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setChannelInfo: (state, { payload }: PayloadAction<any>) => {
      state.channelId = payload.channelId;
      state.channelName = payload.channelName;
    },
  },
});

export const { setChannelInfo } = appSlice.actions;

// store state > app layer > channel ID
export const selectChannelId = (state: RootState) => state.app.channelId;
export const selectChannelName = (state: RootState) => state.app.channelName;

export default appSlice.reducer;
