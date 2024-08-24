import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; // Import uuid
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
        const newUser = { ...action.payload, id: uuidv4() }; // Generate a unique ID
        console.log(newUser);
        state.users.unshift(newUser); // Add new user to state
        saveUsersToLocalStorage(state.users); // Save entire updated users array to local storage
      } catch (error) {
        console.error("Failed to add user:", error);
      }
    },

    deleteUser: (state, action) => {
      try {
        const userIdToDelete = action.payload; // Assuming action.payload contains the ID of the user to delete
        console.log(userIdToDelete);
        const updatedUsers = state.users.filter(
          (user) => user.id !== userIdToDelete
        ); // Remove user by ID
        state.users = updatedUsers;
        saveUsersToLocalStorage(state.users); // Save updated users to local storage
        console.log(state.users);
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    },

    editUser: (state, action) => {
      try {
        const { id, updatedUser } = action.payload;

        state.users = state.users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        );
        saveUsersToLocalStorage(state.users); // Save updated users to local storage
      } catch (error) {
        console.error("Failed to edit user:", error);
      }
    },
  },
});

export const { addUsers, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;
