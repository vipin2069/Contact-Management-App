import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Contact } from "../redux/contactSlice";

const ContactUpdate: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const contact: Contact | undefined = contacts.find(
    (contact) => contact.id === id
  );

  if (!contact) {
    return <div>Contact not found</div>;
  }
  return (
    <div>
      <h2>Contact Details</h2>
      <p>First Name: {contact.fname}</p>
      <p>Last Name: {contact.lname}</p>
      <p>Status: {contact.status}</p>
      <Link to="/contacts">Back to Contacts</Link>
    </div>
  );
};

export default ContactUpdate;
