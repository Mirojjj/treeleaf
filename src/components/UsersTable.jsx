import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scrollToTop } from "../utils/helper.js";
import { deleteUser } from "../features/user/userSlice.js";
import { Element } from "react-scroll";

// import { addUs} from "../features/user/userSlice.js";

const UsersTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const [savedUsers, setSavedUsers] = useState([]);
  // const [users, setUsers] = useState([]);

  const users = useSelector((state) => state.users.users);
  // console.log(loadUsersFromLocalStorage());

  const handleDelete = (index) => {
    const userIndex = startIndex + index;
    dispatch(deleteUser(startIndex + index)); // Dispatch deleteUser action with user index
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
  const totalPages = Math.ceil(totalUsers / rowsPerPage);

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
      <div className="container mx-auto p-4  h-screen ">
        <h1 className="text-2xl text-center mb-6">Users List</h1>
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Birth
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  District
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Province
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile Picture
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.dob}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.district}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.province}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center">
                    <img
                      src={user.profilePicture}
                      alt={`${user.name}'s Profile`}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:text-blue-900 mr-2 border border-blue-900 py-1 px-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-900 border border-red-900 p-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
      </div>
    </Element>
  );
};

export default UsersTable;
