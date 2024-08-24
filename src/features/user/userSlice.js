import { createSlice } from "@reduxjs/toolkit";
import {
  loadUsersFromLocalStorage,
  saveUsersToLocalStorage,
} from "../../utils/helper.js";

const initialState = {
  users: loadUsersFromLocalStorage(), // Initialize from localStorage or as empty array
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      console.log("adduser dispatched");
      state.users.unshift(action.payload); // Add new user to state
      saveUsersToLocalStorage(state.users); // Save entire updated users array to local storage
    },

    deleteUser: (state, action) => {
      console.log("dispatched delete fn", action.payload);
      const userIdToDelete = action.payload; // Assuming action.payload contains the index of the user to delete
      const updatedUsers = state.users.filter(
        (user, index) => index !== userIdToDelete
      ); // Remove user by index
      state.users = updatedUsers;
      saveUsersToLocalStorage(state.users);
      console.log(state.users);
    },

    editUser: (state, action) => {
      const { index, updatedUser } = action.payload;

      if (state.users[index]) {
        state.users = state.users.map((user, i) =>
          i === index ? updatedUser : user
        );
        saveUsersToLocalStorage(state.users); // Save updated users to local storage
      } // Save updated users to local storage
    },
  },
});

export const { addUsers, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;
