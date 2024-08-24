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
      try {
        console.log("adduser dispatched");
        state.users.unshift(action.payload); // Add new user to state
        saveUsersToLocalStorage(state.users); // Save entire updated users array to local storage
      } catch (error) {
        console.error("Failed to add user:", error);
      }
    },

    deleteUser: (state, action) => {
      try {
        console.log("dispatched delete fn", action.payload);
        const userIdToDelete = action.payload; // Assuming action.payload contains the index of the user to delete
        const updatedUsers = state.users.filter(
          (user, index) => index !== userIdToDelete
        ); // Remove user by index
        state.users = updatedUsers;
        saveUsersToLocalStorage(state.users); // Save updated users to local storage
        console.log(state.users);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    },

    editUser: (state, action) => {
      try {
        const { index, updatedUser } = action.payload;

        if (state.users[index]) {
          state.users = state.users.map((user, i) =>
            i === index ? updatedUser : user
          );
          saveUsersToLocalStorage(state.users); // Save updated users to local storage
        }
      } catch (error) {
        console.error("Failed to edit user:", error);
      }
    },
  },
});

export const { addUsers, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;
