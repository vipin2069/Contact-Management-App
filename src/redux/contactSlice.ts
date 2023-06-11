import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const CONTACTS_STORAGE_KEY = 'contacts';
export interface Contact {
  id: string;
  fname: string;
  lname: string;
  status: "active" | "inactive";
}
const storedContacts = JSON.parse(localStorage.getItem(CONTACTS_STORAGE_KEY) || '[]');

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: storedContacts,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(state.contacts));
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const { id } = action.payload;
      const existingContact = state.contacts.find(contact => contact.id === id);
      if (existingContact) {
        Object.assign(existingContact, action.payload);
      }
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(state.contacts));
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.contacts = state.contacts.filter(contact => contact.id !== id);
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(state.contacts));
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactSlice.actions;

export const selectAllContacts = (state: RootState) => state.contacts.contacts;


export default contactSlice.reducer;
