import { React, useState, useEffect } from "react";
import axios from "axios";
import { schema } from "../models/formDataSchema";
import { ErrorLabel } from "../miscellaneous";
import { useDispatch } from "react-redux";
import { addUsers, editUser } from "../features/user/userSlice.js";
import { convertToBase64 } from "../utils/helper.js";

const Form = ({ userIndex, userData, onClose, isEditing }) => {
  const dispatch = useDispatch();

  console.log(isEditing);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
    profilePicture: "",
  });

  const provinceArray = [1, 2, 3, 4, 5, 6, 7];
  const [errors, setErrors] = useState({});
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    if (isEditing) {
      setFormData(userData);
      console.log(userData);
    } else {
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: "Nepal",
        profilePicture: "",
      });
    }
  }, [userData, isEditing]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const allCountryNameList = response.data.map(
          (country) => country.name.common
        );
        setAllCountries(allCountryNameList);
      })
      .catch((error) =>
        console.log("Error fetching all countries list : ", error)
      );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    try {
      schema.parse({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    } catch (err) {
      const zodError = err.flatten().fieldErrors;
      setErrors({ ...errors, [name]: zodError[name]?.[0] || "" });
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // File validation
      // const fileName = file.name;
      // console.log(fileName);
      // setFormData({ ...formData, file: fileName });

      try {
        const base64String = await convertToBase64(file);
        // console.log(base64String);
        // Update form data with Base64 string
        setFormData({ ...formData, profilePicture: base64String });

        // Validate the updated form data
        schema.parse({ ...formData, profilePicture: base64String });
        setErrors({ ...errors, profilePicture: "" });
      } catch (err) {
        if (err.name === "ZodError") {
          const zodError = err.flatten().fieldErrors;
          setErrors({
            ...errors,
            profilePicture: zodError.profilePicture?.[0] || "",
          });
        } else {
          console.error("Error converting file to Base64:", err);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      schema.parse(formData);

      if (!isEditing) {
        dispatch(addUsers(formData));
      } else {
        dispatch(editUser({ index: userIndex, updatedUser: formData }));
      }

      console.log(isEditing);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: "Nepal",
        profilePicture: "",
      });
      console.log("form reset");

      console.log("onclosed called");
      setErrors({});
      onClose();
    } catch (err) {
      console.log(err);
      const zodError = err.flatten().fieldErrors;
      setErrors(zodError);
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center h-screen w-full gap-7">
      <h1 className=" text-2xl ">User Form</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start justify-between gap-5 rounded-3xl w-2/3  bg-white px-7 py-7 max-h-fit "
      >
        {/* name */}

        <div className=" w-full">
          <label> Name:</label>
          <input
            className="w-full border rounded-xl py-2 px-4 mt-2"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Your Name"
          />
          {errors.name && <ErrorLabel>{errors.name}</ErrorLabel>}
        </div>

        {/* email */}

        <div className=" w-full">
          <label> Email: </label>
          <input
            className="w-full border rounded-xl py-2 px-4 mt-2"
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Your Email"
          />{" "}
          {errors.email && <ErrorLabel>{errors.email}</ErrorLabel>}
        </div>

        {/* phone number and dob*/}

        <div className="flex w-full ">
          <div className=" min-w-[75%]">
            <label> Phone number:</label>
            <input
              className="w-full border rounded-xl py-2 px-4 mt-2"
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Your Number"
            />
            {errors.phoneNumber && (
              <ErrorLabel>{errors.phoneNumber}</ErrorLabel>
            )}
          </div>
          <div className=" min-w-[22%] ml-4">
            <label> DOB:</label>
            <input
              className="w-full border rounded-xl py-2 px-4 mt-2"
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
            {errors.dob && <ErrorLabel>{errors.dob}</ErrorLabel>}
          </div>
        </div>

        {/* city district and province */}

        <div className="flex w-full gap-1 ">
          <div className=" min-w-[39%]">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full border rounded-xl py-2 px-4 mt-2"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <ErrorLabel>{errors.city}</ErrorLabel>}
          </div>
          <div className=" min-w-[39%]">
            <label htmlFor="district">District:</label>
            <input
              className="w-full border rounded-xl py-2 px-4 mt-2"
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
            />
            {errors.district && <ErrorLabel>{errors.district}</ErrorLabel>}
          </div>
          <div className=" min-w-[19%]">
            <label htmlFor="province">Province:</label>
            <select
              className="w-full border rounded-xl py-2 px-4 mt-2"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
            >
              <option value="">Select Province</option>
              {provinceArray.map((_, i) => (
                <option key={i + 1} value={`Province ${i + 1}`}>
                  Province {i + 1}
                </option>
              ))}
            </select>
            {errors.province && <ErrorLabel>{errors.province}</ErrorLabel>}
          </div>
        </div>

        {/* country and photo*/}

        <div className="flex w-full gap-2">
          <div className="min-w-[48%]">
            <label htmlFor="country">Country:</label>
            <select
              className="w-full border rounded-xl py-2 px-4 mt-2"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              {allCountries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <ErrorLabel>{errors.country}</ErrorLabel>}
          </div>
          <div className="min-w-[48%]">
            <label htmlFor="profilePicture">Profile Picture (PNG only):</label>
            <input
              title="enter your file"
              className="  w-full border rounded-xl py-1 px-4 mt-2"
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept=".png"
              onChange={handleFileChange}
            />
            {errors.profilePicture && (
              <ErrorLabel>{errors.profilePicture}</ErrorLabel>
            )}
          </div>
        </div>

        {/* submit button */}
        <button
          type="submit"
          className=" w-full bg-blue-400 p-4 mt-4 rounded-xl hover:bg-blue-500 transition-all text-white text-xl"
        >
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
