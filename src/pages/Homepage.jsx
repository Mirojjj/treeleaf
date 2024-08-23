import React, { useEffect, useState } from "react";
import { Form, UsersTable } from "../components";

const Homepage = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <>
      <div className=" mx-auto w-[85%]">
        <Form addUser={addUser} />
        <UsersTable
          users={users}
          setUsers={setUsers}
          onDeleteUser={handleDeleteUser}
        />
      </div>
    </>
  );
};

export default Homepage;
