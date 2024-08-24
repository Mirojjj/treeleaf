import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scrollToTop } from "../utils/helper.js";
import { deleteUser } from "../features/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import Tables from "./Tables.jsx";
import { Element } from "react-scroll";

const UsersTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users.users);

  const handleDelete = (index) => {
    dispatch(deleteUser(startIndex + index));
    if (users.length - 1 <= (currentPage - 1) * rowsPerPage) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleEdit = (index) => {
    scrollToTop();
    onEdit(startIndex + index);
  };

  //pagination

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = users.slice(startIndex, endIndex);

  const usersLength = paginatedUsers.length;
  console.log({ usersLength });

  const totalUsers = users.length;

  // Handle page change
  const handleNextPage = () => {
    if (endIndex < users.length) {
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
      <div className="container mx-auto p-4  h-screen flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Users List
        </h1>
        <div className="overflow-x-auto rounded-xl">
          <Tables
            users={paginatedUsers}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            isProfile={false}
          />
        </div>

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
              disabled={endIndex >= users.length}
              className={`px-4 py-2 text-white rounded-lg ${
                endIndex >= users.length
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Next Page
            </button>
          </div>
        )}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/profiles")}
            className="justify-center bg-blue-500 hover:bg-blue-600 max-w-fit rounded-lg px-4 py-2 text-white mt-8"
          >
            See All Profiles
          </button>
        </div>
      </div>
    </Element>
  );
};

export default UsersTable;
