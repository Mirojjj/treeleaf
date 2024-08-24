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
