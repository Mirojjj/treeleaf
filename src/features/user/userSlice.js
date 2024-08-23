import { createSlice } from "@reduxjs/toolkit";
import {
  loadUsersFromLocalStorage,
  saveUsersToLocalStorage,
} from "../../utils/helper.js";

const initialState = {
  users: loadUsersFromLocalStorage() || [],
  filteredUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.push(action.payload);
      saveUsersToLocalStorage(action.payload);
    },
    getUsers: (state) => {
      return state.users;
    },
  },
});

export const { addUsers, getUsers } = userSlice.actions;
export default userSlice.reducer;
