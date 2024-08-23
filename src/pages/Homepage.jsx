import React, { useEffect, useState } from "react";
import { Form, UsersTable } from "../components";

const Homepage = () => {
  return (
    <>
      <div className=" mx-auto w-[85%]">
        <Form />
        <UsersTable />
      </div>
    </>
  );
};

export default Homepage;
