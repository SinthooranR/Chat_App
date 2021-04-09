import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";

interface UserState {
  user: any;
}

// takes in a user object starting as null
const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // this action sets the user information according to the payload values
    login: (state, { payload }: PayloadAction<any>) => {
      state.user = payload;
    },
    // this action sets the user information back to null
    logout: (state) => {
      state.user = null;
    },
  },
});

// exports the main action used for getting user information used with useDispatch hook from react-redux
export const { logout, login } = userSlice.actions;

// exports constants containing the user object, which is used by the useSelector hook from react-redux
// eg. store state > app layer > user
export const setUser = (state: RootState) => state.user.user;

// exports the user slice as a reducer
export default userSlice.reducer;
