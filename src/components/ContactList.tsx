import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllContacts } from "../redux/contactSlice";
import { Link } from "react-router-dom";
import { Contact } from "../redux/contactSlice";
import { deleteContact } from "../redux/contactSlice";

const ContactList: React.FC = () => {
  const contacts = useSelector(selectAllContacts);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  // const filteredContacts = contacts.filter((contact: Contact) => {
  //   if (contact.fname?.includes(searchTerm?.toLowerCase())) {
  //     return contact.fname;
  //   }
  // });
  const filteredContacts = contacts.filter((contact: Contact) => {
    if (contact.fname?.includes(searchTerm?.toLowerCase())) {
      return true; // include the contact in the filtered array
    }
    return false; // exclude the contact from the filtered array
  });

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="container text-center flex min-h-full flex-col justify-center items-center px-6 py-6 lg:px-8 gap-8">
      <h2 className="m-auto text-3xl font-extrabold tracking-tight text-slate-900">
        Contact List
      </h2>
      <div className="contactsearchlist">
        <div className="inputBox flex items-center rounded-md relative">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block rounded-md w-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Search first name here ..."
          />
        </div>
      </div>
      {contacts.length === 0 ? (
        <div className="noContactFound px-16 py-10  rounded-md text-gray-900   ring-inset ring-gray-300 sm:text-sm sm:leading-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <div>
            <h6>No Contact Found ...</h6>
            <p>Please Add Contact from create contact button</p>
          </div>
        </div>
      ) : (
        ""
      )}
      {contacts.length > 0 ? (
        <div className="contactListBox bg-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <ul className="divide-y divide-gray-100">
              {filteredContacts.length > 0 ? (
                <>
                  {filteredContacts.map((contact: Contact, index: number) => (
                    <li
                      key={contact.id}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex gap-x-4">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {index + 1}.
                        </p>
                        <div className="min-w-0 flex flex-col items-start">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {contact.fname} {contact.lname}
                          </p>
                          <p
                            className={`listStatus mt-1 truncate text-xs leading-5 text-gray-500 ${contact.status} `}
                          >
                            {contact.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 sm:flex sm:flex-col sm:items-end">
                        <Link to={`/add/${contact.id}`}>
                          <button className="editBtn flex w-full justify-center rounded-md px-8 py-1.5 bg-slate-400 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-8 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => handleDelete(contact.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {contacts.map((contact) => (
                    <li
                      key={contact.id}
                      className="flex justify-between gap-x-6 py-5"
                    >
                      <div className="flex gap-x-4">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {contact.fname} {contact.lname}
                          </p>
                          <p
                            className={`listStatus mt-1 truncate text-xs leading-5 text-gray-500 ${contact.status} `}
                          >
                            {contact.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 sm:flex sm:flex-col sm:items-end">
                        <button className="editBtn flex w-full justify-center rounded-md px-8 py-1.5 bg-slate-400 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                          Edit
                        </button>
                        <button
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-8 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => handleDelete(contact.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
      <Link to={"/add"}>
        <button className="flex items-center gap-2 w-full justify-center rounded-md bg-indigo-600 px-8 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Create New Contact
        </button>
      </Link>
    </div>
  );
};

export default ContactList;
