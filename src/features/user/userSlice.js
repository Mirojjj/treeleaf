import { createSlice } from "@reduxjs/toolkit";
import {
  loadUsersFromLocalStorage,
  saveUsersToLocalStorage,
} from "../../utils/helper.js";

const initialState = {
  users: loadUsersFromLocalStorage(),
  filteredUsers: [],
  searchQuery: "",
  filters: {
    type: "all", // New field to manage filtering type (e.g., 'city', 'country', 'province')
    city: "",
    country: "",
    province: "",
  },
  sortConfig: { key: "name", direction: "asc" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
      state.filteredUsers = action.payload; // Initially set filtered users to all users
      saveUsersToLocalStorage(state.users); // Save users to local storage
    },
    addUser(state, action) {
      state.users.push(action.payload);
      saveUsersToLocalStorage(state.users); // Save updated users to local storage
      userSlice.caseReducers.applyFilters(state); // Update filtered users
    },
    deleteUser(state, action) {
      state.users = state.users.filter(
        (user, index) => index !== action.payload
      );
      saveUsersToLocalStorage(state.users); // Save updated users to local storage
      userSlice.caseReducers.applyFilters(state); // Update filtered users
    },
    updateUser(state, action) {
      const { index, userData } = action.payload;
      state.users[index] = userData;
      saveUsersToLocalStorage(state.users); // Save updated users to local storage
      userSlice.caseReducers.applyFilters(state); // Update filtered users
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      userSlice.caseReducers.applyFilters(state);
    },
    setFilter(state, action) {
      const { name, value } = action.payload;
      state.filters[name] = value;
      userSlice.caseReducers.applyFilters(state);
    },
    setFilterType(state, action) {
      state.filters.type = action.payload;
      userSlice.caseReducers.applyFilters(state);
    },
    setSortConfig(state, action) {
      const { key, direction } = action.payload;
      state.sortConfig = { key, direction };
      userSlice.caseReducers.applySort(state);
    },
    applyFilters(state) {
      const { searchQuery, filters, users } = state;
      state.filteredUsers = users.filter((user) => {
        const matchesSearch =
          !searchQuery ||
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase());

        // Dynamically apply filter based on selected filter type
        let matchesFilter = true;
        if (filters.type === "city" && filters.city) {
          matchesFilter = user.city === filters.city;
        } else if (filters.type === "country" && filters.country) {
          matchesFilter = user.country === filters.country;
        } else if (filters.type === "province" && filters.province) {
          matchesFilter = user.province === filters.province;
        }

        return matchesSearch && matchesFilter;
      });
    },
    applySort(state) {
      const { sortConfig, filteredUsers } = state;
      state.filteredUsers = [...filteredUsers].sort((a, b) => {
        const aValue = a[sortConfig.key] || "";
        const bValue = b[sortConfig.key] || "";
        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    },
  },
});

export const {
  setUsers,
  addUser,
  deleteUser,
  updateUser,
  setSearchQuery,
  setFilter,
  setFilterType,
  setSortConfig,
} = userSlice.actions;
export default userSlice.reducer;
