export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
}

// Action Types
export const ADD_CONTACT = 'contacts/addContact';
export const DELETE_CONTACT = 'contacts/deleteContact';
export const UPDATE_CONTACT = 'contacts/updateContact';

// Action Creators
export const addContact = (contact: Contact) => {
    return {
        type: ADD_CONTACT,
        payload: contact,
    };
};

export const deleteContact = (id: string) => {
    return {
        type: DELETE_CONTACT,
        payload: id,
    };
};

export const updateContact = (contact: Contact) => {
    return {
        type: UPDATE_CONTACT,
        payload: contact,
    };
};
