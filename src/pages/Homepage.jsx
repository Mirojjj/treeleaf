import React, { useState } from "react";
import { Form, UsersTable } from "../components";
import { useSelector } from "react-redux";

const Homepage = () => {
  const users = useSelector((state) => state.users.users);
  const [editUserIndex, setEditUserIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (index) => {
    setEditUserIndex(index);
    setSelectedUser(user[index]);
  };

  const handleCloseEditForm = () => {
    setEditUserIndex(null);
    setSelectedUser(null);
  };
  return (
    <>
      <div className=" mx-auto w-[85%]">
        <Form
          userIndex={editUserIndex}
          userData={selectedUser}
          onClose={handleCloseEditForm}
        />
        <UsersTable onEdit={handleEdit} />
      </div>
    </>
  );
};

export default Homepage;
