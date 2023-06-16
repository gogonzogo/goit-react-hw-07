import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, createContact, removeContact, updateContact } from './operations';

const initialState = {
  contacts: {
    items: [],
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
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        if (state.contacts.items.length === 0) {
          state.contacts.error = 'No contacts found';
        } else {
          state.contacts.error = null;
        }
        state.contacts.isLoading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(createContact.pending, (state) => {
        state.contacts.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = [...state.contacts.items, action.payload];
      })
      .addCase(createContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(updateContact.pending, (state) => {
        state.contacts.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        const contacts = state.contacts.items.filter(contact => contact.id !== action.payload.id);
        const { id, name, phone } = action.payload;

        const existingContact = contacts.find(
          contact =>
            contact.name.toLowerCase() === name.toLowerCase() ||
            contact.phone === phone
        );
        if (existingContact) {
          alert(`${name} or ${phone} is already in contacts`);
          return;
        }
        const contact = state.contacts.items.find(contact => contact.id === id);
        contact.name = name;
        contact.phone = phone;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(removeContact.pending, (state) => {
        state.contacts.isLoading = true;
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = state.contacts.items.filter(contact => contact.id !== action.payload);
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
  }
})

export const { sortContacts, filterContacts } = contactsReducer.actions;
export default contactsReducer.reducer;