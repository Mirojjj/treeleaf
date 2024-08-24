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

      // Check if the deleted user was the last one for the current filter
      if (filteredUsers.length === 1) {
        // Reset filter and pagination if there are no more users for the current filter
        setFilterOption("");
        setCurrentPage(1);
      } else {
        // Adjust pagination if necessary
        if (
          filteredAndSortedUsers.length - 1 <=
          (currentPage - 1) * rowsPerPage
        ) {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
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

  // Determine if there are no users at all
  const hasNoUsers = users.length === 0;

  // Determine if there are filtered users
  const hasFilteredUsers = filteredAndSortedUsers.length > 0;

  // Determine if there are users in the entire dataset (regardless of filtering)
  const hasAnyUsers = users.length > 0;

  return (
    <Element name="usersTable" className="user-table">
      <div className="container mx-auto p-4 h-screen flex flex-col ">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 mt-11">
          Users List
        </h1>

        <div className=" p-5 min-h-[300px]">
          {hasNoUsers ? (
            <div className="flex flex-col min-w-full min-h-60 justify-center items-center">
              <p className="text-gray-500">Please add users from the form.</p>
              <button
                onClick={scrollToTop}
                className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-white mt-4"
              >
                Add User
              </button>
            </div>
          ) : (
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

                {/* Filtering by province */}
                <div className="flex items-center gap-2">
                  <p className="text-gray-500">Filter by Province:</p>
                  <select
                    className="border py-1 px-3 rounded-xl"
                    value={filterOption}
                    onChange={(e) => setFilterOption(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Province 1">Province 1</option>
                    <option value="Province 2">Province 2</option>
                    <option value="Province 3">Province 3</option>
                    <option value="Province 4">Province 4</option>
                    <option value="Province 5">Province 5</option>
                    <option value="Province 6">Province 6</option>
                    <option value="Province 7">Province 7</option>
                  </select>
                </div>
              </div>

              {hasFilteredUsers ? (
                <div>
                  {paginatedUsers.length > 0 ? (
                    <div className="overflow-x-auto shadow-lg rounded-xl">
                      <Tables
                        users={paginatedUsers}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        isProfile={false}
                      />
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      No data available for the selected filter.
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
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No data available for the selected filter.
                </div>
              )}

              {/* Show "See All Users" button if there are users */}
              {hasAnyUsers && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => navigate("/profiles")}
                    className="bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-white"
                  >
                    See All Users
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Element>
  );
};

export default UsersTable;
