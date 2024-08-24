import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  loadUsersFromLocalStorage,
  saveUsersToLocalStorage,
} from "../../utils/helper.js";

const initialState = {
  users: loadUsersFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      try {
        const newUser = { ...action.payload, id: uuidv4() };
        console.log(newUser);
        state.users.unshift(newUser);
        saveUsersToLocalStorage(state.users);
      } catch (error) {
        console.error("Failed to add user:", error);
      }
    },

    deleteUser: (state, action) => {
      try {
        const userIdToDelete = action.payload;
        console.log(userIdToDelete);
        const updatedUsers = state.users.filter(
          (user) => user.id !== userIdToDelete
        ); // Remove user by ID
        state.users = updatedUsers;
        saveUsersToLocalStorage(state.users);
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
        saveUsersToLocalStorage(state.users);
      } catch (error) {
        console.error("Failed to edit user:", error);
      }
    },
  },
});

export const { addUsers, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;
