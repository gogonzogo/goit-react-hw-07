import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: {
    items: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    isLoading: false,
    error: null,
  },
  filter: '',
  sortOptions: { name: false, order: false },
}

export const contactsReducer = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    sortContacts: (state, action) => {
      state.sortOptions = action.payload
    },
    filterContacts: (state, action) => {
      state.filter = action.payload;
    },
    addContact: (state, action) => {
      const { name, number } = action.payload;
      const existingContact = state.contacts.items.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number === number
      );
      if (existingContact) {
        alert(`${name} or ${number} is already in contacts`);
        return;
      }
      state.contacts.items = [...state.contacts.items, action.payload];
    },
    editContact: (state, action) => {
      const contacts = state.contacts.items.filter(contact => contact.id !== action.payload.id);
      const { id, name, number } = action.payload;

      const existingContact = contacts.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() ||
          contact.number === number
      );
      if (existingContact) {
        alert(`${name} or ${number} is already in contacts`);
        return;
      }
      const contact = state.contacts.items.find(contact => contact.id === id);
      contact.name = name;
      contact.number = number;
    },
    deleteContact: (state, action) => {
      state.contacts.items = state.contacts.items.filter(contact => contact.id !== action.payload);
    }
  }
})

export const { sortContacts, filterContacts, addContact, editContact, deleteContact, } = contactsReducer.actions;
export default contactsReducer.reducer;