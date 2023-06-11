import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addContact, updateContact } from "../redux/contactSlice";

interface Contact {
  id: string;
  fname: string;
  lname: string;
  status: "active" | "inactive";
}

interface ContactFormData extends Omit<Contact, "id"> {}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fname: "",
    lname: "",
    status: "active",
  });
  const { id } = useParams();
  const initialContactId = id;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData.fname, "---");

    if (!formData.fname || !formData.lname) {
      alert("Please fill in all the fields");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (initialContactId) {
        // Editing existing contact
        dispatch(updateContact({ ...formData, id: initialContactId }));
      } else {
        // Creating new contact
        dispatch(addContact({ ...formData, id: Date.now().toString() }));
      }
      setFormData({
        fname: "",
        lname: "",
        status: "active",
      });
    }, 1000);
  };

  return (
    <div className="createFormPage container flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="createForm space-y-6" onSubmit={handleSubmit}>
          <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-700">
            {initialContactId ? "Update Contact" : "Add Contact"}
          </h2>
          <div className="mb-4">
            <label
              htmlFor="fname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>

            <div className="mt-2">
              <input
                type="text"
                id="fname"
                name="fname"
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter your first name"
                value={formData.fname}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="lname"
                name="lname"
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter your last name"
                value={formData.lname}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Status
            </label>
            <div className="block flex gap-8 mt-2">
              <label
                htmlFor="status-active"
                className="inline-flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  id="status-active"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleInputChange}
                  className="form-radio text-indigo-600 border-indigo-600 focus:ring-indigo-600 rounded-full"
                />
                Active
              </label>
              <label
                htmlFor="status-inactive"
                className="inline-flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  id="status-inactive"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleInputChange}
                  className="form-radio text-indigo-600 border-indigo-600 focus:ring-indigo-600 rounded-full"
                />
                Inactive
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? (
              <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-100"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              `${initialContactId ? "Update" : "Save Contact"}`
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Go Back To -
          <a
            href="/"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            {" "}
            Contact List Page
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
