import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = 'https://648a16375fa58521cab0c82e.mockapi.io'

export const fetchContacts = createAsyncThunk('contact/fetchContacts',
  async () => {
    try {
      const res = await axios.get('/contacts');
      return res.data;
    } catch (err) {
      throw err;
    }
  }
)

export const createContact = createAsyncThunk('contact/addContact',
  async (newContact) => {
    try {
      const res = await axios.post('/contacts', newContact);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
)

export const updateContact = createAsyncThunk('contact/editContact',
  async ({ id, editedContact }) => {
    try {
      const res = await axios.put(`/contacts/${id}`, editedContact);
      return res.data;
    } catch (err) {
      throw err;
    }
  }
)

export const removeContact = createAsyncThunk('contact/removeContact',
  async (Id) => {
    try {
      await axios.delete(`/contacts/${Id}`);
      return Id;
    } catch (err) {
      throw err;
    }
  }
)
