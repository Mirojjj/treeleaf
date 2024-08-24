import React, { useState } from "react";
import { useSelector } from "react-redux";
import Tables from "../components/Tables";
import { useNavigate } from "react-router-dom";
import { sortUsers, filterUsers, searchUsers } from "../utils/helper.js"; // Import helper functions

const Profilepage = () => {
  const users = useSelector((state) => state.users.users);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterOption, setFilterOption] = useState("");

  // Filter, search, and sort users
  const filteredUsers = filterUsers(users, filterOption);
  const searchedUsers = searchUsers(filteredUsers, searchQuery);
  const filteredAndSortedUsers = sortUsers(searchedUsers, sortOption);

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-12">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Profiles
        </h1>
        <div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              className="border py-1 px-3 rounded-xl mb-4 min-w-72"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Sorting */}
            <div className="flex justify-center gap-2">
              <p className="text-gray-500">Sort by:</p>
              <select
                className="border py-1 px-3 rounded-xl mb-4"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">None</option>
                <option value="Name">Name</option>
                <option value="DOB">DOB</option>
              </select>
            </div>

            {/* Filtering by country */}
            <div className="flex justify-center gap-2">
              <p className="text-gray-500">Filter by Country:</p>
              <select
                className="border py-1 px-3 rounded-xl mb-4"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value="">All</option>
                <option value="Nepal">Nepal</option>
                <option value="India">India</option>
                <option value="China">China</option>
              </select>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <Tables users={filteredAndSortedUsers} isProfile={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
