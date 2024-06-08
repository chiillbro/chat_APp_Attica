import React, { useState } from "react";
import { BASE_URL } from "../../constants";

const ManagerRegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    manager_Id: "",
    manager_name: "",
    manager_email: "",
    manager_password: "",
    manager_phone: "",
    manager_address: "",
    branch_city: "",
    branch_state: "",
    branch_pincode: "",
    branch_name: "",
    branch_address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/manager/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Registration Successfully");
        onclose();
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occured:", error);
    }
    console.log(formData);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Register Manager</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="manager_Id"
            >
              Manager ID
            </label>
            <input
              type="text"
              id="manager_Id"
              name="manager_Id"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.manager_Id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="manager_name"
            >
              Manager Name
            </label>
            <input
              type="text"
              id="manager_name"
              name="manager_name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.manager_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="manager_email"
            >
              Manager Email
            </label>
            <input
              type="email"
              id="manager_email"
              name="manager_email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.manager_email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="manager_password"
            >
              Manager Password
            </label>
            <input
              type="password"
              id="manager_password"
              name="manager_password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.manager_password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="manager_phone"
            >
              Manager Phone
            </label>
            <input
              type="text"
              id="manager_phone"
              name="manager_phone"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.manager_phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="manager_address"
            >
              Manager Address
            </label>
            <input
              type="text"
              id="manager_address"
              name="manager_address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.manager_address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="branch_city"
            >
              Branch City
            </label>
            <input
              type="text"
              id="branch_city"
              name="branch_city"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.branch_city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="branch_state"
            >
              Branch State
            </label>
            <input
              type="text"
              id="branch_state"
              name="branch_state"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.branch_state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="branch_pincode"
            >
              Branch Pincode
            </label>
            <input
              type="text"
              id="branch_pincode"
              name="branch_pincode"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.branch_pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="branch_name"
            >
              Branch Name
            </label>
            <input
              type="text"
              id="branch_name"
              name="branch_name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.branch_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="branch_address"
            >
              Branch Address
            </label>
            <input
              type="text"
              id="branch_address"
              name="branch_address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.branch_address}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagerRegisterModal;
