// Helper function to load users from local storage
export const loadUsersFromLocalStorage = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

// Helper function to save users to local storage
export const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file); // Convert the file to a Base64-encoded string

    reader.onload = () => {
      resolve(reader.result); // Resolve the promise with the Base64 string
    };

    reader.onerror = (error) => {
      reject(error); // Reject the promise if an error occurs during file reading
    };
  });
};

//sorting filtering and searching logics

// helpers.js

export const sortUsers = (users, sortOption) => {
  if (sortOption === "Name") {
    return users.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "DOB") {
    return users.sort((a, b) => new Date(a.dob) - new Date(b.dob));
  } else {
    return users;
  }
};

export const filterUsers = (users, filterOption) => {
  if (filterOption === "") {
    return users;
  }
  return users.filter(
    (user) =>
      user.province.toLowerCase().trim() === filterOption.toLowerCase().trim()
  );
};

export const searchUsers = (users, searchQuery) => {
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
