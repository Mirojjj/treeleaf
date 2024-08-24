import React, { useState } from "react";
import { Form, UsersTable } from "../components";
import { useSelector } from "react-redux";
import { scroller } from "react-scroll";

const Homepage = () => {
  const users = useSelector((state) => state.users.users);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (userId) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setSelectedUserId(userId);
      setSelectedUser(user);
      setIsEditing(true);
    }
  };

  const handleCloseEditForm = () => {
    scroller.scrollTo("usersTable", {
      smooth: true,
      offset: -50,
    });
    setSelectedUserId(null);
    setSelectedUser(null);
    setIsEditing(false);
  };

  return (
    <>
      <div className="mx-auto w-[85%]">
        <Form
          userId={selectedUserId}
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
