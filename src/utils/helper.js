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
