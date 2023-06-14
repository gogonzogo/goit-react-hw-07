import { ContactForm } from './ContactForm/ContactForm.jsx';
import { Filter } from './Filter/Filter.jsx';
import { Sort } from './Sort/Sort.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import css from './App.module.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { readContacts } from 'redux/operations.js';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readContacts())
  }, [dispatch])
  
  const contactsObject = useSelector(state => state.contacts);
  const contacts = contactsObject.items;

  return (
    <section className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm />
      {contacts.length >= 2 && (
        <>
          <Filter />
          <Sort />
          <ContactList />
        </>
      )}
      {(contacts.length === 1 && <ContactList />)}
      {contacts.length < 1 && (
        <h5>
          No contacts found. Complete the above form to begin adding contacts.
        </h5>
      )}
    </section>
  );
};

export default App;
