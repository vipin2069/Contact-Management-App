import { v4 as uuidv4 } from 'uuid';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

const contacts: Contact[] = [];

export function createContact(data: Omit<Contact, 'id'>): Promise<Contact> {
  const newContact: Contact = {
    id: uuidv4(),
    ...data,
  };

  contacts.push(newContact);
  return Promise.resolve(newContact);
}

export function getContacts(): Promise<Contact[]> {
  return Promise.resolve(contacts);
}

export function getContactById(id: string): Promise<Contact> {
  const contact = contacts.find((c) => c.id === id);
  if (contact) {
    return Promise.resolve(contact);
  }
  return Promise.reject(new Error('Contact not found'));
}
