import React, { useState } from "react";

const BillingRegistrationModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", // Add this key to the initial state
    phone: "",
    address: "",
    branch_name: "",
    branch_state: "",
    branch_city: "",
    branch_pincode: "",
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
      const response = await fetch("http://localhost:5001/api/billingTeam/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful registration (e.g., show a success message, close the modal, etc.)
        console.log("Registration successful");
        closeModal();
      } else {
        // Handle registration failure (e.g., show an error message)
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="w-full">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Register for Billing Team
                  </h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        required
                        className="mt-1 p-3 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        required
                        className="mt-1 p-3 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        required
                        className="mt-1 p-3 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        required
                        className="mt-1 p-3 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        required
                        className="mt-1 p-3 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="branch_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Branch Name
                      </label>
                      <input
                        type="text"
                        name="branch_name"
                        id="branch_name"
                        required
                        className="mt-1 p-3 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        value={formData.branch_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="branch_state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Branch State
                      </label>
                      <input
                        type="text"
                        name="branch_state"
                        id="branch_state"
                        required
                        className="mt-1 p-3 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        value={formData.branch_state}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="branch_city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Branch City
                      </label>
                      <input
                        type="text"
                        name="branch_city"
                        id="branch_city"
                        required
                        className="mt-1 p-3 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        value={formData.branch_city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="branch_pincode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Branch Pincode
                      </label>
                      <input
                        type="text"
                        name="branch_pincode"
                        id="branch_pincode"
                        required
                        className="mt-1 p-3 w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                        value={formData.branch_pincode}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Add more fields as needed */}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Register
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillingRegistrationModal;
