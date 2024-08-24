import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tables from "../components/Tables";
import { deleteUser } from "../features/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Profilepage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const handleDelete = (index) => {
    dispatch(deleteUser(index));
  };
  // const onEdit = location.state?.onEdit;

  const navigate = useNavigate();
  const handleEdit = (index) => {
    // scrollToTop();
    navigate("/");
    onEdit(index);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Profiles
        </h1>
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <Tables
              users={users}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              isProfile={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
