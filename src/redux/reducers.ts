import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const { id, name, email, phone, status } = action.payload;
      const contactToUpdate = state.contacts.find(
        (contact) => contact.id === id
      );
      if (contactToUpdate) {
        contactToUpdate.name = name;
        contactToUpdate.email = email;
        contactToUpdate.phone = phone;
        contactToUpdate.status = status;
      }
    },
  },
});

export const { addContact, deleteContact, updateContact } =
  contactsSlice.actions;
export default contactsSlice.reducer;
