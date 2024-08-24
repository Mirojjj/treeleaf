import React, { useState } from "react";
import { Form, UsersTable } from "../components";
import { useSelector } from "react-redux";

const Homepage = () => {
  const users = useSelector((state) => state.users.users);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserIndex, setEditUserIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (index) => {
    // console.log(index);
    // console.log(users[index]);
    setEditUserIndex(index);
    setSelectedUser(users[index]);
    setIsEditing(true);
  };

  const handleCloseEditForm = () => {
    setEditUserIndex(null);
    setSelectedUser(null);
    setIsEditing(false);
  };
  return (
    <>
      <div className=" mx-auto w-[85%]">
        <Form
          userIndex={editUserIndex}
          userData={selectedUser}
          onClose={handleCloseEditForm}
          isEditing={isEditing}
        />
        <UsersTable onEdit={handleEdit} />
      </div>
    </>
  );
};

export default Homepage;
