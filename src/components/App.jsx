import { ContactForm } from './ContactForm/ContactForm.jsx';
import { Filter } from './Filter/Filter.jsx';
import { Sort } from './Sort/Sort.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import css from './App.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'redux/operations.js';
import { getContacts } from 'redux/selectors.js';

export const App = () => {
  const [onMount, setOnMount] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
    setOnMount(false);
  }, [dispatch]);

  const contacts = useSelector(getContacts);

  return (
    <section className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm />
      {onMount ? (
        <h5>Loading...</h5>
      ) : contacts.length >= 2 ? (
        <>
          <Filter />
          <Sort />
          <ContactList />
        </>
      ) : contacts.length === 1 ? (
        <ContactList />
      ) : contacts.length < 1 ? (
        <h5>
          No contacts found. Complete the above form to begin adding contacts.
        </h5>
      ) : null}
    </section>
  );
};

export default App;
