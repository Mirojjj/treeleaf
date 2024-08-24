import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scrollToTop } from "../utils/helper.js";
import { deleteUser } from "../features/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import Tables from "./Tables.jsx";
import { Element } from "react-scroll";
import { toast } from "react-toastify";
import { sortUsers, filterUsers, searchUsers } from "../utils/helper.js";

const UsersTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  // Filter, search, and sort the users
  const filteredUsers = filterUsers(users, filterOption);
  const searchedUsers = searchUsers(filteredUsers, searchQuery);
  const filteredAndSortedUsers = sortUsers(searchedUsers, sortOption);

  // Pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

  const totalUsers = filteredAndSortedUsers.length; // Total users after filtering

  const handleDelete = (userId) => {
    try {
      dispatch(deleteUser(userId));
      toast.success("User Deleted Successfully");
      // Adjust pagination if necessary
      if (
        filteredAndSortedUsers.length - 1 <=
        (currentPage - 1) * rowsPerPage
      ) {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Error during deleteUser dispatch:", error);
    }
  };

  const handleEdit = (userId) => {
    scrollToTop();
    onEdit(userId);
  };

  const handleNextPage = () => {
    if (endIndex < totalUsers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Element name="usersTable" className="user-table">
      <div className="container mx-auto p-4 h-screen flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Users List
        </h1>

        {paginatedUsers.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              {/* Search Input */}
              <input
                type="text"
                className="border py-1 px-3 rounded-xl min-w-72"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Sorting */}
              <div className="flex items-center gap-2">
                <p className="text-gray-500">Sort by:</p>
                <select
                  className="border py-1 px-3 rounded-xl"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="Name">Name</option>
                  <option value="DOB">DOB</option>
                </select>
              </div>

              {/* Filtering by country */}
              <div className="flex items-center gap-2">
                <p className="text-gray-500">Filter by Country:</p>
                <select
                  className="border py-1 px-3 rounded-xl"
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Nepal">Nepal</option>
                  <option value="India">India</option>
                  <option value="China">China</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-xl">
              <Tables
                users={paginatedUsers}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                isProfile={false}
              />
            </div>
          </div>
        ) : (
          <div className="flex min-w-full min-h-60 justify-center items-center">
            Please Add Users from the form
          </div>
        )}

        {/* Pagination Controls */}
        {totalUsers > rowsPerPage && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-white rounded-lg ${
                currentPage === 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Previous Page
            </button>
            <button
              onClick={handleNextPage}
              disabled={endIndex >= totalUsers}
              className={`px-4 py-2 text-white rounded-lg ${
                endIndex >= totalUsers
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Next Page
            </button>
          </div>
        )}
        {paginatedUsers.length > 0 ? (
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/profiles")}
              className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-white mt-8"
            >
              See All Profiles
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={scrollToTop}
              className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-white mt-8"
            >
              Add User
            </button>
          </div>
        )}
      </div>
    </Element>
  );
};

export default UsersTable;
