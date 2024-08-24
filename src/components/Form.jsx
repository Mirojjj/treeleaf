import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { schema } from "../models/formDataSchema";
import { ErrorLabel } from "../miscellaneous";
import { useDispatch } from "react-redux";
import { addUsers, editUser } from "../features/user/userSlice.js";
import { convertToBase64 } from "../utils/helper.js";
import { toast } from "react-toastify";

const Form = ({ userIndex, userData, onClose, isEditing }) => {
  const dispatch = useDispatch();
  // const fileInputRef = useRef(null);

  const initialInput = {
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
    profilePicture: "",
  };

  const [formData, setFormData] = useState(initialInput);

  const provinceArray = [1, 2, 3, 4, 5, 6, 7];
  const [errors, setErrors] = useState({});
  const [allCountries, setAllCountries] = useState([]);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setFormData(userData);
      console.log(userData);
    } else {
      setFormData(initialInput);
    }
  }, [userData, isEditing]);

  useEffect(() => {
    if (!formData.profilePicture) return;
    setPreview(formData.profilePicture);
  }, [formData.profilePicture]);

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
      try {
        setIsLoading(true);
        const base64String = await convertToBase64(file);

        setFormData({ ...formData, profilePicture: base64String });

        setIsLoading(false);
        console.log("file handles");
        e.target.value = null;
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
        toast.success("User Created Successfully!");
      } else {
        dispatch(editUser({ index: userIndex, updatedUser: formData }));
        toast.success("User Updated Successfully!");
      }

      console.log(isEditing);

      // if (fileInputRef.current) {
      //   fileInputRef.current.value = "";
      // }

      setFormData(initialInput);
      setPreview("");

      console.log("onclosed called");
      setErrors({});
      onClose();
    } catch (err) {
      toast.error("Some Errors Occurred");
      const zodError = err.flatten().fieldErrors;
      setErrors(zodError);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full gap-7 p-4 ">
      <h1 className="text-3xl font-bold">User Form</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-6 bg-white p-8 rounded-xl shadow-md w-full max-w-3xl"
      >
        {/* Personal Information Section */}
        <fieldset className="w-full">
          <legend className="text-lg font-semibold mb-2">
            Personal Information
          </legend>
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label className="block font-medium">Name:</label>
              <input
                className="w-full border rounded-xl py-2 px-4 mt-1"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
              />
              {errors.name && <ErrorLabel>{errors.name}</ErrorLabel>}
            </div>

            <div className="w-full">
              <label className="block font-medium">Email:</label>
              <input
                className="w-full border rounded-xl py-2 px-4 mt-1"
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
              />
              {errors.email && <ErrorLabel>{errors.email}</ErrorLabel>}
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block font-medium">Phone Number:</label>
                <input
                  className="w-full border rounded-xl py-2 px-4 mt-1"
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
              <div className="w-1/2">
                <label className="block font-medium">DOB:</label>
                <input
                  className="w-full border rounded-xl py-2 px-4 mt-1"
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  onClick={(event) => {
                    event.target.value = null;
                  }}
                />
                {errors.dob && <ErrorLabel>{errors.dob}</ErrorLabel>}
              </div>
            </div>
          </div>
        </fieldset>

        {/* Location Section */}
        <fieldset className="w-full">
          <legend className="text-lg font-semibold mb-2">
            Location Information
          </legend>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-1/3">
                <label className="block font-medium">City:</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full border rounded-xl py-2 px-4 mt-1"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <ErrorLabel>{errors.city}</ErrorLabel>}
              </div>

              <div className="w-1/3">
                <label className="block font-medium">District:</label>
                <input
                  className="w-full border rounded-xl py-2 px-4 mt-1"
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                />
                {errors.district && <ErrorLabel>{errors.district}</ErrorLabel>}
              </div>

              <div className="w-1/3">
                <label className="block font-medium">Province:</label>
                <select
                  className="w-full border rounded-xl py-2 px-4 mt-1"
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

            <div className="w-full">
              <label className="block font-medium">Country:</label>
              <select
                className="w-full border rounded-xl py-2 px-4 mt-1"
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
          </div>
        </fieldset>

        {/* Profile Picture Section */}
        <fieldset className="w-full">
          <legend className="text-lg font-semibold mb-2">
            Profile Picture
          </legend>
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label
                htmlFor="file"
                className="block font-medium cursor-pointer rounded-sm bg-gray-200 text-indigo-600"
              >
                <span className="sr-only">File input</span>
                <div className="flex items-center justify-center h-48 bg-white border border-dashed rounded-lg overflow-hidden">
                  {preview ? (
                    <img
                      alt="preview"
                      src={preview}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span>
                      {isLoading ? "Loading image..." : "Select Images"}
                    </span>
                  )}
                </div>
                <input
                  name="file"
                  id="file"
                  onChange={handleFileChange}
                  accept="image/png"
                  type="file"
                  className="sr-only"
                />
              </label>
              {errors.profilePicture && (
                <ErrorLabel>{errors.profilePicture}</ErrorLabel>
              )}
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-blue-600 transition-all text-xl font-semibold"
        >
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
