import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersFromLocalStorage } from "../utils/helper.js";

import {
  setUsers,
  addUser,
  deleteUser,
  updateUser,
  setSearchQuery,
  setFilter,
  setFilterType,
  setSortConfig,
} from "../features/user/userSlice.js";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { filteredUsers, searchQuery, filters, sortConfig } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const users = loadUsersFromLocalStorage();
    if (users.length > 0) {
      dispatch(setUsers(users));
    }
  }, [dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilter({ name, value }));
  };

  const handleFilterTypeChange = (e) => {
    dispatch(setFilterType(e.target.value));
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    dispatch(setSortConfig({ key, direction }));
  };

  const handleAddUser = (userData) => {
    dispatch(addUser(userData));
  };

  const handleDelete = (index) => {
    dispatch(deleteUser(index));
  };

  const handleEdit = (index, userData) => {
    dispatch(updateUser({ index, userData }));
  };

  return (
    <div>
      {/* Filters and Search */}
      <div>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        {/* Filter Type Selection */}
        <select
          name="filterType"
          value={filters.type}
          onChange={handleFilterTypeChange}
        >
          <option value="all">All</option>
          <option value="city">City</option>
          <option value="country">Country</option>
          <option value="province">Province</option>
        </select>

        {/* Conditional Rendering of Filters Based on Filter Type */}
        {filters.type === "city" && (
          <select
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
          >
            <option value="">All Cities</option>
            {/* Populate options dynamically */}
          </select>
        )}

        {filters.type === "country" && (
          <select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
          >
            <option value="">All Countries</option>
            {/* Populate options dynamically */}
          </select>
        )}

        {filters.type === "province" && (
          <select
            name="province"
            value={filters.province}
            onChange={handleFilterChange}
          >
            <option value="">All Provinces</option>
            {/* Populate options dynamically */}
          </select>
        )}
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th>Phone Number</th>
            <th onClick={() => handleSort("dob")}>DOB</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dob}</td>
              <td>{user.city}</td>
              <td>{user.district}</td>
              <td>{user.province}</td>
              <td>{user.country}</td>
              <td>{user.profilePicture}</td>
              <td>
                <button onClick={() => handleEdit(index, user)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {/* Add pagination controls as needed */}
    </div>
  );
};

export default UsersTable;
