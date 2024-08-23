import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsersFromLocalStorage } from "../utils/helper.js";

// import { addUs} from "../features/user/userSlice.js";

const UsersTable = () => {
  const dispatch = useDispatch();
  const [savedUsers, setSavedUsers] = useState([]);
  const { filteredUsers, searchQuery, filters, sortConfig } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    const users = loadUsersFromLocalStorage();
    if (users.length > 0) {
      setSavedUsers(users);
    }
    {
      console.log(savedUsers);
    }
  }, []);

  return <div></div>;
};

export default UsersTable;
