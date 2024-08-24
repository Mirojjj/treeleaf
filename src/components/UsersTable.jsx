import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scrollToTop } from "../utils/helper.js";
import { deleteUser } from "../features/user/userSlice.js";

// import { addUs} from "../features/user/userSlice.js";

const UsersTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const [savedUsers, setSavedUsers] = useState([]);
  // const [users, setUsers] = useState([]);

  const users = useSelector((state) => state.users.users);
  // console.log(loadUsersFromLocalStorage());

  const handleDelete = (index) => {
    dispatch(deleteUser(startIndex + index)); // Dispatch deleteUser action with user index
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
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dob}</td>
              <td>{user.city}</td>
              <td>{user.district}</td>
              <td>{user.province}</td>
              <td>{user.country}</td>
              <td>
                <img
                  src={user.profilePicture}
                  alt={`${user.name}'s Profile`}
                  width="50"
                />
              </td>
              <td>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={endIndex >= users.length}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default UsersTable;
